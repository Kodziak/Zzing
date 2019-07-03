<template>
  <div>
    <h4>Register</h4>
    <form>
      <label for="name">Username</label>
      <div>
        <input id="name" type="text" v-model="name" required autofocus />
      </div>

      <label for="email">E-Mail</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required />
      </div>

      <div>
        <button type="submit" @click="handleSubmit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["nextUrl"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      if (this.password > 1 && this.password === this.password_confirmation) {
        // TODO: Implement regex matcher.
        axios
          .post("http://localhost:3000/register", {
            username: this.name,
            email: this.email,
            password: this.password,
            firstname: "test_site"
          })
          .then(function(response) {
            localStorage.setItem("username", JSON.stringify(response.data.username));
            localStorage.setItem("jwt", response.data.token);

            console.log(response.data.username, response.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push("/");
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.password = "";
        this.passwordConfirm = "";
        return alert("Passwords do not match");
      }
    }
  }
};
</script>
