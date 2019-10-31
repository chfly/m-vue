<template>
  <div id="app">
    <!-- <div id="nav">
      <div @click="go('home')">Home</div>
      <div @click="go('about')">about</div>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    go (name) {
      if (name !== this.$route.name) {
        this.$router.push({ name })
      }
    }
  }
}
</script>
<style lang="stylus">
body
  margin 0
  padding 0
</style>
