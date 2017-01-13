import Vue from 'vue'
import './index.css'
import './md.css'
import layout from './layout.vue'
import tree from './tree.vue'
import about from '../chapter/about.md'
import sidebarItems from '../data/sidebar.json'

const cache = {}

let vm = new Vue({
  el: '#app',
  components: {
    'app-layout': layout,
    'app-tree': tree
  },
  data: {
    sidebarItems: sidebarItems,
    mainContent: ''
  },
  methods: {
    forwardToChapter(item) {
      console.log('forwardToChapter id=%s', item.id)
      if (history.state && history.state.id === item.id) return

      // record state
      history.pushState(item, item.label, `/chapter/${item.id}.html`);

      // get chapter content and show it in main region
      this.fetchChapterContent(item.id)
    },
    fetchChapterContent(id) {
      if (cache[id]) {
        this.mainContent = cache[id]
      } else {
        return fetch(`/compiled-chapter/${id}.html`)
          .then(res => res.text())
          .then(text => cache[id] = this.mainContent = text)
          .catch(error => this.mainContent = error.message || "文章加载失败")
      }
    }
  },
  created: function () {
    //console.log('location.hash=', location.hash)
    if (location.hash) {
      const to = location.hash.substr(1)
      let id = to.substr(to.lastIndexOf('/') + 1)
      id = id.substring(0, id.indexOf('.html'))
      if (id) {
        let chapter = { id: id, label: 'hash' }
        // replace hash path to real path
        history.replaceState(chapter, chapter.label, to.split('#')[0])

        // load hash chapter content
        this.fetchChapterContent(id).then(() => {
          // scroll to anchor
          let hash = to.split('#')[1]
          if (hash) {
            let a = document.querySelector(`a[name="${hash}"]`)
            a && a.click()
          }
        })
      }
    }
  }
})

window.onpopstate = function (event) {
  if (!event.state) return
  //console.log('location=%s, state=%s', location.href, JSON.stringify(event.state))
  vm.mainContent = cache[event.state.id] || ''
}