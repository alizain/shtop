const fs = require('fs')
const manifest = require('./manifest.json')
const pkg = require('./package.json')

const copyKeys = [
  'version',
  'description'
]

for (key in copyKeys) {
  manifest[key] = pkg[key]
}

fs.writeFileSync('./manifest.json', JSON.stringify(manifest, null, 4), 'utf8')

console.log('Sync manifest with package.json complete!')
