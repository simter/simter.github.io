const path = require('path')
const fs = require('fs')
const watch = require('chokidar').watch

process.chdir(__dirname)
watch(path.resolve('src/chapter'), { persistent: true, recursive: true })
  // 所有事件: add 添加文件, addDir 添加目录, change 修改文件, unlink 删除文件, unlinkDir 删除目录
  .on('all', (event, path) => {
    console.log('all-event=%s', event)
    console.log('all-path=%s', path)
  })
  // 添加文件事件
  .on('add', (path, stat) => {
    console.log('add-path=%s', path)
    console.log('add-stat=%s', JSON.stringify(stat))
  })
  // 添加目录事件
  .on('addDir', (path, stat) => {
    console.log('addDir-path=%s', path)
    console.log('addDir-stat=%s', JSON.stringify(stat))
  })
  // 文件改变事件
  .on('change', (path, stat) => {
    console.log('change-path=%s', path)
    console.log('change-stat=%s', JSON.stringify(stat))
  })
  .on('error', error => log(`Watcher error: ${error}`))

console.log('----1')