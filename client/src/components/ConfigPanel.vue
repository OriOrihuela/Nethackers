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
      <!-- EDIT PROFILE BUTTON -->
      <mdb-col col="12" sm="6" class="my-5">
        <div class="text-center">
          <mdb-btn outline="primary" type="button" @click="toEditProfile"
            >Editar perfil <mdb-icon icon="user-alt" class="ml-1"
          /></mdb-btn></div
      ></mdb-col>
      <!-- CREATE NEW OFFER BUTTON -->
      <mdb-col col="12" sm="6" class="my-5">
        <div class="text-center">
          <mdb-btn outline="secondary" type="button" @click="toCreateOffer"
            >Crear nueva oferta <mdb-icon icon="plus" class="ml-1"
          /></mdb-btn></div></mdb-col
    ></mdb-row>
    <hr />
    <!-- EACH OFFER MADE BY THE RECRUITER ITSELF -->
    <div v-if="offers && offers.length >= 1">
      <h2 class="my-5 text-center">Tus ofertas</h2>
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
          <p v-if="offer.candidates.length > 1">
            {{ offer.candidates.length }} Candidat@s
          </p>
          <p v-else-if="offer.candidates.length === 1">1 Candidat@</p>
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
        <!-- OFFER MENU BUTTONS -->
        <mdb-col class="mt-3" col="12" sm="3"
          ><mdb-row>
            <mdb-col class="mt-2" col="12">
              <mdb-btn color="info" @click="editOffer(offer.url)"
                >Editar <mdb-icon icon="edit"
              /></mdb-btn>
            </mdb-col>
            <mdb-col class="mt-2" col="12">
              <mdb-btn color="default" @click="getCandidates(offer.url)"
                >Candidatos <mdb-icon icon="user"
              /></mdb-btn>
            </mdb-col>
            <mdb-col class="mt-2" col="12">
              <mdb-btn color="danger" @click="removeOffer(offer.url)"
                >Borrar <mdb-icon icon="trash"
              /></mdb-btn>
            </mdb-col> </mdb-row
        ></mdb-col>
      </mdb-row>
    </div>
    <div v-else-if="offers && offers.length < 1" class="text-center">
      <!-- NO OFFERS -->
      <mdb-row>
        <mdb-col col="12 my-5">
          <h2>No hay ofertas que mostrar</h2>
        </mdb-col>
      </mdb-row>
    </div>
    <div v-else class="text-center">
      <!-- LOADING CONTENT -->
      <mdb-row>
        <mdb-col col="12 my-5">
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
// Required imports.
import { mdbRow, mdbCol, mdbContainer, mdbBtn, mdbIcon } from "mdbvue";
import axios from "axios";
import swal from "sweetalert";

export default {
  // Name of the component.
  name: "ConfigPanel",

  // Registered components within this one.
  components: {
    mdbRow,
    mdbCol,
    mdbContainer,
    mdbBtn,
    mdbIcon,
  },

  // Properties of this component.
  data() {
    return {
      offers: null,
    };
  },

  // Custom methods of this component.
  methods: {
    // Redirect the user to create offer page.
    toCreateOffer() {
      this.$router.push("/offers/new");
    },

    // Redirect the user to edit profile page.
    toEditProfile() {
      this.$router.push("/edit-profile");
    },

    // Redirect to the view of a single offer.
    editOffer(url) {
      this.$router.push(`/offers/edit/${url}`);
    },

    // Redirect to the view of all the candidates who applied the offer.
    getCandidates(url) {
      this.$router.push(`/candidates/${url}`);
    },

    // Remove the offer made by the recruiter itself.
    removeOffer(url) {
      // Alert the user about the next operation.
      swal({
        title: "¿Está seguro de querer borrar la oferta?",
        text: "Una vez borrada, será irrecuperable",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          // If user accepts to delete the offer...
          if (willDelete) {
            // Make an AJAX request using axios and pass the url of the current offer.
            axios.delete("/api/offers/delete/" + url).then((response) => {
              // If everything went fine...
              if (response.data.status === "success") {
                // Tell the user the offer has been deleted.
                swal(
                  "Oferta borrada",
                  "La oferta se ha borrado correctamente. Redirigiendo...",
                  "success",
                  { button: false }
                );
                // Reload the page.
                setTimeout(() => {
                  location.reload();
                }, 2000);
              }
            });
          }
        })
        .catch((error) => {
          // If there's any error...
          if (error) {
            swal(
              "Oferta no borrada",
              "La oferta no se ha borrado correctamente",
              "error"
            );
          }
        });
    },
  },
  mounted() {
    // Make an AJAX request using axios to retrieve all the offer of the current recruiter.
    axios
      .get("/api/config-panel", { withCredentials: true })
      .then((response) => {
        // If everything went fine...
        if (response.data.status === "success") {
          // Populate the offers.
          this.offers = response.data.offers;
        }
      })
      .catch((error) => {
        // If there's any error...
        if (error) {
          swal("Error", "No hay ofertas creadas por ti", "error");
        }
      });
  },
};
</script>

<style lang="scss" scoped>
#config-panel {
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
