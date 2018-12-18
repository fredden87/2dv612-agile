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

/* ----------- iPhone 6, 6S, 7 and 8: Portrait and Landscape ----------- */
@media only screen and (min-device-width: 375px)
and (max-device-width: 667px)
and (-webkit-min-device-pixel-ratio: 2) {
  #app{margin:0; padding:0; width: 100%;}
}

/* ----------- Galaxy S6: Portrait and Landscape ----------- */
@media screen and (device-width: 360px)
and (device-height: 640px)
and (-webkit-device-pixel-ratio: 3) {
  #app{margin:0; padding:0; width: 100%;}
}
</style>
