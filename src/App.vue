<template>
  <div id="app">
    <the-board />
    <history />
  </div>
</template>

<script>
import TheBoard from "./components/TheBoard/TheBoard";
import History from "./components/History/History";
export default {
  name: "App",
  components: {
    TheBoard,
    History,
  },
};
</script>
    History

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  margin-top: 60px;
}
</style>
