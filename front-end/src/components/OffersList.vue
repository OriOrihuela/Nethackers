<template>
  <div id="offers-list">
    <hr />
    <h2>Lista de ofertas</h2>
    <mdb-row class="oferta">
      <mdb-col col="6" sm="3">
        <h3>Facebook</h3>
        <p class="puesto">React Developer</p>
      </mdb-col>
      <mdb-col col="6" sm="3">
        <p class="etiqueta">Ubicación</p>
        <p class="nombre">Remoto</p>
      </mdb-col>
      <mdb-col col="6" sm="3">
        <p class="etiqueta">Contrato</p>
        <p class="nombre">Tiempo Completo</p>
      </mdb-col>
      <mdb-col col="6" sm="3">
        <mdb-btn color="green">Más info</mdb-btn>
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
}
</style>
