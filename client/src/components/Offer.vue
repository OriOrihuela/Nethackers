<template>
  <mdb-container id="offer">
    <mdb-row>
      <mdb-col col="12"
        ><h1>{{ offer.title }}</h1></mdb-col
      >
    </mdb-row>
    <hr />
    <mdb-row>
      <mdb-col col="6" sm="3">
        <p>Empresa</p>
        <p>{{ offer.company }}</p>
      </mdb-col>
      <mdb-col col="6" sm="3">
        <p>Ubicación</p>
        <p>{{ offer.location }}</p>
      </mdb-col>
      <mdb-col col="6" sm="3">
        <p>Contrato</p>
        <p>{{ offer.contract }}</p>
      </mdb-col>
      <mdb-col col="6" sm="3">
        <p>Salario</p>
        <p>{{ offer.salary }}</p>
      </mdb-col>
    </mdb-row>
    <hr />
    <mdb-row>
      <mdb-col col="6"
        ><h2>Descripción del puesto</h2>
        <div v-html="offer.description"></div
      ></mdb-col>
      <mdb-col col="6">
        <h2>Skills necesarias</h2>
        <ul>
          <li v-for="skill in offer.skills" :key="skill">{{ skill }}</li>
        </ul>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol } from "mdbvue";
import axios from "axios";
export default {
  name: "Offer",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol
    // mdbBtn
  },
  data() {
    return {
      offer: null
    };
  },
  // Whenever the component is built...
  mounted() {
    const OFFER_URL = this.$route.params.url;
    this.getOffer(OFFER_URL);
  },
  methods: {
    getOffer(offerUrl) {
      axios.get("/api/offers/" + offerUrl).then(response => {
        if (response.data.status === "success") {
          this.offer = response.data.offer;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
