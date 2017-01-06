<template>
  <ul class='sidebar'>
    <li v-for='item in items' :class='{ active: item.active }'>
      <a :href='item.id || item.label' @click.prevent.stop='clickMe(item)'>{{item.label}}</a>
      <sidebar v-if='item.children' :items='item.children' @click='clickSubItem'></sidebar>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'sidebar',
    props: ['items'],
    data: function () {
      return {
        isActive: false
      }
    },
    methods: {
      clickMe: function (item) {
        // console.log("clickMe0=", item.active)
        //this.$set(item, 'active', true)
        //this.items.forEach(i => { if (i !== item) this.toInactive(i) })
        // console.log("clickMe1=", item.active)
        this.$emit('click', item)
      },
      clickSubItem: function (item) {
        // console.log("clickSubItem")
        this.$emit('click', item)
      },
      toInactive: function (item) {
        this.$set(item, 'active', false)
        if (item.children) item.children.forEach(i => this.toInactive(i))
      }
    }
  }
</script>

<style>
  ul.sidebar {
    list-style-type: none;
    margin: 0;
    padding-left: 1em;
    line-height: 1.8em;
  }
  ul.sidebar > li > a {
    color: inherit;
    text-decoration: none;
  }
  ul.sidebar > li > a:focus {
    color: #880;
  }
</style>