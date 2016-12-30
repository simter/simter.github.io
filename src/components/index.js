import Vue from 'vue'
import './index.css'
import layout from './layout.vue'
import sidebar from './sidebar.vue'
import readme from '../../README.md'

new Vue({
  el: '#app',
  components: {
    'app-layout': layout,
    'app-sidebar': sidebar
  },
  data: function () {
    return {
      hello: readme,
      sidebarItems: [
        { id: 'code-rule', label: '编码规范' },
        {
          id: 'rest-rule', label: 'REST 规范',
          children: [
            { id: 'sub1', label: '子菜单 1' },
            {
              id: 'sub2', label: '子菜单 2',
              children: [
                { id: 'sub21', label: '3 级菜单 1' },
                { id: 'sub22', label: '3 级菜单 2' }
              ]
            },
            { id: 'sub3', label: '子菜单3' }
          ]
        },
        { id: 'vo-rule', label: 'VO 规范' }
      ]
    }
  },
  methods: {
    clickSidebarItem: function (item) {
      console.log("clickSidebarItem=", JSON.stringify(item))
      console.log("all=", JSON.stringify(this.sidebarItems))
    }
  }
})