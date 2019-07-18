import ApiService from "./api.service";
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
      UserStorageService.saveEmail(JSON.stringify(response.data.email));

      return response.data.token;
    } catch (error) {
      return error;
    }
  },

  logout: async function() {
    try {
      TokenService.removeToken();
      UserStorageService.removeUsername();
      UserStorageService.removeEmail();
      return true;
    } catch (error) {
      return error;
    }
  },

  addSaving: async function(username, id, category, amount) {
    try {
      const response = await ApiService.post("/add-saving", {
        username: username,
        savings: [
          {
            ID: id,
            category: category,
            amount: amount
          }
        ]
      });

      return response;
    } catch (error) {
      return error;
    }
  }
};

export default UserService;
export { UserService };
