<template>
 <div class="register-wrapper">
    <div class="row">
      <form class="col s8">
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
  </div>
</template>

<script>
export default {
  name: "Area",
  methods: {
    addArea: function(event) {
      event.preventDefault()
      const areaLong = document.getElementById("long").value
      const areaLat = document.getElementById("lat").value
      const user = JSON.parse(localStorage.getItem('user'))

      if (user !== null) {
        const userEmail = user.email
        const data = {email: userEmail, long: areaLong, lat: areaLat}

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
