<template
  ><mdb-container id="main-page">
    <!-- ENTRY CONTENT -->
    <mdb-row class="mb-4">
      <mdb-col col="12"
        ><h1>Nethackers</h1>
        <h5 class="my-3">
          Encuentra y publica trabajos para Desarrolladores Web
        </h5>
        <!-- CREATE NEW OFFER BUTTON -->
        <mdb-btn color="green" id="new" @click="createNewOffer"
          >Crear nueva oferta</mdb-btn
        ></mdb-col
      >
    </mdb-row>
    <hr class="mb-5"/>
    <!-- OFFERS LIST -->
    <OffersList></OffersList
  ></mdb-container>
</template>

<script>
// Required imports
import { mdbContainer, mdbRow, mdbCol, mdbBtn } from "mdbvue";
import OffersList from "./OffersList";

export default {
  // Name of the component.
  name: "MainPage",

  // Registered components within this one.
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    OffersList,
  },

  // Custom methods of this component.
  methods: {
    createNewOffer() {
      this.$router.push("/offers/new");
    },
  },
};
</script>

<style lang="scss" scoped>
#main-page {
  .row {
    text-align: justify;
    #new {
      margin-left: 0;
    }
  }
}

@media (max-width: 425px) {
  #main-page {
    .row {
      text-align: center;
    }
  }
}
</style>
