import Vue from 'vue'
import './index.css'
import './md.css'
import layout from './layout.vue'
import tree from './tree.vue'
import about from '../chapter/about.md'
import sidebarItems from '../data/sidebar.json'

function getItem(id, items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) return items[i]
    else if (items[i].children) return getItem(id, items[i].children)
  }
  return null;
}

let vm = new Vue({
  el: '#app',
  components: {
    'app-layout': layout,
    'app-tree': tree
  },
  data: {
    sidebarItems: sidebarItems
  },
  methods: {
    sidebarItemActivated(item) {
      console.log('sidebarItemActivated id=%s', item.id)
      if (history.state && history.state.id === item.id) return
      // record state
      history.pushState(item, item.label, `/chapter/${item.id}.html`);
      // get chapter content and show it in main region
      this.showChapter(this.getChapter(item.id))
    },
    showChapter(chapter) {
      if (!chapter || chapter.active) return
      this.sidebarItems.forEach(item => this.$set(item, 'active', (item.id == chapter.id)))
      if (!chapter.content) this.fetchChapterContent(chapter)
      //console.log("showChapter=%s", JSON.stringify(chapter))
    },
    getChapter(id) {
      console.log('id=', id)
      let chapter = getItem(id, this.sidebarItems)
      //console.log('chapter=', JSON.stringify(chapter))
      return chapter
    },
    fetchChapterContent(chapter) {
      if (!chapter) return Promise.reject(`no id '${chapter.id}'`)
      if (chapter.content) return Promise.resolve(chapter.content)

      return fetch(`/compiled-chapter/${chapter.id}.html`)
        .then(res => {
          if (res.ok) { // cache the successful response content
            return res.text().then(html => {
              this.$set(chapter, 'content', html)
              return chapter
            })
          } else {      // no cache but error message
            return res.text().then(msg => {
              this.$set(chapter, 'error', `${res.status} ${msg || res.statusText}`)
              //console.log('chapter.error=', chapter.error)
              return chapter
            })
          }
        })
    }
  },
  computed: {
    mainContent() {
      for (let i = 0; i < this.sidebarItems.length; i++) {
        let item = this.sidebarItems[i]
        if (item.active) {
          // console.log("mainContent=", item.content || item.error)
          return item.content || item.error
        }
      }

      // default show about page
      //let aboutItem = this.sidebarItems.filter(item => item.id = 'about')[0]
      //this.$set(aboutItem, 'active', true)
      //this.$set(aboutItem, 'content', about)
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
        this.showChapter(chapter)
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