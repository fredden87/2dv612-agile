<template>
  <div>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
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
          Register
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
      const userEmail = JSON.parse(localStorage.getItem('user')).email
      console.log(carRegistration)
      console.log(userEmail)
      const data = {email: userEmail, car: carRegistration}

      fetch('http://localhost:3000/vehicle', {
        method: 'PATCH', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)})
      .then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style>

</style>
