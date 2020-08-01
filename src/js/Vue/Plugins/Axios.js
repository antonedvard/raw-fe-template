import { ref, provide, inject } from "vue";
import axios from "axios";

export default app => {
  app.config.globalProperties.$http = axios;
  app.provide("$http", axios);
  console.log(app);
};
