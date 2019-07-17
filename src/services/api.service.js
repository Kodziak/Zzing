import axios from "axios";
import { TokenService } from "./storage.service";

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  baseURL() {
    return axios.defaults.baseURL;
  },

  setHeader() {
    axios.defaults.headers.common["Authorization"] = `${TokenService.getToken()}`;
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  get(endpoint) {
    return axios.get(endpoint);
  },

  post(endpoint, data) {
    return axios.post(endpoint, data);
  },

  put(endpoint, data) {
    return axios.put(endpoint, data);
  },

  delete(endpoint) {
    return axios.delete(endpoint);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/

  customRequest(data) {
    return axios(data);
  }
};

export default ApiService;
