<template>
  <div>
    <div class="toolbar-wrapper">
      <md-content class="md-elevation-6 toolbar">
        <span class="title">
          <router-link to="/" class="title-route">
            Hello
          </router-link>
        </span>
        <div class="router">
          <router-link class="link" to="/blog">
            <md-icon class="icon">menu</md-icon>
          </router-link>
          <router-link class="link" to="/archive">
            <md-icon class="icon">apps</md-icon>
          </router-link>
          <router-link class="link" to="/about">
            <md-icon class="icon">account_box</md-icon>
          </router-link>
          <router-link class="link" to="/login">
            <md-icon class="icon">group_add</md-icon>
          </router-link>
          <router-link class="link" to="/edit">
            <md-icon class="icon">create</md-icon>
          </router-link>
        </div>
      </md-content>
    </div>
    <div class="blur"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "tabbar",
    data() {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .toolbar-wrapper
    position fixed
    top 0
    z-index 100
    width 100%
    left 0
    opacity 0.5
    .toolbar
      text-align left
      height 50px
      padding-top 15px
      .title
        display inline-block
        margin 0 10px 0 10px
        line-height 24px
        height 24px
        font-size 24px
        color black
        .title-route
          text-decoration none
          &:active
            color black
          &:visited
            color black
      .router
        display inline-block
        vertical-align top
        .link
          margin-right 5px
          .icon
            color black
  .blur
    position fixed
    top 0
    z-index 50
    width 100%
    height 56px
    margin-top -3px
    background-color #f3f5f7
    opacity 0.7
    filter blur(5px)

</style>
