<template>
<div class="sidebar">
  <md-content class="md-elevation-10">
    <ul>
      <li v-for="(cat, index) in category" :key="index">{{ cat._id }}+{{ cat.count }}</li>
    </ul>
  </md-content>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "sidebar",
    props: ['category']
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

</style>
