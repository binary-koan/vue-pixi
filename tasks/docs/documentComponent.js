module.exports = function documentComponent(doc) {
  return [description(doc), examples(doc), props(doc)]
    .filter(Boolean)
    .join("\n\n")
}

function description(doc) {
  return [doc.description, doc.pixiDescription].filter(Boolean).join("\n\n")
}

function examples(doc) {
  return (doc.examples || [])
    .map(example => "```html\n/*vue*/\n" + example + "\n```\n")
    .join("\n\n")
}

function props(doc) {
  return Object.entries(doc.props || {})
    .map(([name, value]) => prop(name, value))
    .join("\n\n")
}

function prop(name, value) {
  return (
    "<div class='prop'>\n" +
    `<div class='name'>${name}</div>\n` +
    (value.description
      ? `<div class='prop-description'>\n${value.description}\n</div>\n`
      : "") +
    (value.pixiDescription
      ? `<div class='prop-pixi-description'>\n${
          value.pixiDescription
        }\n</div>\n`
      : "") +
    "</div>"
  )
}
