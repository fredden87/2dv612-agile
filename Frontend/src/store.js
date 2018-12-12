import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminMessage: {
      message: '', // Should be empty string as default
      viewed_by: []
    },
    navbarLinks: [
      {
        id: 0,
        text: "Home",
        page: "/"
      },
      {
        id: 1,
        text: "My Pages",
        page: "/feature"
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
      }
    ]
  },
  mutations: {
    SET_MESSAGE: (state, messageObj) => {
      state.adminMessage.message = messageObj.message
      state.adminMessage.viewed_by = messageObj.viewed_by
    }
  },
  actions: {
    setMessage: (context, messageObj) => {
      context.commit('SET_MESSAGE', messageObj)
    }
  }
})
