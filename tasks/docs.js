const documentComponent = require("./docs/documentComponent")
const { existsSync, readFileSync, writeFileSync } = require("fs")

const VuePixi = require("./docs/vuePixiWrapper")
const DocCollection = require("./docs/docCollection")
;(async function() {
  const docs = new DocCollection()
  findComponents(VuePixi).forEach(docs.add.bind(docs))

  await require("./docs/parsePixiDocs")(docs)
  require("./docs/parseWrapperDocs")(docs)

  docs.entries().forEach(doc => writeComponentDoc(doc, docs))
  writeSidebarDoc(docs.entries())
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

function writeComponentDoc(doc, docs) {
  writeFileSync(
    `docs/api/${doc.namespace.join("/")}/${doc.name}.md`,
    documentComponent(doc, docs)
  )
}

function writeSidebarDoc(entries) {
  const links = entries.map(doc => {
    const namespace = doc.namespace.length ? `${doc.namespace.join(".")}.` : ""

    return {
      name: `${namespace}Pixi${doc.name}`,
      path: doc.namespace.concat(doc.name)
    }
  })

  links.sort((a, b) => a.name.localeCompare(b.name))

  let sidebarDoc = `<!-- API -->\n* API\n`
  links.forEach(
    link =>
      (sidebarDoc += `    * [${link.name}](api/${link.path.join("/")}.md)\n`)
  )
  sidebarDoc += "<!-- /API -->"

  const sidebarContent = readFileSync("docs/_sidebar.md").toString()

  writeFileSync(
    "docs/_sidebar.md",
    sidebarContent.replace(/<!-- API -->(.|\n|\r)+<!-- \/API -->/, sidebarDoc)
  )
}
