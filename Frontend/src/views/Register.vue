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
  <div class="input-field col s12">
    <select id="cClass">
      <option value="" disabled selected>Choose your service profile</option>
      <option value="1">Car Owner</option>
      <option value="2">Parking lot Owner</option>
      <option value="3">Parking Guard</option>
    </select>
    <label>Customer profile selection</label>
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

  document.addEventListener('DOMContentLoaded', function() {
    const elem = document.getElementById('cClass');
    const init = M.FormSelect.init(elem, options);
  });

export default {
  name: 'Register',
  components: {

  },
  methods: {
    registerUser: function (event) {
      event.preventDefault()
      const request = require('request')
      let backendUrl = '127.0.0.1:3000'
      if (process.env.VUE_APP_ENVIRONMENT==="production"){
        backendUrl='194.47.206.226:3000'
      }
      if (document.getElementById('password1').value!==document.getElementById('password2').value){
        window.M.toast({
        html: 'Incorrect password confirmation, verify spelling',
        classes: 'deep-orange accent-4 black-text',
        displayLength: 6000
       })
        } else {
      let instance = M.FormSelect.getInstance(document.getElementById('cClass'))    
      request.post({ uri: 'http://'+backendUrl+'/user/signup',
        form: {
          password: document.getElementById('password1').value,
          email: document.getElementById('email').value,
          firstname: document.getElementById('first_name').value,
          lastname: document.getElementById('last_name').value,
          role: instance.getSelectedValues[0] } },
          function(err, response, body){
            let data=JSON.parse(body)
            if (err||response.statusCode!==200){
             window.M.toast({
             html: data.error.errmsg,
             classes: 'deep-orange accent-4 black-text',
             displayLength: 6000
             })
            } else {
               window.M.toast({
               html: data.message,
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
