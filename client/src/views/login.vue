<template>
  <div class="container" :style="{height: myLayout.height, background: backgroundSet }">
    <div class="md-layout md-alignment-center-center" name="login">
      <div class="md-layout-item md-size-33 md-medium-size-40 md-small-size-50 md-xsmall-size-70 mx-auto text-center">
        <md-card class="login-card">
          <md-card-header>
            <h2 class="card-title">Login</h2>
            <div>
              <md-button class="md-raised md-primary login-git-button" v-on:click="githubLogin">
                <md-icon>code</md-icon>
                github登录
              </md-button>
            </div>
          </md-card-header>
          <md-card-content>
            <p class="login-p">或者普通登录</p>
            <md-field v-for="(item, index) in itemList" :key="index">
              <md-icon>{{item.icon}}</md-icon>
              <label class="login-label" :class="{'login-info-red': item.showWarn === 1, 'login-info-green': item.showWarn === 2}">{{item.name}}</label>
              <md-input v-model="item.value" :data-id="item.type" :type="item.type" @blur="checkInput" @focus="closeError(index)"></md-input>
            </md-field>
          </md-card-content>
          <md-card-actions>
            <md-button class="md-raised md-primary" v-on:click="localLogin">登录</md-button>
          </md-card-actions>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import loginBackImage from "../assets/city-login.jpg"
  import { get, generalRequest } from "../api/helper.js"
  export default {
    name: "login",
    data() {
      return {
        itemList: [
          { icon: 'mood', name: "username...", value: "", type: "text", showWarn: 0 },
          { icon: 'vpn_key', name: "password...", value: "", type: "password", showWarn: 0 }
        ],
        myLayout: {
          height: "0px"
        },
        backgroundSet: 'url(' + loginBackImage + ') no-repeat fixed center',
        checkInputLock: true,
      }
    },
    created() {
      this.myLayout.height = (document.body.clientHeight - 300) + 'px'
    },
    methods: {
      closeError(index) {
        if (index === 0) {
          this.itemList[index].name = "username..."
          this.itemList[index].showWarn = 0
        } else {
          this.itemList[index].name = "password..."
          this.infoIndex = 0;
          this.itemList[index].showWarn = 0
        }
      },
      githubLogin() {
        window.location.href = "http://www.alfxjx.club/api-blog/auth/github"
      },
      async checkInput(event) {
        const that = this
        if (!that.checkInputLock) {
          return
        }
        switch (event.target.dataset.id) {
          case 'text':
            that.checkInputLock = false
            if (that.itemList[0].value.length >= 6 && that.itemList[0].value.length <= 20) {
              /* 调用 用户名 是否存在接口， 不存在就toast警告他*/
              const exist = await generalRequest('/user/check-username?username=' + that.itemList[0].value, 'get');
              if (!exist) {
                that.itemList[0].name = '用户名不存在'
                that.itemList[0].showWarn = 1
              } else {
                that.itemList[0].name = 'username checked'
                that.itemList[0].showWarn = 2
              }
            } else {
              that.itemList[0].name = '用户名格式不正确(6-20位)'
              that.itemList[0].showWarn = 1
            }
            break
          case 'password':
            that.checkInputLock = false;
            if(!/[_\w]{6,20}/.test(that.itemList[1].value)){
              that.itemList[1].name = '密码格式错误(6-20位,由数字字母以及下划线组成'
              that.itemList[1].showWarn = true
            }
            break
          default:
            break
        }
        // 释放锁
        setTimeout(function () {
          that.checkInputLock = true
        }, 1000)
      },
      async localLogin() {
        /* 
        调用登录api
        失败就提示登录错误， 重新填写
        成功就跳回到刚才的页面
        */
        const res = await generalRequest('/auth/local', 'post', {
          username: this.this.itemList[0].value,
          password: this.this.itemList[1].value,
        })
        const that = this
        if (res) {
          this.$store.dispatch('changeToaste', {myAlertStatus: true, myAlertContent: '登录成功'})
          localStorage.setItem('username', res.data.username)
          localStorage.setItem('avatar', res.data.avatar)
          setTimeout(() => {
            that.$route.push({ path: "/" })
          }, 2000)
        } else {
          this.$store.dispatch('changeToaste', {myAlertStatus: true, myAlertContent: '用户名或密码错误'})
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .container
    display flex
    justify-content center
    align-items center
    .md-layout-item
      min-width 26rem !important
    .card-title
      color white
      font-weight 900
      font-family Roboto Slab, Times New Roman, serif
    .md-card
      display inline-block
      position relative
      width 100%
      margin 30px 0
      overflow unset
      -webkit-box-shadow 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)
      box-shadow 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)
      border-radius 6px
      color rgba(0, 0, 0, .87)
      background #fff
      .md-card-header
        background linear-gradient(60deg, #66bb6a, #388e3c)
        -webkit-box-shadow 0 5px 20px 0 rgba(0, 0, 0, .2), 0 13px 24px -11px rgba(76, 175, 80, .6)
        box-shadow 0 5px 20px 0 rgba(0, 0, 0, .2), 0 13px 24px -11px rgba(76, 175, 80, .6)
        margin -40px 20px 15px
        border-radius 3px
        padding 20px 0
        .login-git-button
          font-weight 300
      .md-card-content
        .login-label
          color rgba(44, 44, 44, .8)
        .login-info-red
          color red
        .login-info-green
          color green
        .login-p
          color rgba(44, 44, 44, .8)
    .md-primary
      background-color rgba(76, 175, 80, .8) !important
      color white
    .login-local-button
      background-color #eeeeee
</style>
