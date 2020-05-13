<template>
  <div id="offers-list">
    <!-- MAIN TITLE -->
    <div v-if="offers && offers.length >= 1">
      <h2 class="text-center">Lista de ofertas</h2>
      <mdb-row
        class="my-5 text-center"
        v-for="(offer, index) in offers"
        :key="offer._id"
        :class="{ evenOffer: index % 2 === 0 }"
      >
        <!-- COMPANY AND JOB -->
        <mdb-col class="mt-3" col="12" sm="3">
          <h3>{{ offer.company }}</h3>
          <p id="offer-title">{{ offer.title }}</p>
        </mdb-col>
        <!-- JOB LOCATION -->
        <mdb-col class="mt-3" col="12" sm="3">
          <p class="tag">Ubicación</p>
          <p class="location-type">{{ offer.location }}</p>
        </mdb-col>
        <!-- CONTRACT TYPE -->
        <mdb-col class="mt-3" col="12" sm="3">
          <p class="tag">Contrato</p>
          <p class="name">{{ offer.contract }}</p>
        </mdb-col>
        <!-- MORE INFO ABOUT THE OFFER -->
        <mdb-col class="mt-2" col="12" sm="3">
          <mdb-btn color="info" @click="getOfferInfo(offer.url)"
            ><mdb-icon icon="plus"/> info</mdb-btn
          >
        </mdb-col>
      </mdb-row>
    </div>
    <div v-else-if="offers && offers.length < 1" class="text-center">
      <!-- LOADING CONTENT -->
      <mdb-row>
        <mdb-col col="12 my-5">
          <h2>No hay ofertas que mostrar</h2>
        </mdb-col>
      </mdb-row>
    </div>
    <div v-else>
      <!-- LOADING CONTENT -->
      <mdb-row class="text-center">
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
  </div>
</template>

<script>
import { mdbBtn, mdbRow, mdbCol, mdbIcon } from "mdbvue";
import axios from "axios";

export default {
  name: "OffersList",
  components: {
    mdbBtn,
    mdbRow,
    mdbCol,
    mdbIcon
  },
  data() {
    return {
      offers: null,
    };
  },
  // Whenever the component is built...
  mounted() {
    this.getOffers();
  },
  methods: {
    // Retrieve all the offers from DB.
    getOffers() {
      axios.get("/api").then((response) => {
        if (response.data.status === "success") {
          this.offers = response.data.offers;
        }
      });
    },

    // Redirect to the view of a single offer.
    getOfferInfo(url) {
      this.$router.push(`/offers/${url}`);
    },
  },
};
</script>

<style lang="scss" scoped>
#offers-list {
  h2 {
    margin-bottom: 50px;
  }
  .row {
    padding: 15px;
    margin-right: 0;
    margin-left: 0;
    align-items: center;
    #offer-title {
      font-weight: bold;
    }
    .tag {
      font-family: "Verdana";
      font-weight: bolder;
    }
  }
  .evenOffer {
    background-color: rgb(245, 245, 245);
    border-radius: 15px;
  }
}
</style>
