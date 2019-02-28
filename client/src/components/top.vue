<template>
  <div class="top-wrapper" v-show="showTop" @click="toTop">
    <md-button class="md-icon-button md-raised">
      <md-icon>keyboard_arrow_up</md-icon>
    </md-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "top",
    data() {
      return {
        scrollTop: 0,
        time: 0,
        dParams: 20,
        scrollState: 0
      }
    },
    computed: {
      showTop: function () {
        if (this.scrollTop > 200) {
          return true
        } else {
          return false
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.getScrollTop)
    },
    methods: {
      toTop(e) {
        if (this.scrollState) {
          return
        }
        this.scrollState = 1
        e.preventDefault()
        // let distance = document.documentElement.scrollTop || document.body.scrollTop
        let _this = this
        this.time = setInterval(function () {
          _this.gotoTop(_this.scrollTop - _this.dParams)
        }, 10)
      },
      gotoTop(distance) {
        this.dParams += 20
        distance = distance > 0 ? distance : 0
        document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance
        if (this.scrollTop < 10) {
          clearInterval(this.time)
          this.dParams = 20
          this.scrollState = 0
        }
      },
      getScrollTop() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .top-wrapper
    position absolute
    bottom 0px
    right 35px
</style>
