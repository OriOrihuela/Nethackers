import Vue from "vue";
import Router from "vue-router";

// Custom imported components
import MainPage from "./components/MainPage";
import CreateOffer from "./components/CreateOffer";
import Offer from "./components/Offer";
import EditOffer from "./components/EditOffer";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import ConfigPanel from "./components/ConfigPanel";

Vue.use(Router);

function isLoggedIn(to, from, next) {
  !(
    localStorage.getItem(process.env.VUE_APP_ROUTER_STORAGE_KEY) ===
    process.env.VUE_APP_ROUTER_STORAGE_VALUE
  )
    ? next({ name: "Login" })
    : next();
}

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
      beforeEnter: isLoggedIn,
    },
    {
      path: "/offers/:url",
      component: Offer,
    },
    {
      path: "/offers/edit/:url",
      component: EditOffer,
      beforeEnter: isLoggedIn,
    },

    // Users routes.
    {
      path: "/create-account",
      component: CreateAccount,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/config-panel",
      component: ConfigPanel,
      beforeEnter: isLoggedIn,
    },
    // Redirection performed whenever the user enters a wrong URL.
    // { path: "*", component: ErrorComponent },
  ],
});
