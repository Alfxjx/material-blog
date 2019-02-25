<template>
  <div class="card-wrapper">
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <md-card-media>
            <img src="../assets/logo.png" alt="Avatar">
          </md-card-media>
          <md-card-header-text>
            <div class="md-title">Green custom theme</div>
            <div class="md-subhead">Subtitle here</div>
          </md-card-header-text>
        </md-card-header>
        <md-card-content>这是简介</md-card-content>
        <md-card-actions>
          <md-button>Like</md-button>
          <p class="viewcount">阅读数{{viewcount}}</p>
        </md-card-actions>
      </md-ripple>
    </md-card>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "articlecard",
    data() {
      return {
        viewcount: 10
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .card-wrapper
    margin 20px 20px 50px 20px

  .viewcount
    font-family Roboto
    margin-left 10px
</style>
