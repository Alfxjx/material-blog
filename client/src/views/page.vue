<template>
  <div>
    <div class="head">
      <div>
        <h2>title:{{ content.title }}</h2>
        <p>author:{{ content.author }}</p>
        <p>tag:{{ content.tag }}</p>
        <p>createdAt:{{ content.createdAt }}</p>
      </div>
    </div>
    <div class="content-container md-elevation-12">
      <div class="content-wrapper">
        <vue-markdown>~~hello~~**world**</vue-markdown>
        <vue-markdown class="content" :source="content.content"></vue-markdown>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import { getContent } from '../api/helper'
  import { get } from '../api/index'
  import VueMarkdown from 'vue-markdown'

  export default {
    name: "page",
    props: ['id'],
    data() {
      return {
        content: {}
      }
    },
    components: {
      VueMarkdown
    },
    created() {
      // this.content = getContent(this.id)
      // console.log(this.content)
      get('/blog/' + this.id)().then((res) => {
        this.content = res
      })
      console.log(this.content)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .temp
    display flex
    justify-content center
    align-items flex-start
    margin 10px 20px 10px 20px
  .head
    display flex
    justify-content center
    align-items flex-start
    margin 10px 20px 10px 20px
  .content-container
    .content-wrapper
      .content
        font-family Roboto, Times New Roman, serif
        font-size 24px
        line-height 26px
</style>
