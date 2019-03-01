<template>
  <div>
    <p>this is {{ id }}</p>
    <p>{{ content }}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getContent } from '../api/helper'

  export default {
    name: "page",
    props: ['id'],
    data() {
      return {
        content: {}
      }
    },
    created() {
      this.content = getContent(this.id)
      console.log(this.content) //显示undefined
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
