import Vue from 'vue'
import './index.css'
import layout from './layout.vue'
import sidebar from './sidebar.vue'
import about from '../chapter/about.md'
import sidebarItems from '../data/sidebar.json'

new Vue({
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
      // console.log("item=%s", JSON.stringify(item))
      // fetch chapter content and show it in main region
      fetch(`chapter/${item.id}.html`)
        .then(res => res.text())
        .then(html => this.mainContent = html)
    }
  }
})