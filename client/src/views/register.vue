<template>
  <div>
    <div>
      <h2>username</h2>
      <input type="text" v-model="username">
      <h2>pswd</h2>
      <input type="text" v-model="password">
    </div>
    <div>
      <md-button class="md-raised" @click="register">注册</md-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {checkUser, register} from '../api/helper'

  export default {
    name: "register",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async register() {
        const isExist = await checkUser(this.username)
        // TODO undefined
        console.log(isExist)
        if (isExist===1) {
          console.log('已经注册了')
        } else {
          const res = await register(this.username, this.password)
          console.log('click')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
