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
      <mdb-col col="12" sm="6" class="my-5">
        <div class="text-center">
          <mdb-btn outline="primary" type="button" @click="toEditProfile"
            >Editar perfil <mdb-icon icon="user-alt" class="ml-1"
          /></mdb-btn></div
      ></mdb-col>
      <!-- CREATE NEW OFFER -->
      <mdb-col col="12" sm="6" class="my-5">
        <div class="text-center">
          <mdb-btn outline="secondary" type="button" @click="toCreateOffer"
            >Crear nueva oferta <mdb-icon icon="plus" class="ml-1"
          /></mdb-btn></div></mdb-col
    ></mdb-row>
    <hr />
    <h2 class="my-5 text-center">Tus ofertas</h2>
    <div v-if="offers">
      <mdb-row
        class="my-5 text-center"
        v-for="(offer, index) in offers"
        :key="offer._id"
        :class="{ oddOffer: index % 2 === 0 }"
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
        <!-- OFFER MENU -->
        <mdb-col class="mt-3" col="12" sm="3"
          ><mdb-row>
            <mdb-col class="mt-2" col="12">
              <mdb-btn color="info" @click="editOffer(offer.url)"
                >Editar <mdb-icon icon="edit"
              /></mdb-btn>
            </mdb-col>
            <mdb-col class="mt-2" col="12">
              <mdb-btn color="default" @click="getCandidates(offer._id)"
                >Candidatos <mdb-icon icon="user"
              /></mdb-btn>
            </mdb-col>
            <mdb-col class="mt-2" col="12">
              <mdb-btn color="danger" @click="removeOffer(offer._id)"
                >Borrar <mdb-icon icon="trash"
              /></mdb-btn>
            </mdb-col> </mdb-row
        ></mdb-col>
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
import { mdbRow, mdbCol, mdbContainer, mdbBtn, mdbIcon } from "mdbvue";
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "ConfigPanel",
  components: {
    mdbRow,
    mdbCol,
    mdbContainer,
    mdbBtn,
    mdbIcon,
  },
  data() {
    return {
      offers: null,
    };
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

    // Redirect to the view of a single offer.
    editOffer(url) {
      this.$router.push(`/offers/edit/${url}`);
    },

    // Redirect to the view of all the candidates who applied the offer.
    getCandidates(id) {
      this.$router.push(`/candidates/${id}`);
    },

    // Remove the offer.
    removeOffer(id) {
      swal({
        title: "¿Está seguro de querer borrar la oferta?",
        text: "Una vez borrada, será irrecuperable",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete("/api/offers/delete/" + id).then((response) => {
              if (response.data.status === "success") {
                // Tell the user the offer has been deleted.
                swal(
                  "Oferta borrada",
                  "La oferta se ha borrado correctamente",
                  "success",
                  { button: false }
                );
                // Reload the page.
                setTimeout(() => {
                  location.reload();
                }, 2500);
              }
            });
          }
        })
        .catch((error) => {
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
    axios
      .get("/api/config-panel", { withCredentials: true })
      .then((response) => {
        if (response.data.status === "success") {
          this.offers = response.data.offers;
        }
      })
      .catch((error) => {
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
  .oddOffer {
    background-color: rgb(245, 245, 245);
    border-radius: 15px;
  }
}
</style>
