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
  mounted() {
    let token = localStorage.getItem("jwt");
    if (token) {
      this.$http
        .get("http://localhost:3000/profile", {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          if (localStorage.getItem("jwt") != null && response.data.username && response.data.email) {
            this.$emit("loggedIn");
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push("dashboard");
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
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
