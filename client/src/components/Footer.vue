<template>
  <div id="footer">
    <!-- FOOTER -->
    <mdb-footer color="mdb-color darken-2" class="font-small pt-0">
      <mdb-container>
        <mdb-row>
          <mdb-col md="12">
            <div class="mb-5 flex-center">
              <!-- FACEBOOK -->
              <a
                class="fb-ic"
                href="https://www.facebook.com/eduardo.orihuela.56"
                ><i
                  class="fab link fa-facebook fa-lg white-text mr-md-5 mr-3 fa-2x"
                >
                </i
              ></a>
              <!-- LINKEDIN -->
              <a
                class="li-ic"
                href="https://www.linkedin.com/in/eduardo-orihuela-verdugo-7616a7167/"
                ><i
                  class="fab link fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"
                >
                </i
              ></a>
              <!-- INSTAGRAM -->
              <a class="ins-ic" href="https://www.instagram.com/oriorihuela/"
                ><i
                  class="fab link fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"
                >
                </i
              ></a>
            </div>
          </mdb-col>
        </mdb-row>
      </mdb-container>
      <div class="footer-copyright text-center py-3">
        <mdb-container fluid>
          &copy; 2020 Copyright:
          <a href="https://github.com/OriOrihuela" class="link">
            OriOrihuela
          </a>
        </mdb-container>
      </div>
    </mdb-footer>
  </div>
</template>

<script>
import { mdbFooter, mdbContainer, mdbRow, mdbCol } from "mdbvue";
export default {
  name: "Footer",
  components: {
    mdbFooter,
    mdbContainer,
    mdbRow,
    mdbCol,
  },
};
</script>

<style lang="scss" scoped>
#footer {
  margin-top: 75px;
  .flex-center {
    justify-content: space-evenly;
  }
  .link:hover {
    color: #b3bfc0 !important;
    transition: color 0.2s linear;
  }
}
</style>
