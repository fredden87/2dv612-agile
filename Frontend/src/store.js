import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navbarLinks: [
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
  },
  mutations: {

  },
  actions: {

  }
})
