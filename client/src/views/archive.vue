<template>
  <div class="wrapper">
    <div class="archive-list md-elevation-2">
      <ul>
        <li class="list-item" v-for="(blog, index) in blogList" :key="index" @click="goPage">
          <p class="time">{{blog.createdAt}}</p>
          <p class="title">{{blog.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "archive",
    created(){
      this.$store.dispatch('getBlogList')
    },
    computed: {
      blogList() {
        return this.$store.state.blogList
      }
    },
    methods: {
      goPage() {
        this.$router.push('/blog/'+ blog._id)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .wrapper
    display flex
    justify-content center
    .archive-list
      width 900px
      .list-item
        display block
        padding 10px 0 0 10px
        height 50px
        .time
          display inline-block
          margin 0 0 0 0
          width 30%
          font-size 20px
          line-height 30px
        .title
          display inline-block
          margin 10px 0 0
          width 70%
          font-size 26px
          line-height 30px
          vertical-align center
</style>
