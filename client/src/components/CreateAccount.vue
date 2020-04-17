<template>
  <mdb-container id="create-account"
    ><!-- ENTRY CONTENT -->
    <mdb-row>
      <mdb-col col="12"
        ><h1>Nueva cuenta</h1>
        <h5>
          Introduzca sus datos como reclutador
        </h5></mdb-col
      >
    </mdb-row>
    <hr />
    <!-- USER FORM -->
    <mdb-row>
      <mdb-col col="12" class="mt-5">
        <form @submit.prevent="onSubmit">
          <p class="h4 text-center mb-4">Datos a completar</p>
          <div class="grey-text">
            <!-- NAME -->
            <mdb-input
              label="Nombre"
              icon="user"
              type="text"
              name="name"
              v-model="user.name"
            />
            <!-- EMAIL -->
            <mdb-input
              label="Email"
              icon="envelope-open"
              type="email"
              name="email"
              v-model="user.email"
            />
            <!-- PASSWORD -->
            <mdb-input
              label="Contraseña"
              icon="key"
              type="password"
              name="password"
              v-model="user.password"
            />
            <!-- REPEAT PASSWORD -->
            <mdb-input
              label="Repita su contraseña"
              icon="redo"
              type="password"
              name="confirm"
            />
          </div>
          <mdb-row
            ><mdb-col col="12" sm="6" class="mt-5"
              ><!-- SUBMIT -->
              <div class="text-center">
                <mdb-btn outline="primary" type="button"
                  >Iniciar sesión <mdb-icon icon="sign-in-alt" class="ml-1"
                /></mdb-btn></div></mdb-col
            ><mdb-col col="12" sm="6" class="mt-5"
              ><!-- SUBMIT -->
              <div class="text-center">
                <mdb-btn outline="secondary" type="submit"
                  >Crear cuenta <mdb-icon icon="user-plus" class="ml-1"
                /></mdb-btn></div></mdb-col
          ></mdb-row></form
      ></mdb-col> </mdb-row
  ></mdb-container>
</template>

<script>
import {
  mdbRow,
  mdbCol,
  mdbContainer,
  mdbInput,
  mdbBtn,
  mdbIcon,
} from "mdbvue";
import swal from "sweetalert";
import axios from "axios";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "CreateAccount",
  components: {
    mdbRow,
    mdbCol,
    mdbContainer,
    mdbInput,
    mdbBtn,
    mdbIcon,
  },
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
      },
      formSubmitted: false,
    };
  },
  methods: {
    // Whenever the form is submitted.
    onSubmit() {
      this.formSubmitted = true;
      // The validations have been touched...
      this.$v.$touch();
      // If the form is invalid...
      if (this.$v.$invalid) {
        swal("Woops!", `Introduzca correctamente sus datos`, "warning", {
          button: {
            text: "Entendido",
          },
        });
        // Fails silently.
        return false;
      } else {
        // Save the user in DB.
        axios.post("/api/create-account", this.user).then((response) => {
          // If everything works fine...
          if (response.data.status === "success") {
            // Tell the user OK.
            swal(
              "Cuenta creada",
              "¡Su cuenta ha sido creada correctamente!",
              "success"
            );
            // Redirect to log-in page.
            this.$router.push("/log-in");
          } else {
            // Tell the user ERROR.
            swal(
              "Creación fallida",
              "Su cuenta no ha podido ser creada",
              "error"
            );
          }
        });
      }
    },
  },
  validations: {
    user: {
      name: { required },
      email: { required },
      password: { required, minLength: minLength(8) },
    },
  },
};
</script>

<style lang="scss" scoped>
#create-account {
}
</style>
