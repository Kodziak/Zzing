<template>
  <div>
    <h4>Login</h4>
    <form>
      <label for="login">Login</label>
      <div>
        <input id="login" type="login" v-model="login" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <div>
        <button id="back" type="submit" @click="handleSubmit">Back</button>
        <button type="submit" @click="handleSubmit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  data() {
    return {
      login: "",
      password: ""
    };
  },
  methods: {
    // handleSubmit(e) {
    //   e.preventDefault();

    //   if (e.srcElement.id === "back") {
    //     this.$router.push("/");
    //   } else {
    //     if (this.password.length > 0 && this.login.length > 0) {
    //       this.$http
    //         .post("http://localhost:3000/login", {
    //           username: this.login,
    //           password: this.password
    //         })
    //         .then(response => {
    //           if (response.data.token.length > 0) {
    //             localStorage.setItem("username", JSON.stringify(response.data.username));
    //             localStorage.setItem("email", JSON.stringify(response.data.email));
    //             localStorage.setItem("jwt", response.data.token);

    //             if (localStorage.getItem("jwt") != null) {
    //               this.$emit("loggedIn");
    //               if (this.$route.params.nextUrl != null) {
    //                 this.$router.push(this.$route.params.nextUrl);
    //               } else {
    //                 this.$router.push("dashboard");
    //               }
    //             }
    //           } else {
    //             console.log("Invalid login or password");
    //           }
    //         })
    //         .catch(error => {
    //           console.log(error);
    //         });
    //     }
    //   }
    // },
    async handleSubmit(e) {
      e.preventDefault();

      if (e.srcElement.id === "back") {
        this.$router.push("/");
      } else {
        if (this.login != "" && this.password != "") {
          let token = await UserService.login(this.login, this.password);
          this.password = "";

          if (token != null) {
            this.$router.push("dashboard");
          }
        }
      }
    }
  }
};
</script>

<style lang="scss">
input {
  width: 300px;
  height: 40px;
  font-size: 16px;
}
</style>
