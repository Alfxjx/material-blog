<template>
  <div>
    <mavon-editor style="height: 100%"></mavon-editor>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: "edit",
    components: {
      mavonEditor
      // or 'mavon-editor': mavonEditor
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
