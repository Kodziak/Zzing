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
        <button id="back" type="submit" @click="handleSubmit">Back</button>
        <button type="submit" @click="handleSubmit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import UserService from "../services/user.service";

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
    async handleSubmit(e) {
      e.preventDefault();

      if (e.srcElement.id === "back") {
        this.$router.push("/");
      } else {
        if (
          this.login != "" &&
          this.password != "" &&
          this.password_confirmation != "" &&
          this.password === this.password_confirmation
        ) {
          let token = await UserService.register(this.login, this.email, this.password);
          this.password = "";
          this.password_confirmation = "";

          if (token != null) {
            this.$router.push("dashboard");
          }
        }
      }
    }
  }
};
</script>
