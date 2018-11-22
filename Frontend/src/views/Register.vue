<template>
  <div class="register-wrapper">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input placeholder="" id="first_name" type="text" class="validate">
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate">
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" class="validate">
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="password1" type="password" class="validate">
            <label for="password1">Password</label>
          </div>
          <div class="input-field col s6">
            <input id="password2" type="password" class="validate">
            <label for="password2">Confirm Password</label>
          </div>
        </div>

        <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="registerUser">
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'Register',
  components: {

  },
  methods: {
    registerUser: function (event) {
      event.preventDefault()

      // Creates a green 'success message'.
      // window.M.toast({
      //   html: 'Success message',
      //   classes: 'green darken-1'
      // })

      // Creates a red 'error message'.
      // window.M.toast({
      //   html: 'Error message',
      //   classes: 'deep-orange accent-4 black-text',
      //   displayLength: 6000
      // })

      // Redirects to home page.
      // this.$router.push({ name: 'home' })

      const request = require('request')
      if (document.getElementById('password1')!==document.getElementById('password2')){
        window.M.toast({
        html: 'Incorrect password confirmation, verify spelling',
        classes: 'deep-orange accent-4 black-text',
        displayLength: 6000
       })
        } else {
      request.post({ 'http://194.47.206.226:3000/user/signup',
        form: {
          password: document.getElementById('password1').value,
          email: document.getElementById('email').value,
          firstname: document.getElementById('first_name').value,
          lastname: document.getElementById('last_name').value,
          role: 'notimplemented' } },
          function(err, response, body){

            if (err||response.status!==200){
             window.M.toast({
             html: JSON.stringify(response.err),
             classes: 'deep-orange accent-4 black-text',
             displayLength: 6000
             })
            } else {
               window.M.toast({
               html: JSON.stringify(response.message),
               classes: 'green darken-1'
             })
            }
          })
    }
    }
  }
}

</script>

<style>
.register-wrapper {
  width: 60%;
  margin: 0 auto;
}
</style>
