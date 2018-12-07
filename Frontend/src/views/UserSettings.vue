<template>
  <div class="register-wrapper">
    <div class="row">
      <form class="col s12">
        <h5>Register new vehicle</h5>
        <div class="row">
          <div class="input-field col s12">
            <input id="car_reg" type="text" class="validate">
            <label for="car_reg">Vehicle registration number</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select id="vehicleOpt">
              <option value="" disabled selected>Select Vehicle</option>
            </select>
            <label>View Registered Vehicles</label>
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
        <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="removeVehicle">
          Remove Vehicle
        </button>
      </form>
    </div>
    <div class="row">
      <div class="col s6">
        <h5>Registered vehicles</h5>
        <ul class="collection" id="vehicleList">

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  const request = require('request')
  let backendUrl = '127.0.0.1:3000'
  if (process.env.VUE_APP_ENVIRONMENT==="production"){
    backendUrl='194.47.206.226:3000'
  }
  let selectorData= function(){
    request.post({uri: 'http://'+backendUrl+'/vehicle', form: {email: JSON.parse(sessionStorage.getItem('email'))}}, function(err,response,body){
      let data=JSON.parse(body)
      let vehicle=document.getElementById('vehicleOpt')
      while (vehicle.childNodes.length>1){
        vehicle.removeChild(vehicle.lastChild)
      }

      data.forEach(function(item){
        let opt = document.createElement('option')
        //opt.value = document.getElementById("car_reg").value
        opt.value=item.user.vehicle.type
        opt.textContent=opt.value
        vehicle.appendChild(opt)
      })

      M.FormSelect.init(document.getElementById('vehicleOpt'))
    })
  }
export default {
  name: "UserSettings",
  mounted() {
    // <li class="collection-item">Alvin</li>
    const user = JSON.parse(localStorage.getItem('user'))
    if (user !== null) {
      // Logged in
      const listElement = document.getElementById('vehicleList')

      let html = ''
      user.vehicle.forEach(element => {
        html += '<li class="collection-item">' + element + "</li>"
      });

      listElement.innerHTML = html

    } else {
      // Not logged in
    }
  },
  mounted(){
    selectorData()
  },
  methods: {
    removeVehicle: function(event){
      event.preventDefault()
      let backendUrl = "127.0.0.1:3000";
      if (process.env.VUE_APP_ENVIRONMENT === "production") {
        backendUrl = "194.47.206.226:3000";
      }

      let instance = document.getElementById('vehicleOpt')
      let selected=instance.options[instance.selectedIndex]
      const vehicleNum = selected.value
      const user = JSON.parse(localStorage.getItem('user'))
      const data = {email: user.email, vehicle: vehicleNum}
      console.log(data)
      fetch("http://" + backendUrl + "/vehicle/remove", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)})
        .then((response) => {
          if (response.status === 200) {
            // Display success message
            //selectorData()
            window.M.toast({
              html: "Vehicle was removed",
              classes: 'green darken-1'
            })
          } else {
            // Display error message
            window.M.toast({
              html: "Vehicle could not be removed",
              classes: 'deep-orange accent-4 black-text',
              displayLength: 6000
            })
          }
        })
    },
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

        fetch("http://" + backendUrl + "/vehicle", {
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

            const listElement = document.getElementById('vehicleList')

            let html = '<li class="collection-item">' + carRegistration.toUpperCase() +'</li>'

            listElement.innerHTML += html

            let vehicleSelect=document.getElementById('vehicleOpt')


            //data.forEach(function(item){
              let opt = document.createElement('option')
              opt.value=carRegistration.toUpperCase()
              opt.textContent=opt.value
              vehicleSelect.appendChild(opt)
            //})

            M.FormSelect.init(document.getElementById('vehicleOpt'))
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
