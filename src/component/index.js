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
      console.log("clickSidebarItem=", JSON.stringify(item))
      console.log("all=", JSON.stringify(this.sidebarItems))
      // 加载对应的页面内容到 main 区域中
    }
  }
})