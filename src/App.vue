<template>
  <div id="app">
    <MainPage title="Just A Testing"/>
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';
</style>
