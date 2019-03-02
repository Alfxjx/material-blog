<template>
  <div class="page">
    <div class="head">
      <div class="info">
        <h2 class="title">{{ content.title }}</h2>
        <p class="author">{{ content.author }}</p>
        <p class="tag">{{ content.tag }}</p>
        <p class="time">{{ content.createdAt }}</p>
      </div>
    </div>
    <div class="content-view md-layout md-gutter md-alignment-center-top">
      <div class="md-layout-item md-xlarge-size-3 md-large-size-3 md-medium-size-5 md-small-size-5"></div>
      <div class="text md-layout-item md-xlarge-size-80 md-large-size-80 md-medium-size-66 md-small-size-90">
        <div class="content-container md-elevation-12">
          <div class="content-wrapper">
            <vue-markdown class="content" :source="content.content"></vue-markdown>
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
  </div>
</template>

<script type="text/ecmascript-6">
  // import { getContent } from '../api/helper'
  import {get} from '../api/index'
  import VueMarkdown from 'vue-markdown'
  import tag from '../components/tag'

  export default {
    name: "page",
    props: ['id'],
    data() {
      return {
        content: {}
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
    components: {
      VueMarkdown, tag
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .page
    .head
      display flex
      justify-content center
      align-items flex-start
      margin 10px 20px 10px 20px
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
</style>
