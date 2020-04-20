<template>
  <mdb-container id="config-panel"
    ><!-- ENTRY CONTENT -->
    <mdb-row>
      <mdb-col col="12"
        ><h1>Panel de administración</h1>
        <h5>
          Crea y administra tus ofertas de empleo
        </h5></mdb-col
      >
    </mdb-row>
    <hr />
    <mdb-row>
      <!-- EDIT PROFILE -->
      <mdb-col col="12" sm="6" class="mt-5">
        <div class="text-center">
          <mdb-btn outline="primary" type="button" @click="toEditProfile"
            >Editar perfil <mdb-icon icon="user-alt" class="ml-1"
          /></mdb-btn></div
      ></mdb-col>
      <!-- CREATE NEW OFFER -->
      <mdb-col col="12" sm="6" class="mt-5">
        <div class="text-center">
          <mdb-btn outline="secondary" type="button" @click="toCreateOffer"
            >Crear nueva oferta <mdb-icon icon="plus" class="ml-1"
          /></mdb-btn></div></mdb-col
    ></mdb-row>
  </mdb-container>
</template>

<script>
import { mdbRow, mdbCol, mdbContainer, mdbBtn, mdbIcon } from "mdbvue";
export default {
  name: "ConfigPanel",
  components: {
    mdbRow,
    mdbCol,
    mdbContainer,
    mdbBtn,
    mdbIcon,
  },
  methods: {
    // Redirect the user to create offer page.
    toCreateOffer() {
      this.$router.push("/offers/new");
    },

    // Redirect the user to edit profile page.
    toEditProfile() {
      this.$router.push("/edit-profile");
    },
  },
};
</script>

<style lang="scss" scoped></style>
