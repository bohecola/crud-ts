import { createApp } from "vue";
import App from "./demo/app.vue";
import Crud from "./index";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app
  .use(ElementPlus)
  .use(Crud, {})
  .mount("#app");
