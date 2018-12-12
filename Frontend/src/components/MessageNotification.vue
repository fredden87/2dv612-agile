<template>
  <div>
    {{ adminMessage.message }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted() {
    // Create an interval check if adminMessage is empty

    // If not, display notification

    // If empty, hide notification
  },

  computed: {
    ...mapState([
      'adminMessage'
    ])
  }
}
</script>

<style>

</style>
