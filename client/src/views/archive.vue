<template>
  <div class="wrapper">
    <div class="archive-list md-elevation-2">
      <ul>
        <li class="list-item" v-for="(blog, index) in blogList" :key="index">
          <p class="time">{{blog.createdAt|format}}</p>
          <p class="title" @click="goPage(blog._id)">{{blog.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatTime} from '../common/format'

  export default {
    name: "archive",
    created() {
      this.$store.dispatch('getBlogList')
    },
    computed: {
      blogList() {
        return this.$store.state.blogList
      }
    },
    methods: {
      goPage(_id) {
        this.$router.push('/blog/' + _id)
      }
    },
    filters: {
      format(time) {
        return formatTime(time)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .wrapper
    display flex
    justify-content center
    .archive-list
      width 80%
      .list-item
        display flex
        flex-direction row
        justify-content flex-start
        padding 10px 0 0 10px
        height 50px
        .time
          margin-right 30px
        .title
          text-decoration underline
</style>
