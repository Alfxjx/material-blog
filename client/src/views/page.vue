<template>
  <div>
    <p>this is {{ id }}</p>
    <p>{{ content }}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  // import { getContent } from '../api/helper'
  import { get } from '../api/index'

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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
