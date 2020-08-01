import "../scss/main.scss";

import App from "./Vue/App.vue";
import { createApp } from "vue";
import Axios from "./Vue/Plugins/Axios";
import store from "./Store";

const app = createApp(App);

// app.config.devtools = true;
console.log(app);

app.use(store);
app.use(Axios);

app.mount("#vueApp");

// if (module.hot) {
//   module.hot.accept();
// }
