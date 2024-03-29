<template>
  <mdb-container id="create-account"
    ><!-- ENTRY CONTENT -->
    <mdb-row>
      <mdb-col col="12"
        ><h1>Nueva cuenta</h1>
        <h5>
          Introduzca sus futuros datos como usuario
        </h5></mdb-col
      >
    </mdb-row>
    <hr />
    <!-- NEW USER FORM -->
    <mdb-row>
      <mdb-col col="12" class="mt-5">
        <form @submit.prevent="onSubmit">
          <p class="h4 text-center mb-4">Datos a completar</p>
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
              Introduzca una contraseña de 8 caracteres
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
            <!-- REDIRECT TO LOGIN -->
            <mdb-col col="12" sm="6" class="mt-5">
              <div class="text-center">
                <mdb-btn outline="primary" type="button" @click="toLogin"
                  >Iniciar sesión <mdb-icon icon="sign-in-alt" class="ml-1"
                /></mdb-btn></div
            ></mdb-col>
            <!-- SUBMIT BUTTON -->
            <mdb-col col="12" sm="6" class="mt-5">
              <div class="text-center">
                <mdb-btn outline="secondary" type="submit"
                  >Crear cuenta <mdb-icon icon="user-plus" class="ml-1"
                /></mdb-btn></div></mdb-col
          ></mdb-row></form
      ></mdb-col> </mdb-row
  ></mdb-container>
</template>

<script>
// Required imports
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
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";

export default {
  // Name of the component.
  name: "CreateAccount",

  // Registered components within this one.
  components: {
    mdbRow,
    mdbCol,
    mdbContainer,
    mdbInput,
    mdbBtn,
    mdbIcon,
  },

  // Properties of this component.
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      formSubmitted: false,
    };
  },

  // Custom methods of this component.
  methods: {
    // Whenever the form is submitted.
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
        // Save the user in DB through AJAX request using axios.
        axios
          .post("/api/create-account", this.user)
          .then((response) => {
            // If everything works fine...
            if (response.data.status === "success") {
              // Tell the user OK.
              swal(
                "Cuenta creada",
                "¡Su cuenta ha sido creada correctamente!",
                "success"
              );
              // Redirect to log-in page.
              this.$router.push("/login");
            }
          })
          .catch((error) => {
            // If there's any error...
            if (error.request.status === 422) {
              swal(
                "Datos ya existentes",
                "El nombre y/o email insertados ya existen en Nethackers",
                "warning"
              );
            } else {
              swal(
                "Creación fallida",
                "Su cuenta no ha podido ser creada",
                "error"
              );
            }
          });
      }
    },

    // Redirect the user to login page.
    toLogin() {
      this.$router.push("/login");
    },
  },

  // Form validations
  validations: {
    user: {
      username: { required },
      email: { required, email },
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
#create-account {
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
