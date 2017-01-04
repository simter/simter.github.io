import vue from 'rollup-plugin-vue2';
import buble from 'rollup-plugin-buble';
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import uglify from 'rollup-plugin-uglify'
import json from 'rollup-plugin-json'
import md from 'rollup-plugin-md'

var external = Object.keys(require('./package.json').dependencies);

export default {
  entry: 'src/components/index.js',
  external: external,
  plugins: [
    json(),
    md(),
    vue(),
    postcss({
      plugins: [cssnano], // minified CSS
      extensions: ['.css']
    }),
    buble(),
    uglify()
  ]
};