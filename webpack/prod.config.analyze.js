const prodConfig = require("./prod.config")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

prodConfig.plugins.push(new BundleAnalyzerPlugin())

module.exports = prodConfig
