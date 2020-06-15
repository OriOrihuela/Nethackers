<template>
  <mdb-container id="candidates">
    <div v-if="offer" class="text-center">
      <mdb-row>
        <mdb-col col="12"
          ><h1>Candidatos para {{ offer.title }}</h1></mdb-col
        >
      </mdb-row>
      <hr />
      <mdb-row
        class="my-5 text-center"
        v-for="(candidate, index) in offer.candidates"
        :key="candidate._id"
        :class="{ evenCandidate: index % 2 === 0 }"
      >
        <!-- CANDIDATE NAME -->
        <mdb-col class="mt-3" col="12" sm="4">
          <h4>Nombre</h4>
          <p id="candidate-name">{{ candidate.name }}</p>
        </mdb-col>
        <!-- EMAIL TYPE -->
        <mdb-col class="mt-3" col="12" sm="4">
          <h4>Email</h4>
          <p class="name">{{ candidate.email }}</p>
        </mdb-col>
        <!-- CANDIDATE CV -->
        <mdb-col class="mt-2" col="12" sm="4">
          <mdb-btn color="info" @click="getCV(candidate.cv)"
            ><mdb-icon icon="file-pdf" /> CV</mdb-btn
          >
        </mdb-col>
      </mdb-row>
      <!-- NO CANDIDATES -->
      <mdb-row v-if="offer.candidates.length < 1" class="text-center">
        <mdb-col col="12 my-5">
          <h2>No hay candidatos que mostrar</h2>
        </mdb-col>
      </mdb-row>
    </div>
    <div v-else class="text-center">
      <!-- LOADING CONTENT -->
      <mdb-row>
        <mdb-col col="12 my-5">
          <div class="spinner-grow text-dark" role="status"></div>
        </mdb-col>
        <mdb-col>
          <h4>
            Cargando...
          </h4></mdb-col
        >
      </mdb-row>
    </div>
  </mdb-container>
</template>

<script>
// Required imports.
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbIcon } from "mdbvue";
import axios from "axios";
import swal from "sweetalert";

export default {
  // Name of the component
  name: "Candidates",

  // Registered components within this one.
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbIcon,
  },

  // Properties of this component.
  data() {
    return {
      offer: null,
    };
  },

  // Whenever the component is built...
  mounted() {
    axios.get("/api/candidates/" + this.$route.params.url).then((response) => {
      if (response.data.status === "success") {
        this.offer = response.data.offer;
      }
    });
  },

  // Custom methods of this component.
  methods: {
    // Retrieve a CV from server folder.
    getCV(cv) {
      // Make an AJAX request using axios.
      axios({
        url: `/api/candidates/${this.offer.url}/${cv}`,
        method: "GET",
        responseType: "blob", // IMPORTANT
      })
        .then((response) => {
          // If the response brings some data...
          if (response.data) {
            // Create a new <a> element.
            var fileLink = document.createElement("a");
            // Make that <a> point to a new URL, which is the CV itself.
            fileLink.href = window.URL.createObjectURL(
              new Blob([response.data])
            );
            // Set a new proeprty to the <a> element just to download the CV.
            fileLink.setAttribute("download", cv);
            // Append the <a> element, click on it and remove it from DOM.
            document.body.appendChild(fileLink);
            fileLink.click();
            document.body.removeChild(fileLink);
          }
        })
        .catch((error) => {
          // If there's any error...
          if (error) {
            swal(
              "Descarga fallida",
              "No se ha podido descargar el CV adecuadamente",
              "error"
            );
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#candidates {
  h2 {
    margin-bottom: 50px;
  }
  .row {
    padding: 15px;
    margin-right: 0;
    margin-left: 0;
    align-items: center;
    #candidate-name {
      font-weight: bold;
    }
  }
  .evenCandidate {
    background-color: rgb(245, 245, 245);
    border-radius: 15px;
  }
}
</style>
