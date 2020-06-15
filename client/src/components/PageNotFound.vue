<template
  ><mdb-container id="candidates">
    <div class="text-center">
      <mdb-row class="my-5">
        <!-- DARTH VADER IMAGE -->
        <mdb-col col="12">
          <img
            class="img-fluid"
            src="../assets/images/vader-404.png"
            alt="vader"
          />
        </mdb-col>
      </mdb-row>
      <hr />
      <!-- RANDOM INFO -->
      <mdb-row class="my-5">
        <mdb-col col="12"
          ><h1 class="my-4">¡Woops!</h1>
          <h3>
            No moleste a Lord Vader. Por su seguridad, vuelva a la página de
            inicio.
          </h3></mdb-col
        >
      </mdb-row>
    </div>
  </mdb-container>
</template>

<script>
// Required imports.
import { mdbContainer, mdbRow, mdbCol } from "mdbvue";

export default {
  // Name of the component.
  name: "PageNotFound",

  // Registered components within this one.
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
  },
};
</script>

<style lang="scss" scoped></style>
