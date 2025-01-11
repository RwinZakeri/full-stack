import axios from "axios";

const AXIOS = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  //   headers: { "token": "foobar" },
});

export default AXIOS;
