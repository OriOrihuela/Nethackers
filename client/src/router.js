import Vue from "vue";
import Router from "vue-router";
import MainPage from "./components/MainPage";
import NewOfferForm from "./components/NewOfferForm";

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
      path: "/new-offer",
      component: NewOfferForm,
    },
    // Redirection performed whenever the user enters a wrong URL.
    // { path: "*", component: ErrorComponent },
  ],
});
