import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";

import "sanitize.css";
import "./assets/main.scss";

const app = createApp(App).use(mdiVue, {
  icons: mdijs,
});

app.use(createPinia());
app.use(router);

app.mount("#app");
