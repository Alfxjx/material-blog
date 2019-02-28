<template>
 <div class="index">
   <div class="index md-layout md-gutter md-alignment-center-top">
     <div class="md-layout-item md-large-size-66 md-medium-size-66 md-small-size-100">
       <articlecard
         v-for="(item, index) in list"
         :key="index"
         :title="item.title"
         :category="item.category"
         :desc="item.desc"
         :img="item.image"
         :author="item.author"
         :viewcount="item.blogInfo.viewcount"
       ></articlecard>
       <p>总计{{ list.length }}篇文章</p>
     </div>
     <div class="md-layout-item md-large-size-20 md-medium-size-33 md-small-hide">
       <sidebar :category="category" :tag="tag"></sidebar>
     </div>
   </div>
   <top></top>
 </div>
</template>

<script type="text/ecmascript-6">
  import articlecard from '../components/articlecard'
  import top from '../components/top'
  import sidebar from '../components/sidebar'
  // import { getCategory } from '../api'
  // import { mapActions } from 'vuex'
  export default {
    name: "index.vue",
    data() {
      return {
        // category: []
      }
    },
    created() {
      this.$store.dispatch('getBlogList')
      this.$store.dispatch('getCategoryList')
      this.$store.dispatch('getTagList')
      // getCategory().then((res) => {
      //   this.category = res
      //   console.log(this.category)
      // })
    },
    computed: {
      list() {
        return this.$store.state.blogList
      },
      category() {
        return this.$store.state.categoryList
      },
      tag() {
        return this.$store.state.tagList
      }
    },
    components: {
      articlecard, top, sidebar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .index
    position relative
    width 100%
</style>
