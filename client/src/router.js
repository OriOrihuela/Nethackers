import Vue from "vue";
import Router from "vue-router";
import MainPage from "./components/MainPage";
import NewOffer from "./components/NewOffer";

Vue.use(Router);

export default new Router({
  base: "/",
  mode: "history",
  routes: [
    {
      path: "/",
      component: MainPage,
    },
    {
      path: "/offers/new",
      component: NewOffer,
    },
    // Redirection performed whenever the user enters a wrong URL.
    // { path: "*", component: ErrorComponent },
  ],
});
