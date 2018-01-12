const fs = require('fs')
const path = require('path')

const MANIFEST_JSON = path.resolve(__dirname, '../manifest.json')
const PACKAGE_JSON = path.resolve(__dirname, '../package.json')

const manifest = require(MANIFEST_JSON)
const pkg = require(PACKAGE_JSON)

const copyKeys = [
  'version',
  'description'
]

const updates = copyKeys.reduce((accum, key) => {
  accum[key] = pkg[key]
  return accum
}, {})
const new_manifest = Object.assign({}, manifest, updates)

fs.writeFileSync(MANIFEST_JSON, JSON.stringify(new_manifest, null, 4), 'utf8')

console.log('Sync manifest with package.json complete!')
