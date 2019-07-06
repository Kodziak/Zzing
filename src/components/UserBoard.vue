<template>
  <div class="hello">
    <h1>Welcome to regular users page</h1>
    <h2>{{ msg }}</h2>
    <h2>Inser savings amount</h2>
    <button id="logout" type="submit" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "The commoners",
      saving: ""
    };
  },
  mounted() {
    let token = localStorage.getItem("jwt");
    this.$http
      .get("http://localhost:3000/profile", {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        this.msg = response.data.username;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    handleLogout(e) {
      e.preventDefault();
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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
</style>
