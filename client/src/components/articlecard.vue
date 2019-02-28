<template>
  <div class="card-wrapper">
    <md-card md-with-hover>
      <div @click="goPage">
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
        </md-ripple>
      </div>
      <md-card-actions class="actions">
        <ul class="tagList">
          <span>Tag:</span>
          <li class="tag" v-for="(tagItem, tagIndex) in tag" :key="tagIndex">{{ tag[tagIndex] }}</li>
        </ul>
        <md-button>Like</md-button>
        <p class="count">阅读数{{ count }}</p>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "articlecard",
    props: ['img', 'title', 'desc', 'category', 'tag', 'viewcount', '_id'],
    data() {
      return {}
    },
    computed: {
      count() {
        return this.viewcount > 0 ? this.viewcount : 0
      }
    },
    methods: {
      goPage() {
        console.log(this._id)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .card-wrapper
    margin 20px 20px 50px 20px
    .actions
      position relative
      .count
        font-family Roboto
        margin-left 10px
      .tagList
        position absolute
        bottom 3px
        left 10px
</style>
