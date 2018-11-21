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

export default {
  name: 'Register',
  components: {

  },
  methods: {
    registerUser: function (event) {
      event.preventDefault()
      const request = require('request')
      request.post('http://194.47.206.229:3000/user/signup', { form: { password: document.getElementById('password1').value, email: document.getElementById('email').value, firstname: document.getElementById('first_name').value, lastname: document.getElementById('last_name').value, role: 'notimplemented' } })
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
