(function (Vue) {
'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}

Vue = 'default' in Vue ? Vue['default'] : Vue;

__$styleInject("html{background-color:#000;color:#888;font-family:微软雅黑,宋体,sans-serif}#app,body,html{height:100%;padding:0;margin:0;overflow:hidden}pre{border:1px solid #2b2b2b;margin:0;padding:.5em;background-color:#001;line-height:1.5em}a{color:#880;text-decoration:none}a:focus{color:#881}",undefined);

__$styleInject("table{table-layout:fixed;border-spacing:0;background:none;padding:0;margin:0;cursor:default;border-collapse:collapse}tr{height:1.5em}td,th{border:1px solid #2b2b2b;padding:.15em .25em}blockquote{border-style:solid;border-color:blue;border-width:0 0 0 4px;margin:.5em;padding:.25em .5em;background-color:#001;line-height:1.5em}",undefined);

__$styleInject(".layout{height:100%;overflow:hidden;display:flex;flex-direction:column}.layout>header{display:none;flex-grow:0;border-bottom:1px solid #2b2b2b}.layout>header .logo{margin-top:4px}.layout>div{flex-grow:1;display:flex;flex-direction:row}.layout>div>aside{min-width:10em;border-right:1px solid #2b2b2b;padding:1em;overflow:auto}.layout>div>aside>.sidebar{padding-left:0}.layout>div>main{flex-grow:1;padding:1em;overflow:auto}.layout>footer{flex-grow:0;border-top:1px solid #2b2b2b;color:#666;text-align:center;font-size:80%;padding:.25em}.layout>footer a{color:inherit;text-decoration:none}",undefined);

var layout = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"layout"},[_c('div',[_c('aside',[_vm._t("sidebar",[_vm._v("Add sidebar here")])],2),_vm._v(" "),_c('main',[_vm._t("main",[_vm._v("Add main content here")])],2)]),_vm._v(" "),_vm._m(0)])},
staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('footer',[_c('a',{attrs:{"href":"https://opensource.org/licenses/MIT","target":"_blank"}},[_vm._v("MIT License.")]),_vm._v(" Copyright ©2017 RJ Hwang.")])}],
    data: function () {
      return {}
    }
  };

__$styleInject(".tree{list-style-type:none;margin:0;padding-left:1em;line-height:1.8em}.tree>.node>a{color:inherit;text-decoration:none}.tree>.node>a:hover{text-decoration:underline}.tree>.node.active>a{color:#880}",undefined);

__$styleInject("",undefined);

/**
   * TreeNode component
   */
  var treeNode = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{ node: true, active: _vm.active }},[_c('a',{attrs:{"href":"/charpter/"+_vm.id+".html"},on:{"click":function($event){$event.preventDefault();_vm.activate($event);}}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),(_vm.children)?_c('tree',{attrs:{"nodes":_vm.children,"event-hub":_vm.eventHub},on:{"node-activated":function($event){_vm.$emit("node-activated", arguments[0]);}}}):_vm._e()],1)},
staticRenderFns: [],
    props: {
      id: { required: true },
      name: { type: String, required: true },
      children: { type: Array, required: false },
      eventHub: { required: true }
    },
    beforeCreate: function () {
      // https://cn.vuejs.org/v2/guide/components.html#Circular-References-Between-Components
      this.$options.components.Tree = tree;
    },
    data: function data() { return { active: false } },
    methods: {
      activate: function activate() {
        // avoid repeat activate
        if (this.active) { return }

        this.active = true;

        // trigger activated event
        this.eventHub.$emit('node-activated', this);
        this.$emit('node-activated', { id: this.id, name: this.name });
      }
    },
    created: function created() {
      var this$1 = this;

      this.eventHub.$on('node-activated', function (node) {
        // inactivated self if the activated node is not me
        if (node.id !== this$1.id && this$1.active) { this$1.active = false; }
      });
    }
  };

var eventHub = new Vue(); // manage inner treeNode state
  /**
   * Tree component
   */
  var tree = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"tree"},_vm._l((_vm.nodes),function(node){return _c('tree-node',{class:{ node: true, active: node.active },attrs:{"id":node.id,"name":node.label,"active":node.active,"children":node.children,"event-hub":_vm.eventHub},on:{"node-activated":function($event){_vm.$emit("node-activated", arguments[0]);}}})}))},
staticRenderFns: [],
    props: {
      nodes: {
        type: Array,
        required: true
      },
      eventHub: { required: false, default: function default$1() { return eventHub } }
    },
    beforeCreate: function () {
      // https://cn.vuejs.org/v2/guide/components.html#Circular-References-Between-Components
      this.$options.components.TreeNode = treeNode;
    }
  };

var sidebarItems = [
  {
    "id": "about",
    "label": "概述"
  },
  {
    "id": "code-rule",
    "label": "编码规范"
  },
  {
    "id": "rest-rule",
    "label": "REST 规范"
  },
  {
    "id": "unit-test-rule",
    "label": "单元测试"
  },
  {
    "id": "tech-base",
    "label": "技术基础",
    "children": [
      {
        "id": "js",
        "label": "JavaScript",
        "children": [
          {
            "id": "es-feature",
            "label": "ES 特征收集"
          },
          {
            "id": "json",
            "label": "JSON"
          }
        ]
      }
    ]
  },
  {
    "id": "level-a",
    "label": "一级菜单A",
    "children": [
      {
        "id": "level-a-1",
        "label": "二级菜单A1"
      },
      {
        "id": "level-a-1",
        "label": "二级菜单A2"
      }
    ]
  },
  {
    "id": "level-b",
    "label": "一级菜单B",
    "children": [
      {
        "id": "level-b-1",
        "label": "二级菜单B1"
      },
      {
        "id": "level-b-2",
        "label": "二级菜单B2",
        "children": [
          {
            "id": "level-b-2-1",
            "label": "三级菜单B1"
          },
          {
            "id": "level-b-2-2",
            "label": "三级菜单B2"
          }
        ]
      },
      {
        "id": "level-b-3",
        "label": "二级菜单B3"
      } ]
  }
];

var cache = {};

var vm = new Vue({
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
    forwardToChapter: function forwardToChapter(item) {
      console.log('forwardToChapter id=%s', item.id);
      if (history.state && history.state.id === item.id) { return }

      // record state
      history.pushState(item, item.label, ("/chapter/" + (item.id) + ".html"));

      // get chapter content and show it in main region
      this.fetchChapterContent(item.id);
    },
    fetchChapterContent: function fetchChapterContent(id) {
      var this$1 = this;

      if (cache[id]) {
        this.mainContent = cache[id];
      } else {
        return fetch(("/compiled-chapter/" + id + ".html"))
          .then(function (res) { return res.text(); })
          .then(function (text) { return cache[id] = this$1.mainContent = text; })
          .catch(function (error) { return this$1.mainContent = error.message || "文章加载失败"; })
      }
    }
  },
  created: function () {
    //console.log('location.hash=', location.hash)
    if (location.hash) {
      var to = location.hash.substr(1);
      var id = to.substr(to.lastIndexOf('/') + 1);
      id = id.substring(0, id.indexOf('.html'));
      if (id) {
        var chapter = { id: id, label: 'hash' };
        // replace hash path to real path
        history.replaceState(chapter, chapter.label, to);

        // load hash chapter content
        this.fetchChapterContent(id);
      }
    }
  }
});

window.onpopstate = function (event) {
  if (!event.state) { return }
  //console.log('location=%s, state=%s', location.href, JSON.stringify(event.state))
  vm.mainContent = cache[event.state.id] || '';
};

}(Vue));
