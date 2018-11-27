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
      </form>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Logout',
  components: {
  
  },
  methods: {
    logout: function (event) {
      event.preventDefault()
      const request=require('request')
      let backendUrl = '127.0.0.1:3000'
      if (process.env.VUE_APP_ENVIRONMENT==="production"){
        backendUrl='194.47.206.226:3000'
      }
      request.post({ url: 'http://'+backendUrl+'/logout', 
        function(err, response, body) {
          let data = JSON.parse(body)
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
          }
          delete localStorage.token
          router.push('/')
      })
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
