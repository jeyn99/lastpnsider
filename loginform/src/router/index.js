import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Form from "@/views/Form.vue";
import Analytics from "@/components/Analytics.vue"
import Preview from "@/components/Previu.vue"

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue"),

    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token") == null) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/form",
    name: "form",
    component: Form,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token") == null) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path:"/analytics",
    name:"analytics",
    component:Analytics,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token") == null) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path:"/preview",
    name:"preview",
    component:Preview,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token") == null) {
        next("/");
      } else {
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;