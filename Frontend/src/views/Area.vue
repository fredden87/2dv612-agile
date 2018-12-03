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
   opt.lat=item.lat
   opt.long=item.long
   opt.textContent=item.name + ' : ( ' + item.lat + ', ' + item.long + ')'
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
            selectorData()
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
      let selected=instance.options[instance.selectedIndex]
      let renderView= document.createElement('table')
      renderView.class="minimalistBlack"
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
table.minimalistBlack {
  border: 3px solid #000000;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
table.minimalistBlack td, table.minimalistBlack th {
  border: 1px solid #000000;
  padding: 5px 4px;
}
table.minimalistBlack tbody td {
  font-size: 13px;
}
table.minimalistBlack thead {
  background: #CFCFCF;
  background: -moz-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
  background: -webkit-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
  background: linear-gradient(to bottom, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
  border-bottom: 3px solid #000000;
}
table.minimalistBlack thead th {
  font-size: 15px;
  font-weight: bold;
  color: #000000;
  text-align: left;
}
table.minimalistBlack tfoot {
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  border-top: 3px solid #000000;
}
table.minimalistBlack tfoot td {
  font-size: 14px;
}
</style>
