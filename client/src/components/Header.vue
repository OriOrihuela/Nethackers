<template>
  <div id="header">
    <mdb-navbar color="mdb-color lighten-1" position="top" dark>
      <!-- MAIN TITLE -->
      <mdb-navbar-brand>
        Nethackers
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <!-- HOME ICON -->
          <mdb-nav-item to="/" active><mdb-icon icon="home"/></mdb-nav-item>
        </mdb-navbar-nav>
        <!--SEARCH FORM -->
        <form>
          <mdb-input
            type="text"
            class="text-white"
            placeholder="Search"
            aria-label="Search"
            label
            navInput
            waves
            waves-fixed
          />
        </form>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </div>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbInput,
  mdbIcon
} from "mdbvue";

export default {
  name: "Header",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbInput,
    mdbIcon
  }
};
</script>

<style lang="scss" scoped>
#header {
  margin-bottom: 150px;
}
</style>
