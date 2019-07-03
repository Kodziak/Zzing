<template>
  <div class="hello">
    <h1>This is homepage</h1>
    <h2>{{ msg }}</h2>
    <button id="login" type="submit" @click="handleSubmit">Login</button>
    <button id="register" type="submit" @click="handleSubmit">Register</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Homepage!"
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (e.srcElement.id === "login") {
        this.$router.push("login");
      } else {
        this.$router.push("register");
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
