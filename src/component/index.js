import Vue from 'vue'
import './index.css'
import './md.css'
import layout from './layout.vue'
import sidebar from './sidebar.vue'
import about from '../chapter/about.md'
import sidebarItems from '../data/sidebar.json'

let cacheChapters = {}
function getChapter(id) {
  if (cacheChapters[id]) return Promise.resolve(cacheChapters[id]);

  return fetch(`/compiled-chapter/${id}.html`)
    .then(res => {
      if (res.ok) { // cache the successful response content
        return res.text().then(html => {
          cacheChapters[id] = html
          return html
        })
      } else {      // no cache but error message
        return res.text().then(msg => {
          return `${res.status} ${msg || res.statusText}`
        })
      }
    })
}

let vm = new Vue({
  el: '#app',
  components: {
    'app-layout': layout,
    'app-sidebar': sidebar
  },
  data: {
    mainContent: about,
    sidebarItems: sidebarItems
  },
  methods: {
    clickSidebarItem: function (item) {
      if (history.state && history.state.id === item.id) return
      // record state
      history.pushState(item, item.label, `/chapter/${item.id}.html`);
      // get chapter content and show it in main region
      getChapter(item.id).then(content => this.mainContent = content)
    }
  },
  created: function () {
    console.log('location.hash=', location.hash)
    if (location.hash) {
      const to = location.hash.substr(1)
      let id = to.substr(to.lastIndexOf('/') + 1)
      id = id.substring(0, id.indexOf('.html'))
      if (id) {
        // replace hash path to real path
        history.replaceState(null, null, to)

        // load hash chapter content
        getChapter(id).then(content => this.mainContent = content)
      }
    }
  },
  ready: function () {
    console.log('ready')
  }
})

window.onpopstate = function (event) {
  console.log("onpopstate=%s", JSON.stringify(event))
  if (!event.state) return
  console.log('location=%s, state=%s', location.href, JSON.stringify(event.state))
  vm.mainContent = cacheChapters[event.state.id] || ''
}