import { createRouter, createWebHashHistory } from "vue-router";
import Main from "./screens/Main.vue";
import Login from "./screens/Login.vue"
const router = createRouter({
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main, 
    },
    {
      path: "/login",
      name: 'login',
      component: Login
    }
  ],
  history: createWebHashHistory(),
});

export default router;