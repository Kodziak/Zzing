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
    axios.defaults.headers.commmon["Authorization"] = `${TokenService.getToken()}`;
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  get(endpoint) {
    axios.get(endpoint);
  },

  post(endpoint, data) {
    axios.post(endpoint, data);
  },

  put(endpoint, data) {
    axios.put(endpoint, data);
  },

  delete(endpoint) {
    axios.delete(endpoint);
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
