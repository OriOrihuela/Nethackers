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
    <!-- OFFERS LIST -->
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
            <!-- COMPANY -->
            <mdb-input
              label="Empresa"
              icon="building"
              type="text"
              name="company"
              v-model="offer.company"
            />
            <!-- LOCATION -->
            <mdb-input
              label="Ubicación"
              icon="compass"
              type="text"
              name="location"
              v-model="offer.location"
            />
            <!-- SALARY -->
            <mdb-input
              label="Salario"
              icon="dollar-sign"
              type="text"
              name="salary"
              v-model="offer.salary"
            />
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
            <!-- DESCRIPTION -->
            <h4 class="mt-5 mb-3">Descripción del puesto</h4>
            <VueTrix
              inputName="description"
              placeholder="Escriba una breve descripción..."
              v-model="offer.description"
            />
            <!-- SKILLS -->
            <h4 class="mt-5">Skills</h4>
            <ul class="skills">
              <li v-for="skill in skills" :key="skill" @click="addSkill">
                {{ skill }}
              </li>
            </ul>
          </div>
          <!-- SUBMIT -->
          <div class="text-center my-5">
            <mdb-btn outline="secondary" type="submit"
              >Enviar <mdb-icon far icon="paper-plane" class="ml-1"
            /></mdb-btn>
          </div></form
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
  mdbIcon
} from "mdbvue";
import VueTrix from "vue-trix";
import json from "../assets/json/skills";
import swal from "sweetalert";
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
  name: "NewOffer",
  components: {
    mdbRow,
    mdbCol,
    mdbContainer,
    mdbInput,
    mdbBtn,
    mdbIcon,
    VueTrix
  },
  data() {
    return {
      skills: json.skills,
      selectedSkills: new Set(),
      offer: {
        title: null,
        company: null,
        location: null,
        salary: null,
        contract: null,
        description: null,
        skills: null
      },
      formSubmitted: false
    };
  },
  methods: {
    // Whenever the form is submitted...
    onSubmit() {
      this.formSubmitted = true;
      // The validations have been touched...
      this.$v.$touch();
      // If the form is invalid...
      if (this.$v.$invalid) {
        swal(
          "Woops! Faltan datos",
          "Introduzca el titulo, compañía y/o localización",
          "warning",
          {
            button: {
              text: "¡Vooy!"
            }
          }
        );
        // Fails silently.
        return false;
      } else {
        // Save the offer in DB.
        axios.post("/api/offers/new", this.offer).then(response => {
          // If everything works fine...
          if (response.data.status === "success") {
            // Tell the user OK.
            swal(
              "Oferta creada",
              "¡La oferta se ha creado correctamente!",
              "success"
            );
            // Redirect to home page.
            this.$router.push("/");
          } else {
            // Tell the user ERROR.
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
      this.updateSkillsInput();
    },

    // Whenever a skill is selected, the input hidden value must be updated.
    updateSkillsInput() {
      // Make an array from the Set of selected skills and...
      const SKILLS_ARRAY = [...this.selectedSkills];
      // Put it to the value of the input hidden with name "skills".
      this.offer.skills = SKILLS_ARRAY;
    }
  },

  // Form validatios.
  validations: {
    offer: {
      title: { required },
      company: { required },
      location: { required }
    }
  }
};
</script>

<style lang="scss" scoped>
#new-offer {
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
