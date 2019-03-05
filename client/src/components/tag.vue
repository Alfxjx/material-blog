<template>
  <div class="tag">
    <ul class="tag-list">
      <li class="tag=item" v-for="(tagItem, index) in tag" :key="index">#{{ tagItem }}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "tag",
    props: ['tag']
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .tag
    .tag-list
      list-style none
      .tag-item
        line-height 16px
        font-size 16px
        font-weight 700
        font-family Roboto Helvetica
        margin-right 5px

</style>
