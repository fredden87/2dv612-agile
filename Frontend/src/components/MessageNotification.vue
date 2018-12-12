<template>
  <div>
    {{ adminMessage.message }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'adminMessage'
    ])
  }
}
</script>

<style>

</style>
