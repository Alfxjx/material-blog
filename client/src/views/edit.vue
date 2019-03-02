<template>
  <div>
    <mavon-editor style="height: 100%"></mavon-editor>
    <h2>test</h2>
    <textarea v-model="input.content" cols="30" rows="10"></textarea>
    <md-button @click="submit">submit</md-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  // import writeBlog from '../api/helper'
  import axios from 'axios'

  export default {
    name: "edit",
    data() {
      return {
        input: {
          content: ''
        }
      }
    },
    methods: {
      submit() {
        axios.post('/api/blog', {
          content: this.input.content
        }).then((res) => {
          const {statusCode, msg} = res.data
          console.log(msg)
          if (statusCode === 1) {
            return msg
          }
        }).catch((e) => {
          console.log('error')
        })
      }
    },
    components: {
      mavonEditor
      // or 'mavon-editor': mavonEditor
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
