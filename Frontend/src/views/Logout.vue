<template>
  <div class="logout-wrapper">
    <div>
        <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="btn_logout"
          v-on:click="logout">
          Logout
        </button>
    </div>
  </div>
</template>

<script>
import router from '../router'
import { backendUrl } from '../backendURL.js'
export default {
  name: 'Logout',
  components: {

  },
  methods: {
    logout: function (event) {
      event.preventDefault()
      const request=require('request')
      request.get({ uri: backendUrl+'/login/logout'},
        function(err, response, body) {
          let data = JSON.parse(body)
          console.log(data)

          if (err||response.statusCode!==200){
            window.M.toast({
            html: data.message,
            classes: 'deep-orange accent-4 black-text',
            displayLength: 6000
            })
          } else {
              window.M.toast({
              html: data.message,
              classes: 'green darken-1'
              })

              // Simple hiding of admin notification on log out.
              const notificationElement = document.getElementById('infoMessageContainer')
              if (!notificationElement.classList.contains('hidden')) {
                notificationElement.classList.add('hidden')
              }
              const cardElement = document.getElementById('infoCard')
              if (!cardElement.classList.contains('hidden')) {
                cardElement.classList.add('hidden')
              }
          }
          sessionStorage.removeItem('email')
          sessionStorage.removeItem('jwt')

          localStorage.removeItem('user')
          localStorage.removeItem('jwt')
          //sessionStorage.clear()
          console.log('loggedOUT')
          router.push({ name: 'login' })
	}
      )
   }
  }
}
</script>

<style>
  .logout-wrapper {
    width: 50%;
    margin: 0 auto;
  }
</style>
