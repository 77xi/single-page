const paths = require('./paths')
const getEntrys = require('./getEntrys')
const pageEntrys = getEntrys()

const config = {
  entry: pageEntrys,
  output: {
    filename: '[name].[contenthash].js',
    path: paths.resolveRoot('dist')
  },
  resolve: {
    alias: {
      '~': paths.resolveRoot('src')
    }
  }
}

module.exports = config
