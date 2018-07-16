const documentComponent = require("./docs/documentComponent")
const { existsSync, writeFileSync } = require("fs")

const VuePixi = require("./docs/vuePixiWrapper")
const DocCollection = require("./docs/docCollection")
;(async function() {
  const docs = new DocCollection()
  findComponents(VuePixi).forEach(docs.add.bind(docs))

  await require("./docs/parsePixiDocs")(docs)
  require("./docs/parseWrapperDocs")(docs)

  docs.forEach(writeComponentDoc)
})()

function findComponents(object, namespace = []) {
  let components = []

  Object.entries(object).forEach(([key, value]) => {
    key = key.replace(/^Pixi/, "")

    if (value.name === "VueComponent") {
      components.push({ namespace, name: key, component: value })
    } else if (typeof value === "object") {
      components = components.concat(
        findComponents(value, namespace.concat(key))
      )
    }
  })

  return components
}

function writeComponentDoc(doc) {
  writeFileSync(
    `docs/generated/${doc.namespace.join("/")}/${doc.name}.md`,
    documentComponent(doc)
  )
}
