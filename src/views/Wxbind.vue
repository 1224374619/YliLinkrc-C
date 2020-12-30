<template>
  <div class="containers">
    <div class="body">
      <div class="form">
        <div class="photo">
          <div style="margin:72px 0 0 85px">
            <img style="height:402px;" :src="require('../assets/images/login-photo.png')" />
          </div>
          <div class="formlet" style="margin:63px 0 0 104px">
            <div class="header">
              <div class="header-nav">
                <div>
                  <img src="../assets/images/register.png" />
                </div>
                <div style="margin:0 0 0 5px">已有银领账号，请绑定</div>
              </div>
              <div class="header-footer">完成绑定后可以微信账号一键登录</div>
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
                  <!-- <password-input v-model="form.password" /> -->
                </el-form-item>
                <el-form-item label prop="captcha">
                  <captcha :fromData="this.form.tel" v-model="form.captcha" />
                </el-form-item>
                <!-- <el-form-item prop="checkLicense" style="margin:-15px 0 20px 5px;">
                  <el-checkbox style="margin:0 100px 20px 0;" v-model="form.checkLicense">
                    我已同意
                    <el-button
                      style="color:#02B9B8;font-size:14px;"
                      type="text"
                      @click="gotoUserPrivacyLicenseUI"
                    >《用户协议及隐私策略》</el-button>
                  </el-checkbox>
                </el-form-item>-->
                <el-form-item>
                  <el-button
                    style="width:202px;height:43px;background:#02B9B8;color:#fff;border-radius:21px;margin:45px 0 0 0"
                    class="full"
                    @click="onSubmit"
                  >确认绑定</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="adjunctive">
              <span>没有银领账号，</span>
              <span @click="gotoRegisterUI">立即注册</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Captcha from "components/captcha.vue";
import Cookies from "js-cookie";
export default {
  name: "register",
  components: {
    // CustomizedFooter,
    // CustomizedNav,
    Captcha
    // PasswordInput,
  },
  data() {
    return {
      wxbind: "",
      form: {
        tel: "",
        password: "",
        captcha: "",
        checkLicense: false
      },

      show: {
        old: false,
        new: false,
        check: false
      },
      disabled: false,
      rules: {
        tel: [
          { required: true, message: "请输入登录手机号", trigger: "blur" },
          {
            pattern: /^[1][356789][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: ["change", "blur"]
          }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/,
            message: "密码限6-24位数字和字母",
            trigger: ["change", "blur"]
          }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    gotoHomeUI() {
      this.$router.push({ path: "/" });
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$local
            .post("consumer-user/account/wechat/binding/login", {
              accessTokenVO: JSON.parse(this.wxbind),
              phoneChangeBody: {
                phone: this.form.tel,
                password: this.form.password,
                vcode: this.form.captcha
              }
            })
            .then(res => {
              if (res.data.code == "200") {
                let token = res.headers["auth-token"];
                Cookies.set("token", token);
                window.sessionStorage.setItem("user", this.form.tel);
                this.$router.push({ path: "/home" });
              }
            })
            .catch(error => {
              if (error.response.status === 404) {
                this.$notify.info({
                  title: "消息",
                  message: "页面丢失，请重新加载"
                });
              } else if (error.response.status === 403) {
                this.$notify.info({
                  title: "消息",
                  message: "登陆超时，请重新登录"
                });
              } else {
                this.$notify.info({
                  title: "消息",
                  message: error.response.data.message
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    getCaptcha() {
      this.$router.push({ path: "/login" });
      this.instance.close();
    },
    open2() {
      const h = this.$createElement;
      this.instance = this.$notify({
        title: "提示",
        // dangerouslyUseHTMLString: true,
        message: h("div", null, [
          h("div", null, "注册成功，请登录"),
          h(
            "div",
            {
              style: {
                padding: "5px 13px",
                borderRadius: "5px",
                margin: "10px 2px 0px 0",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                webkitTransitionDuration: "0.4s",
                transitionDuration: "0.4s",
                cursor: "pointer",
                backgroundColor: "#02B9B8",
                color: "white",
                border: "1px solid #02B9B8"
              },
              on: {
                //鼠标移出的回调
                click: this.getCaptcha

                // //鼠标移入的回调
                // mouseover: function(e){
                //   e.target.style.backgroundColor = '#e7e7e7'
                // },
                // click: _this.closeNotification.bind(_this, 1, 2, message)
              }
            },
            "确认"
          )
        ])
      });
    },
    business() {
      window.open("http://47.102.145.186/business/#/register");
    },
    gotoRegisterUI() {
      this.$router.push({ path: "register" });
    },
    gotoUserPrivacyLicenseUI() {
      window.open(
        this.$router.resolve({ name: "user-license" }).href,
        "_blank"
      );
    }
  },
  created() {
    this.wxbind = decodeURIComponent(this.$route.query.wxlogin);
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

          .header {
            display: flex;
            flex-direction: column;
            margin-bottom: 0px;
            justify-content: space-between;

            .header-nav {
              display: flex;
              flex-direction: row;

              img {
                width: 18px;
              }

              div {
                font-family: PingFangSC-Medium;
                color: #02B9B8;
                font-size: 18px;
                line-height: 18px;
              }
            }

            .header-footer {
              font-family: PingFangSC-Medium;
              color: #C5C5C5;
              font-size: 13px;
              text-align: left;
              margin: 5px 0 0 25px;
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

            .el-checkbox__input.is-checked .el-checkbox__inner {
              background-color: #02B9B8;
              border-color: #02B9B8;
            }

            .el-checkbox__inner {
              border: 1px solid #979797;
            }

            .el-checkbox__inner:hover {
              border: 1px solid #02B9B8;
            }

            .el-input__inner {
              &::placeholder {
                color: #cbcbcb;
              }
            }

            .el-input__inner:focus {
              color: #373737;
            }
          }

          .adjunctive {
            cursor: pointer;
            font-family: PingFangSC-Regular;
            color: #373737;
            font-size: 14px;

            span:nth-child(2) {
              color: #00b4b3;
            }
          }
        }
      }
    }
  }

  .successRegister {
    width: 350px;
    height: 473px;
    background: #FFFFFF;
    margin: 280px 0 0 785px;
    box-shadow: 0px 2px 12px 0px rgba(55, 6, 6, 0.5);
    border-radius: 3px;
  }
}
</style>

