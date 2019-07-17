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

      TokenService.saveToken(response.data.token);
      UserStorageService.saveUsername(JSON.stringify(response.data.username));
      UserStorageService.saveLocalStorage("email", JSON.stringify(response.data.email));

      return response.data.token;
    } catch (error) {
      return error;
    }
  },

  register: async function(login, email, password) {
    try {
      const response = await ApiService.post("/register", {
        username: login,
        email: email,
        password: password
      });

      TokenService.saveToken(response.data.token);
      UserStorageService.saveUsername(JSON.stringify(response.data.username));
      UserStorageService.saveLocalStorage("email", JSON.stringify(response.data.email));

      return response.data.token;
    } catch (error) {
      return error;
    }
  }
};

export default UserService;
export { UserService };
