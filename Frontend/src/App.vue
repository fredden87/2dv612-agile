<template>
  <div id="app">
    <NavBar/>
    <MessageNotification />
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
import NavBar from '@/components/NavBar.vue'
import MessageNotification from '@/components/MessageNotification.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    MessageNotification
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
