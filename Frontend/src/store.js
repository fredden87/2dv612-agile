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
        text: "Settings",
        page: "/usersettings"
      },
      {
        id: 4,
        text: "Login",
        page: "/login"
      },
      {
        id: 5,
        text: "Log out",
        page: "/logout"
      },
      {
        id: 6,
        text: "Remove account",
        page: "/usersettings"
      }
    ]
  },
  mutations: {

  },
  actions: {

  }
})
