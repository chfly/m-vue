<template>
  <div
    class="m-scroll"
    ref="mScroll"
    :style="styleObj"
    :class="{droped:droped}"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    @scroll = "scroll"
  >
    <div
      class="pulldown"
      ref="pulldown"
      v-show="topMethod&&bottomStatus != 'loading'"
      :style="{marginTop:marginTop-pullDownHeight +'px'}"
    >
      <div>pullDown</div>
    </div>
    <slot></slot>
    <div class="pullup" ref="pullup" v-show="bottomMethod&&topStatus!='loading'">
      <div>pullUp</div>
    </div>
  </div>
</template>
<script>
import { isIos } from '@/utils/plantform'
export default {
  name: 'mScroll',
  components: {},
  provide () {
    return {
      parentSlide: this
    }
  },
  inject: {
    parentSlide: {
      default: null
    }
  },
  props: {
    topMethod: {
      type: Function
    },
    bottomMethod: {
      type: Function
    }
  },
  data () {
    return {
      styleObj: {
        '-webkit-overflow-scrolling': 'touch'
      },

      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      droped: false,
      direction: '',
      moveDiretion: 'v', // 锁定方向
      isTouched: false,

      topStatus: '',
      bottomStatus: '',
      pullDownHeight: 0,
      marginTop: 0

    }
  },
  computed () {},
  watch: {
    topStatus (val) {
      switch (val) {
        case 'pull':this.topText = this.$t('pull'); break
        case 'drop':this.topText = this.$t('drop'); break
        case 'loading':this.topText = this.$t('loading'); break
      }
    }
  },
  created () {},
  mounted () {
    this.init()
  },
  beforeDestroy () {},
  methods: {
    async init () {
      await this.$nextTick()
      this.slideWidth = this.$refs.mSlide.scrollWidth
      this.getPullDownHeight()
    },
    getPullDownHeight () {
      let height = 51
      if (this.$refs.pulldown) {
        height = this.$refs.pulldown.scrollHeight || 51
      }
      this.pullDownHeight = height
    },
    clearWebkitTouch () {
      if (isIos()) {
        this.styleObj['-webkit-overflow-scrolling'] = 'auto'
      }
    },
    addWebkitTouch () {
      if (isIos()) {
        this.styleObj['-webkit-overflow-scrolling'] = 'touch'
      }
    },
    abs (n) {
      return window.Math.abs(n)
    },
    preventDefault (e) {
      if (e.cancelable) {
        e.preventDefault()
      }
    },
    touchstart (e) {
      this.currentTranslateX = this.translateX
      this.startX = e.touches[0].clientX
      this.startY = e.touches[0].clientY
      this.droped = false
      this.isTouched = true
    },
    touchmove (e) {
      this.moveX = e.touches[0].clientX - this.startX
      this.moveY = e.touches[0].clientY - this.startY
      this.direction = this.moveY > 0 ? 'down' : 'up'
      if (this.parentSlide) {
        if (this.abs(this.moveX) > this.abs(this.moveY) && this.isTouched) {
          this.moveDiretion = 'h'// 水平水平滚动
        }
        this.isTouched = false
        if (this.moveDiretion === 'h') {
          this.parentSlide.canMove = true
          return
        }
        this.parentSlide.canMove = false
      }
      if (this.topStatus === 'loading' && typeof this.topMethod === 'function' && this.direction === 'down' && this.checkTopReached()) {
        this.finishPullDown()
      }
      if (this.bottomStatus === 'loading' || this.topStatus === 'loading') {
        e.stopPropagation()
        // this.preventDefault(e)
        return
      }
      this.$emit('touchmove', { y: this.moveY, direction: this.direction })
      if (typeof this.topMethod === 'function' && this.direction === 'down' && this.checkTopReached() && this.topStatus !== 'loading') {
        const y = window.Math.pow(this.moveY, 0.83)
        this.marginTop = y
        this.topStatus = this.marginTop >= this.pullDownHeight ? 'drop' : 'pull'
        this.clearWebkitTouch()
        e.stopPropagation()
        this.preventDefault(e)
      }
      if (typeof this.bottomMethod === 'function' && this.direction === 'up' && this.checkBottomReached() && this.bottomStatus !== 'loading' && this.bottomStatus !== 'noMore') {
        this.bottomStatus = 'drop'
        this.clearWebkitTouch()
        e.stopPropagation()
        // this.preventDefault(e)
      }
    },
    touchend (e) {
      this.addWebkitTouch()
      this.moveDiretion = 'v'
      if (this.topStatus === 'loading' || this.bottomStatus === 'loading') {
        return
      }
      if (this.direction === 'down' && this.checkTopReached()) {
        this.droped = true
        if (this.topStatus === 'drop' && this.marginTop >= this.pullDownHeight) {
          this.marginTop = this.pullDownHeight
          this.topStatus = 'loading'
          this.topMethod()
        } else {
          this.marginTop = 0
          this.topStatus = 'pull'
        }
      }
      if (this.direction === 'up' && this.checkBottomReached() && this.bottomStatus === 'drop') {
        this.bottomMethodFn()
      }

      this.$emit('touchend', { y: this.moveY, direction: this.direction })
      this.direction = ''
      this.moveX = 0
      this.moveY = 0
    },
    scroll (e) {
      const flag = this.$el.scrollHeight - 100 <= this.$el.scrollTop + this.$el.clientHeight
      if (flag && this.bottomStatus !== 'loading' && this.topStatus !== 'loading') {
        this.bottomMethodFn()
        this.clearWebkitTouch()
      }
      this.$emit('scroll', { y: this.el.scrollTop })
    },
    bottomMethodFn () {
      if (typeof this.bottomMethod === 'function') {
        clearTimeout(this.bottomMethodFn.timeid)
        this.bottomMethodFn.timeid = setTimeout(() => {
          this.droped = true
          this.bottomStatus = 'loading'
          this.bottomMethod()
        }, 20)
      }
    },
    checkTopReached () {
      return this.$el.scrollHeight <= this.$el.scrollTop + this.$el.clientHeight
    },
    checkBottomReached () {
      return this.$el.scrollTop === 0
    },
    finishPullDown () {
      clearTimeout(this.finishPullDown.timeid)
      this.finishPullDown.timeid = setTimeout(() => {
        this.marginTop = 0
        this.topStatus = 'pull'
        this.bottomStatus = ''
      }, 500)
    },
    finishPullUp (hasMore) {
      setTimeout(() => {
        if (hasMore) {
          this.bottomStatus = ''
        } else {
          this.bottomStatus = 'noMore'
        }
      }, 100)
    },
    async autoPullDownRefresh () {
      this.scrollTo(0)
      await this.$nextTick()
      this.droped = true
      this.marginTop = this.pullDownHeight
      this.topStatus = 'loading'
      this.topMethod()
    },
    scrollTo (y) {
      this.droped = true
      this.$el.scrollTop = y
    }
  },
  i18n: {
    // `i18n` 选项，为组件设置语言环境信息
    messages: {
      en: {
        pull: 'Dropdown refresh',
        drop: 'Release loading',
        loading: 'Loading'
      },
      cn: {
        pull: '下拉刷新',
        drop: '释放加载',
        loading: '正在加载'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.m-scroll
  &.droped
    .pullDown
      transition all 200ms

  position relative
  height 100%
  width 100%
  overflow hidden
  overflow-y auto
  -webkit-overflow-scrolling touch
  .pullDown
    display flex
  .pullUp
    display flex
</style>
