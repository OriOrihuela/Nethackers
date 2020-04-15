import Vue from "vue";
import Router from "vue-router";
import MainPage from "./components/MainPage";
import NewOffer from "./components/NewOffer";
import Offer from "./components/Offer";
import EditOffer from "./components/EditOffer";

Vue.use(Router);

export default new Router({
  base: "/",
  mode: "history",
  routes: [
    {
      path: "/",
      component: MainPage
    },
    {
      path: "/offers/new",
      component: NewOffer
    },
    {
      path: "/offers/:url",
      component: Offer
    },
    {
      path: "/offers/edit/:url",
      component: EditOffer
    }
    // Redirection performed whenever the user enters a wrong URL.
    // { path: "*", component: ErrorComponent },
  ]
});
