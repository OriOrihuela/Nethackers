<template>
  <div id="header">
    <mdb-navbar color="mdb-color lighten-1" position="top" dark>
      <!-- MAIN TITLE -->
      <mdb-navbar-brand>
        Nethackers
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <!-- HOME ICON -->
          <mdb-tooltip trigger="hover" :options="{ placement: 'bottom' }">
            <span slot="tip">Inicio</span>
            <mdb-nav-item slot="reference" to="/" active
              ><mdb-icon icon="home"
            /></mdb-nav-item>
          </mdb-tooltip>
          <!-- LOGIN ICON -->
          <mdb-tooltip
            trigger="hover"
            v-if="!isUserLogged"
            :options="{ placement: 'bottom' }"
          >
            <span slot="tip">Login</span>
            <mdb-nav-item slot="reference" to="/login" active
              ><mdb-icon icon="user"
            /></mdb-nav-item>
          </mdb-tooltip>
          <!-- CONFIG PANEL ICON -->
          <mdb-tooltip
            v-if="isUserLogged"
            trigger="hover"
            :options="{ placement: 'bottom' }"
          >
            <span slot="tip">Configuración</span>
            <mdb-nav-item slot="reference" to="/config-panel" active
              ><mdb-icon icon="hammer"
            /></mdb-nav-item>
          </mdb-tooltip>
          <!-- CLOSE SESSION ICON -->
          <mdb-tooltip
            v-if="isUserLogged"
            trigger="hover"
            :options="{ placement: 'bottom' }"
          >
            <span slot="tip">Cerrar sesión</span>
            <mdb-nav-item slot="reference" @click="onLogOut" active
              ><mdb-icon icon="cross"
            /></mdb-nav-item>
          </mdb-tooltip>
        </mdb-navbar-nav>
        <!--SEARCH FORM -->
        <form @submit.prevent="onSubmit">
          <mdb-input
            type="text"
            class="text-white"
            placeholder="Search"
            aria-label="Search"
            label
            navInput
            waves
            waves-fixed
            name="filter"
            v-model="filter.value"
          />
        </form>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </div>
</template>

<script>
// Required imports
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbInput,
  mdbIcon,
  mdbTooltip,
} from "mdbvue";
import { EventBus } from "../main";
import axios from "axios";
import swal from "sweetalert";

export default {
  // Name of the component.
  name: "Header",

  // Registered components within this one.
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbInput,
    mdbIcon,
    mdbTooltip,
  },

  // Properties of this component.
  data() {
    return {
      filter: {
        value: null,
      },
      isUserLogged: false,
    };
  },

  // Whenever the component is built...
  mounted() {
    // When the event "user-logged" is fired...
    EventBus.$on("user-logged", (boolean) => {
      // We tell to the header that user is logged in.
      this.isUserLogged = boolean;
    });

    // When the event "user-logout" is fired...
    EventBus.$on("user-logout", (boolean) => {
      // We tell to the header that user is logged in.
      this.isUserLogged = boolean;
    });

    // If browser cookies has the credentials to use the vue router...
    if (
      this.$cookies.get(process.env.VUE_APP_ROUTER_STORAGE_KEY) ===
      process.env.VUE_APP_ROUTER_STORAGE_VALUE
    ) {
      // We tell to the header that user is logged in.
      this.isUserLogged = true;
    }
  },

  // Custom methods of this component.
  methods: {
    // Behaviour to log out the user.
    onLogOut() {
      // Alert the user about the next operation.
      swal({
        title: "¿Está seguro de querer cerrar sesión?",
        icon: "warning",
        buttons: true,
      }).then((logout) => {
        // If user agrees to logout...
        if (logout) {
          // Logout through AJAX request using axios.
          axios
            .post("/api/logout", { withCredentials: true })
            .then((response) => {
              // If everything works fine...
              if (response.data.status === "success") {
                // Tell to the header that user is logged out.
                this.isUserLogged = false;
                // Remove the front-end navigation cookie.
                this.$cookies.remove(
                  `${process.env.VUE_APP_ROUTER_STORAGE_KEY}`
                );
                // Tell to the user that his session is finished.
                swal(
                  "Sesión finalizada",
                  "¡Esperamos volver a verte pronto!",
                  "success"
                );
                // Redirect to login page.
                this.$router.push("/login");
              }
            });
        }
      });
    },

    // Method to filter the offers by name.
    onSubmit() {
      // Filter using the data retrieved from the navbar input text.
      axios
        .post("/api/filter", this.filter)
        .then((response) => {
          // If everything is cool...
          if (response.data.status === "success") {
            // Emit the filtered offers to OfferList.vue component.
            EventBus.$emit("filtered-offers", response.data.offers);
          }
        })
        .catch((error) => {
          // If there's any error...
          if (error) {
            swal(
              "Error al filtrar",
              "No ha sido posible filtrar su búsqueda",
              "error"
            );
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#header {
  margin-bottom: 150px;
}
</style>
