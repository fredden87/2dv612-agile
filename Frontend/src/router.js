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
import Area from './views/Area.vue'
import Car from './views/Car.vue'
import Feature from './views/Feature.vue'

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
      component: () => import('./views/About.vue')
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
      path: '/area',
      name: 'area',
      component: Area,
      meta: {
        requiresAuth: true,
        requiresSession: true,
        verified: true,
        area: true
      }
    },
    {
      path: '/car',
      name: 'car',
      component: Car,
      meta: {
        requiresAuth: true,
        requiresSession: true,
        verified: true,
        car: true
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
    }, 
    {
      path: '/feature',
      name: 'feature',
      component: Feature, /**this component will route dependent on role*/
      meta: {
        requiresAuth: true,
        requiresSession: true,
        feature: true
      }
    }
  ]
})
// notifications function
function accessNotify(message, ok) {
  let color = 'deep-orange accent-4 black-text'
  if (ok) {
    color = 'green darken-1'
  }
  window.M.toast({
    html: message,
    classes: color,
    displayLength: 6000
    })
}
// gated approach, next(where) will exit the loops if conditions are matched'
// final next() lets user through since all conditions are ok
// this is ACCESS CONTROL only, directing traffic should be done on actual pages.
router.beforeEach((to, from, next)=> {
  // no cookie -> login
  let cookie = JSON.parse(sessionStorage.getItem('email'))
  const reqSession = to.matched.some(record => record.meta.requiresSession)
    if (reqSession && !cookie) {
      next({ path: '/login' })
      accessNotify('Session timed out, please login')
    }
  // no jwt in localStorage -> login
  let jwt = localStorage.getItem('jwt')
  const reqAuth = to.matched.some(record=>record.meta.requiresAuth)
    if (reqAuth && !jwt){
      next({ path: '/login' })
      accessNotify('Authentication required, please login')
    }
  // user is not admin -> welcome (go away)
  let reqAdmin = to.matched.some(record=>record.meta.is_admin)
  let user = JSON.parse(localStorage.getItem('user'))
  if (reqAdmin && user.is_admin !==1){
      next('/welcome')
      accessNotify('Administrator access required')
    }
  // user is not verified -> landing page only
  let reqVerify = to.matched.some(record=>record.meta.verified)
  if (reqVerify && !user.verified){
    next({path:'/welcome'})
    accessNotify('Please verify your registered email')
    }
  // parking guard feature page restriction, do this to restrict feature pages
  let reqGuard = to.matched.some(record=>record.meta.guard)
  if (reqGuard && user.role !== "Parking Guard"){
    next({path:'/welcome'})
    accessNotify('Parking guard account required')
    }
  // park owner feature page restriction
  let reqPark = to.matched.some(record=>record.meta.area)
  if (reqPark && user.role !== "Park owner"){
    next({path:'/welcome'})
    accessNotify('Park owner account required')
    }  
  // car owner feature page restriction
  let reqCar = to.matched.some(record=>record.meta.car)
  if (reqCar && user.role !== "Car Owner"){
    next({path:'/welcome'})
    accessNotify('Car owner account required')
    }  
  // all other cases ok
  next()
})
export default router
