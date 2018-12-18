<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* ----------- Galaxy S6: Portrait and Landscape ----------- */
@media screen and (max-width: 360px)
and (device-height: 640px)
and (-webkit-device-pixel-ratio: 3) {
  html,body,div,header,nav,main,footer,section{margin:0; padding:0;}
  .hello h1 {
    font-size: 22px;
    text-align: center;
  }
}

/* ----------- iPhone 6, 6S, 7 and 8: Portrait and Landscape ----------- */
@media only screen and (min-device-width: 375px)
and (max-device-width: 667px)
and (-webkit-min-device-pixel-ratio: 2) {
  html,body,div,header,nav,main,footer,section{margin:0; padding:0;}
  .hello h1 {
    font-size: 22px;
    text-align: center;
  }
}

/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */

/* Portrait and Landscape */
@media only screen
and (min-device-width: 320px)
and (max-device-width: 568px)
and (-webkit-min-device-pixel-ratio: 2) {
  html,body,div,header,nav,main,footer,section{margin:0; padding:0;}
  .hello h1 {
    font-size: 22px;
    text-align: center;
  }
}
</style>
