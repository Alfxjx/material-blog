<template>
  <div id="app">
    <tabbar></tabbar>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import tabbar from './components/tabbar'
  export default {
    name: "app",
    data() {
      return {}
    },
    created() {},
    methods: {},
    computed: {},
    components: {
      tabbar
    }
  }
</script>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50

</style>
