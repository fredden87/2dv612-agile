import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Welcome from './views/Welcome.vue'
import Admin from './views/Admin.vue'

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
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/guard',
      name: 'guard',
      component: Guard,
      meta: {
        requiresAuth: true,
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
        is_admin: true
      }
    }
  ]
})
router.beforeEach((to, from, next)=> {
  if(to.matched.some(record=>record.meta.requiresAuth)){
    if (localStorage.getItem('jwt')==null){
      next({
        path: '/login',
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record=>record.meta.is_admin)){
        if(user.is_admin===1){
          next()
        } else {
          next({path:'/welcome'})
        }
      } else if (to.matched.some(record=>record.meta.verified)) {
          if (user.verified){
            if (to.matched.some(record=>record.meta.guard)){
              if(user.role==="Parking Guard"){
                next()
              } else {
                next({path:'/welcome'})
              }
            } else {
            next()
            }
          } else{
            next({path:'/welcome'})
          }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})
export default router