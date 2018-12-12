<template>
 <div class="register-wrapper">
    <div class="row">
      <form class="col s8">
        <div id='timezonesview' class='timezonesview'>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input placeholder=" " id="aname" type="text" class="validate">
            <label for="aname">Area Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input placeholder=" " id="long" type="number" class="validate">
            <label for="long">Longitude</label>
          </div>
          <div class="input-field col s6">
            <input placeholder=" " id="lat" type="number" class="validate">
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
 
M.updateTextFields()
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
      const areaTimezones = {
        0: document.getElementById('row4edit1').value,
        1: document.getElementById('row4edit2').value,
        2: document.getElementById('row4edit3').value,
        3: document.getElementById('row4edit4').value,
        4: document.getElementById('row4edit5').value,
        5: document.getElementById('row4edit6').value,
        6: document.getElementById('row1edit1').value,
        7: document.getElementById('row1edit2').value,
        8: document.getElementById('row1edit3').value,
        9: document.getElementById('row1edit4').value,     
        10: document.getElementById('row1edit5').value,
        11: document.getElementById('row1edit6').value,
        12: document.getElementById('row2edit1').value,
        13: document.getElementById('row2edit2').value,
        14: document.getElementById('row2edit3').value,
        15: document.getElementById('row2edit4').value,
        16: document.getElementById('row2edit5').value,
        17: document.getElementById('row2edit6').value,
        18: document.getElementById('row3edit1').value,
        19: document.getElementById('row3edit2').value,
        20: document.getElementById('row3edit3').value,
        21: document.getElementById('row3edit4').value,
        22: document.getElementById('row3edit5').value,
        23: document.getElementById('row3edit6').value
}
      
      if (user !== null) {
        const userEmail = user.email
        console.log(areaTimezones)
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
      document.getElementById("long").value = selected.long
      document.getElementById("lat").value = selected.lat
      document.getElementById("aname").value = selected.value
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
          let newCell= document.createElement('td')
          newCell.class="col"
          newCell.textContent=(j+1)
          newRow.appendChild(newCell)
        }
      }
      //render here
      console.log(selected.timezones)
      let timezonesview=document.getElementById('timezonesview')
      while (timezonesview.childNodes.length>0){
        timezonesview.removeChild(timezonesview.lastChild)
      }
      let timetable=document.createElement('table')
      timetable.setAttribute('class','comicGreen')
      timezonesview.appendChild(timetable)
            for (let i=0; i<4; i++){
        let newRow=document.createElement('tr')
        newRow.setAttribute('id', 'row'+(i+1))
timetable.appendChild(newRow)
        for (let j=0; j<6; j++){
let newCell = document.createElement('td')
newCell.setAttribute('id', 'row'+(i+1)+'cell'+(j+1))
let hour = document.createElement('div')
hour.setAttribute('id', 'row'+(i+1)+'hour'+(j+1))
let edit = document.createElement('input')
edit.setAttribute('id', 'row'+(i+1)+'edit'+(j+1))
edit.type='number'

let label = document.createElement('label')
label.for='id', 'row'+(i+1)+'edit'+(j+1)
label.textContent="rate: "
newRow.appendChild(newCell)

newCell.appendChild(hour)
label.appendChild(edit)
newCell.appendChild(label)
        }
      }

      for (let timezone in selected.timezones){
        // console.log(timezone)
        // console.log(selected.timezones[timezone])
        // console.log('_____')
        let value = selected.timezones[timezone]
switch(timezone){

  case '6':
    document.getElementById('row1hour1').textContent='0'+timezone+':00-0'+timezone+':59'
    document.getElementById('row1edit1').value=value
    break
  case '7':
    document.getElementById('row1hour2').textContent='0'+timezone+':00-0'+timezone+':59'
    document.getElementById('row1edit2').value=value
    break
  case '8':
    document.getElementById('row1hour3').textContent='0'+timezone+':00-0'+timezone+':59'
    document.getElementById('row1edit3').value=value
    break
  case '9':
    document.getElementById('row1hour4').textContent='0'+timezone+':00-0'+timezone+':59'
    document.getElementById('row1edit4').value=value
    break
  case '10':
    document.getElementById('row1hour5').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row1edit5').value=value
    break
  case '11':
    document.getElementById('row1hour6').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row1edit6').value=value
    break
  case '12':
    document.getElementById('row2hour1').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row2edit1').value=value
    break
  case '13':
    document.getElementById('row2hour2').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row2edit2').value=value
    break
  case '14':
    document.getElementById('row2hour3').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row2edit3').value=value
    break
  case '15':
    document.getElementById('row2hour4').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row2edit4').value=value
    break
  case '16':
    document.getElementById('row2hour5').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row2edit5').value=value
    break
  case '17':
    document.getElementById('row2hour6').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row2edit6').value=value
    break
  case '18':
    document.getElementById('row3hour1').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row3edit1').value=value
    break
  case '19':
    document.getElementById('row3hour2').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row3edit2').value=value
    break
  case '20':
    document.getElementById('row3hour3').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row3edit3').value=value
    break
  case '21':
    document.getElementById('row3hour4').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row3edit4').value=value
    break
  case '22':
    document.getElementById('row3hour5').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row3edit5').value=value
    break
  case '23':
    document.getElementById('row3hour6').textContent=timezone+':00-'+timezone+':59'
    document.getElementById('row3edit6').value=value
    break
  case '0':
    document.getElementById('row4hour1').textContent='0'+timezone+':00-0'+timezone+':59'
    document.getElementById('row4edit1').value=value
    break
  case '1':
    document.getElementById('row4hour2').textContent='0'+timezone+':00-0'+timezone+':59'
    document.getElementById('row4edit2').value=value
    break
  case '2':
    document.getElementById('row4hour3').textContent='0'+timezone+':00-0'+timezone+':59'
    document.getElementById('row4edit3').value=value
    break
  case '3':
    document.getElementById('row4hour4').textContent='0'+timezone+':00-0'+timezone+':59'
    document.getElementById('row4edit4').value=value
    break
  case '4':
    document.getElementById('row4hour5').textContent='0'+timezone+':00-0'+timezone+':59'
    document.getElementById('row4edit5').value=value
    break
  case '5':
    document.getElementById('row4hour6').textContent='0'+timezone+':00-0'+timezone+':59'
    document.getElementById('row4edit6').value=value
    break

  default:
    break
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
label {
  display: inline-flex;
  padding: 2px;
}
  .login-wrapper {
    width: 50%;
    margin: 0 auto;
  }
  button {
    padding: 5px;
    margin: 5px;
  }
  .timezonesview {
float: right;
  }
table.comicGreen {
  font-family: "Comic Sans MS", cursive, sans-serif;
  border: 2px solid #4F7849;
  background-color: #EEEEEE;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  font-size: 9px;
}
table.comicGreen td, table.comicGreen th {
  border: 1px solid #4F7849;
  padding: 3px 2px;
}
table.comicGreen tbody td {
  font-size: 9px;
  font-weight: bold;
  color: #4F7849;
}
table.comicGreen tr:nth-child(even) {
  background: #CEE0CC;
}
table.comicGreen tfoot {
  font-size: 9px;
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