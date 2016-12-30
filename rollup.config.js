import vue from 'rollup-plugin-vue2';
import buble from 'rollup-plugin-buble';
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import uglify from 'rollup-plugin-uglify'
import md from 'rollup-plugin-md'

var external = Object.keys(require('./package.json').dependencies);

export default {
  entry: 'src/index.js',
  external: external,
  plugins: [
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