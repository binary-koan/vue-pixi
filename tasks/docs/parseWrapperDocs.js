const { execSync } = require("child_process")

module.exports = function(docs) {
  const wrapperDocs = JSON.parse(
    execSync("npx jsdoc -r -X dist/module").toString()
  )

  wrapperDocs.forEach(item => {
    if (
      item.longname === "module.exports" &&
      (item.description || item.examples)
    ) {
      docs.update(nameFromItem(item), {
        description: item.description,
        examples: item.examples
      })
    } else if (item.longname.startsWith("props.") && item.description) {
      const propName = item.longname.replace(/^props\./, "")
      docs.updateProp(item.meta.filename.replace(/\.js$/, ""), propName, {
        description: item.description
      })
    }
  })
}

function nameFromItem(item) {
  return item.meta.filename.replace(/\.js$/, "")
}
