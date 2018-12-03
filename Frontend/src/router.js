import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import Welcome from './views/Welcome.vue'
import Admin from './views/Admin.vue'
import UserSettings from './views/UserSettings.vue'
import Guard from './views/Guard.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/usersettings',
      name: 'usersettings',
      component: UserSettings,
      meta: {
        requiresAuth: true,
        requiresSession: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      meta: {
        requiresAuth: true,
        requiresSession: true
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: {
        requiresAuth: true,
        requiresSession: true
      }
    },
    {
      path: '/guard',
      name: 'guard',
      component: Guard,
      meta: {
        requiresAuth: true,
        requiresSession: true,
        verified: true,
        guard: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        requiresSession: true,
        is_admin: true
      }
    }
  ]
})
// gated approach, next(where) will exit the loops if conditions are matched
router.beforeEach((to, from, next)=> {
  // no cookie -> login
  let cookie = JSON.parse(sessionStorage.getItem('email'))
  const reqSession = to.matched.some(record => record.meta.requiresSession)
    if (reqSession && !cookie) {
      next({ path: '/login' })
    }
  // no jwt in localStorage -> login
  let jwt = localStorage.getItem('jwt')
  const reqAuth = to.matched.some(record=>record.meta.requiresAuth)
    if (reqAuth && !jwt){
      next({ path: '/login' })
    }
  // user is admin -> ok
  let reqAdmin = to.matched.some(record=>record.meta.is_admin)
  let user = JSON.parse(localStorage.getItem('user'))
  if (reqAdmin && user.is_admin ===1){
      next()
    }
  // user is not verified -> landing page only
  let reqVerify = to.matched.some(record=>record.meta.verified)
  if (reqVerify && !user.verified){
    next({path:'/welcome'})
    }
  // parking guard feature page restriction
  let reqGuard = to.matched.some(record=>record.meta.guard)
  if (reqGuard && user.role !== "Parking Guard"){
    next({path:'/welcome'})
    }
  // all other cases ok
  next()
})
export default router
