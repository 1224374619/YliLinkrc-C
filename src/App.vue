<template>
  <div id="app">
    <!-- <customized-nav class="nav"/> -->
    <router-view/>
    <!-- <customized-footer :showSimple="true" /> -->
  </div>
</template>

<script>
// import CustomizedFooter from "components/customized-footer.vue";
// import CustomizedNav from "components/customized-nav.vue";
export default {
  name: "",
  components: {
    // CustomizedFooter,
    // CustomizedNav,
    // PasswordInput
  },
};
</script>
<style>

@import "./common/font/font.css";

html, body {
  margin: 0;   
  height: 100%;
  background-color: #f0f0f0
}
#app {
  height:100%;
  min-width:1280px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  background: #ffffff;
}
</style>
