<template>
   <draggable></draggable>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'drag',
  components: {
    draggable
  },
  props: {},
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    go (name) {
      if (name !== this.$route.name) {
        this.$router.push({ name })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
