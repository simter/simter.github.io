import Vue from 'vue'
import './index.css'
import './md.css'
import layout from './layout.vue'
import sidebar from './sidebar.vue'
import about from '../chapter/about.md'
import sidebarItems from '../data/sidebar.json'

let vm = new Vue({
  el: '#app',
  components: {
    'app-layout': layout,
    'app-sidebar': sidebar
  },
  data: {
    sidebarItems: sidebarItems
  },
  methods: {
    clickSidebarItem(item) {
      if (history.state && history.state.id === item.id) return
      // record state
      history.pushState(item, item.label, `/chapter/${item.id}.html`);
      // get chapter content and show it in main region
      showChapter(this.getChapter(item.id))
    },
    showChapter(chapter) {
      if (chapter.active) return
      this.sidebarItems.forEach(item => this.$set(item, 'active', (item.id == chapter.id)))
      if (!chapter.content) this.fetchChapterContent(chapter)
    },
    getChapter(id) {
      let chapter = this.sidebarItems.filter(item => item.id === id)
      return chapter.length ? chapter[0] : null
    },
    fetchChapterContent(chapter) {
      if (!chapter) return Promise.reject(`no id '${id}'`)
      if (chapter.content) return Promise.resolve(chapter.content)

      return fetch(`/compiled-chapter/${id}.html`)
        .then(res => {
          if (res.ok) { // cache the successful response content
            return res.text().then(html => {
              this.$set(chapter, 'content', html)
              return chapter
            })
          } else {      // no cache but error message
            return res.text().then(msg => {
              this.$set(chapter, 'error', `${res.status} ${msg || res.statusText}`)
              return chapter
            })
          }
        })
    }
  },
  computed: {
    mainContent() {
      for (let item of this.sidebarItems) {
        if (item.active) return item.content
      }

      // default show about page
      let aboutItem = this.sidebarItems.filter(item => item.id = 'about')[0]
      this.$set(aboutItem, 'active', true)
      this.$set(aboutItem, 'content', about)
    }
  },
  created: function () {
    console.log('location.hash=', location.hash)
    if (location.hash) {
      const to = location.hash.substr(1)
      let id = to.substr(to.lastIndexOf('/') + 1)
      id = id.substring(0, id.indexOf('.html'))
      if (id) {
        let chapter = this.getChapter(id)
        // replace hash path to real path
        history.replaceState(chapter, chapter.label, to)

        // load hash chapter content
        showChapter(chapter)
      }
    }
  }
})

window.onpopstate = function (event) {
  console.log("onpopstate=%s", JSON.stringify(event))
  if (!event.state) return
  console.log('location=%s, state=%s', location.href, JSON.stringify(event.state))
  vm.mainContent = cacheChapters[event.state.id] || ''
}