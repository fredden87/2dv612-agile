<template>
  <div class="login-wrapper">
    <h4 class="text">Please login to proceed</h4>
    <div class="section"></div>
    <div>
      <form class="col s8" method="post">
        <div class="input-field col s6">
          <input id="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
        <div class="input-field col s6">
          <input id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
        <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="btn_login"
          v-on:click="login">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import router from '../router'
  import { mapMutations, mapActions } from 'vuex'
  import { backendUrl } from '../backendURL.js'
  console.log(backendUrl)
  export default {
    name: 'Login',
    components: {

    },
    methods: {
      ...mapMutations(['SET_MESSAGE']),
      ...mapActions(['setMessage']),
      login: function (event) {
        event.preventDefault()

        // Old hack, but it works
        const that = this
        const request=require('request')  
        request.post({ url: backendUrl+'/login',
          form:{ password: document.getElementById("password").value,
            email: document.getElementById("email").value }}, function(err, response, body) {
          let data = JSON.parse(body)
            if (err||response.statusCode!==200){
             window.M.toast({
             html: data.message,
             classes: 'deep-orange accent-4 black-text',
             displayLength: 6000
             })
            } else {
              // User logged in, check for new messages.
              fetch(backendUrl+'/message', {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
              .then((result) => {
                return result.json()
              })
              .then((data) => {
                // Send this to MessageNotification component!
                console.log(data.message)
                const emailList = data.viewed_by
                const email = JSON.parse(localStorage.getItem('email'))
                that.setMessage(data)

              })

               window.M.toast({
               html: data.message,
               classes: 'green darken-1'
             })
            }
          let isAdmin = data.user.is_admin
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('jwt', JSON.stringify(data.token))
          sessionStorage.setItem('email', JSON.stringify(data.user.email))
          sessionStorage.setItem('jwt', JSON.stringify(data.token))
          // the checks are done in router.js, but we need to initiate the route by pushing to a page
          if (localStorage.getItem('jwt') != null){
            if(isAdmin === 1){
              router.push({ name: 'admin'})
            } else if (data.user.role==="Parking Guard"){
              router.push({ name: 'guard'})
            } else if (data.user.role==="Park owner"){
              router.push({ name: 'area'})
            } else if (data.user.role==="Car Owner"){
              router.push({ name: 'car'})
            } else {
             router.push({ name: 'welcome'})
            }

                        }
        })
      }
    }
  }
</script>

<style>
  .login-wrapper {
    width: 50%;
    margin: 0 auto;
  }
</style>
