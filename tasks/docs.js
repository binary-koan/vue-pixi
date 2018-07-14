const { execSync } = require("child_process")
const { existsSync, writeFileSync, createWriteStream } = require("fs")
const { JSDOM } = require("jsdom")
const axios = require("axios")
const { promisify } = require("util")
const extract = require("extract-zip")
const path = require("path")

const { window } = new JSDOM(
  "<!DOCTYPE html><html><head></head><body></body></html>"
)
global.window = window
global.navigator = window.navigator
global.document = window.document

const VuePixi = require("../dist/bundle")
const components = findComponents(VuePixi)
const componentNames = Object.keys(components)
const foundDocs = new Map()
;(async function() {
  const version = require("../package-lock.json").dependencies["pixi.js"]
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
  const wrapperDocs = JSON.parse(
    execSync("npx jsdoc -r -X dist/module").toString()
  )

  wrapperDocs.forEach(item => {
    if (
      item.longname === "module.exports" &&
      (item.description || item.examples)
    ) {
      put(nameFromItem(item), {
        description: item.description,
        examples: item.examples
      })
    } else if (item.longname.startsWith("props.") && item.description) {
      const propName = item.longname.replace(/^props\./, "")
      putProp(item.meta.filename.replace(/\.js$/, ""), propName, {
        description: item.description
      })
    }
  })

  pixiDocs.forEach(item => {
    if (
      item.longname.startsWith("PIXI.") &&
      item.kind === "class" &&
      (item.description || item.classdesc)
    ) {
      put(nameFromItem(item), {
        pixiDescription: item.description || item.classdesc
      })
    } else if (item.kind === "member" && item.description) {
      putProp(nameFromItem(item), item.name, {
        pixiDescription: item.description
      })
    }
  })

  Object.entries(components).forEach(([name, component]) =>
    documentComponent(name, component)
  )
})()

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

function findComponents(object) {
  let components = {}

  Object.entries(object).forEach(([key, value]) => {
    key = key.replace(/^Pixi/, "")

    if (value.name === "VueComponent") {
      components[key] = value
    } else if (typeof value === "object") {
      // Object.entries(findComponents(value)).forEach(([name, component]) => {
      //   components[`${key}.${name}`] = component
      // })

      components = Object.assign(findComponents(value), components)
    }
  })

  return components
}

function nameFromItem(item) {
  return item.meta.filename.replace(/\.js$/, "")
}

function put(componentName, attrs) {
  if (!componentNames.includes(componentName)) {
    return
  }

  foundDocs.set(
    componentName,
    Object.assign(foundDocs.get(componentName) || {}, attrs)
  )
}

function putProp(componentName, propName, attrs) {
  if (!componentNames.includes(componentName)) {
    return
  }

  if (
    !components[componentName].options.props ||
    !components[componentName].options.props[propName]
  ) {
    return
  }

  const doc = foundDocs.get(componentName) || {}
  const props = doc.props || {}
  props[propName] = props[propName] || {}

  props[propName] = Object.assign(props[propName], attrs)

  foundDocs.set(componentName, Object.assign(doc, { props }))
}

function documentComponent(name, component) {
  const found = foundDocs.get(name)

  const markdown = found
    ? `
${found.description || ""}
${found.pixiDescription || ""}
${(found.examples || []).map(
        example => "```html\n/*vue*/\n" + example + "\n```\n"
      )}

${Object.entries(found.props || {})
        .map(
          ([prop, value]) =>
            `
<div class="pixi-prop">
${value.description || ""}
${value.pixiDescription || ""}
</div>`
        )
        .join("\n")}
`
    : ""

  writeFileSync(`docs/generated/${name}.md`, markdown)
}
