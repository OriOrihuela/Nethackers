import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/lib/css/mdb.min.css";

import Vue from "vue";
import App from "./App.vue";

// Our custom router.
import router from "./router";

// Package to validate forms.
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

// Using cookies.
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
