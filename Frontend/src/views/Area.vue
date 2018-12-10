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
          Save
        </button>
      </form>
    </div>
      <div class="row">
      <div class="input-field col s12">
    <select id="areaOpt">
      <option value="" disabled selected>Select Area</option>
    </select>
    <label>Select</label>
          <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="viewArea">
          <i class="material-icons left">
          View
          </i>
        </button>
        <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="removeArea">
          <i class="material-icons left">
          Remove
          </i>
        </button>
    </div>
  </div>
  <div id="parkview">
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
  let selectorData= function(){
  request.post({uri: 'http://'+backendUrl+'/area', form: {email: JSON.parse(sessionStorage.getItem('email'))}}, function(err,response,body){
  let data=JSON.parse(body)
  let area=document.getElementById('areaOpt')
  while (area.childNodes.length>1){
area.removeChild(area.lastChild)
  }
 
  data.forEach(function(item){
   let opt = document.createElement('option')
   opt.value=item.name
   opt.lat=item.area.lat
   opt.long=item.area.long
   opt.timezones=item.area.timezones
   opt.textContent=item.name + ' : ( ' + item.area.lat + ', ' + item.area.long + ')'
   area.appendChild(opt)
  })
 

 M.FormSelect.init(document.getElementById('areaOpt'))
  })
  }
export default {
  mounted(){
selectorData()
  },
  name: "Area",
  methods: {
    removeArea: function(event){
      event.preventDefault()
      let backendUrl = "127.0.0.1:3000";
      if (process.env.VUE_APP_ENVIRONMENT === "production") {
        backendUrl = "194.47.206.226:3000";
      }

      let instance = document.getElementById('areaOpt')
      let selected=instance.options[instance.selectedIndex]
      const areaName = selected.value
      const user = JSON.parse(localStorage.getItem('user'))
      const data = {email: user.email, name: areaName}
      fetch("http://" + backendUrl + "/area/remove", {
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
              html: "Area was removed",
              classes: 'green darken-1'
            })
          } else {
            // Display error message
            window.M.toast({
              html: "Area could not be removed",
              classes: 'deep-orange accent-4 black-text',
              displayLength: 6000
            })
          }
        })
    },
    addArea: function(event) {
      event.preventDefault()
      const areaLong = document.getElementById("long").value
      const areaLat = document.getElementById("lat").value
      const areaName = document.getElementById("aname").value
      const user = JSON.parse(localStorage.getItem('user'))
      // input actual timezones here
      const areaTimezones = {}
for (let i=0; i< 24; i++){
  areaTimezones.i=undefined
}
      
      if (user !== null) {
        const userEmail = user.email
        const data = {email: userEmail, name: areaName, long: areaLong, lat: areaLat, timezones: areaTimezones }
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
            selectorData()
            window.M.toast({
              html: "Area saved",
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
      let selected=instance.options[instance.selectedIndex]
      while (document.getElementById('parkview').childNodes.length>0){
        document.getElementById('parkview').removeChild(document.getElementById('parkview').lastChild)
      }
      let renderView= document.createElement('table')
      renderView.setAttribute('class','comicGreen')
      document.getElementById('parkview').appendChild(renderView)
      for (let i=0; i < selected.lat; i++){
        let newRow= document.createElement('tr')
        newRow.class="row"
        renderView.appendChild(newRow)
        for (let j=0; j < selected.long; j++){
          let newCol= document.createElement('td')
          newCol.class="col"
          newCol.textContent=(j+1)
          newRow.appendChild(newCol)
        }
      }
      //render here
      console.log(selected.timezones)
      window.M.toast({
      html: selected.value ,
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
  button {
    padding: 5px;
    margin: 5px;
  }
table.comicGreen {
  font-family: "Comic Sans MS", cursive, sans-serif;
  border: 2px solid #4F7849;
  background-color: #EEEEEE;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
table.comicGreen td, table.comicGreen th {
  border: 1px solid #4F7849;
  padding: 3px 2px;
}
table.comicGreen tbody td {
  font-size: 5px;
  font-weight: bold;
  color: #4F7849;
}
table.comicGreen tr:nth-child(even) {
  background: #CEE0CC;
}
table.comicGreen tfoot {
  font-size: 5px;
  font-weight: bold;
  color: #FFFFFF;
  background: #4F7849;
  background: -moz-linear-gradient(top, #7b9a76 0%, #60855b 66%, #4F7849 100%);
  background: -webkit-linear-gradient(top, #7b9a76 0%, #60855b 66%, #4F7849 100%);
  background: linear-gradient(to bottom, #7b9a76 0%, #60855b 66%, #4F7849 100%);
  border-top: 1px solid #444444;
}
table.comicGreen tfoot td {
  font-size: 5px;
}
</style>