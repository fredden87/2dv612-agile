<template>
  <div class="home">
    <FrontPage msg="Welcome to Super Parking Slot"/>
  </div>
</template>

<script>
// @ is an alias to /src
import FrontPage from '@/components/FrontPage.vue'

export default {
  name: 'home',
  components: {
    FrontPage
  }
}
</script>
