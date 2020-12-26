
<template>
  <div class="containers">
    <div class="popContainer" v-show="writeMessageShow" @click="writeMessageFun($event)">
      <div class="messageMaskContent" ref="msk">
        <div class="nav">微信登录</div>
        <!-- <div >
          <img src="../assets/images/foot-wxs.png" />
        </div>-->
        <div class="imgSrc" id="login_container"></div>
        <div class="foot">
          <button>
            请使用微信扫描二维码登录
            “银领人才网”
          </button>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="form">
        <div class="photo">
          <div style="margin:72px 0 0 85px">
            <img style="height:402px;" :src="require('../assets/images/login-photo.png')" />
          </div>
          <div class="formlet" style="margin:63px 0 0 104px">
            <div class="headers">
              <span class="deng">登录</span>
              <el-button
                style="color:#373737;font-size:16px;font-wight:500;text-align:right"
                @click="business"
                type="text"
              >企业用户</el-button>
            </div>
            <div class="formls">
              <el-form ref="form" :rules="rules" :model="form" label-width="-60px">
                <el-form-item label prop="tel">
                  <el-input
                    prefix-icon="el-icon-mobile-phone"
                    style="width:270px;height:43px;"
                    v-model.number="form.tel"
                    placeholder="请输入登录手机号"
                  ></el-input>
                </el-form-item>
                <el-form-item label prop="password">
                  <el-input
                    prefix-icon="el-icon-lock"
                    :type="show.old?'text':'password'"
                    style="width:270px;height:43px;"
                    placeholder="请输入密码"
                    v-model="form.password"
                  >
                    <img
                      :src="show.old?require('../assets/images/yan.png'):require('../assets/images/bi.png')"
                      slot="suffix"
                      alt
                      style="margin:0 5px 0 0"
                      @click="show.old=!show.old"
                    />
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    style="margin:-20px 0 0 35px;float:right;font-size:14px;color:#818181;font-family: PingFangSC-Regular;"
                    type="text"
                    @click="gotoResetPwdUI"
                  >忘记密码？</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    style="width:202px;height:43px;margin:20px 0 0 0;background:#02B9B8;color:#fff;border-radius:21px"
                    class="full"
                    @click="onSubmit"
                  >立即登录</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="adjunctive">
              <div class="adjunctive-nav" @click="wxLogin">
                <img src="../assets/images/wx.png" alt="微信登录" />
                <div>微信登录</div>
              </div>
              <div class="adjunctive-aside" @click="gotoRegisterUI">立即注册</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomizedFooter from "components/customized-footer.vue";
// import CustomizedNav from "components/customized-nav.vue";
// import PasswordInput from "components/password-input.vue";
import { brief } from "apis/account";
import { mapMutations } from "vuex";
import { DONE_LOGIN } from "store/mutation-types";
import { watch } from "fs";
import Cookies from "js-cookie";
export default {
  name: "login",
  components: {
    CustomizedFooter
    // CustomizedNav,
    // PasswordInput
  },
  data() {
    return {
      form: {
        tel: "",
        password: ""
      },
      writeMessageShow: false,
      show: {
        old: false,
        new: false,
        check: false
      },
      rules: {
        tel: [
          {
            required: true,
            message: "请输入登录手机号",
            trigger: ["change", "blur"]
          },
          {
            type: "number",
            message: "手机号必须为数字值",
            trigger: ["change", "blur"]
          },
          {
            pattern: /^[1][356789][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: ["change", "blur"]
          }
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: ["change", "blur"]
          }
          // { pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/,message: '请输入正确密码', trigger: ['change','blur'] },
        ]
      }
    };
  },
  methods: {
    ...mapMutations([DONE_LOGIN]),
    //微信扫码
    wxLogin() {
      this.writeMessageShow = true;

      // let redirectUrl = encodeURIComponent(window.origin + "/api/" + this.url);
      // console.log(redirectUrl);
      var obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        appid: "wxbca1daaa5765cc51",
        scope: "snsapi_login",
        redirect_uri: "http://www.yinlinkrc.com/wxlogin",
        state: "asdsfdfgwerwrer2345325123",
        style: "black"
      });
    },
    //遮罩层
    writeMessageFun(ev) {
      if (!this.$refs.msk.contains(ev.target)) {
        this.writeMessageShow = false;
      }
    },
    onSubmit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          // const devMode = process.env.VUE_APP_DEV_MODE
          // devMode ? `/login?returnUrl=http://${document.location.host}/api/resume/brief` : '/login?returnUrl=/resume/brief'
          // `/login?returnUrl=http://${document.location.host}/api/resume/brief`
          // `/login?returnUrl=/resume/brief`
          this.$_http
            .post(`/consumer-user/login/phone-pwd`, {
              username: this.form.tel,
              password: this.form.password
            })
            .then(res => {
              console.log(res);
              if (res.request.status == 200) {
                let token = res.headers["auth-token"];
                Cookies.set("token", token);
                window.sessionStorage.setItem("user", this.form.tel);
                this.brief();
              } else {
                return false;
              }
            })
            .catch(error => {
              this.$notify.info({
                title: "消息",
                message: "输入有误，请重新输入"
              });
            });
        } else {
          return false;
        }
      });
    },
    //获取简历简讯
    brief() {
      this.$http
        .get("/consumer-core/resume/brief")
        .then(res => {
          if (res.data.data.base !== null) {
            this.$storerouter.state.avatarUrl = res.data.data.base.avatarUrl;
          } else {
          }
          this.$router.push({ path: "/home" });
        })
        .catch(error => {});
    },
    gotoHomeUI() {
      this.$router.push({ path: "/" });
    },
    gotoRegisterUI() {
      this.$router.push({ path: "register" });
    },
    gotoResetPwdUI() {
      this.$router.push({ path: "reset-password" });
    },
    business() {
      window.open("https://www.yinlinkrc.com/business/#/login");
    }
  },

  computed: {
    isFollow() {
      return this.$store.state.avatarUrl; //需要监听的数据
    }
  },
  watch: {
    isFollow(newVal, oldVal) {
      console.log(newVal);
    }
  },

  created() {
    // this.$cookies.get("session");
  },
  watch: {
    oldsix: function() {
      if (this.oldsix === false) {
        alert(11);
        this.old = false;
      } else {
        this.old = true;
      }
    }
  }
};
</script>


<style lang="stylus">
.containers {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  width: 1440px;
  height: 900px;
  background-image: url('../assets/images/login.jpg');
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  .body {
    .form {
      background: #FFFFFF;
      width: 940px;
      height: 546px;
      box-shadow: 0px 5px 44px 0px rgba(0, 128, 127, 0.5);
      border-radius: 3px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;

      .photo {
        display: flex;
        flex-direction: row;

        .formlet {
          display: flex;
          flex-direction: column;
          width: 270px;

          .headers {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 20px;

            .deng {
              font-family: PingFangSC-Medium;
              color: #02B9B8;
              font-size: 24px;
            }
          }

          .formls {
            margin: 30px 0 0 0;

            .el-input__inner {
              background-color: #f7f7f7;
              border: none;
            }

            .el-input__inner:focus {
              border: 1px solid #CCCCCC;
              background-color: #ffffff;
            }

            .el-form-item.is-error .el-input__inner {
              border-color: #f56c6c;
            }
          }

          .adjunctive {
            cursor: pointer;
            font-family: PingFangSC-Regular;
            color: #373737;
            font-size: 14px;
            display: flex;
            flex-direction: row;
            margin: 0 auto;

            .adjunctive-nav {
              font-family: PingFangSC-Regular;
              color: #848484;
              display: flex;
              flex-direction: row;

              div {
                margin: 0 0 0 5px;
              }
            }

            .adjunctive-aside {
              font-family: PingFangSC-Regular;
              color: #01AFAF;
              margin: 0 0 0 30px;
            }
          }
        }
      }
    }
  }
}

.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #323232;
  opacity: 0.9;
  z-index: 1000;

  .messageMaskContent {
    position: relative;
    left: 0;
    width: 50%;
    top: 30;
    margin: auto;

    .nav {
      font-family: PingFangSC-Medium;
      color: #FFFFFF;
      font-size: 20px;
      margin: 230px 0 0 0;
    }

    .imgSrc {
      margin: 20px 0 0 0;

      img {
        width: 284px;
      }
    }

    .foot {
      button {
        background: #222324;
        width: 286px;
        height: 66px;
        font-family: PingFangSC-Medium;
        color: #FFFFFF;
        font-size: 16px;
        border-radius: 33px;
        border: 1px solid #222324;
        padding: 0 47px;
        margin: 10px 0 0 0;
      }
    }
  }
}
</style>