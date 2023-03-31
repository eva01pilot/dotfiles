import { createRouter, createWebHashHistory } from "vue-router";
import Main from "./screens/Main.vue";

const router = createRouter({
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main, 
    },
  ],
  history: createWebHashHistory(),
});

export default router;