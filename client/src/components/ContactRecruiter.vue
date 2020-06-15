<template>
  <mdb-container id="contact-recruiter"
    ><!-- ENTRY CONTENT -->
    <mdb-row>
      <mdb-col col="12"
        ><h1>Contacte al reclutador</h1>
        <h5>
          Introduzca su nombre y apellidos, email y CV
        </h5></mdb-col
      >
    </mdb-row>
    <hr />
    <!-- INTERESTED PERSON FORM -->
    <mdb-row>
      <mdb-col col="12" class="mt-5">
        <form @submit.prevent="onSubmit" enctype="multipart/form-data">
          <p class="h4 text-center mb-4">Datos a completar</p>
          <div class="grey-text">
            <!-- NAME -->
            <mdb-input
              label="Nombre y apellidos"
              icon="user"
              type="text"
              name="name"
              v-model="interested.name"
            />
            <p
              class="error mb-5"
              v-if="formSubmitted && !$v.interested.name.required"
            >
              Introduzca su nombre y apellidos
            </p>
            <!-- EMAIL -->
            <mdb-input
              label="Email"
              icon="envelope-open"
              type="text"
              name="email"
              v-model="interested.email"
            />
            <p
              class="error mb-5"
              v-if="
                formSubmitted &&
                  (!$v.interested.email.required || !$v.interested.email.email)
              "
            >
              Introduzca un correo electrónico válido
            </p>
            <!-- CV -->
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01"
                  >Subir</span
                >
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  name="cv"
                  ref="cv"
                  @change="selectFile"
                />
                <label class="custom-file-label" for="inputGroupFile01">
                  Documento PDF: {{ interested.cv.name }}
                </label>
              </div>
            </div>
            <p
              class="error mb-5 mt-4"
              v-if="formSubmitted && !$v.interested.cv.required"
            >
              Introduzca su CV
            </p>
          </div>
          <mdb-row>
            <!-- SUBMIT BUTTON -->
            <mdb-col col="12" class="mt-5">
              <div class="text-center">
                <mdb-btn outline="secondary" type="submit"
                  >Enviar CV <mdb-icon icon="paper-plane" class="ml-1"
                /></mdb-btn></div></mdb-col
          ></mdb-row></form
      ></mdb-col> </mdb-row
  ></mdb-container>
</template>

<script>
// Required imports
import {
  mdbContainer,
  mdbInput,
  mdbRow,
  mdbCol,
  mdbBtn,
  mdbIcon,
} from "mdbvue";
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";
import swal from "sweetalert";

export default {
  // Name of the component.
  name: "ContactRecruiter",

  // Registered components within this one.
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbIcon,
    mdbInput,
  },

  // Properties of this component.
  data() {
    return {
      interested: {
        name: "",
        email: "",
        cv: "",
      },
      formSubmitted: false,
    };
  },

  // Custom methods of this component.
  methods: {
    // Whenever the user submits the form...
    onSubmit() {
      this.formSubmitted = true;
      // The validations have been touched...
      this.$v.$touch();
      // If the form is invalid...
      if (this.$v.$invalid) {
        swal("Woops!", "Introduzca correctamente sus datos", "warning");
        // Fails silently.
        return false;
      } else {
        // Put the CV as a FormData JS Object.
        let FORM_DATA = new FormData();
        FORM_DATA.append("cv", this.interested.cv);
        // Save the CV in the server through AJAX request with axios.
        axios
          .post("/api/offers/contact/" + this.$route.params.url, FORM_DATA)
          .then((response) => {
            // If everything works fine...
            if (response.data.status === "success") {
              // Update the name of the interested person CV (crypted).
              this.interested.cv = response.data.cv.filename;
              // Update the array of candidates within the offer.
              axios
                .put(
                  "/api/offers/contact/" + this.$route.params.url,
                  this.interested
                )
                .then((response) => {
                  // If everything went fine...
                  if (response.data.status === "success") {
                    // Tell the user OK.
                    swal(
                      "CV enviado",
                      "¡Su CV ha sido enviado correctamente!",
                      "success"
                    );
                    // Redirect to the main page.
                    this.$router.push("/");
                  }
                });
            }
          })
          .catch((error) => {
            // If there's any error...
            if (error.response.data.message === "Only PDF's are allowed.") {
              swal(
                "Formato incompatible",
                "Sólo se permiten archivos PDF",
                "error"
              );
            } else {
              swal(
                "CV no enviado",
                "No se ha podido enviar su CV debidamente",
                "error"
              );
            }
          });
      }
    },

    // Behaviour to be triggered whenever an user selects a file.
    selectFile() {
      // Takes the file from the input file and assign it to the component property.
      this.interested.cv = this.$refs.cv.files[0];
    },
  },

  // Form validations.
  validations: {
    interested: {
      name: { required },
      email: { required, email },
      cv: { required },
    },
  },
};
</script>

<style lang="scss" scoped>
#contact-recruiter {
  .error {
    border: 1px solid red;
    color: red;
    text-align: center;
    padding: 1%;
  }
}
</style>
