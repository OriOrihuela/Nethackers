<template>
  <mdb-container id="login"
    ><!-- ENTRY CONTENT -->
    <mdb-row>
      <mdb-col col="12"
        ><h1>Iniciar sesión</h1>
        <h5>
          Introduzca sus datos si ya está registrado en Nethackers
        </h5></mdb-col
      >
    </mdb-row>
    <hr />
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
              v-model="user.username"
            />
            <p
              class="error mb-5"
              v-if="formSubmitted && !$v.user.username.required"
            >
              Introduzca su nombre de usuario
            </p>
            <!-- PASSWORD -->
            <mdb-input
              label="Contraseña"
              icon="key"
              type="password"
              name="password"
              v-model="user.password"
            />
            <p
              class="error mb-5"
              v-if="
                formSubmitted &&
                  (!$v.user.password.required || !$v.user.password.minLength)
              "
            >
              Introduzca su contraseña
            </p>
            <!-- REPEAT PASSWORD -->
            <mdb-input
              label="Repita su contraseña"
              icon="redo"
              type="password"
              name="confirm"
              v-model="user.confirmPassword"
            />
            <p
              class="error"
              v-if="
                formSubmitted &&
                  (!$v.user.confirmPassword.required ||
                    !$v.user.confirmPassword.sameAsPassword)
              "
            >
              Las contraseñas no coinciden
            </p>
          </div>
          <mdb-row>
            <!-- TO CREATE ACCOUNT -->
            <mdb-col col="12" sm="4" class="mt-5">
              <div class="text-center">
                <mdb-btn outline="primary" type="button" @click="toSignup"
                  >Crear cuenta <mdb-icon icon="user-plus" class="ml-1"
                /></mdb-btn></div
            ></mdb-col>
            <!-- RESET PASSWORD -->
            <mdb-col col="12" sm="4" class="mt-5">
              <div class="text-center">
                <mdb-btn outline="green" type="button" @click="toResetPassword"
                  >Restablecer contraseña <mdb-icon icon="key" class="ml-1"
                /></mdb-btn></div
            ></mdb-col>
            <!-- SUBMIT -->
            <mdb-col col="12" sm="4" class="mt-5">
              <div class="text-center">
                <mdb-btn outline="secondary" type="submit"
                  >Iniciar sesión <mdb-icon icon="sign-in-alt" class="ml-1"
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
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Login",
  components: { mdbRow, mdbCol, mdbContainer, mdbInput, mdbBtn, mdbIcon },
  data() {
    return {
      user: {
        username: "",
        password: "",
        confirmPassword: "",
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
        swal(
          "Woops!",
          "Introduzca correctamente sus credenciales de usuario",
          "warning"
        );
        // Fails silently.
        return false;
      } else {
        // Save the user in DB.
        axios
          .post("/api/login", this.user)
          .then((response) => {
            // If everything works fine...
            if (response.data.status === "success") {
              // Tell the user OK.
              swal(
                "Sesión iniciada",
                `¡Bienvenido a Nethackers, ${this.user.username}!`,
                "success"
              );
              // Redirect to main page.
              this.$router.push("/");
            }
          })
          .catch((error) => {
            if (error.response.data.message === "Incorrect username") {
              swal(
                "Lo sentimos",
                "El nombre de usuario introducido es incorrecto",
                "warning"
              );
            } else if (error.response.data.message === "Incorrect password") {
              swal(
                "Lo sentimos",
                "La contraseña introducida es incorrecta",
                "warning"
              );
            } else {
              swal(
                "Lo sentimos",
                "No ha podido iniciar sesión debidamente",
                "error"
              );
            }
          });
      }
    },

    // Redirect the user to sign in page.
    toSignup() {
      this.$router.push("/create-account");
    },

    // Redirect the user to reset password page.
    toResetPassword() {
      this.$router.push("/reset-password");
    },
  },
  validations: {
    user: {
      username: { required },
      password: { required, minLength: minLength(8) },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
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
