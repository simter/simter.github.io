import vue from 'rollup-plugin-vue2';
import buble from 'rollup-plugin-buble';
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import uglify from 'rollup-plugin-uglify'
import json from 'rollup-plugin-json'
import md from 'rollup-plugin-md'

let external = Object.keys(require('./package.json').dependencies)
let minified = false
let plugins = [
  json(),
  md(),
  vue(),
  postcss({
    plugins: [cssnano], // minified CSS
    extensions: ['.css']
  }),
  buble()
]
if (minified) plugins.push(uglify())

export default {
  entry: 'src/component/index.js',
  format: 'iife',
  dest: 'dist/index' + (minified ? '.min.js' : '.js'),
  external: external,
  plugins: plugins
}