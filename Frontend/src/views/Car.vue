<template>
  <div class="register-wrapper">
    <div id="whereami">
      <div id="compare_remove_later"></div>
    </div>
    <div class="row">
      <form class="col s12">
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
          v-on:click="removeVehicle">
          Remove Vehicle
        </button>
        <div class="row">
          <div class="input-field col s12">
            <select id="areaOpt">
              <option value="" disabled selected>Select Area</option>
            </select>
            <label>View Available Areas</label>
          </div>
        </div>

        <button id="toggle_park"
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="park">
          Park
        </button>
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
  import router from '../router'
  import { backendUrl } from '../backendURL.js'
  const request = require('request')
// watchPosition() can be used here https://stackoverflow.com/a/3305305
const watcher={}
  let selectorData= function(){
    request.post({uri: backendUrl+'/vehicle', form: {email: JSON.parse(sessionStorage.getItem('email'))}}, function(err,response,body){
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

  let selectorDataArea= function(){
    request.post({uri: backendUrl+'/vehicle/park', form: {}}, function(err,response,body){
      let data=JSON.parse(body)
      let area=document.getElementById('areaOpt')
      while (area.childNodes.length>1){
        area.removeChild(area.lastChild)
      }
      //console.log(body)
      data.forEach(function(item){
        let opt = document.createElement('option')
        opt.value=item.name
        opt.textContent=opt.value
        opt.area=item.area
        area.appendChild(opt)
      })

      M.FormSelect.init(document.getElementById('areaOpt'))
    })
  }
/**
 * compare two coordinate objects
 * code from https://stackoverflow.com/a/27943
 * @param {Object} userC - User coordinates
 * @param {Object} userC.lat - Users Latitude
 * @param {Object} userC.long - Users Longitude
 * @param {Object} areaC - Area coordinates
 * @param {Object} areaC.lat - Area Latitude
 * @param {Object} areaC.long - Area Longitude
 * @return {integer} distance in km, do a true/false elsewhere
 */
   function compareCoords(userC, areaC){
      // full credit to https://stackoverflow.com/a/27943 , http://en.wikipedia.org/wiki/Haversine_formula
  let earthRadius = 6371; // Radius of the earth in km
  // lat and long are angles, to measure length we have to get respective degree
  let degLat = (userC.lat-areaC.lat)*(Math.PI/180);  // deg2rad below
  let degLong = (userC.long-areaC.long)*(Math.PI/180);
  // see https://en.wikipedia.org/wiki/Haversine_formula#The_law_of_haversines
    let a =
    Math.sin(degLat/2) * Math.sin(degLat/2) +
    Math.cos((userC.lat)*(Math.PI/180)) * Math.cos((areaC.lat)*(Math.PI/180)) *
    Math.sin(degLong/2) * Math.sin(degLong/2)

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  // return Distance in km
  return earthRadius * c
    }

import { mapState, mapMutations, mapActions } from 'vuex'


  export default {
    name: "UserSettings",
    mounted(){

      selectorData()
      selectorDataArea()
    },
    methods: {
      ...mapMutations(['SET_GPS_MESSAGE']),
      ...mapActions(['setGPSMessage']),
      park: function(event){
      event.preventDefault()
       const that = this
      let whereami=document.getElementById("whereami")
      if (document.getElementById("toggle_park")){

  if (!navigator.geolocation){
          window.M.toast({
            html: "Your device does not support geolocation service",
            classes: 'deep-orange accent-4 black-text',
            displayLength: 6000
          })
  } else {
      document.getElementById("toggle_park").id="toggle_off"
      watcher.id = navigator.geolocation.watchPosition(function(position){
      console.log(position.coords.latitude+" : "+position.coords.longitude)
     // whereami.textContent=position.coords.latitude+" : "+position.coords.longitude
      whereami.long=position.coords.longitude
      whereami.lat=position.coords.latitude
      // Test comparison block. Use area here instead of London, Remember it is "fågelvägen"-"as the bird flies", google maps will give you driving distance instead, accounting for hills.

      let instance = document.getElementById('areaOpt')
      let selected=instance.options[instance.selectedIndex]

      //whereami.firstChild.textContent=compareCoords(whereami, selected.area)+" km"
      let tracker=compareCoords(whereami, selected.area)
      if (tracker>20){
      that.setGPSMessage('You are '+tracker+'km away from your parked vehicle')
      }
      })
      document.getElementById("toggle_off").textContent="Unpark"
      }
      } else {
      document.getElementById("toggle_off").id="toggle_park"
      document.getElementById("toggle_park").textContent="Park"
      navigator.geolocation.clearWatch(watcher.id)
      }

      },
      removeVehicle: function(event){
        event.preventDefault()
        let instance = document.getElementById('vehicleOpt')
        let selected=instance.options[instance.selectedIndex]
        const vehicleNum = selected.value
        const user = JSON.parse(localStorage.getItem('user'))
        const data = {email: user.email, vehicle: vehicleNum}
        fetch(backendUrl + "/vehicle/remove", {
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
              selectorDataArea()
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
          fetch(backendUrl + "/vehicle", {
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
                selectorDataArea()
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
    width: 80%;
    margin: 0 auto;
  }
 #whereami {
   display: hidden;
 }
</style>
