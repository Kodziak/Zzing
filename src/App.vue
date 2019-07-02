<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    Login: {{ login }}
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      login: null
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/profile", {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJQcnplbWVrIiwibGFzdG5hbWUiOiJ0ZXN0IiwidXNlcm5hbWUiOiJ0ZXN0MSJ9.q2GqayEj7j42kiHdbikNRyoDhQZWiX89uweiVuN4Bn8`
        }
      })
      .then(response => (this.login = response.data.username));
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
