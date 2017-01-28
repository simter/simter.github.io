/**
 * Config which polyfill to load.
 * The key is the global name.
 * The value is polyfill fill path.
 */
const polyfill = {
  // https://github.com/taylorhakes/promise-polyfill
  Promise: 'lib/polyfill/promise.min.js',
  // https://github.com/github/fetch
  fetch: 'lib/polyfill/fetch.min.js'
}
let onAllLoaded

/**
 * Load the polyfill by name.
 * If the name has a browser native implementation, 
 * it only set `native` property to true and then do nothing.
 * Otherwise auto load the polyfill implementation.
 * After the loading, set `loaded` property to true.
 * @param {String} name - the global name to polyfill
 */
function laod(name) {
  if (typeof polyfill[name] == 'string') polyfill[name] = { path: polyfill[name] }
  polyfill[name].native = !!window[name]
  if (polyfill[name].native) {
    polyfill[name].loaded = polyfill[name].native
    judge()
    return
  }

  // load polyfill
  var s = document.createElement('script')
  s.src = polyfill[name].path
  s.async = true
  s.onload = () => {
    polyfill[name].loaded = true
    console.info(`load polyfill '${name}' success: path=${polyfill[name].path}`)
    judge()
  }
  s.onerror = (error) => {
    polyfill[name].loaded = false
    console.error(`load polyfill '${name}' failed: path=${polyfill[name].path}`)
    judge()
  }
  document.head.appendChild(s)
}

/**
 * Judge whether all polyfills have been dealed.
 * If all dealed, call the onAllLoaded function.
 */
function judge() {
  for (let key in polyfill) {
    if (polyfill[key].loaded === undefined) return
  }
  onAllLoaded()
}

// default export - load all polyfills
export default function (cb = function () { }) {
  onAllLoaded = cb;
  Object.keys(polyfill).forEach(key => laod(key))
}

// export config
export { polyfill }