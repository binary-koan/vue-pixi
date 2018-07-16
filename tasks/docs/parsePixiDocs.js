const { existsSync, createWriteStream } = require("fs")
const { execSync } = require("child_process")
const { promisify } = require("util")
const axios = require("axios")
const extract = require("extract-zip")

module.exports = async function(docs) {
  const version = require("../../package-lock.json").dependencies["pixi.js"]
    .version

  if (!existsSync(`tmp/v${version}`)) {
    const response = await downloadPixi(version)
    await promisify(extract)(`tmp/v${version}.zip`, {
      dir: path.resolve(`tmp/v${version}`)
    })
    execSync(`cd tmp/v${version}/pixi.js-${version} && npm install`)
  }

  const pixiDocs = JSON.parse(
    execSync(
      `cd tmp/v${version}/pixi.js-${version} && npx jsdoc -X -c scripts/jsdoc.conf.json`
    ).toString()
  )

  pixiDocs.forEach(item => {
    if (
      item.longname.startsWith("PIXI.") &&
      item.kind === "class" &&
      (item.description || item.classdesc)
    ) {
      docs.update(nameFromItem(item), {
        pixiDescription: item.description || item.classdesc
      })
    } else if (item.kind === "member" && item.description) {
      docs.updateProp(nameFromItem(item), item.name, {
        pixiDescription: item.description
      })
    }
  })
}

async function downloadPixi(version) {
  const filepath = path.resolve(`tmp/v${version}.zip`)

  // axios image download with response type "stream"
  const response = await axios({
    method: "GET",
    url: `https://github.com/pixijs/pixi.js/archive/v${version}.zip`,
    responseType: "stream"
  })

  // pipe the result stream into a file on disc
  response.data.pipe(createWriteStream(filepath))

  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve()
    })

    response.data.on("error", err => {
      reject(err)
    })
  })
}

function nameFromItem(item) {
  return item.meta.filename.replace(/\.js$/, "")
}