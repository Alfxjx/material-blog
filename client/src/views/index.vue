<template>
 <div class="index">
   <div class="index md-layout md-gutter md-alignment-center-top">
     <div class="main md-layout-item md-xlarge-size-80 md-large-size-75 md-medium-size-70 md-small-size-100">
       <articlecard
         v-for="(item, index) in list"
         :key="index"
         :title="item.title"
         :category="item.category"
         :tag="item.tag"
         :desc="item.desc"
         :img="item.image"
         :author="item.author"
         :viewcount="item.blogInfo.viewcount"
         :_id="item._id"
       ></articlecard>
       <p>总计{{ list.length }}篇文章</p>
     </div>
     <div class="md-layout-item md-xlarge-size-18 md-large-size-16 md-medium-size-25 md-small-hide">
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
    .main
      margin-left 20px
</style>
