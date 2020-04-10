<template>
  <div id="offers-list">
    <hr />
    <!-- MAIN TITLE -->
    <h2>Lista de ofertas</h2>
    <mdb-row class="offer">
      <!-- COMPANY AND JOB -->
      <mdb-col col="6" sm="3">
        <h3>Facebook</h3>
        <p class="tag">React Developer</p>
      </mdb-col>
      <!-- JOB LOCATION -->
      <mdb-col col="6" sm="3">
        <p class="tag">Ubicación</p>
        <p class="location-type">Remoto</p>
      </mdb-col>
      <!-- CONTRACT TYPE -->
      <mdb-col col="6" sm="3">
        <p class="tag">Contrato</p>
        <p class="name">Tiempo Completo</p>
      </mdb-col>
      <!-- MORE INFO ABOUT THE OFFER -->
      <mdb-col col="6" sm="3">
        <mdb-btn color="info">Más info</mdb-btn>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
import { mdbBtn, mdbRow, mdbCol } from "mdbvue";

export default {
  name: "OffersList",
  components: {
    mdbBtn,
    mdbRow,
    mdbCol,
  },
};
</script>

<style lang="scss" scoped>
#offers-list {
  h2 {
    margin-bottom: 50px;
  }
  .offer {
    .tag {
      font-family: "Verdana";
      font-weight: bold;
    }
  }
}
</style>
