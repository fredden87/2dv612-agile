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
      let request=new XMLHttpRequest()
      request.setRequestHeader('Content-Type', 'application/json')
      request.open('POST', 'http://127.0.0.1:3000/user/signup', false)
      let formData=new FormData()
      formData.append("password", document.getElementById("password1").value)
      formData.append("email", document.getElementById("email").value)
      formData.append("firstname", document.getElementById("first_name").value)
      formData.append("lastname", document.getElementById("last_name").value)
      formData.append("role", "noinputimplemented")
      request.send(formData)

      // Get form data and make API call.
      console.log('Registering user... '+formData.toString()+" : "+request.response)
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
