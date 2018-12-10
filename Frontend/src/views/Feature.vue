<template>
  <div class="register-wrapper">
    <h1>Routing page...</h1>
  </div>
</template>

<script>
    import router from '../router'
  export default {
    name: "Feature",
    mounted(){  
        let user = JSON.parse(localStorage.getItem('user'))
    if (user.is_admin === 1){
      router.push({path:'./admin'})
    } else if (user.role === "Car Owner"){
      router.push({path:'./car'})
    } else if (user.role === "Park owner"){
      router.push({path:'./area'})
    } else if (user.role === "Parking Guard"){
      router.push({path:'./guard'})
    } else {
      // new roles will end up on welcome unless defined
      router.push({path:'/.welcome'})
    }
    },
    methods: {
    }
  }
</script>

<style>
  .register-wrapper {
    width: 60%;
    margin: 0 auto;
  }
</style>
