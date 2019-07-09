<template>
  <div class="hello">
    <h1>Hello, {{ capitalize(username) }}!</h1>
    <h2>Inser savings amount</h2>
    <input id="addSavingInput" type="text" v-model="saving" />
    <button id="addSaving-btn" type="submit" @click="addSaving">Add saving</button>

    <button id="logout" type="submit" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
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
        // const name = response.data.username;
        // const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
        this.username = response.data.username;
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
    },
    capitalize(name) {
      const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
      return nameCapitalized;
    },
    addSaving(e) {
      e.preventDefault();

      console.log(this.saving);
      if (this.saving.length > 0) {
        this.$http
          .post("http://localhost:3000/add-saving", {
            username: localStorage.getItem("username")
          })
          .then(response => {
            console.log(localStorage.getItem("username"), response.data);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log("Put an amount.");
      }
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
</style>
