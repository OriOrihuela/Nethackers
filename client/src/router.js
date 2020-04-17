import Vue from "vue";
import Router from "vue-router";
import MainPage from "./components/MainPage";
import CreateOffer from "./components/CreateOffer";
import Offer from "./components/Offer";
import EditOffer from "./components/EditOffer";
import CreateAccount from "./components/CreateAccount";

Vue.use(Router);

export default new Router({
  base: "/",
  mode: "history",
  routes: [
    {
      path: "/",
      component: MainPage,
    },

    // Offers routes.
    {
      path: "/offers/new",
      component: CreateOffer,
    },
    {
      path: "/offers/:url",
      component: Offer,
    },
    {
      path: "/offers/edit/:url",
      component: EditOffer,
    },

    // Users routes.
    {
      path: "/create-account",
      component: CreateAccount,
    },
    // Redirection performed whenever the user enters a wrong URL.
    // { path: "*", component: ErrorComponent },
  ],
});
