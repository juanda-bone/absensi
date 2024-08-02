const { default: axios } = require("axios");

const api = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer TDw-pRGCa_MnRf_3J6Qmsg`, // ganti `token` dengan token Bearer-mu
  },
});

export default api;
