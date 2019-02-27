<template>
 <div>
   <div class="index md-layout md-gutter md-alignment-center">

     <div class="md-layout-item md-large-size-66 md-medium-size-66 md-small-size-100">
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
     <div class="md-layout-item md-large-size-20 md-medium-size-33 md-small-hide side">
       1221221
     </div>
   </div>
   <top></top>
 </div>
</template>

<script type="text/ecmascript-6">
  import articlecard from './articlecard'
  import top from './top'

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
      articlecard, top
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .index
    .side
      display inline-block
</style>
