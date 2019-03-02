<template>
  <div class="page">
    <div class="head" :style="bkimg">
      <div class="info">
        <h2 class="title">{{ content.title }}</h2>
        <p class="author">{{ content.author }}</p>
        <p class="category">{{ content.category }}</p>
        <p class="time">{{ content.createdAt }}</p>
      </div>
    </div>
    <div class="content-view md-layout md-gutter md-alignment-center-top">
      <div class="md-layout-item md-xlarge-size-3 md-large-size-3 md-medium-size-5 md-small-size-7"></div>
      <div class="text md-layout-item md-xlarge-size-80 md-large-size-80 md-medium-size-66 md-small-size-90">
        <div class="content-container md-elevation-5">
          <div class="content-wrapper">
            <vue-markdown
              class="content"
              :source="content.content"
              :html="false"
              :toc="true"
            ></vue-markdown>
            <tag :tag="content.tag"></tag>
          </div>
        </div>
      </div>
      <div class="toc md-layout-item md-xlarge-size-15 md-large-size-15 md-medium-size-20 md-small-hide">
        <div class="md-elevation-2">
          <ul>
            <li>123</li>
          </ul>
        </div>
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
          background: "url(" + require('../assets/post-banner.jpg') + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          width: "100%",
          height: "600px",
          zIndex: "51"
        }
      }
    },
    created() {
      // this.content = getContent(this.id)
      // console.log(this.content)
      get('/blog/' + this.id)().then((res) => {
        this.content = res
      })
      console.log(this.content)
    },
    mounted() {
      highlightCode()
    },
    updated() {
      highlightCode()
      const anchorList = document.getElementsByClassName('.toc-anchor')
      console.log(anchorList.length)
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
      align-items flex-start
      margin-top -60px
      .info
        margin-top 60px
        color red
        .title
          font-family Roboto
        .author
          font-family Roboto
        .category
          font-family Roboto
        .time
          font-family Roboto
    .content-view
      width 100%
      .text
        .content-container
          .content-wrapper
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
