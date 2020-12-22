<template>
  <div id="app">
    <!-- <customized-nav class="nav"/> -->
    <el-backtop
      style="z-index:300"
      target="#app"
      :bottom="100"
      :right="120"
      :visibility-height="100"
    >
      <div class="top" v-if="this.state === true">
        <img
          @click="handleClick"
          style="width: 58px;height: 58px;"
          src="../src/assets/images/top.png"
        />
      </div>
      <div class="top" v-else>
        <img style="width: 58px;height: 58px;" src="../src/assets/images/tops.png" />
      </div>
    </el-backtop>
    <router-view />
    <!-- <customized-footer :showSimple="true" /> -->
  </div>
</template>

<script>
import CustomizedFooter from "components/customized-footer.vue";
import CustomizedNav from "components/customized-nav.vue";
export default {
  name: "",
  data() {
    return {
      scroll: "",
      state: true
    };
  },
  components: {
    CustomizedFooter,
    CustomizedNav
    // PasswordInput
  },
  methods: {
    handleClick() {
      console.log(this.scroll);
      if (this.scroll > 0) {
        this.state = false;
      } else {
        this.state = true;
      }
    },
    handleScroll(e) {
      this.scroll = e.target.scrollTop;
      if (this.scroll === 0) {
        setTimeout(() => {
          this.state = true;
        }, 1000);
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  }
};
</script>
<style>
@import "./common/font/font.css";

html,
body {
  margin: 0;
  height: 100%;
  background-color: #f0f0f0;
}
#app {
  height: 100%;
  min-width: 1280px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  background: #ffffff;
  overflow-y: scroll;
}
</style>
