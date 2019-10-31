<template>
  <div class="home">
    <m-slide style="width:100vw;height:300px;border:1px red solid;">
      <div>
        中国
        中国
        中国
        中国
        中国
        中国
        中国
        中国
        中国
        中国
        中国
        中国
        中国
        中国
        中国
      </div>
      <div>
        华为
        华为
        华为
        华为
        华为
        华为
        华为
        华为
        华为
        华为
        <!-- <m-slide style="width:100vw;;border:1px red solid;">
          <div>2-1</div>
          <div>
            2-2
            <m-slide style="width:100vw;;border:1px red solid;">
              <div>2-2-1</div>
              <div>2-2-2</div>
              <div>2-2-3</div>
            </m-slide>
          </div>
          <div>2-3</div>
        </m-slide> -->
      </div>
    </m-slide>
  </div>
</template>

<script>
// @ is an alias to /src
import mSlide from '@/components/slide.vue'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    mSlide
  },
  computed: {
    ...mapState(['a'])
  }
}
</script>
