<template>
  <p class='layout'>Hello {{name}}!</p>
</template>

<script>
  import Vue from 'vue'

  new Vue({
    el: '#app',
    data: {
      name: 'gftaxi'
    }
    // components: { layout }
  })
</script>

<style>
  .layout {
    color: #fff;
  }
</style>