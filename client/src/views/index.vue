<template>
 <div class="index">
   <div class="content">
     <div class="main">
       <articlecard
         class="card"
         v-for="(item, index) in list"
         :key="index"
         :title="item.title"
         :category="item.category"
         :tag="item.tag"
         :desc="item.desc"
         :img="item.image"
         :author="item.author"
         :viewCount="item.blogInfo.viewCount"
         :_id="item._id"
       ></articlecard>
       <p>总计{{ list.length }}篇文章</p>
     </div>
   </div>
   <top></top>
 </div>
</template>

<script type="text/ecmascript-6">
  import articlecard from '../components/articlecard'
  import top from '../components/top'
  // import sidebar from '../components/sidebar'
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
      // this.$store.dispatch('getTagList')
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
      }
      // tag() {
      //   return this.$store.state.tagList
      // }
    },
    components: {
      articlecard, top
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .index
    display flex
    position relative
    width 100%
    .content
      display flex
      justify-content center
      .main
        .card
          alignment center
          max-width 960px
</style>
