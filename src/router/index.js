import { createRouter, createWebHistory } from "vue-router";

//Import Component
import Home from "../views/Index.vue";
import Detail from "../views/Detail.vue";

//Mendaftarkan Route
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/surah/:id",
    name: "surah",
    component: Detail,
  },
];

//Menjalankan Routing
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;