<template>
  <div class="submit-wrapper">
    <h4 class="text">Admin page</h4>
   <div class="section">
      <div>
      <form class="col s8" method="post">
        <div class="input-field col s6">
          <input id="`cclass" type="text" class="validate">
          <label for="text">New Customer Class</label>
        </div>
        
        <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="btn_submit"
          v-on:click="submit">
          Submit
        </button>
      </form>
    </div> 
   </div>
  </div>
</template>
<script>
  export default {
    name: 'Admin',
    components: {

    },
    methods: {
      submit: function (event) {
        event.preventDefault()
        const request=require('request')
        request.post({ url: 'http://194.47.206.226:3000/admin', 
          form:{ cclass: document.getElementById("cclass").value }}, function(err, response, body) {
          console.log(body)
          let data = JSON.parse(body)
//present err/res notification
        })
      }
  }
  }
</script>
<style>
  .submit-wrapper {
    width: 50%;
    margin: 0 auto;
  }
</style>
