<template>
  <div>
    <div class="action-btn infomessage-button hidden" id="infoMessageContainer">
      <a class="btn-floating btn-large blue" v-on:click="toggleCard">
        <i class="large material-icons pulse">priority_high</i>
      </a>
    </div>
    <div class="infomessage-card hidden" id="infoCard">
      <div class="card blue">
        <div class="card-content white-text">
          <span class="card-title">Important message!</span>
          <p id="messagePara">{{ adminMessage.message }}</p>
        </div>
        <div class="card-action">
          <button
            class="btn"
            type="submit"
            name="action"
            v-on:click="dismissMessage">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { backendUrl } from '../backendURL.js'
export default {
  mounted() {
    // Create an interval check if adminMessage is empty
    setInterval(() => {
      if (this.adminMessage.message !== '') {
        try {
          const user = JSON.parse(localStorage.getItem('user'))
          if (this.adminMessage.viewed_by.includes(user.email)) {
            // Set admin message to empty string
            this.setMessage('')
          } else {
            // Display notifictation and message
            const notificationElement = document.getElementById('infoMessageContainer')
            if (notificationElement.classList.contains('hidden')) {
              notificationElement.classList.remove('hidden')
            }
          }
        } catch (error) {
          // Ignore
        }

      } else {
        // Make sure notification is hidden
      }
    }, 500)
  },

  methods: {
    ...mapMutations(['SET_MESSAGE']),
    ...mapActions(['setMessage']),
    toggleCard: function() {
      const cardElement = document.getElementById('infoCard')
      cardElement.classList.toggle('hidden')
    },

    dismissMessage: function() {


      const user = JSON.parse(localStorage.getItem('user'))

      fetch(backendUrl+'/message', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email })
      })
      .then((result) => {
        this.toggleCard()
        this.setMessage('')

        document.getElementById('infoMessageContainer').classList.toggle('hidden')
      })
    }
  },

  computed: {
    ...mapState([
      'adminMessage'
    ])
  }
}
</script>

<style>
.infomessage-button {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 99;
}
.infomessage-card {
  width: 80%;
  max-width: 500px;
  position: absolute;
  right: 60px;
  top: 50px;
  z-index: 99;
}
.hidden {
  visibility: hidden;
}
@keyframes pulse {
  0% {font-size: 24x;}
  50% {font-size: 36px;}
  100% {font-size: 24px;}
}
.pulse {
  animation: pulse 3s infinite ease-in-out;
}
</style>
