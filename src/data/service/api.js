import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080"
});
if(localStorage.getItem('token')){
  api.defaults.headers.common["Authorization"] = "Bearer "+ localStorage.getItem('token');
}
