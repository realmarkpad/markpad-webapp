import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Document from "../views/Document.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "*",
    name: "document",
    component: Document
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
