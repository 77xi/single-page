const path = require("path")
const AppRootDir = require("app-root-dir")

exports.resolveRoot = path.resolve.bind(null, AppRootDir.get())
