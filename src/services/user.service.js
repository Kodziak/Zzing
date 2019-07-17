import ApiService from "./api.service";
import axios from "axios";
import { TokenService, UserStorageService } from "./storage.service";

const UserService = {
  login: async function(login, password) {
    try {
      const response = await ApiService.post("/login", {
        username: login,
        password: password
      });
      console.log(response);
      TokenService.saveToken(response.data.token);
      UserStorageService.saveUsername(JSON.stringify(response.data.username));
      UserStorageService.saveLocalStorage("email", JSON.stringify(response.data.email));

      if ((await TokenService.getToken()) != null) {
        this.$router.push("dashboard");
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

export default UserService;
export { UserService };
