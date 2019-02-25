<template>
  <div id="app">
    <tabbar></tabbar>
    <articlecard></articlecard>
    <articlecard></articlecard>
    <articlecard></articlecard>
    <articlecard></articlecard>
    <articlecard></articlecard>
  </div>
</template>

<script type="text/ecmascript-6">
  import tabbar from './components/tabbar'
  import articlecard from './components/articlecard'

  export default {
    name: "app",
    created() {
      this._getApi()
    },
    methods: {
      _getApi() {
        this._getIndex()
      },
      _getIndex() {

      }
    },
    components: {
      tabbar, articlecard
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
