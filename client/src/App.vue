<template>
  <div id="app" :class="myAlertStatus">
    <div class="content">
      <tabbar
        :tabColor="tabColor"
        :fontColor="fontColor"
      ></tabbar>
      <span class="blank">1111</span>
      <router-view></router-view>
    </div>
    <bot class="bot"></bot>

    <md-dialog-alert
      :md-active.sync="act"
      :md-title.sync="myAlertTitle"
      :md-content.sync="myAlertContent"/>
    <md-dialog-confirm
      :md-active.sync="myConfirmStatus"
      :md-title.sync="myConfirmTitle"
      :md-content.sync="myConfirmContent"
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-cancel="myConfirmAgreeEvent"
      @md-confirm="myConfirmDisagreeEvent"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import tabbar from './components/tabbar'
  import bot from './components/bot'

  export default {
    name: "app",
    data() {
      return {
        act: false,
        actSwitch: false
      }
    },
    created() {
    },
    mounted() {
      // window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      // handleScroll() {
      //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //   // console.log(scrollTop)
      //   scrollTop < 400 ? this.tabColor = 'transparent' : this.tabColor = 'white'
      //   scrollTop < 400 ? this.fontColor = 'white' : this.fontColor = 'black'
      // },
      testToast() {
        const that = this
        console.log('** testToast exec')
        that.$store.dispatch('changeToaste', {myAlertStatus: true, myAlertTitle: "fuckboy"})
        // 方法1： 这里的console不为别的, 只是为了调起myAlertStatus这个计算属性的getter
        // 使得computed.myAlertStatus这个方法执行
        // 目前用了方法2： 把myAlertStatus绑在class上， 他就一直在执行， 执行得有点过多了
        // 所以又加了一个actSwitch来搞鬼。 点了确认之后 this.act变为false，this.actSwitch也跟着变
        //  if(!this.actSwitch) {里面才能再次执行
        // console.log(that.myAlertStatus)
        /* setTimeout(function(){
          that.$store.dispatch('changeToaste', {myAlertStatus: false})
          // console.log(that.myAlertStatus)
        }, 500) */
      }
    },
    computed: {
      myAlertStatus() {
        const that = this;
        if (!that.actSwitch) {
          that.act = that.$store.state.myAlertStatus
        }
        that.actSwitch = that.act
        return that.$store.state.myAlertStatus
      },
      // myAlertStatus: {
      //   get: function () {
      //     return this.act
      //   },
      //   set: function () {
      //     if (!this.actSwitch) {
      //       this.act = this.$store.state.myAlertStatus
      //     }
      //     this.actSwitch = this.act
      //     return this.$store.state.myAlertStatus
      //   }
      // },
      myAlertTitle() {
        return this.$store.state.myAlertTitle
      },
      myAlertContent() {
        return this.$store.state.myAlertContent
      },
      myConfirmStatus() {
        return this.$store.state.myConfirmStatus
      },
      myConfirmTitle() {
        return this.$store.state.myConfirmTitle
      },
      myConfirmContent() {
        return this.$store.state.myConfirmContent
      },
      myConfirmAgreeEvent() {
        return this.$store.state.myConfirmAgreeEvent
      },
      myConfirmDisagreeEvent() {
        return this.$store.state.myConfirmDisagreeEvent
      }

    },
    components: {
      tabbar, bot

    }
  }
</script>

<style lang="stylus">
  #app
    display flex
    flex-flow column
    min-height 100vh
    text-align center
    .content
      flex 1
      .blank
        line-height 60px
        height 60px
        color white
    .bot
      flex 0

  .md-dialog
    background-color white
</style>
