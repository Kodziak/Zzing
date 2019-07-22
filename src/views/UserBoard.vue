<template>
  <div id="userboard">
    <h1>Hello, {{ capitalize(username) }}!</h1>
    <label>Inser savings amount</label>
    <input id="addSavingInput" type="text" v-model="saving" />
    <label>Select category</label>
    <Dropdown @optvalue="getOptValue"> </Dropdown>

    <Button id="addSavingBtn" @click.native="addSaving">Add saving</Button>
    <Button id="logout" @click.native="handleLogout">Logout</Button>

    <table id="savings">
      <tr>
        <th>Category</th>
        <th>Amount</th>
      </tr>
    </table>
  </div>
</template>

<script>
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import UserService from "../services/user.service";
import Utils from "../utils/global";
import { TokenService } from "../services/storage.service";

export default {
  components: {
    Button,
    Dropdown
  },
  data() {
    return {
      username: "",
      saving: "",
      category: ""
    };
  },
  mounted() {
    let token = TokenService.getToken();

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
      return Utils.listID();
    },

    capitalize(name) {
      return Utils.capitalizeFirstLetter(name);
    },

    inputHandler(value) {
      if (Utils.onlyNumbersTest(value)) {
        this.saving = value;
        return true;
      } else {
        return false;
      }
    },

    async handleLogout(e) {
      e.preventDefault();
      const logout = await UserService.logout();
      if (logout) {
        this.$router.push("/");
      }
    },

    async addSaving(e) {
      e.preventDefault();
      if (this.saving.length > 0 && this.category && this.inputHandler(this.saving)) {
        const response = await UserService.addSaving(this.username, this.getID(), this.category, this.saving);
        if (response) {
          console.log(response);
          this.category = "";
          this.saving = "";
          this.getSavings();
        } else {
          console.log("error with response on addSaving");
        }
      } else {
        console.log("Didn't fit regex.");
      }
    },

    async getSavings() {
      const response = await UserService.getSavings();
      let savings = await response.data.savings;

      let savingsTable = document.querySelector("#savings");
      let tableLenght = savingsTable.children.length;
      while (tableLenght > 1) {
        savingsTable.deleteRow(1);
        tableLenght = savingsTable.children.length;
        if (tableLenght === 1) {
          break;
        }
      }

      if (response) {
        savings.forEach(item => {
          let row = savingsTable.insertRow(1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);

          cell1.innerHTML = `${item.category}`;
          cell2.innerHTML = `${item.amount}`;
        });
      }
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
