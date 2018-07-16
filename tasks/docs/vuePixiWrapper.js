const { JSDOM } = require("jsdom")

const { window } = new JSDOM(
  "<!DOCTYPE html><html><head></head><body></body></html>"
)
global.window = window
global.navigator = window.navigator
global.document = window.document

module.exports = require("../../dist/bundle")
