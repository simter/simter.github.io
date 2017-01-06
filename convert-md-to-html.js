const path = require('path')
const fs = require('fs')
const fsp = require('fs-promise')
const md = require('markdown-it')()
const Minimize = require('minimize'), min = new Minimize();
const watch = require('chokidar').watch

process.chdir(__dirname)
const chapterSubDir = 'chapter'
const sourceDir = path.resolve('src')
const targetDir = path.resolve('dist')

const sourceChapterDir = path.resolve(sourceDir, chapterSubDir);
const targetCompiledDir = path.resolve(targetDir, 'compiled-' + chapterSubDir);
const targetRedirectDir = path.resolve(targetDir, chapterSubDir);
if (!fs.existsSync(targetCompiledDir)) fs.mkdirSync(targetCompiledDir)
if (!fs.existsSync(targetRedirectDir)) fs.mkdirSync(targetRedirectDir)

const redirectContent = min.parse(fs.readFileSync('src/chapter/redirect.html').toString())

fsp.readdir(sourceChapterDir)
  .then(files => {
    files.forEach(f => {
      if (!f.endsWith('.md')) return;
      let sourceFile = path.resolve(sourceChapterDir, f)

      let newName = f.replace(path.extname(f), '.html');
      let compiledFile = path.resolve(targetCompiledDir, newName)
      convertFile(sourceFile, compiledFile).catch(err => console.log(err))
      
      let redirectFile = path.resolve(targetRedirectDir, newName)
      fs.writeFileSync(redirectFile, redirectContent)
    });
  })
  .catch(err => console.log(err))

function convertFile(fromFile, toFile) {
  console.log('convert %s', fromFile)
  return fsp.readFile(fromFile).then(content => fsp.writeFile(toFile, min.parse(md.render(content.toString()))))
}