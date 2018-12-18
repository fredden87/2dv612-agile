<template>
  <div>
    <div class="action-btn gps-infomessage-button hidden" id="gps-infoMessageContainer">
      <a class="btn-floating btn-large light-green darken-4" v-on:click="toggleCard">
        <i class="large material-icons pulse">priority_high</i>
      </a>
    </div>
    <div class="gps-infomessage-card hidden" id="gps-infoCard">
      <div class="card  light-green darken-4">
        <div class="card-content white-text">
          <span class="card-title">GPS notification</span>
          <p id="gps-messagePara">{{ GPSmessage }}</p>
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
export default {
  mounted() {
    /*
    To use this component in another component
    you need to import from vuex (like row 29).

    And also map the stores methods to this component:
      ...mapMutations(['SET_GPS_MESSAGE']),
      ...mapActions(['setGPSMessage']),
    in the methods section.

    // Used in another component to set the message
    this.setGPSMessage('This is my new message.')
    */

    let lastMessage = this.GPSmessage

    setInterval(() => {
      // Check if message has been updated
      // The message is empty, then do nothing
      if (this.GPSmessage !== '') {
        // If lastMessage and this.GPSmessage is the same and not empty, display
        if (lastMessage === this.GPSmessage) {
          // Display notification
          const element = document.getElementById('gps-infoMessageContainer')

          if (element.classList.contains('hidden')) {
            element.classList.remove('hidden')
          }
        } else {
          // If lastMessage and this.GPSmessage is not the same, display and set lastMessage to current
          lastMessage = this.GPSmessage
        }
      }
    }, 1000)
  },

  methods: {
    ...mapMutations(['SET_GPS_MESSAGE']),
    ...mapActions(['setGPSMessage']),
    toggleCard: function() {
      const cardElement = document.getElementById('gps-infoCard')
      cardElement.classList.toggle('hidden')
      console.log(cardElement)
    },

    dismissMessage: function() {
      this.setGPSMessage('')
      document.getElementById('gps-infoMessageContainer').classList.toggle('hidden')
      const cardElement = document.getElementById('gps-infoCard')
      cardElement.classList.toggle('hidden')
    }
  },

  computed: {
    ...mapState([
      'GPSmessage'
    ])
  }
}
</script>

<style>
.gps-infomessage-button {
  position: absolute;
  right: 80px;
  top: 20px;
  z-index: 99;
}
.gps-infomessage-card {
  width: 80%;
  max-width: 500px;
  position: absolute;
  right: 120px;
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