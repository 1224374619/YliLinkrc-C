
<template>
  <div class="containers">
    <!-- <customized-nav class="nav" :ctlHideMenus="true" /> -->
    <div class="body">
      <div class="form">
        <div class="logo">
          <img
            style="height:40px;margin:57px 0 0 0"
            @click="gotoHomeUI"
            :src="require('../assets/images/logo.png')"
          />
        </div>
        <div class="photo">
          <div style="margin:89px 0 0 174px">
            <img style="height:392px;" :src="require('../assets/images/de.png')" />
          </div>
          <div class="formlet" style="margin:0 0 0 158px">
            <div class="header">
              <span class="deng">登录</span>
              <el-button
                style="margin:39px 0 0 0;color:#373737;font-size:16px;font-wight:500;text-align:right"
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

                  <!-- <password-input v-model="form.password" /> -->
                </el-form-item>
                <el-form-item>
                  <el-button
                    style="margin:-20px 0 0 35px;float:right;font-size:14px;color:#818181;"
                    type="text"
                    @click="gotoResetPwdUI"
                  >忘记密码？</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    style="width:270px;height:43px;margin:20px 0 0 0;background:#327cf3;color:#fff"
                    class="full"
                    @click="onSubmit"
                  >立即登录</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="adjunctive">
              <el-button
                style="margin:5px 0 0 0;color:#373737;font-size:16px"
                type="text"
                @click="gotoRegisterUI"
              >立即注册</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div><customized-footer /></div> -->
  </div>
</template>

<script>
import CustomizedFooter from "components/customized-footer.vue";
// import CustomizedNav from "components/customized-nav.vue";
// import PasswordInput from "components/password-input.vue";
import {brief} from "apis/account";
import { mapMutations } from "vuex";
import { DONE_LOGIN } from "store/mutation-types";
import { watch } from "fs";
import Cookies from 'js-cookie'
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
        tel: '',
        password: ""
      },
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
    onSubmit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          // const devMode = process.env.VUE_APP_DEV_MODE
          // devMode ? `/login?returnUrl=http://${document.location.host}/api/resume/brief` : '/login?returnUrl=/resume/brief'
          // `/login?returnUrl=http://${document.location.host}/api/resume/brief`
          // `/login?returnUrl=/resume/brief`
          this.$_http
            .post(
              `/consumer-user/login`,
              {
                username: this.form.tel,
                password: this.form.password
              },
            )
            .then(res => {
              console.log(res)
              if (res.request.status == 200) {
                let token = res.headers["auth-token"];
                Cookies.set('token',token)
                window.sessionStorage.setItem("user", this.form.tel);
                this.$router.push({ path: "/home" });
              } else {
                return false;
              }
            })
            .catch(error => {
              this.$message({
                showClose: true,
                message: "输入有误，请重新输入"
              });
            });
        } else {
          return false;
        }
      });
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
      window.open("http://47.102.145.186/business/#/login");
    }
  },
  created() {
    this.$cookies.get("session");
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #327cf3;

  .body {
    .form {
      background: #FFFFFF;
      width: 1176px;
      height: 684px;
      box-shadow: 0px 2px 12px 0px rgba(55, 6, 6, 0.5);
      border-radius: 3px;

      .logo {
        margin: 0 750px 0 0;
      }

      .photo {
        display: flex;
        flex-direction: row;

        .formlet {
          display: flex;
          flex-direction: column;
          width: 270px;

          .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 20px;

            .deng {
              font-family: PingFangSC-Medium;
              color: #327cf3;
              font-size: 24px;
              margin: 39px 0 0 0;
              font-weight: 500;
            }
          }

          .formls {
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
        }
      }
    }
  }
}
</style>