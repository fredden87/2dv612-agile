<template>
    <div id="nav">
      <router-link class="spacing"
        v-for="routes in links"
        v-bind:key="routes.id"
        :to="`${routes.page}`"
      >{{routes.text}}</router-link>
    </div>
</template>

<script>
/* eslint-disable */
//import Vue from 'vue'
export default {
  name: "NavBar",
  data() {
    return {
      links: this.$store.state.navbarLinks
    }
  },
  methods: {
    setLoggedIn: function() {
      console.log(this.$store.state.navbarLinks)
      /* Vue.set(this.links, 3, {
        id: 3,
        text: "Log out",
        page: "/logout"
      })
      Vue.set(this.links, 4, {
        id: 4,
        text: "Settings",
        page: "/usersettings"
      }) */
    }
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
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  white-space: nowrap;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.spacing {
  margin-right: 10px;
}

/* ----------- Galaxy S6: Portrait and Landscape ----------- */
@media screen and (max-width: 360px)
and (device-height: 640px)
and (-webkit-device-pixel-ratio: 3) {

  .spacing {
    margin-right: 5px;
  }
  #nav {
    padding: 35px 0 0 0;
    text-align: center;
    margin-bottom: 20px;
  }
}

/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */

/* Portrait and Landscape */
@media only screen
and (min-device-width: 320px)
and (max-device-width: 568px)
and (-webkit-min-device-pixel-ratio: 2) {
  .spacing {
    margin-right: 5px;
  }

  #nav {
    padding: 35px 0 0 0;
    text-align: center;
    margin-bottom: 20px;
  }

  #nav a {
    font-size: 12px;
  }
}

/* ----------- iPhone 6, 6S, 7 and 8: Portrait and Landscape ----------- */
@media only screen and (min-device-width: 375px)
and (max-device-width: 667px)
and (-webkit-min-device-pixel-ratio: 2) {

  .spacing {
    margin-right: 5px;
  }

  #nav {
    padding: 35px 0 0 0;
    text-align: center;
    margin-bottom: 20px;
  }

  #nav a {
    font-size: 12px;
  }
}
</style>
