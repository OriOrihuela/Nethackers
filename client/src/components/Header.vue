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
          <!-- CLOSE SESSION -->
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
        <form>
          <mdb-input
            type="text"
            class="text-white"
            placeholder="Search"
            aria-label="Search"
            label
            navInput
            waves
            waves-fixed
          />
        </form>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </div>
</template>

<script>
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
  name: "Header",
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

  data() {
    return {
      isUserLogged: false,
    };
  },

  mounted() {
    // When the event "user-logged" is fired...
    EventBus.$on("user-logged", (boolean) => {
      // We tell to the header that user is logged in.
      this.isUserLogged = boolean;
    });

    // If localStorage has the credentials to use the vue router...
    if (
      this.$cookies.get(process.env.VUE_APP_ROUTER_STORAGE_KEY) ===
      process.env.VUE_APP_ROUTER_STORAGE_VALUE
    ) {
      // We tell to the header that user is logged in.
      this.isUserLogged = true;
    }
  },

  methods: {
    // Behaviours to log out the user.
    onLogOut() {
      swal({
        title: "¿Está seguro de querer cerrar sesión?",
        icon: "warning",
        buttons: true,
      }).then((logout) => {
        if (logout) {
          axios
            .post("/api/logout", { withCredentials: true })
            .then((response) => {
              if (response.data.status === "success") {
                // Tell to the header that user is logged out.
                this.isUserLogged = false;
                // Remove the localStorage router key.
                this.$cookies.remove(
                  `${process.env.VUE_APP_ROUTER_STORAGE_KEY}`
                );
                // Tell the user session is finished.
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
  },
};
</script>

<style lang="scss" scoped>
#header {
  margin-bottom: 150px;
}
</style>
