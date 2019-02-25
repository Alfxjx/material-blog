<template>
  <div class="card-wrapper">
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <md-card-media>
            <img :src="img" alt="">
          </md-card-media>
          <md-card-header-text>
            <div class="md-title">{{ title }}</div>
            <div class="md-subhead">分类：{{ category }}</div>
          </md-card-header-text>
        </md-card-header>
        <md-card-content>{{ desc }}</md-card-content>
        <md-card-actions>
          <md-button>Like</md-button>
          <p class="count">阅读数{{ count }}</p>
        </md-card-actions>
      </md-ripple>
    </md-card>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "articlecard",
    props: ['img', 'title', 'desc', 'category', 'viewcount'],
    data() {
      return {}
    },
    computed: {
      count() {
        return this.viewcount > 0 ? this.viewcount : 0
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .card-wrapper
    margin 20px 20px 50px 20px

  .count
    font-family Roboto
    margin-left 10px
</style>
