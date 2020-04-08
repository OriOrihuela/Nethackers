<template>
  <div id="main-page">
    <mdb-container>
      <!-- ENTRY CONTENT -->
      <mdb-row>
        <mdb-col col="12"
          ><h1>Nethackers</h1>
          <h5>
            Encuentra y publica trabajos para Desarrolladores Web
          </h5>
          <mdb-btn color="default" id="new"
            >Pulsar para crear nueva oferta</mdb-btn
          ></mdb-col
        >
      </mdb-row>

      <!-- OFFERS LIST -->
      <mdb-row>
        <mdb-col col="12">
          <OffersList></OffersList>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn } from "mdbvue";
import OffersList from "./OffersList";

export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    OffersList,
  },
};
</script>

<style lang="scss" scoped>
#main-page {
  .row {
    text-align: justify;
    margin-bottom: 50px;
    #new {
      margin-left: 0;
    }
  }
}
</style>
