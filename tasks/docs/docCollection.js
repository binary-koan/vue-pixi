module.exports = class DocCollection {
  constructor() {
    this.docs = new Map()
  }

  get(componentName) {
    return this.docs.get(componentName)
  }

  add({ name, namespace, component }) {
    this.docs.set(name, { namespace, component })
  }

  update(componentName, attrs) {
    if (!this.docs.has(componentName)) {
      return
    }

    this.docs.set(
      componentName,
      Object.assign(this.docs.get(componentName) || {}, attrs)
    )
  }

  updateProp(componentName, propName, attrs) {
    if (!this.docs.has(componentName)) {
      return
    }

    if (
      !this.docs.get(componentName).component.options.props ||
      !this.docs.get(componentName).component.options.props[propName]
    ) {
      return
    }

    const doc = this.docs.get(componentName) || {}
    const props = doc.props || {}
    props[propName] = props[propName] || {}

    props[propName] = Object.assign(props[propName], attrs)

    this.docs.set(componentName, Object.assign(doc, { props }))
  }

  forEach(callback) {
    this.docs.forEach((options, name) =>
      callback(Object.assign({ name }, options))
    )
  }
}
