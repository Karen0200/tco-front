import axios from "axios";

let authToken = localStorage.getItem("token");

axios.defaults.baseURL = "http://examination.loc/api/"
axios.defaults.headers.common["Access-Control-Allow-Origin"] = '*';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken

export default axios;