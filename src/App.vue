<template>
  <v-app id="app">
    <Map />
  </v-app>
</template>
<script>
import Map from '@/views/Map.vue'

export default {
  name: 'App',
  components: {
    Map
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
