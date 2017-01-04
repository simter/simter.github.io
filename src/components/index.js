import Vue from 'vue'
import './index.css'
import layout from './layout.vue'
import sidebar from './sidebar.vue'
import readme from '../../README.md'
import sidebarItems from '../data/sidebar.json'

new Vue({
  el: '#app',
  components: {
    'app-layout': layout,
    'app-sidebar': sidebar
  },
  data: {
    hello: readme,
    sidebarItems: sidebarItems
  },
  methods: {
    clickSidebarItem: function (item) {
      console.log("clickSidebarItem=", JSON.stringify(item))
      console.log("all=", JSON.stringify(this.sidebarItems))
    }
  }
})