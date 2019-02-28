<template>
  <div>
    <p>this is {{ id }}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import { get } from '../api/helper'

  export default {
    name: "page",
    props: ['id'],
    data() {
      return {
        content: {}
      }
    },
    created() {
      get('/blog/' + this.id).then((res) => {
        this.content = res
        console.log(this.content)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
