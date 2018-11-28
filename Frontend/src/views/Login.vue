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
  
  export default {
    name: 'Login',
    components: {

    },
    methods: {
      login: function (event) {
        event.preventDefault()
        const request=require('request')
        let backendUrl = '127.0.0.1:3000'
        if (process.env.VUE_APP_ENVIRONMENT==="production"){
          backendUrl='194.47.206.226:3000'
        }
        request.post({ url: 'http://'+backendUrl+'/login', 
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
 
                        if (localStorage.getItem('jwt') != null){
                            console.log('loggedIn')
                                if(isAdmin === 1){
                                  console.log('privelege escalation')
                                    router.push({ name: 'admin'})
                                }
                                else {
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
