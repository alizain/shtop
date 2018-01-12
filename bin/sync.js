const MANIFEST_JSON = '../manifest.json'
const PACKAGE_JSON = '../package.json'

const fs = require('fs')
const manifest = require(MANIFEST_JSON)
const pkg = require(PACKAGE_JSON)

const copyKeys = [
  'version',
  'description'
]

for (key in copyKeys) {
  manifest[key] = pkg[key]
}

fs.writeFileSync(MANIFEST_JSON, JSON.stringify(manifest, null, 4), 'utf8')

console.log('Sync manifest with package.json complete!')
