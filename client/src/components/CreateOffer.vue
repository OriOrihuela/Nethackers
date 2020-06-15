<template>
  <mdb-container id="new-offer">
    <!-- ENTRY CONTENT -->
    <mdb-row>
      <mdb-col col="12"
        ><h1>Nueva oferta</h1>
        <h5>
          Rellena el formulario sobre tu oferta
        </h5></mdb-col
      >
    </mdb-row>
    <hr />
    <!-- OFFERS FORM -->
    <mdb-row>
      <mdb-col col="12" class="mt-5">
        <form @submit.prevent="onSubmit">
          <p class="h4 text-center mb-4">Datos a completar</p>
          <div class="grey-text">
            <!-- TITLE -->
            <mdb-input
              label="Titulo"
              icon="user"
              type="text"
              name="title"
              v-model="offer.title"
            />
            <p
              class="error mb-5"
              v-if="formSubmitted && !$v.offer.title.required"
            >
              Introduzca el nombre del puesto
            </p>
            <!-- COMPANY -->
            <mdb-input
              label="Empresa"
              icon="building"
              type="text"
              name="company"
              v-model="offer.company"
            />
            <p
              class="error mb-5"
              v-if="formSubmitted && !$v.offer.company.required"
            >
              Introduzca el nombre de la empresa
            </p>
            <!-- LOCATION -->
            <mdb-input
              label="Ubicación"
              icon="compass"
              type="text"
              name="location"
              v-model="offer.location"
            />
            <p
              class="error mb-5"
              v-if="formSubmitted && !$v.offer.location.required"
            >
              Introduzca la localización del puesto
            </p>
            <!-- SALARY -->
            <mdb-input
              label="Salario"
              icon="dollar-sign"
              type="text"
              name="salary"
              v-model="offer.salary"
            />
            <p
              class="error mb-5"
              v-if="formSubmitted && !$v.offer.salary.required"
            >
              Introduzca el salario, indicando su moneda pertinente
            </p>
            <!-- CONTRACT -->
            <label for="contract">Tipo de contrato</label>
            <div id="select">
              <mdb-icon icon="file-contract"></mdb-icon>
              <select
                class="browser-default custom-select"
                name="contract"
                v-model="offer.contract"
              >
                <option value="Freelance">Freelance</option>
                <option value="Tiempo Completo">Tiempo Completo</option>
                <option value="Tiempo Parcial">Tiempo Parcial</option>
                <option value="Por Proyecto">Por Proyecto</option>
              </select>
            </div>
            <p
              class="error mt-4"
              v-if="formSubmitted && !$v.offer.contract.required"
            >
              Seleccione un tipo de contrato
            </p>
            <!-- DESCRIPTION -->
            <h4 class="mt-5 mb-3">Descripción del puesto</h4>
            <VueTrix
              inputName="description"
              placeholder="Escriba una breve descripción..."
              v-model="offer.description"
            />
            <p
              class="error mt-4"
              v-if="
                formSubmitted &&
                  (!$v.offer.description.required ||
                    !$v.offer.description.minLength)
              "
            >
              Introduzca una descripción de al menos 400 caracteres
            </p>
            <!-- SKILLS -->
            <h4 class="mt-5">Skills</h4>
            <ul class="skills">
              <li v-for="skill in skills" :key="skill" @click="addSkill">
                {{ skill }}
              </li>
            </ul>
            <p
              class="error"
              v-if="
                formSubmitted &&
                  (!$v.offer.skills.required || !$v.offer.skills.minLength)
              "
            >
              Seleccione al menos 3 habilidades requeridas para el puesto
            </p>
          </div>
          <!-- SUBMIT BUTTON -->
          <div class="text-center my-5">
            <mdb-btn outline="secondary" type="submit"
              >Crear oferta <mdb-icon far icon="paper-plane" class="ml-1"
            /></mdb-btn>
          </div></form
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
import VueTrix from "vue-trix";
import json from "../assets/json/skills";
import swal from "sweetalert";
import axios from "axios";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  // Name of the component.
  name: "CreateOffer",

  // Registered components within this one.
  components: {
    mdbRow,
    mdbCol,
    mdbContainer,
    mdbInput,
    mdbBtn,
    mdbIcon,
    VueTrix,
  },

  // Properties of this component.
  data() {
    return {
      skills: json.skills,
      selectedSkills: new Set(),
      offer: {
        title: "",
        company: "",
        location: "",
        salary: "",
        contract: "",
        description: "",
        skills: "",
      },
      formSubmitted: false,
    };
  },

  // Custom methods of this component.
  methods: {
    // Whenever the form is submitted...
    onSubmit() {
      this.formSubmitted = true;
      // The validations have been touched...
      this.$v.$touch();
      // If the form is invalid...
      if (this.$v.$invalid) {
        swal(
          "Woops!",
          "Introduzca correctamente los datos de la oferta",
          "warning"
        );
        // Fails silently.
        return false;
      } else {
        // Save the offer in DB through AJAX request using axios.
        axios
          .post("/api/offers/new", this.offer, { withCredentials: true })
          .then((response) => {
            // If everything works fine...
            if (response.data.status === "success") {
              // Tell the user OK.
              swal(
                "Oferta creada",
                "¡La oferta se ha creado correctamente!",
                "success"
              );
              // Redirect to offer page first retrieving the offer using axios.
              axios
                .get("/api/offers/" + response.data.offerStored.url)
                .then((response) => {
                  // If everything is fine...
                  if (response.data.status === "success") {
                    // Redirect the user to the offer page passing the offer url as param.
                    this.$router.push(`/offers/${response.data.offer.url}`);
                  }
                })
                .catch((error) => {
                  // If there's any error...
                  if (error) {
                    swal(
                      "Redirección fallida",
                      "No ha sido posible dirigirle a su oferta",
                      "error"
                    );
                  }
                });
            }
          })
          .catch((error) => {
            // If there's any error...
            if (error) {
              swal(
                "Creación fallida",
                "La oferta no se ha guardado bien",
                "error"
              );
            }
          });
      }
    },

    // This method add the selected skill to the set of skills and changes its style.
    addSkill(event) {
      // If the selected skill is already in the "selectedSkills" property...
      if (event.target.classList.contains("active")) {
        // Remove it from the Set.
        this.selectedSkills.delete(event.target.textContent.trim());
        // Remove the CSS class "active"
        event.target.classList.remove("active");
      } else {
        // The opposite: add it to the Set and add the "active" class.
        this.selectedSkills.add(event.target.textContent.trim());
        event.target.classList.add("active");
      }
      // Update the required skills of the offer.
      this.updateSkills();
    },

    // Whenever a skill is selected, the total of skills selected must be updated.
    updateSkills() {
      /**
       * Make an array from the Set of selected skills and put it to the value
       * of the input hidden with name "skills"
       */
      this.offer.skills = [...this.selectedSkills];
    },
  },

  // Form validations.
  validations: {
    offer: {
      title: { required },
      company: { required },
      location: { required },
      salary: { required },
      contract: { required },
      description: { required, minLength: minLength(400) },
      skills: { required, minLength: minLength(3) },
    },
  },
};
</script>

<style lang="scss" scoped>
#new-offer {
  .error {
    border: 1px solid red;
    color: red;
    text-align: center;
    padding: 1%;
  }
  #select {
    display: flex;
    align-items: center;
    i {
      font-size: 1.75rem;
      margin-right: 17px;
    }
  }
  .skills {
    margin-top: 20px;
    padding: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .active {
      background-color: #87e08f;
      color: white;
    }
    li {
      border: 2px solid #87e08f;
      margin-bottom: 2rem;
      text-transform: uppercase;
      font-weight: bold;
      flex: 0 0 calc(25% - 1rem);
      text-align: center;
      border-radius: 1rem;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
        0 2px 10px 0 rgba(0, 0, 0, 0.12);
      &:hover {
        cursor: pointer;
        background-color: #87e08f;
        color: white;
        transition: background-color 0.5s, color 0.1s linear;
        box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18),
          0 4px 15px 0 rgba(0, 0, 0, 0.15);
      }
    }
  }
}

@media (max-width: 475px) {
  #new-offer {
    .skills {
      li {
        flex: 0 0 calc(35% - 1rem);
      }
    }
  }
}
</style>
