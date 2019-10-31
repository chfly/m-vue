<template>
  <div>
    <div>slideWidth    :{{this.slideWidth}}</div>
    <div>contentWidth   :{{this.contentWidth}}</div>
    <div>moveX     :{{this.moveX}}</div>
    <div>translateX:{{this.translateX}}</div>
    <div class="m-slide" ref="mSlide">
      <div
        class="m-slide-content"
        ref="mSlideContent"
        :style="{width:contentWidth,transform:`translate(${translateX}px)`}"
        :class="{droped:droped}"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { isIos } from '@/utils/plantform'
export default {
  name: 'mSlide',
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
    defaultIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      styleObj: {
        '-webkit-overflow-scrolling': 'auto'
      },

      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      droped: false,
      direction: '',

      currentId: '',
      length: 0,

      contentWidth: 0,
      slideWidth: 0,

      currentTranslateX: 0,
      translateX: 0,

      canMove: true,
      timeId: null,
      moveP: 0.2 // 可以滑动的系数
    }
  },
  computed () {},
  watch: {},
  created () {},
  mounted () {
    this.initWidth()
  },
  beforeDestroy () {},
  methods: {
    async initWidth () {
      await this.$nextTick()
      this.slideWidth = this.$refs.mSlide.scrollWidth
      const doms = this.$refs.mSlideContent.children
      this.length = doms.length
      this.contentWidth = `${this.slideWidth * this.length}px`
      await this.$nextTick()
      this.setCurrentId(this.defaultIndex)
      console.log(this.length, this.contentWidth, this.slideWidth)
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
      clearTimeout(this.timeId)
    },
    touchmove (e) {
      this.moveX = e.touches[0].clientX - this.startX
      this.moveY = e.touches[0].clientY - this.startY
      this.direction = this.moveX > 0 ? 'left' : 'right'
      if (this.parentSlide) {
        if (!this.canMove) {
          e.stopPropagation()
        } else {
          if (this.length > 1) {
            const flag1 = this.direction === 'right' && this.currentId !== this.length - 1
            const flag2 = this.direction === 'left' && this.currentId !== 0
            if (flag1) {
              e.stopPropagation()
            }
            if (flag2) {
              e.stopPropagation()
            }
          }
        }
      }
      const flag1 = this.direction === 'right' && this.currentId === this.length - 1
      const flag2 = this.direction === 'left' && this.currentId === 0

      if (!this.canMove || flag1 || flag2) {
        this.moveX = 0
        this.moveY = 0
      }
      if (this.abs(this.moveX) > this.abs(this.moveY) * 0.2) {
        this.translateX = this.currentTranslateX + this.moveX
      }
    },
    touchend (e) {
      this.droped = true
      this.timeId = setTimeout(() => {
        this.droped = false
      }, 300)
      if (this.abs(this.moveX) >= this.slideWidth * this.moveP) {
        if (this.direction === 'right') {
          this.next()
        } else if (this.direction === 'left') {
          this.pre()
        } else {
          this.getTranslateX()
        }
      }
      this.moveX = 0
      this.moveY = 0
    },
    pre () {
      if (this.currentId > 0) {
        this.currentId -= 1
        this.getTranslateX()
      }
    },
    next () {
      if (this.currentId < this.length - 1) {
        this.currentId += 1
        this.getTranslateX()
      }
    },
    getTranslateX () {
      this.translateX = -(this.currentId * this.slideWidth)
      this.$emit('change', this.currentId)
    },
    setCurrentId (id) {
      clearTimeout(this.timeId)
      this.droped = true
      this.currentId = id
      this.getTranslateX()
    }
  }
}
</script>
<style lang="stylus" scoped>
.m-slide
  overflow hidden
  position relative
  height 100%
  width 100%
  &-content
    position relative
    overflow hidden
    height 100%
    width 100%
    display flex
    justify-content flex-start
    flex-flow nowrap
    &.droped
      transition tranform 200ms
    &>*
      flex 1
      height 100%
      overflow hidden
</style>
