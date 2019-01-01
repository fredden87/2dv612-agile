<template>
  <div class="register-wrapper">
    <div class="row arearow">
      <div id="timezonesview" class="timezonesview"></div>
      <div id="map"></div>
      <form class="col s8">
        <div class="row areainput">
          <div class="input-field col s6">
            <input id="aname" type="text" class="validate">
            <label for="aname">Area Name</label>
          </div>
        </div>
        <div class="row areainput">
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
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="addArea"
        >Save</button>
      </form>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <select id="areaOpt">
          <option value=" " disabled selected>Select Area</option>
        </select>
        <label>Select</label>
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="viewArea"
        >View</button>
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="removeArea"
        >Remove</button>
      </div>
    </div>
    <div id="parkview"></div>
  </div>
</template>
<script>
import router from "../router";
const request = require("request");
import { backendUrl } from "../backendURL.js";
/** credit to https://stackoverflow.com/a/49841565 */
const loadedGoogleMapsAPI = new Promise((resolve, reject) => {
  window["GoogleMapsInit"] = resolve;
  let GMap = document.createElement("script");
  GMap.setAttribute(
    "src",
    "https://maps.googleapis.com/maps/api/js?key=" +
      process.env.VUE_APP_GOOGLE_MAPS_KEY +
      "&callback=GoogleMapsInit&region=IN"
  );
  document.body.appendChild(GMap);
});

let selectorData = function() {
  M.updateTextFields();
  request.post(
    {
      uri: backendUrl + "/area",
      form: { email: JSON.parse(sessionStorage.getItem("email")) }
    },
    function(err, response, body) {
      let data = JSON.parse(body);
      let area = document.getElementById("areaOpt");
      while (area.childNodes.length > 1) {
        area.removeChild(area.lastChild);
      }

      data.forEach(function(item) {
        let opt = document.createElement("option");
        opt.value = item.name;
        opt.lat = item.area.lat;
        opt.long = item.area.long;
        opt.timezones = item.area.timezones;
        opt.textContent =
          item.name + " : ( " + item.area.lat + ", " + item.area.long + ")";
        area.appendChild(opt);
      });

      M.FormSelect.init(document.getElementById("areaOpt"));
    }
  );
};
export default {
  mounted() {
    loadedGoogleMapsAPI.then(() => {
      const kalmar = { lat: 56.6634447, lng: 16.356779 };
      this.initMap(kalmar);
    }).catch((err)=>console.log(err));

    selectorData();

    let timetable = document.createElement("table");
    let countHours=0;
    timetable.setAttribute("class", "comicGreen");
    timezonesview.appendChild(timetable);
    for (let i = 1; i < 5; i++) {
      let newRow = document.createElement("tr");
      newRow.setAttribute("id", "row" + i);
      timetable.appendChild(newRow);
      for (let j = 1; j < 7; j++) {
        let newCell = document.createElement("td");
        newCell.setAttribute("id", "row" + i + "cell" + j);
        let hour = document.createElement("div");
        if (countHours<10){
        hour.textContent="0" + countHours + ":00-0" + countHours + ":59"
        } else {
        hour.textContent= countHours + ":00-" + countHours + ":59"
        }

        hour.setAttribute("id", "row" + i + "hour" + j);
        let edit = document.createElement("input");
        edit.setAttribute("id", "edit" + countHours);
        edit.type = "number";
        edit.value = 0;
        let label = document.createElement("label");
        (label.for = "id"), "edit" + countHours;
        label.textContent = "rate: ";
        newRow.appendChild(newCell);
        newCell.appendChild(hour);
        label.appendChild(edit);
        newCell.appendChild(label);
        countHours++
      }
    }
    // Swap timezones so that 0-5 are displayed last
    let swapRow = document.getElementById("row1")
    timetable.removeChild(swapRow)
    timetable.appendChild(swapRow)
  },
  name: "Area",
  methods: {
    initMap(obj) {
      // credit to team member Maria Jäderlund for original solution
      let myMap = new google.maps.Map(document.getElementById("map"), {
        center: obj,
        zoom: 14,
        styles: [
          { featureType: "poi", stylers: [{ visibility: "off" }] }, // Turn off points of interest.
          { featureType: "transit.station", stylers: [{ visibility: "off" }] } // Turn off bus stations, etc.
        ]
      });
      function getCoords(e) {
        let latitude = e.latLng.lat().toFixed(6);
        let longitude = e.latLng.lng().toFixed(6);
        document.getElementById("long").value = longitude;
        document.getElementById("lat").value = latitude;
        M.updateTextFields();
        console.log(latitude + " : " + longitude);
      }
      google.maps.event.addListener(myMap, "click", getCoords);
    },
    removeArea: function(event) {
      event.preventDefault();
      let instance = document.getElementById("areaOpt");
      let selected = instance.options[instance.selectedIndex];
      const areaName = selected.value;
      const user = JSON.parse(localStorage.getItem("user"));
      const data = { email: user.email, name: areaName };
      fetch(backendUrl + "/area/remove", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(response => {
        if (response.status === 200) {
          // Display success message
          selectorData();
          window.M.toast({
            html: "Area was removed",
            classes: "green darken-1"
          });
        } else {
          // Display error message
          window.M.toast({
            html: "Area could not be removed",
            classes: "deep-orange accent-4 black-text",
            displayLength: 6000
          });
        }
      });
    },
    addArea: function(event) {
      event.preventDefault();
      const areaLong = document.getElementById("long").value;
      const areaLat = document.getElementById("lat").value;
      const areaName = document.getElementById("aname").value;
      const user = JSON.parse(localStorage.getItem("user"));
      // input actual timezones here

      const areaTimezones = {};
      let countZones=0
      for (let i=1; i<5; i++) {
        for (let j=1; j<7; j++) {
        areaTimezones[countZones]=document.getElementById("row"+i+"edit"+j).value;
        countZones++;
        }
      }

      if (user !== null) {
        const userEmail = user.email;
        console.log(areaTimezones);
        const data = {
          email: userEmail,
          name: areaName,
          long: areaLong,
          lat: areaLat,
          timezones: areaTimezones
        };
        fetch(backendUrl + "/area", {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(response => {
          if (response.status === 200) {
            // Display success message
            selectorData();
            window.M.toast({
              html: "Area saved",
              classes: "green darken-1"
            });
          } else {
            // Display error message
            window.M.toast({
              html: "Area could not be added",
              classes: "deep-orange accent-4 black-text",
              displayLength: 6000
            });
          }
        });
      } else {
        window.M.toast({
          html: "Area could not be added, are you logged in?",
          classes: "deep-orange accent-4 black-text",
          displayLength: 6000
        });
      }
    },
    viewArea: function(event) {
      let instance = document.getElementById("areaOpt");
      let selected = instance.options[instance.selectedIndex];
      document.getElementById("long").value = selected.long;
      document.getElementById("lat").value = selected.lat;
      document.getElementById("aname").value = selected.value;
      M.updateTextFields();
      this.initMap({ lat: selected.lat, lng: selected.long });
      countHours=0;

      for (let timezone in selected.timezones) {
        let value = selected.timezones[timezone];
        document.getElementById("edit"+countHours).value = value;
        countHours++
      }

      window.M.toast({
        html: selected.value,
        classes: "green darken-1",
        displayLength: 6000
      });
    }
  }
};
</script>

<style>
#map {
  width: 40%;
  height: 300px;
  margin: 0 auto;
  padding: 5px;
  float: right;
  border-style: solid;
}
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
  width: 60%;
  margin: 0 auto;
  padding: 5px;
  position: relative;
  float: left;
}
table.comicGreen {
  font-family: "Comic Sans MS", cursive, sans-serif;
  border: 2px solid #4f7849;
  background-color: #eeeeee;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  font-size: 9px;
}
table.comicGreen td,
table.comicGreen th {
  border: 1px solid #4f7849;
  padding: 3px 2px;
}
table.comicGreen tbody td {
  font-size: 9px;
  font-weight: bold;
  color: #4f7849;
}
table.comicGreen tr:nth-child(even) {
  background: #cee0cc;
}
table.comicGreen tfoot {
  font-size: 9px;
  font-weight: bold;
  color: #ffffff;
  background: #4f7849;
  background: -moz-linear-gradient(top, #7b9a76 0%, #60855b 66%, #4f7849 100%);
  background: -webkit-linear-gradient(
    top,
    #7b9a76 0%,
    #60855b 66%,
    #4f7849 100%
  );
  background: linear-gradient(to bottom, #7b9a76 0%, #60855b 66%, #4f7849 100%);
  border-top: 1px solid #444444;
}
table.comicGreen tfoot td {
  font-size: 5px;
}

/* ----------- Galaxy S6: Portrait and Landscape ----------- */
@media screen and (max-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) {
  .arearow label {
    font-size: 12px;
  }

  #timezonesview,
  #map {
    width: 100%;
    margin: 0 auto;
  }
}

/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  .arearow label {
    font-size: 11.5px;
  }

  #timezonesview,
  #map {
    width: 100%;
    margin: 0 auto;
  }
}

/* ----------- iPhone 6, 6S, 7 and 8: Portrait and Landscape ----------- */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
  .arearow label {
    font-size: 12px;
  }

  #timezonesview,
  #map {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
