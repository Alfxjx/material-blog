<template>
  <div id="app">
    <tabbar></tabbar>
    <articlecard
      v-for="(item, index) in list"
      :key="index"
      :title="item.title"
      :category="item.category"
      :desc="item.desc"
      :img="item.image"
      :author="item.author"
      :viewcount="item.viewcount"
    ></articlecard>
    <p>总计{{ list.length }}篇文章</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import tabbar from './components/tabbar'
  import articlecard from './components/articlecard'
  import { getList } from './api/index'

  export default {
    name: "app",
    data() {
      return {
        list: {}
      }
    },
    created() {
      this._getList()
    },
    methods: {
      _getList() {
        getList().then((res) => {
          this.list = res
        })
        console.log(this.list)
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
