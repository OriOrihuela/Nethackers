<template>
  <div id="header">
    <mdb-navbar color="black" position="top" dark>
      <mdb-navbar-brand>
        Nethackers
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <mdb-nav-item to="/" active
            ><mdb-btn><mdb-icon icon="home"/></mdb-btn
          ></mdb-nav-item>
        </mdb-navbar-nav>
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
  mdbIcon,
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
    mdbIcon,
  },
};
</script>

<style lang="scss" scoped>
#header {
  margin-bottom: 150px;
}
</style>
