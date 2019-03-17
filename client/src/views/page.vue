<template>
  <div class="page">
    <div class="head filter" :style="bkimg">
      <div class="info">
        <h2 class="title">{{ content.title }}</h2>
        <p class="author">{{ content.author }}</p>
        <p class="category">{{ content.category }}</p>
        <p class="time">{{ content.createdAt | format }}</p>
      </div>
    </div>
    <div class="content-view">
      <div class="content-wrapper  md-elevation-5">
        <vue-markdown
          class="content"
          :source="content.content"
          :html="false"
          :toc="true"
        ></vue-markdown>
        <tag :tag="content.tag"></tag>
      </div>
    </div>
    <top class="top"></top>
  </div>
</template>

<script type="text/ecmascript-6">
  // import { getContent } from '../api/helper'
  import {get} from '../api/index'
  import VueMarkdown from 'vue-markdown'
  import tag from '../components/tag'
  import top from '../components/top'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/github.css'
  import {formatTime} from '../common/format'

  // 写在这边，不然在hook就找不到
  // https://segmentfault.com/a/1190000013960009
  const highlightCode = () => {
    const preEl = document.querySelectorAll('pre')

    preEl.forEach((el) => {
      hljs.highlightBlock(el)
    })
  }

  export default {
    name: "page",
    props: ['id'],
    data() {
      return {
        content: {},
        bkimg: {
          background: "url(" + require('../assets/my-about-banner-1.jpg') + ")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          height: "500px",
          zIndex: "51"
        }
      }
    },
    created() {
      // this.content = getContent(this.id)
      // console.log(this.content)
      this.$store.commit('font2White')
      this.$store.commit('tab2Transparent')
      get('/blog/' + this.id)().then((res) => {
        this.content = res
      })
      // console.log(this.content)
    },
    mounted() {
      highlightCode()
      window.addEventListener('scroll', this.handleScroll)
    },
    updated() {
      highlightCode()
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
      this.$store.commit('tab2White')
      this.$store.commit('font2Black')
    },
    methods: {
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // console.log(scrollTop)
        if (scrollTop < 400) {
          this.$store.commit('tab2Transparent')
          this.$store.commit('font2White')
        } else {
          this.$store.commit('tab2White')
          this.$store.commit('font2Black')
        }
      }
    },
    filters: {
      format(time) {
        return formatTime(time)
      }
    },
    components: {
      VueMarkdown, tag, top
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .page
    position relative
    .head
      display flex
      justify-content center
      align-items center
      margin-top -60px
      .info
        margin-top 60px
        color white
        font-family Garamond
        .title
          font-size 60px
        .author
          font-size 24px
        .category
          font-size 24px
        .time
          font-size 24px
    .content-view
      display flex
      justify-content center
      .content-wrapper
        width 100%
        max-width 960px
        margin-top 20px
        padding 10px 20px 10px 20px
        .content
          line-height 28px
          font-family Roboto
          font-size 18px
          text-align left
    .top
      position fixed
      right 5%
      bottom 5%
</style>
