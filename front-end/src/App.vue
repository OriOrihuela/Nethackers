<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

#app {
  font-family: "Lato", "Montserrat", Helvetica, Arial, sans-serif;
  color: black;
}
</style>
