const TOKEN_KEY = "jwt";
const USERNAME_KEY = "username";
const EMAIL_KEY = "email";

const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
};

const UserStorageService = {
  getUsername() {
    return localStorage.getItem(USERNAME_KEY);
  },

  saveUsername(username) {
    localStorage.setItem(USERNAME_KEY, username);
  },

  removeUsername() {
    localStorage.removeItem(USERNAME_KEY);
  },

  getEmail() {
    return localStorage.getItem(EMAIL_KEY);
  },

  saveEmail(email) {
    localStorage.setItem(EMAIL_KEY, email);
  },

  removeEmail() {
    localStorage.removeItem(EMAIL_KEY);
  },

  saveLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }
};

export { TokenService, UserStorageService };
