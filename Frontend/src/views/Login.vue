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
  export default {
    name: 'Login',
    components: {

    },
    methods: {
      login: function (event) {
        event.preventDefault()
        const request=require('request')
        request.post({ url: 'http://127.0.0.1:3000/login', 
          form:{ password: document.getElementById("password").value, 
            email: document.getElementById("email").value }}, function(response) {
          console.log(JSON.sringify(response))
         let isAdmin = response.data.user.is_admin
                        localStorage.setItem('user',JSON.stringify(response.data.email))
                        localStorage.setItem('jwt',response.data.token)

                        if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else {
                                if(isAdmin === 1){
                                    this.$router.push('admin')
                                }
                                else {
                                    this.$router.push('welcome')
                                }
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
