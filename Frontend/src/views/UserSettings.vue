<template>
  <div class="register-wrapper">
    <h5>Change password</h5>

    <div class="input-field col s6">
      <input id="password1" type="password" class="validate">
      <label for="password1">Current password</label>
    </div>

    <div class="input-field col s6">
      <input id="password2" type="password" class="validate">
      <label for="password2">New password</label>
    </div>

    <div class="input-field col s6">
      <input id="password3" type="password" class="validate">
      <label for="password3">Confirm new password</label>
    </div>

    <button
      class="btn waves-effect waves-light"
      type="submit"
      name="action"
      v-on:click="changePassword"
    >Save changes</button>

    <div class="row">
      <div class="col s12">
        <h5>Remove account</h5>
        <button
          class="btn waves-effect waves-light red"
          type="submit"
          name="action"
          v-on:click="removeAccount"
        >Remove Account</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "UserSettings",
  mounted() {},
  methods: {
    removeAccount: function(event) {
      event.preventDefault();
      let backendUrl = "127.0.0.1:3000";
      if (process.env.VUE_APP_ENVIRONMENT === "production") {
        backendUrl = "194.47.206.226:3000";
      }

      const user = JSON.parse(localStorage.getItem("user"));
      const data = { _id: user._id, email: user.email };

      fetch("http://" + backendUrl + "/user/delete/" + user._id, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(response => {
        if (response.status === 200) {
          // Display success message
          window.M.toast({
            html: "Account was removed",
            classes: "green darken-1"
          });
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("jwt");
          localStorage.removeItem("user");
          localStorage.removeItem("jwt");
          router.push({ name: "register" });
        } else {
          // Display error message
          window.M.toast({
            html: "Account could not be removed",
            classes: "deep-orange accent-4 black-text",
            displayLength: 6000
          });
        }
      });
    },
    changePassword: function(event) {
      event.preventDefault();
      let backendUrl = "127.0.0.1:3000";
      if (process.env.VUE_APP_ENVIRONMENT === "production") {
        backendUrl = "194.47.206.226:3000";
      }
      if (
        document.getElementById("password2").value !==
        document.getElementById("password3").value
      ) {
        window.M.toast({
          html: "Incorrect password confirmation, verify spelling",
          classes: "deep-orange accent-4 black-text",
          displayLength: 6000
        });
      } else {
        let oldPassword = document.getElementById("password1").value;
        let newPassword = document.getElementById("password2").value;
        const user = JSON.parse(localStorage.getItem("user"));
        const data = {
          _id: user._id,
          email: user.email,
          oldPassword,
          newPassword
        };
        fetch("http://" + backendUrl + "/user/changepw", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(response => {
          if (response.status === 200) {
            console.log(response);
            // Display success message
          }
        });

        /*window.M.toast({
          html: "Password changed",
          classes: "green darken-1",
          displayLength: 6000
        });*/
      }
    }
  }
};
</script>

<style>
.register-wrapper {
  width: 60%;
  margin: 0 auto;
}
</style>
