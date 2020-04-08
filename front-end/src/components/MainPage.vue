<template>
  <div id="main-page">
    <mdb-container>
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
    </mdb-container>
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn } from "mdbvue";
export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
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
</style>
