var fs = require('fs')
var manifest = require('./manifest.json')
var pkg = require('./package.json')

manifest.version = pkg.version

fs.writeFileSync('./manifest.json', JSON.stringify(manifest, null, 4), 'utf8')

console.log('Sync manifest with package.json complete!')
