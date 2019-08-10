const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./base.config')
const paths = require('./paths')

const getEntrys = require('./getEntrys')
const pageEntrys = getEntrys()

const config = {
  ...baseConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: paths.resolveRoot('dist')
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
}

Object.keys(pageEntrys).forEach(pageName => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${pageName}.html`,
      template: path.join(pageEntrys[pageName], 'index.html'),
      inject: true,
      chunks: [`${pageName}`]
    })
  )
})

module.exports = config
