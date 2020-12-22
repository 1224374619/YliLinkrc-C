<template>
  <div id="appa">

    <customized-nav />
    <main>
      <router-view />
    </main>
    <customized-footer />
  </div>
</template>

<script>
import CustomizedFooter from "components/customized-footer.vue";
import CustomizedNav from "components/customized-nav.vue";

export default {
  name: "layout-front",
  data() {
    return {
    };
  },

  
  components: {
    CustomizedFooter,
    CustomizedNav
  }
};
</script>
<style>
#appa {
  height: 100%;
  min-width: 1440px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ffffff;
  /* overflow-x: hidden; */
  /* overflow: auto; */
}
main {
  width: 1440px;
  margin: auto;
}
</style>
