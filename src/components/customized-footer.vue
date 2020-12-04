<template>
  <div class="footer">
    <div class="appendix" v-if="!showSimple">
      <div class="group">
        <span>公司：上海银领网络科技有限公司</span>
        <span>地址：上海市静安区大众东朔空间1206</span>
        <span>邮编：200436</span>
        <span>电话：021 56057115</span>
        <span>邮箱：Nicole.yin@yinlinkrc.com</span>
      </div>
      <div class="groups">
        <span @click="introduce">企业介绍</span>
        <span @click="introduce(false)">投诉建议</span>
        <span @click="introduceXy">用户协议</span>
      </div>
    </div>
    <div class="copyright">
      <span>上海银领网络科技有限公司 沪ICP备19030136号-1</span>
      <span>
        <img style="height:15px" :src="require('../assets/images/guo.png')" />
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010602005194"
          style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
        >
          <img src style="float:left;" />
          <p
            style="float:left;height:20px;line-height:25px;margin: 0px 0px 0px 5px; color:#939393;"
          >沪公网安备 31010602005194号</p>
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "customized-footer",
  props: {
    showSimple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    introduce(id) {
      this.$router.push({ path: "/aboutus/" + id });
    },
    introduceXy() {
      this.$router.push({ path: "/user-license" });
    }
  }
};
</script>

<style lang="stylus" scoped>
.footer {
  background-color: #E1E1E1;
  margin: 0 0 0 0;
  height: 290px;
  position: relative;
  cursor: pointer;
  z-index: 200;

  .appendix {
    display: flex;
    width: 1440px;
    margin: auto;
    flex-direction: column;

    .group {
      display: flex;
      flex-direction: row;
      color: #ffffff;
      margin: 59px 0 0 100px;

      span {
        font-size: 16px;
        font-weight: 500;
        color: #555555;
        text-align: left;
        padding-left: 27px;
      }
    }

    .groups {
      display: flex;
      flex-direction: row;
      color: #ffffff;
      margin: 24px auto;

      span {
        font-size: 20px;
        font-weight: 500;
        color: #3A3A3A;
        text-align: center;
        padding-left: 40px;
        margin-right: 40px;
      }
    }

    .copyright {
      font-size: 14px;
      color: #555555;
      margin: 26px auto 106px;
    }
  }
}
</style>
