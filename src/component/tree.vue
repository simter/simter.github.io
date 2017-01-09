<template>
  <ul class='tree'>
    <tree-node v-for='node in nodes' :class='{ node: true, active: node.active }' :id='node.id' :name='node.label' :active='node.active'
      :children='node.children' @node-activated='$emit("node-activated", arguments[0])' :event-hub='eventHub'>
    </tree-node>
  </ul>
</template>

<script>
  import Vue from 'vue'
  import treeNode from './tree-node.vue'
  let eventHub = new Vue(); // manage inner treeNode state
  /**
   * Tree component
   */
  export default {
    props: {
      nodes: {
        type: Array,
        required: true
      },
      eventHub: { required: false, default() { return eventHub } }
    },
    beforeCreate: function () {
      // https://cn.vuejs.org/v2/guide/components.html#Circular-References-Between-Components
      this.$options.components.TreeNode = treeNode
    }
  }
</script>

<style>
  .tree {
    list-style-type: none;
    margin: 0;
    padding-left: 1em;
    line-height: 1.8em;
  }
  .tree > .node > a {
    color: inherit;
    text-decoration: none;
  }
  .tree > .node > a:hover {
    text-decoration: underline;
  }
  .tree > .node.active > a {
    color: #880;
  }
</style>