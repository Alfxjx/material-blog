<template>
<div class="sidebar">
  <md-content class="md-elevation-5">
    <ul>
      <li v-for="(cat, index) in category" :key="index">{{ cat._id }}+{{ cat.count }}</li>
    </ul>
  </md-content>
  <md-content class="md-elevation-5">
    <ul>
      <li v-for="(t, index) in tag" :key="index">{{ t._id }}+{{ t.count }}</li>
    </ul>
  </md-content>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "sidebar",
    props: ['category', 'tag']
    // 改为接受父组件数据
    // created() {
    //   this.$store.dispatch('getCategoryList')
    // },
    // computed: {
    //   category() {
    //     return this.$store.state.categoryList
    //   }
    // }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  ul
    margin-top 20px
    padding-left 0
    text-align left
    li
      list-style none
      display inline-block
      margin 5px 3px 5px 3px
</style>
