const path = require('path')
const fs = require('fs')
const fsp = require('fs-promise')
const md = require('markdown-it')()
const Minimize = require('minimize'), min = new Minimize();
const watch = require('chokidar').watch

process.chdir(__dirname)
const fromDir = path.resolve('src/chapter')
const toDir = path.resolve('dist/chapter')
convertDir(fromDir, toDir)

function convertDir(fromDir, toDir) {
  if (!fs.existsSync(toDir)) fs.mkdirSync(toDir)
  fsp.readdir(fromDir)
    .then(files => {
      files.forEach(f => {
        let fromFile = path.resolve(fromDir, f)
        let toFile = path.resolve(toDir, f.replace(path.extname(f), '.html'))
        convertFile(fromFile, toFile).catch(err => console.log(err))
      });
    })
    .catch(err => console.log(err))
}

function convertFile(fromFile, toFile) {
  console.log('convert %s', fromFile)
  return fsp.readFile(fromFile).then(content => fsp.writeFile(toFile, min.parse(md.render(content.toString()))))
}