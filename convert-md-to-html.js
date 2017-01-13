const minHtml = true
const mdCompilerType = ['marked', 'markdown-it'][0]
let markdownIt, marked

if (mdCompilerType == 'marked') {               // use marked
  marked = require('marked')

  // generate anchor for h level
  var renderer = new marked.Renderer()
  renderer.heading = function (text, level) {
    var href = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${level}><a class="anchor" href="#${href}"><span class="header-link"></span></a>${text}</h${level}>`
  }
  marked.setOptions({ renderer })
} else if (mdCompilerType == 'markdown-it') {   // use markdown-it
  markdownIt = new require('markdown-it')({ html: true })
} else throw new Error(`unsupport markdown compiler: ${mdCompilerType}`)


const path = require('path')
const fs = require('fs')
const fsp = require('fs-promise')
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
  return fsp.readFile(fromFile).then(content => {
    let compiled = compile(content.toString())
    fsp.writeFile(toFile, minHtml ? min.parse(compiled) : compiled)
  })
}

function compile(source) {
  if (mdCompilerType == 'marked') {             // use marked
    return marked(source)
  } else if (mdCompilerType == 'markdown-it') { // use markdown-it
    return markdownIt.render(source)
  }
}