<template>
  <div class="footer">
    <div class="nav">
      <div class="appendix" v-if="!showSimple">
        <div class="group-active">
          <span @click="introduce">企业介绍</span>
          <span @click="introduce(false)">投诉建议</span>
          <span @click="gotoUserPrivacyLicenseUI">用户协议</span>
        </div>
        <div class="group-infor">
          <span>公司：上海银领网络科技有限公司</span>
          <span>地址：上海市静安区大众东朔空间1206</span>
          <span>邮编：200436</span>
          <span>邮箱：Nicole.yin@yinlinkrc.com</span>
        </div>
        <div class="group-contact">
          <span>
            <img src="../assets/images/logo.png" />
          </span>
          <span>企业热线 021 66271773</span>
          <span>工作日 09:30 - 18:30</span>
          <span>休息日 Sat. Sun.</span>
        </div>
        <div class="group-wx">
          <span>
            <img src="../assets/images/foot-wx.png" />
          </span>
          <span>微信小程序</span>
        </div>
        <div class="group-wxs">
          <span>
            <img src="../assets/images/foot-wxs.png" />
          </span>
          <span>微信公众号</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="copyright">
        <span>上海银领网络科技有限公司 沪ICP备19030136号-1</span>
        <span>
          <img style="height:15px;width:15px" :src="require('../assets/images/guo.png')" />
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010602005194"
            style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
          >
            <!-- <img src style="float:left;" /> -->
            <p
              style="float:left;height:20px;line-height:25px;margin: 0px 0px 0px 5px; color: #4A4A4A;;"
            >沪公网安备 31010602005194号</p>
          </a>
        </span>
      </div>
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
    gotoUserPrivacyLicenseUI() {
      window.open(
        this.$router.resolve({ name: "user-license" }).href,
        "_blank"
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
.footer {
  background: #FFFFFF;
  height: 407px;
  position: relative;
  cursor: pointer;
  z-index: 200;

  .nav {
    box-shadow: 0px 0px 3px 0px rgba(180, 180, 180, 0.4);
    height: 407px;
    width: 1440px;
    margin: 0 auto;

    .appendix {
      display: flex;
      width: 1440px;
      flex-direction: row;
      margin: 0 auto;

      .group-contact {
        display: flex;
        flex-direction: column;
        margin: 47px 0 0 80px;
        font-family: PingFangSC-Regular;
        color: #4A4A4A;
        font-size: 18px;
        text-align: left;

        span {
          padding: 15px 0 0 0;
        }

        img {
          width: 148px;
          height: 37px;
        }
      }

      .group-infor {
        display: flex;
        flex-direction: column;
        margin: 47px 0 0 0;
        font-family: PingFangSC-Regular;
        color: #4A4A4A;
        font-size: 18px;
        text-align: left;

        span {
          padding: 20px 0 0 0;
        }
      }

      .group-active {
        display: flex;
        flex-direction: column;
        margin: 31px 80px 0 125px;
        font-size: 22px;
        text-align: center;
        font-family: PingFangSC-Medium;
        color: #454545;

        span {
          padding: 36px 0 0 0;
        }
      }

      .group-wx {
        margin: 64px 0 0 168px;
        display: flex;
        flex-direction: column;

        img {
          width: 124px;
          height: 124px;
        }

        span {
          font-family: PingFangSC-Regular;
          color: #2C2C2C;
          font-size: 18px;
        }
      }

      .group-wxs {
        margin: 64px 0 0 33px;
        display: flex;
        flex-direction: column;

        img {
          width: 124px;
          height: 124px;
        }

        span {
          font-family: PingFangSC-Regular;
          color: #2C2C2C;
          font-size: 18px;
        }
      }
    }

    .line {
      width: 100%;
      border: 0.5px solid rgba(227, 227, 227, 0.5);
      margin: 40px 0 0 0;
    }

    .copyright {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      color: #4A4A4A;
      margin: 40px 0 93px 0;
    }
  }
}
</style>
