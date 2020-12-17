<template>
  <div id="appa">
    <el-backtop
      style="z-index:300"
      target="#appa"
      :bottom="100"
      :right="120"
      :visibility-height="100"
    >
      <div class="top" v-if="this.state === true">
        <img
          @click="handleClick"
          style="width: 58px;height: 58px;"
          src="../../assets/images/top.png"
        />
      </div>
      <div class="top" v-else>
        <img style="width: 58px;height: 58px;" src="../../assets/images/tops.png" />
      </div>
    </el-backtop>
    <customized-nav :scroll="this.scroll" />
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
      scroll: "",
      state: true
    };
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
  min-width: 1280px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ffffff;
  overflow: auto;
}
main {
  width: 1445px;
  margin: auto;
}
</style>
