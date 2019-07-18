<template>
  <div id="userboard">
    <h1>Hello, {{ capitalize(username) }}!</h1>
    <label>Inser savings amount</label>
    <input id="addSavingInput" type="text" v-model="saving" />
    <label>Select category</label>
    <Dropdown @optvalue="getOptValue"> </Dropdown>

    <Button id="addSavingBtn" @click.native="addSaving">Add saving</Button>
    <Button id="logout" @click.native="handleLogout">Logout</Button>
    <ul id="savings"></ul>
  </div>
</template>

<script>
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import UserService from "../services/user.service";

export default {
  components: {
    Button,
    Dropdown
  },
  data() {
    return {
      username: "",
      category: "",
      saving: ""
    };
  },
  mounted() {
    let token = localStorage.getItem("jwt");

    if (token.length > 0) {
      this.$http
        .get("http://localhost:3000/profile", {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          this.username = response.data.username;
          this.getSavings();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    getOptValue(value) {
      this.category = value;
    },
    getID() {
      let id = document.querySelectorAll("#savings li");
      id = id.length;
      return id;
    },
    capitalize(name) {
      const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
      return nameCapitalized;
    },
    inputHandler(value) {
      let regex = /^[0-9]{1,2}([,.][0-9]{1,2})?$/;
      if (regex.test(value)) {
        this.category = value;
      }
    },
    handleLogout(e) {
      e.preventDefault();
      const logout = UserService.logout();
      if (logout) {
        this.$router.push("/");
      }
    },
    addSaving(e) {
      e.preventDefault();

      if (this.saving.length > 0 && this.category.length > 0 && this.inputHandler(this.saving)) {
        const response = UserService.addSaving(this.username, this.getID(), this.category, this.saving);
        if (response) {
          this.category = "";
          this.saving = "";
          this.getSavings();
          console.log(response.config.data, response.data);
        } else {
          console.log(response);
        }
      } else {
        console.log("Didn't fit regex.");
      }
    },
    getSavings() {
      this.$http
        .get("http://localhost:3000/get-savings", {
          headers: {
            Authorization: localStorage.getItem("jwt")
          }
        })
        .then(response => {
          let savings = response.data.savings;
          let li = document.querySelector("#savings li");
          let ul = document.querySelector("#savings");

          while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
          }

          savings.forEach(item => {
            let li = document.createElement("li");
            li.innerText = `Category: ${item.category}, Amount: ${item.amount}`;
            ul.appendChild(li);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#userboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1,
h2 {
  font-weight: normal;
}
</style>
