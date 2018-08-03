module.exports = function documentComponent(doc, docs) {
  return [header(doc, docs), description(doc), examples(doc), props(doc)]
    .filter(Boolean)
    .join("\n\n")
}

function header(doc, docs) {
  const namespace = doc.namespace.length ? `${doc.namespace.join(".")}.` : ""
  let header = `<header>\n<h1>${namespace}Pixi${doc.name}\n</h1>\n\n`

  const parentDoc = docs.forComponent(doc.component.super)

  if (parentDoc) {
    header += `<p class='extends'>extends ${parentDoc.name}</p>`
  }

  return header + "</header>"
}

function description(doc) {
  return [doc.description, doc.pixiDescription].filter(Boolean).join("\n\n")
}

function examples(doc) {
  const exampleDocs = (doc.examples || [])
    .map(example => "```html\n/*vue*/\n" + example + "\n```\n")
    .join("\n\n")

  return exampleDocs ? `## Examples\n\n${exampleDocs}\n` : ""
}

function props(doc) {
  const propDocs = Object.entries(doc.props || {})
    .map(([name, value]) => prop(name, value))
    .join("\n\n")

  return propDocs ? `## Props\n\n${propDocs}\n` : ""
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
