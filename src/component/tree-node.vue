<template>
  <li :class='{ node: true, active: active }'>
    <a :href='"/charpter/"+id+".html"' @click.prevent='activate'>{{name}}</a>
    <tree v-if='children' :nodes='children' :event-hub='eventHub' @node-activated='$emit("node-activated", arguments[0])'></tree>
  </li>
</template>

<script>
  import tree from './tree.vue'
  /**
   * TreeNode component
   */
  export default {
    props: {
      id: { required: true },
      name: { type: String, required: true },
      children: { type: Array, required: false },
      eventHub: { required: true }
    },
    beforeCreate: function () {
      // https://cn.vuejs.org/v2/guide/components.html#Circular-References-Between-Components
      this.$options.components.Tree = tree
    },
    data() { return { active: false } },
    methods: {
      activate() {
        // avoid repeat activate
        if (this.active) return

        this.active = true

        // trigger activated event
        this.eventHub.$emit('node-activated', this)
        this.$emit('node-activated', { id: this.id, name: this.name })
      }
    },
    created() {
      this.eventHub.$on('node-activated', node => {
        // inactivated self if the activated node is not me
        if (node.id !== this.id && this.active) this.active = false;
      })
    }
  }
</script>