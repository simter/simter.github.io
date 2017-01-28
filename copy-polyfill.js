const min = true
const path = require('path')
const fs = require('fs-extra')
// https://github.com/mishoo/UglifyJS2#api-reference
const UglifyJS = require('uglify-js')

process.chdir(__dirname)

function copyAndMinfied(jsFile) {
  // create target dir
  let toDir = 'dist/lib/polyfill'
  if (!fs.existsSync(toDir)) fs.mkdirsSync(toDir)

  // copy file
  let dirName = path.dirname(jsFile)
  let baseName = path.basename(jsFile)
  let extName = path.extname(baseName)
  let name = baseName.substring(0, baseName.indexOf(extName))
  fs.writeFileSync(path.resolve(toDir, baseName), fs.readFileSync(jsFile).toString())

  // make min version
  fs.writeFileSync(path.resolve(toDir, name + '.min' + extName), UglifyJS.minify(jsFile).code)
}

copyAndMinfied('node_modules/whatwg-fetch/fetch.js')
copyAndMinfied('node_modules/promise-polyfill/promise.js')