<template>
  <div class="register-wrapper">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input id="car_reg" type="text" class="validate">
            <label for="car_reg">Vehicle registration number</label>
          </div>
        </div>
        <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="addVehicle">
          Add Vehicle
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSettings",
  methods: {
    addVehicle: function(event) {
      event.preventDefault()
      const carRegistration = document.getElementById("car_reg").value
      const user = JSON.parse(localStorage.getItem('user'))

      if (user !== null) {
        const userEmail = user.email
        const data = {email: userEmail, car: carRegistration}

        let backendUrl = "127.0.0.1:3000";
        if (process.env.VUE_APP_ENVIRONMENT === "production") {
          backendUrl = "194.47.206.226:3000";
        }

        fetch("http://" + backendUrl + "/login", {
          method: 'PATCH', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)})
        .then((response) => {
          if (response.status === 200) {
            // Display success message
            window.M.toast({
              html: "Vehicle was added",
              classes: 'green darken-1'
            })
          } else {
            // Display error message
            window.M.toast({
              html: "Vehicle could not be added",
              classes: 'deep-orange accent-4 black-text',
              displayLength: 6000
            })
          }
        })
      } else {
        window.M.toast({
          html: "Vehicle could not be added, are you logged in?",
          classes: 'deep-orange accent-4 black-text',
          displayLength: 6000
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
