<template>
  <div class="hello">
    <h1>Hello, {{ capitalize(username) }}!</h1>
    <label>Inser savings amount</label>
    <input id="addSavingInput" type="text" v-model="saving" />
    <label>Insert category</label>
    <input id="addCategoryInput" type="text" v-model="category" />
    <button id="addSavingBtn" type="submit" @click="addSaving">Add saving</button>

    <button id="logout" type="submit" @click="handleLogout">Logout</button>

    <button id="getSavings" type="submit" @click="getSavings">Get savings</button>
    <p>{{ savings }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      category: "",
      saving: "",
      savings: ""
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
            username: localStorage.getItem("username"),
            savings: [
              {
                category: this.category,
                amount: this.saving
              }
            ]
          })
          .then(response => {
            console.log(response.config.data, response.data);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log("Put an amount.");
      }
    },
    getSavings(e) {
      e.preventDefault();

      this.$http
        .get("http://localhost:3000/get-savings", {
          username: localStorage.getItem("username")
        })
        .then(response => {
          this.savings = response.data;
        })
        .catch(error => {
          console.log(error);
        });
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
