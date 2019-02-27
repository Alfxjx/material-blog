<template>
  <div>
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
  import articlecard from './articlecard'

  export default {
    name: "index.vue",
    created() {
      this.$store.dispatch('getBlogList')
    },
    computed: {
      list() {
        return this.$store.state.blogList
      }
    },
    components: {
      articlecard
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
