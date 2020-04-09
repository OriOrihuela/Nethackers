import Vue from "vue";
import Router from "vue-router";
import MainPage from "./components/MainPage";

Vue.use(Router);

export default new Router({
  base: "/",
  mode: "history",
  routes: [
    {
      path: "/",
      component: MainPage,
    },
    // Redirection performed whenever the user enters a wrong URL.
    // { path: "*", component: ErrorComponent },
  ],
});
