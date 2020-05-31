<template>
  <mdb-container id="edit-profile"
    ><!-- ENTRY CONTENT -->
    <mdb-row>
      <mdb-col col="12"
        ><h1>Editar perfil</h1>
        <h5>
          Actualice su información como reclutador
        </h5></mdb-col
      >
    </mdb-row>
    <hr />
    <!-- USER FORM -->
    <mdb-row v-if="user">
      <mdb-col col="12" class="mt-5">
        <form @submit.prevent="onSubmit">
          <p class="h4 text-center mb-4">Datos a editar</p>
          <div class="grey-text">
            <!-- USERNAME -->
            <mdb-input
              label="Nombre"
              icon="user"
              type="text"
              name="name"
              v-model="user.username"
            />
            <p
              class="error mb-5"
              v-if="formSubmitted && !$v.user.username.required"
            >
              Introduzca un nombre de usuario
            </p>
            <!-- EMAIL -->
            <mdb-input
              label="Email"
              icon="envelope-open"
              type="text"
              name="email"
              v-model="user.email"
            />
            <p
              class="error mb-5"
              v-if="
                formSubmitted &&
                  (!$v.user.email.required || !$v.user.email.email)
              "
            >
              Introduzca un correo electrónico válido
            </p>
            <!-- PASSWORD -->
            <mdb-input
              label="Nueva contraseña"
              icon="key"
              type="password"
              name="password"
              v-model="newPassword"
            />
            <p
              class="error mb-5"
              v-if="
                formSubmitted &&
                  (!$v.newPassword.required || !$v.newPassword.minLength)
              "
            >
              Introduzca una contraseña de 8 caracteres
            </p>
            <!-- REPEAT PASSWORD -->
            <mdb-input
              label="Repita su nueva contraseña"
              icon="redo"
              type="password"
              name="confirm"
              v-model="confirmPassword"
            />
            <p
              class="error"
              v-if="
                formSubmitted &&
                  (!$v.confirmPassword.required ||
                    !$v.confirmPassword.sameAsPassword)
              "
            >
              Las contraseñas no coinciden
            </p>
          </div>
          <mdb-row>
            <!-- UPDATE PROFILE -->
            <mdb-col col="12" sm="6" class="mt-5">
              <div class="text-center">
                <mdb-btn outline="secondary" type="submit"
                  >Actualizar <mdb-icon icon="paper-plane" class="ml-1"
                /></mdb-btn></div
            ></mdb-col>
            <!-- DELETE PROFILE -->
            <mdb-col col="12" sm="6" class="mt-5">
              <div class="text-center">
                <mdb-btn outline="danger" type="button" @click="onDelete"
                  >Eliminar <mdb-icon icon="trash" class="ml-1"
                /></mdb-btn></div></mdb-col
          ></mdb-row></form
      ></mdb-col>
    </mdb-row>
    <div v-else class="text-center">
      <!-- LOADING CONTENT -->
      <mdb-row>
        <mdb-col col="12 mb-5">
          <div class="spinner-grow text-dark" role="status"></div>
        </mdb-col>
        <mdb-col>
          <h4>
            Cargando...
          </h4></mdb-col
        >
      </mdb-row>
    </div></mdb-container
  >
</template>

<script>
import {
  mdbRow,
  mdbCol,
  mdbContainer,
  mdbBtn,
  mdbIcon,
  mdbInput,
} from "mdbvue";
import axios from "axios";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import swal from "sweetalert";
import { EventBus } from "../main";

export default {
  name: "EditProfile",
  components: {
    mdbRow,
    mdbCol,
    mdbContainer,
    mdbBtn,
    mdbIcon,
    mdbInput,
  },

  data() {
    return {
      user: null,
      newPassword: "",
      confirmPassword: "",
      formSubmitted: false,
    };
  },

  methods: {
    // Whenever the user submits the form...
    onSubmit() {
      this.formSubmitted = true;
      // The validations have been touched...
      this.$v.$touch();
      // If the form is invalid...
      if (this.$v.$invalid) {
        swal("Woops!", "Introduzca correctamente sus credenciales", "warning");
        // Fails silently.
        return false;
      } else {
        // Update the user in DB.
        axios
          .put("/api/edit-profile", this.user, { withCredentials: true })
          .then((response) => {
            // If everything works fine...
            if (response.data.status === "success") {
              // Tell the user OK.
              swal(
                "Cuenta actualizada",
                "¡Su cuenta ha sido actualizada correctamente!",
                "success"
              );
              // Redirect to log-in page.
              this.$router.push("/config-panel");
            }
          })
          .catch((error) => {
            if (error) {
              swal(
                "Actualización fallida",
                "Su cuenta no ha podido ser actualizada",
                "error"
              );
            }
          });
      }
    },

    // Whenever the user wants to delete its own account.
    onDelete() {
      // Pre-delete alert to ensure the process by the user.
      swal({
        title: "¿Está seguro de querer borrar su cuenta?",
        text: "Una vez borrada, sus datos y ofertas serán irrecuperables",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // Get the current username.e
          const USERNAME = this.user.username;
          // Delete the user account.
          axios
            .delete("/api/edit-profile", { withCredentials: true })
            .then((response) => {
              if (response.data.status === "success") {
                // Whenever the user account is deleted, close the session.
                axios
                  .post("/api/logout", { withCredentials: true })
                  .then((response) => {
                    if (response.data.status === "success") {
                      // Emit the "user-logout" event to be caught by Header.vue.
                      EventBus.$emit("user-logout", false);
                      // Alert the user his account has been removed.
                      swal(
                        `¡Esperamos volverle a ver, ${USERNAME}`,
                        "Su cuenta ha sido borrada",
                        "success",
                        { button: false }
                      );
                      // Redirect.
                      this.$router.push("/login");
                      // Remove the front-end navigation cookie.
                      this.$cookies.remove(
                        `${process.env.VUE_APP_ROUTER_STORAGE_KEY}`
                      );
                    }
                  })
                  .catch((error) => {
                    if (error) {
                      // Alert the user that something was wrong.
                      swal(
                        "Cuenta no borrada",
                        "Su cuenta no se ha borrado correctamente",
                        "error"
                      );
                    }
                  });
              }
            });
        }
      });
    },
  },

  mounted() {
    axios
      .get("/api/edit-profile", { withCredentials: true })
      .then((response) => {
        if (response.data.status === "success") {
          this.user = response.data.user;
        }
      });
  },

  // Form validations.
  validations: {
    user: {
      username: { required },
      email: { required, email },
    },
    newPassword: { required, minLength: minLength(8) },
    confirmPassword: {
      required,
      sameAsPassword: sameAs("newPassword"),
    },
  },
};
</script>

<style lang="scss" scoped>
#edit-profile {
  .row {
    form {
      .grey-text {
        .error {
          border: 1px solid red;
          color: red;
          text-align: center;
          padding: 1%;
        }
      }
    }
  }
}
</style>
