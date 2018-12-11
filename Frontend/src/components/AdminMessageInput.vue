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
export default {
  methods: {
    submitMessage: function (event) {
      event.preventDefault()
      const textArea = document.getElementById('messageBox')

      // PATCH /message
      console.log(textArea.value)

      // On success, show green toast and clear message box
      textArea.value = ''

      // Else red toast
    }
  }
}
</script>

<style>

</style>
