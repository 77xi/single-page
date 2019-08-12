const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin")

const getEntrys = require("./getEntrys")
const baseConfig = require("./base.config")
const { vendorDependencies } = require("./constant")
const pageEntrys = getEntrys()

const config = {
  mode: "production",
  ...baseConfig,
  entry: {
    ...baseConfig.entry,
    vendor: vendorDependencies
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[hash].css"
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ sourceMap: true }),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: "vendor",
          name: "vendor"
        },
        commons: {
          chunks: "all",
          name: "commons",
          priority: -1,
          minChunks: Object.keys(pageEntrys).length,
          // ????
          enforce: true
        }
      }
    }
  }
}

const cacheGroupsKeys = Object.keys(config.optimization.splitChunks.cacheGroups)

Object.keys(pageEntrys).forEach(pageName => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${pageName}.html`,
      template: path.join(pageEntrys[pageName], "index.html"),
      inject: true,
      chunks: [`${pageName}`, ...cacheGroupsKeys]
    })
  )
})

config.plugins.push(
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: "async"
  })
)

module.exports = config
