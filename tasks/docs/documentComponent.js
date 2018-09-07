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
  let description = `${doc.description || ""}\n`

  if (doc.pixiDescription) {
    description += `<div class='pixi-description'>\n${
      doc.pixiDescription
    }\n</div>\n`
  }

  return description
}

function examples(doc) {
  const exampleDocs = (doc.examples || [])
    .map(example => "```html\n/*vue*/\n" + example + "\n```\n")
    .join("\n\n")

  return exampleDocs ? `## Examples\n\n${exampleDocs}\n` : ""
}

function props(doc) {
  const sortedProps = Array.from(Object.entries(doc.props || {})).sort((a, b) =>
    a[0].localeCompare(b[0])
  )
  const propDocs = sortedProps
    .map(([name, value]) => prop(name, value))
    .join("\n\n")

  return propDocs
    ? `## Props\n\n<table class="prop-list">${propDocs}</table>\n`
    : ""
}

function prop(name, value) {
  return (
    "<tr>\n" +
    `<td><strong><code>${name}</code></strong></td>\n` +
    "<td>\n" +
    propType(value.typeNames) +
    propPixiDefault(value) +
    "</td>\n" +
    "<td>\n" +
    (value.description ? `${value.description}\n` : "") +
    propPixiDescription(value) +
    "</td>\n" +
    "</tr>\n"
  )
}

function propType(typeNames) {
  return `${typeNames ? typeNames.join(" | ") : ""}\n`
}

function propPixiDescription(value) {
  if (value.pixiDescription) {
    return `<div class='pixi-description'>\n${value.pixiDescription}\n</div>\n`
  } else if (value.pixiInitializerDescription) {
    return `<div class='pixi-description is-initializer'>\n${
      value.pixiInitializerDescription
    }\n</div>\n`
  } else {
    return ""
  }
}

function propPixiDefault(value) {
  if (value.pixiDefault) {
    return `<p class='prop-default'><small>Default:</small>\n<br />\n<code>${
      value.pixiDefault
    }</code>\n</p>\n`
  } else {
    return ""
  }
}
