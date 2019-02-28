<template>
  <div class="container" :style="{height: myLayout.height, background: backgroundSet }"> 
    <div class="md-layout md-alignment-center-center" name="login">
      <div class="md-layout-item md-size-33 md-medium-size-40 md-small-size-50 md-xsmall-size-70 mx-auto text-center">
        <md-card class="login-card">
          <md-card-header>
            <h2 class="card-title">Login</h2>
            <div>
              <md-button class="md-raised md-primary login-git-button" v-on:click="githubLogin">
                <md-icon>code</md-icon>github登录
              </md-button>
            </div>
          </md-card-header>
          <md-card-content>
            <p class="login-p">或者普通登录</p>
            <md-field v-for="(item, index) in itemList" :key="index">
              <md-icon>{{item.icon}}</md-icon>
              <label class="login-label">{{item.name}}</label>
              <md-input v-model="item.value" :type="item.type" v-on:blur="checkInput(item.type)"></md-input>
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
  export default {
    name: "login",
    data() {
      return {
        itemList: [
          {icon: 'mood', name: "username...", value: "", type:"text"},
          {icon: 'vpn_key', name: "password...", value: "", type:"password"}
        ],
        myLayout: {
          height: "0px",
        },
        backgroundSet: 'url(' + loginBackImage +') no-repeat fixed center',
      }
    },
    created() {
      this.myLayout.height = (document.body.clientHeight - 300) + 'px';
    },
    methods: {
      githubLogin() {
        // window.location.href = "http://www.alfxjx.club/api-blog/auth/github"
      },
      checkInput(type) {
        switch(type) {
          case 'text':
            if (this.itemList[0].value.length > 6 && this.itemList[0].value.length < 20) {
              /* 调用 用户名 是否存在接口， 不存在就toast警告他*/

            } else {
              // todo: 用一些库的 toast 组件， 别用alert
              alert("用户不存在")
            }
            break;
          case 'password':
            if(!/[_\w]{6,20}/.test(this.itemList[1].value)){
              alert("密码格式错误")
            }
        }
      },
      localLogin() {
        /* 
        调用登录api
        失败就提示登录错误， 重新填写
        成功就跳回到刚才的页面
        */
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
    font-family Roboto Slab,Times New Roman,serif
  .md-card
    display inline-block
    position relative
    width 100%
    margin 30px 0
    overflow unset
    -webkit-box-shadow 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)
    box-shadow 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)
    border-radius 6px
    color rgba(0,0,0,.87)
    background #fff
    .md-card-header
      background linear-gradient(60deg,#66bb6a,#388e3c)
      -webkit-box-shadow 0 5px 20px 0 rgba(0,0,0,.2), 0 13px 24px -11px rgba(76,175,80,.6)
      box-shadow 0 5px 20px 0 rgba(0,0,0,.2), 0 13px 24px -11px rgba(76,175,80,.6)
      margin -40px 20px 15px
      border-radius 3px
      padding 20px 0
      .login-git-button
        font-weight 300
    .md-card-content
      .login-label
        color rgba(44,44,44,.8)
      .login-p
        color rgba(44,44,44,.8)
  .md-primary
    background-color rgba(76,175,80,.8) !important
    color white
  .login-local-button
    background-color #eeeeee
</style>
