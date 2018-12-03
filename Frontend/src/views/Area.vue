<template>
 <div class="register-wrapper">
    <div class="row">
      <form class="col s8">
        <div class="row">
          <div class="input-field col s6">
            <input id="aname" type="text" class="validate">
            <label for="aname">Area Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="long" type="number" class="validate">
            <label for="long">Longitude</label>
          </div>
          <div class="input-field col s6">
            <input id="lat" type="number" class="validate">
            <label for="lat">Latitude</label>
          </div>
        </div>
        <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="addArea">
          Add New Parking Area
        </button>
      </form>
    </div>
      <div class="row">
      <div class="input-field col s12">
    <select id="areaOpt">
      <option value="" disabled selected>Select Area</option>
    </select>
    <label>View Parking Areas</label>
          <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="viewArea">
          View
        </button>
    </div>
  </div>
  </div>
</template>

<script>
import router from '../router'
const request = require('request')
let backendUrl = '127.0.0.1:3000'
if (process.env.VUE_APP_ENVIRONMENT==="production"){
    backendUrl='194.47.206.226:3000'
  }

export default {
  mounted(){
  request.post({uri: 'http://'+backendUrl+'/area', form: {email: sessionStorage.getItem('email')}}, function(err,response,body){
  let data=JSON.parse(body)
  data.forEach(function(item){
   let opt = document.createElement('option')
   opt.value=item.name
   opt.textContent=item.name + ' : ' + item.lat + '  ' + item.long
   document.getElementById('areaOpt').appendChild(opt)
  })

  M.FormSelect.init(document.getElementById('areaOpt'))
  })

  },
  name: "Area",
  methods: {
    addArea: function(event) {
      event.preventDefault()
      const areaLong = document.getElementById("long").value
      const areaLat = document.getElementById("lat").value
      const areaName = document.getElementById("aname").value
      const user = JSON.parse(localStorage.getItem('user'))

      if (user !== null) {
        const userEmail = user.email
        const data = {email: userEmail, name: areaName, long: areaLong, lat: areaLat}

        let backendUrl = "127.0.0.1:3000";
        if (process.env.VUE_APP_ENVIRONMENT === "production") {
          backendUrl = "194.47.206.226:3000";
        }

        fetch("http://" + backendUrl + "/area", {
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
              html: "Area was added",
              classes: 'green darken-1'
            })
          } else {
            // Display error message
            window.M.toast({
              html: "Area could not be added",
              classes: 'deep-orange accent-4 black-text',
              displayLength: 6000
            })
          }
        })
      } else {
        window.M.toast({
          html: "Area could not be added, are you logged in?",
          classes: 'deep-orange accent-4 black-text',
          displayLength: 6000
        })
      }
    },
    viewArea: function(event){
      let instance = document.getElementById('areaOpt')
      window.M.toast({
      html: instance.options[instance.selectedIndex].value ,
      classes: 'green darken-1',
      displayLength: 6000
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
