<template>
  <div class="register-wrapper">
    <div id="whereami">
    </div>
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
        <!-- <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="viewVehicle">
          View Vehicle(s)
        </button> -->
        <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="removeVehicle">
          Remove Vehicle
        </button>
        <button id="toggle_park"
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="park">
          Park
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import router from '../router'
  const request = require('request')
  let backendUrl = '127.0.0.1:3000'
  if (process.env.VUE_APP_ENVIRONMENT==="production"){
    backendUrl='cscloud482.lnu.se'
  }
// watchPosition() can be used here https://stackoverflow.com/a/3305305
let watcher
let refreshCoords= function(){
  let whereami=document.getElementById("whereami")
  if (!navigator.geolocation){
          window.M.toast({
            html: "Your device does not support geolocation service",
            classes: 'deep-orange accent-4 black-text',
            displayLength: 6000
          })
  } else {
watcher = navigator.geolocation.watchPosition(function(position)){
      console.log(position.coords.latitude+" : "+position.coords.longitude)    
whereami.textContent=position.coords.latitude+" : "+position.coords.longitude
whereami.long=position.coords.longitude
whereami.lat=position.coords.latitude
}

  }
}

  let selectorData= function(){
    request.post({uri: 'https://'+backendUrl+'/vehicle', form: {email: JSON.parse(sessionStorage.getItem('email'))}}, function(err,response,body){
      let data=JSON.parse(body)
      let vehicle=document.getElementById('vehicleOpt')
      while (vehicle.childNodes.length>1){
        vehicle.removeChild(vehicle.lastChild)
      }

      data['0'].vehicle.forEach(function(item){
        let opt = document.createElement('option')
        opt.value=item
        opt.textContent=opt.value
        vehicle.appendChild(opt)
      })

      M.FormSelect.init(document.getElementById('vehicleOpt'))
    })
  }
  export default {
    name: "UserSettings",
    mounted(){

      selectorData()
    },
    methods: {
      park: function(event){
      event.preventDefault()
      refreshCoords()
      document.getElementById("toggle_park").textContent="Unpark"
      document.getElementById("toggle_park").v-on:click="unpark"

      }),
      unpark: function(event){
      event.preventDefault()
      refreshCoords()
      document.getElementById("toggle_park").textContent="Park"
      document.getElementById("toggle_park").v-on:click="park"
      navigator.geolocation.clearWatch(watcher);
      }),
      removeVehicle: function(event){
        event.preventDefault()
        let backendUrl = "127.0.0.1:3000";
        if (process.env.VUE_APP_ENVIRONMENT === "production") {
          backendUrl = "cscloud482.lnu.se";
        }
        let instance = document.getElementById('vehicleOpt')
        let selected=instance.options[instance.selectedIndex]
        const vehicleNum = selected.value
        const user = JSON.parse(localStorage.getItem('user'))
        const data = {email: user.email, vehicle: vehicleNum}
        fetch("https://" + backendUrl + "/vehicle/remove", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)})
          .then((response) => {
            if (response.status === 200) {
              // Display success message
              selectorData()
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
          const data = {email: userEmail, vehicle: carRegistration}

          let backendUrl = "127.0.0.1:3000";
          if (process.env.VUE_APP_ENVIRONMENT === "production") {
            backendUrl = "cscloud482.lnu.se";
          }

          fetch("https://" + backendUrl + "/vehicle", {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)})
            .then((response) => {
              if (response.status === 200) {
                // Display success message
                selectorData()
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
      },
      viewVehicle: function(event){
        event.preventDefault()
//disabled.
 
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
