<template>
  <div class='layout'>
    <!--<header><img class='logo' src='favicon.ico' title='©2016 广州市广发出租汽车有限公司'></header>-->
    <div>
      <aside>
        <slot name='sidebar'>Add sidebar here</slot>
      </aside>
      <main>
        <slot name='main'>Add main content here</slot>
      </main>
    </div>
    <!--<footer><a href='http://www.gftaxi.cn' target='_blank'>©2016 广州市广发出租汽车有限公司</a></footer>-->
  </div>
</template>

<script>
  export default {
    data: function () {
      return {}
    }
  }
</script>

<style>
  .layout {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .layout > header {
    display: none;
    flex-grow: 0;
    border-bottom: 1px solid #2b2b2b;
  }
  .layout > header .logo{
    margin-top: 4px;
  }

  .layout > div {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }

  .layout > div > aside{
    min-width: 10em;
    border-right: 1px solid #2b2b2b;
    padding: 1em;
    overflow: auto;
  }

  .layout > div > aside > .sidebar{
    padding-left: 0;
  }

  .layout > div > main{
    flex-grow: 1;
    padding: 1em;
    overflow: auto;
  }

  .layout > footer {
    display: none;
    flex-grow: 0;
    border-top: 1px solid #2b2b2b;
    color: #757582;
    text-align: center;
  }
  .layout > footer a {
    color: inherit;
    text-decoration: none;
    font-size: 80%;
  }
</style>