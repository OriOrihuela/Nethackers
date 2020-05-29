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
        <!--  -->
        <mdb-col class="mt-3" col="12" sm="4">
          <h4>Nombre</h4>
          <p id="candidate-name">{{ candidate.name }}</p>
        </mdb-col>
        <!-- CONTRACT TYPE -->
        <mdb-col class="mt-3" col="12" sm="4">
          <h4>Email</h4>
          <p class="name">{{ candidate.email }}</p>
        </mdb-col>
        <!-- MORE INFO ABOUT THE OFFER -->
        <mdb-col class="mt-2" col="12" sm="4">
          <mdb-btn color="info" @click="getCV(candidate.cv)"
            ><mdb-icon icon="file-pdf" /> CV</mdb-btn
          >
        </mdb-col>
      </mdb-row>
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
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbIcon } from "mdbvue";
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "Candidates",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbIcon,
  },
  data() {
    return {
      offer: null,
    };
  },
  mounted() {
    axios.get("/api/candidates/" + this.$route.params.url).then((response) => {
      if (response.data.status === "success") {
        this.offer = response.data.offer;
      }
    });
  },
  methods: {
    getCV(cv) {
      axios({
        url: `/api/candidates/${this.offer.url}/${cv}`,
        method: "GET",
        responseType: "blob", // IMPORTANT
      })
        .then((response) => {
          if (response.data) {
            var fileLink = document.createElement("a");

            fileLink.href = window.URL.createObjectURL(
              new Blob([response.data])
            );

            fileLink.setAttribute("download", cv);

            document.body.appendChild(fileLink);
            fileLink.click();
            document.body.removeChild(fileLink);
          }
        })
        .catch((error) => {
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
