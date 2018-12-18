<template>
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <textarea id="messageBox" class="materialize-textarea"></textarea>
          <label for="textarea1">Important message</label>
        </div>
      </div>
      <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="btn_submit"
          v-on:click="submitMessage">
          Submit Message
        </button>
    </form>
  </div>
</template>

<script>

const request = require('request')
let backendUrl = '127.0.0.1:3000'
if (process.env.VUE_APP_ENVIRONMENT==="production"){
  backendUrl='194.47.206.226:3000'
}

export default {
  methods: {
    submitMessage: function (event) {
      event.preventDefault()
      const textArea = document.getElementById('messageBox')

      // PATCH /message
      /* request.post({
        uri: 'http://'+backendUrl+'/message',
        form: { message: textArea.value },
        function(err, response, body) {
          console.log('hej')
        }
      }) */

      fetch('http://'+backendUrl+'/message', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "message": textArea.value})
        })
        .then((result) => {
          console.log(result)
          if (result.status === 200) {

            // On success, show green toast and clear message box
            window.M.toast({
              html: "Message was updated!",
              classes: 'green darken-1'
            })
            textArea.value = ''
          } else {
            window.M.toast({
              html: "An error prevent the message from being updated.",
              classes: 'deep-orange accent-4 black-text',
              displayLength: 6000
            })
          }
        })
        .catch((err) => {
          console.log('Error occured in "AdminMessageInput.vue".')
          window.M.toast({
            html: "An error prevent the message from being updated.",
            classes: 'deep-orange accent-4 black-text',
            displayLength: 6000
          })
        })

      // Else red toast
    }
  }
}
</script>

<style>

</style>
