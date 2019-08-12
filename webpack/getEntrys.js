const fs = require("fs")
const zipObject = require("lodash/zipObject")

const paths = require("./paths")

const getEntrys = () => {
  const pagePath = paths.resolveRoot("src/page")
  const pageNameArr = fs.readdirSync(pagePath)
  const pageEntryArr = pageNameArr.map(name => `${pagePath}/${name}`)

  return zipObject(pageNameArr, pageEntryArr)
}

module.exports = getEntrys
