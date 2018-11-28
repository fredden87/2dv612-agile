<template>
    <div id="nav" v-on:click="setLoggedIn">
      <router-link class="spacing"
        v-for="routes in links"
        v-bind:key="routes.id"
        :to="`${routes.page}`"
      >{{routes.text}}</router-link>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: "NavBar",
  data() {
    return {
      links: [
        {
          id: 0,
          text: "Home",
          page: "/"
        },
        {
          id: 1,
          text: "About",
          page: "/about"
        },
        {
          id: 2,
          text: "Register",
          page: "/register"
        },
        {
          id: 3,
          text: "Login",
          page: "/login"
        }
      ]
    }
  },
  methods: {
    setLoggedIn: function() {
      Vue.set(this.links, 3, {
        id: 3,
        text: "Log out",
        page: "/logout"
      })
      Vue.set(this.links, 4, {
        id: 4,
        text: "Settings",
        page: "/settings"
      })
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
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.spacing { 
  margin-right: 10px; 
} 
</style>
