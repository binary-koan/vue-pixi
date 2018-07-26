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
    propPixiDescription(value) +
    propPixiDefault(value) +
    "</div>"
  )
}

function propPixiDescription(value) {
  if (value.pixiDescription) {
    return `<div class='prop-pixi-description'>\n${
      value.pixiDescription
    }\n</div>\n`
  } else if (value.pixiInitializerDescription) {
    return `<div class='prop-pixi-description is-initializer'>\n${
      value.pixiInitializerDescription
    }\n<div class='prop-initializer-only'>init only</div>\n</div>\n`
  } else {
    return ""
  }
}

function propPixiDefault(value) {
  if (value.pixiDefault) {
    return `<div class='prop-pixi-default'>\n${value.pixiDefault}\n</div>\n`
  } else {
    return ""
  }
}
