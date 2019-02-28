<template>
  <div id="app">
    <div class="content">
      <tabbar></tabbar>
      <span class="blank">1111</span>
      <router-view></router-view>
    </div>
    <bot class="bot"></bot>
  </div>
</template>

<script type="text/ecmascript-6">
  import tabbar from './components/tabbar'
  import bot from './components/bot'
  export default {
    name: "app",
    data() {
      return {}
    },
    created() {},
    methods: {},
    computed: {},
    components: {
      tabbar, bot

    }
  }
</script>

<style lang="stylus">
  #app
    display flex
    flex-flow column
    min-height 100vh
    text-align center
    .content
      flex 1
      .blank
        line-height 60px
        height 60px
        color white
    .bot
      flex 0
</style>
