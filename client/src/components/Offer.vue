<template>
  <mdb-container id="offer">
    <div v-if="offer">
      <!-- OFFER TITLE -->
      <mdb-row class="mb-5">
        <mdb-col col="12"
          ><h1 id="title">{{ offer.title }}</h1></mdb-col
        >
      </mdb-row>
      <hr />
      <mdb-row>
        <!-- OFFER COMPANY -->
        <mdb-col col="6" sm="3">
          <p class="tag">Empresa</p>
          <p>{{ offer.company }}</p>
        </mdb-col>
        <!-- OFFER LOCATION -->
        <mdb-col col="6" sm="3">
          <p class="tag">Ubicación</p>
          <p>{{ offer.location }}</p>
        </mdb-col>
        <!-- OFFER CONTRACT TYPE -->
        <mdb-col col="6" sm="3">
          <p class="tag">Contrato</p>
          <p>{{ offer.contract }}</p>
        </mdb-col>
        <!-- OFFER SALARY -->
        <mdb-col col="6" sm="3">
          <p class="tag">Salario</p>
          <p>{{ offer.salary }}</p>
        </mdb-col>
      </mdb-row>
      <hr class="mb-5" />
      <mdb-row>
        <!-- OFFER DESCRIPTION -->
        <mdb-col col="12"
          ><h4 class="tag mb-3">Descripción del puesto</h4>
          <div id="description" v-html="offer.description"></div
        ></mdb-col>
      </mdb-row>
      <mdb-row class="my-5">
        <!-- OFFER REQUIRED SKILLS -->
        <mdb-col id="skills-col" col="12" sm="6">
          <h4 class="tag mb-3">Skills necesarias</h4>
          <ul id="skills">
            <li v-for="skill in offer.skills" :key="skill">{{ skill }}</li>
          </ul>
          <!-- EDIT OFFER BUTTONS --> </mdb-col
        ><mdb-col col="12" sm="6" id="button">
          <!-- EDIT  -->
          <mdb-btn color="info" @click="contactRecruiter(offer.url)"
            >Contactar <mdb-icon icon="headset"
          /></mdb-btn> </mdb-col
      ></mdb-row>
    </div>
    <div v-else-if="!offer" class="text-center">
      <!-- LOADING CONTENT -->
      <mdb-row>
        <mdb-col col="12 my-5">
          <h2>La oferta no existe</h2>
        </mdb-col>
      </mdb-row>
    </div>
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
    </div>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbIcon } from "mdbvue";
import axios from "axios";

export default {
  name: "Offer",
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
  // Whenever the component is built...
  mounted() {
    this.getOffer(this.$route.params.url);
  },
  methods: {
    // Behaviour to retrieve a single offer from the DB.
    getOffer(offerUrl) {
      axios.get("/api/offers/" + offerUrl).then((response) => {
        if (response.data.status === "success") {
          this.offer = response.data.offer;
        }
      });
    },

    // Behaviour to redirect to the edit mode of an offer.
    contactRecruiter(url) {
      // Redirect to contact recruiter page
      this.$router.push(`/offers/contact/${url}`);
    },
  },
};
</script>

<style lang="scss" scoped>
#offer {
  .row {
    text-align: center;
    word-wrap: break-word;
    #title {
      font-weight: bold;
    }
    .col-6 {
      .tag {
        font-weight: bolder;
        font-family: "Verdana";
      }
      p {
        margin-top: 1rem;
      }
    }
    #description {
      word-wrap: break-word;
      text-align: center !important;
    }
    #skills {
      padding-left: 0;
      list-style: none;
    }
    #button {
      align-self: center;
    }
  }
}

@media (max-width: 425px) {
  #offer {
    .row {
      #skills-col {
        margin-top: 25px;
      }
      #button {
        margin-top: 25px;
      }
    }
  }
}
</style>
