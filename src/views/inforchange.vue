<template>
  <div>
    <div class="popContainer" v-show="writeMessageShow" @click="writeMessageFun($event)">
      <div class="messageMaskContent" ref="msk">
        <div class="navs">微信绑定</div>
        <!-- <div >
          <img src="../assets/images/foot-wxs.png" />
        </div>-->
        <remotejs src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js" />
        <div class="imgSrc" id="login_container"></div>
      </div>
    </div>
    <div class="inforchanges" style="background-color:#02B9B8;">
      <customized-nav class="nav" />

      <el-dialog title :visible.sync="dialogVisible" width="25%" :show-close="false">
        <div class="dialogTitle">
          <span>手机号</span>
          <span>{{phoneOne}}</span>
        </div>
        <div class="dialogCode">
          <span>验证码</span>
          <span>
            <captchaPhone :fromData="this.phoneOne" v-model="wxCode" />
          </span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button plain @click="dialogVisible = false">取 消</el-button>
          <el-button style="margin:0 0 0 100px" type="primary" @click="keepUnbund">解 绑</el-button>
        </span>
      </el-dialog>
      <div class="cards">
        <div class="tab">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="修改密码" name="first">
              <div v-if="active===1">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  style="color:#5A5A5A;padding:0 40px 0 0"
                  ref="ruleForm"
                  label-width="100px"
                  class="demos-ruleForm"
                >
                  <el-form-item label="手机号" class="form-item">
                    <span class="phone-span">{{phoneOne}}</span>
                  </el-form-item>
                  <el-form-item label="验证码" prop="code" class="form-item">
                    <captchaPass
                      v-model="ruleForm.code"
                      :fromData="this.phoneOne"
                      style="width:100%"
                    />
                  </el-form-item>
                  <el-form-item label="新密码" prop="newPassword" class="form-item">
                    <el-input
                      style="width:200px;height:43px;margin:0 0 0 10px"
                      placeholder="请输入新密码（6-24位数字和字母）"
                      v-model="ruleForm.newPassword"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checknewPassword" class="form-item">
                    <el-input
                      style="width:200px;height:43px;margin:0 0 0 10px"
                      placeholder="请确认输入新密码"
                      v-model="ruleForm.checknewPassword"
                      show-password
                    ></el-input>
                    <!-- <password-input v-model="ruleForm.checknewPassword" placeholder="请确认输入新密码" /> -->
                  </el-form-item>
                  <el-form-item class="form-item">
                    <el-button
                      class="infor-button"
                      @click="submitForm('ruleForm')"
                      type="primary"
                    >重置密码</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="换绑手机" name="second">
              <div v-if="active===1">
                <el-form
                  :model="newRuleForm"
                  :rules="newRules"
                  ref="newRuleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="手机号" class="form-item">
                    <span class="phone-span" style="margin:0 70px 0 -50px">{{phoneOne}}</span>
                  </el-form-item>
                  <el-form-item label="密码" prop="nowPassword" class="form-item">
                    <el-input
                      style="width:200px;height:43px;margin:0 0 0 -15px"
                      placeholder="请确认输入登陆密码"
                      v-model="newRuleForm.nowPassword"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="新手机号" prop="newPhone" class="form-item">
                    <span>
                      <el-input
                        style="width:200px;height:43px;margin:0 0 0 -15px"
                        v-model="newRuleForm.newPhone"
                        placeholder="请确认输入新手机号"
                      ></el-input>
                    </span>
                  </el-form-item>
                  <el-form-item label="验证码" prop="newCode" class="form-item">
                    <captchaPhone
                      :fromData="this.newRuleForm.newPhone"
                      v-model="newRuleForm.newCode"
                    />
                  </el-form-item>
                  <el-form-item class="form-item">
                    <el-button
                      @click="phoneSubmitForm('newRuleForm')"
                      style="width:270px;height:43px;margin:30px 50px 0 -55px;background: #02B9B8;border-color:#02B9B8"
                      type="primary"
                    >换绑手机</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="微信绑定" name="third">
              <div class="wx-phone">
                当前账号：
                <span>{{phoneOne}}</span>
              </div>
              <div class="wx-bind">
                <div class="wx-img">
                  <div>
                    <img style="width:28px" src="../assets/images/wx.png" />
                  </div>
                  <div>绑定微信</div>
                </div>

                <div class="wx-infor" v-if="this.wxState">
                  <div>{{this.nickname}}</div>
                </div>
                <div class="wx-infor" @click="Unbund" v-if="this.wxState">
                  <div>解绑</div>
                </div>

                <div class="wx-button" v-else>
                  <el-button @click="wxLogin" plain>立即绑定</el-button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <div class="inforchangeback" v-if="inforchangeBack">
        <span>
          <i class="el-icon-success"></i>
        </span>
        <span>换绑成功，请用新手机号重新登陆</span>
        <span>
          <el-button class="button" @click="newLogin()" type="primary">重新登陆</el-button>
        </span>
      </div>
    </div>
    <customized-footer />
  </div>
</template>


<script>
// import Captcha from "components/captcha.vue";
// import PasswordInput from "components/password-input.vue";
import CustomizedNav from "components/customized-nav.vue";
import CustomizedFooter from "components/customized-footer.vue";
import captchaPass from "components/captchaPass.vue";
import captchaPhone from "components/captchaPhone.vue";
import { resetPassword, resetPhone } from "apis/account";
import remotejs from "./RemoteJs";
export default {
  name: "inforchange",
  components: {
    // Captcha,
    CustomizedNav,
    CustomizedFooter,
    captchaPass,
    remotejs,
    // PasswordInput,
    captchaPhone
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      redirectUri: encodeURIComponent("https://www.yinlinkrc.com/#/inforchange"),
      wxCode: "",
      code: "",
      state: "",
      dialogVisible: false,
      writeMessageShow: false,
      wxState: true,
      phone: "",
      password: "",
      phoneOne: "",
      nickname: "",
      thirdPartyId: "",
      active: 1,
      activeName: "first",
      inforchangeLeft: true,
      inforchangeBack: false,
      ruleForm: {
        code: "",
        newPassword: "",
        checknewPassword: ""
      },
      newRuleForm: {
        newCode: "",
        nowPassword: "",
        newPhone: ""
      },
      rules: {
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/,
            message: "密码限6-24位数字和字母",
            trigger: ["change", "blur"]
          }
        ],
        checknewPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      newRules: {
        newCode: [
          { required: true, message: "请输入验证码", trigger: "change" }
        ],
        nowPassword: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/,
            message: "密码限6-24位数字和字母",
            trigger: ["change", "blur"]
          }
        ],
        newPhone: [
          { required: true, message: "请填写手机号", trigger: "change" },
          {
            pattern: /^[1][356789][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  watch: {
    $route(to, from) {
      let url = window.location.href;
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("=");
        this.code = strs[1].split("&")[0];
        this.state = strs[2];
      }
      console.log(this.code, this.state);
      this.writeMessageShow = false;
      this.bund()
    }
  },
  methods: {
    //遮罩层
    writeMessageFun(ev) {
      if (!this.$refs.msk.contains(ev.target)) {
        this.writeMessageShow = false;
      }
    },
    //微信扫码
    wxLogin() {
      this.writeMessageShow = true;
      var obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        appid: "wxbca1daaa5765cc51",
        scope: "snsapi_login",
        // redirect_uri: "http://www.yinlinkrc.com/inforchange",
        redirect_uri: this.redirectUri,
        state: "asdsfdfgwerwrer2345325123",
        style: "black",
        href:
          "data:text/css;base64,LmltcG93ZXJCb3ggLnN0YXR1cyB7CiAgbWFyZ2luOiAxMHB4IDAgNjBweCAwOwogIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7CiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAxMDBweDsKICB6LWluZGV4OiA2MDA7CiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDVweCAxMHB4IC01cHggIzE5MTkxOSwgMCAxcHggMCAwICM0NDQ7CiAgYm94LXNoYWRvdzogaW5zZXQgMCA1cHggMTBweCAtNXB4ICMxOTE5MTksIDAgMXB4IDAgMCAjNDQ0Owp9"
      });
    },
    //解绑
    Unbund() {
      this.dialogVisible = true;
    },
    keepUnbund() {
      let params = {
        phone: this.phoneOne,
        scode: this.wxCode,
      };
      this.$http
        .post(`consumer-user/binding/wechat/unbind`, params)
        .then(res => {
          this.wxState = false;
          this.dialogVisible = false;
        })
        .catch(error => {});
    },
    //绑定
    bund() {
      let params = {
        code: this.code,
        state: this.state
      };
      this.$http
        .post("consumer-user/binding/wechat", params)
        .then(res => {
          this.wxState = true;
          this.bindWechat();
        })
        .catch(error => {});
    },
    //tab
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name === "third") {
        this.bindWechat();
      }
    },
    //绑定详情
    bindWechat() {
      this.$http
        .get("consumer-user/binding/wechat")
        .then(res => {
          this.wxState = true;
          this.thirdPartyId = res.data.data.thirdPartyId;
          this.nickname = res.data.data.nickname;
          this.phoneOne = res.data.data.phone;
        })
        .catch(error => {
          this.wxState = false;
        });
    },
    handleActive(index) {
      this.active = index;
    },
    newLogin() {
      this.$router.push({ path: "/login" });
    },
    //重置密码
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            agree: true,
            password: this.ruleForm.newPassword,
            phone: this.phoneOne,
            vcode: this.ruleForm.code
          };
          this.$local
            .put("consumer-user/account/password", params)
            .then(res => {
              if (res.data.code == 200) {
                this.$store.commit("LOGOUT");
                this.$router.push({ path: "/reset-result" });
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
    //修改手机号
    phoneSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            password: this.newRuleForm.nowPassword,
            phone: this.newRuleForm.newPhone,
            vcode: this.newRuleForm.newCode
          };
          this.$http
            .put("consumer-user/account/phone", params)
            .then(res => {
              if (res.data.code == 200) {
                this.$store.commit("LOGOUT");
                this.inforchangeBack = true;
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.phoneOne = window.sessionStorage.getItem("user");
    let url = window.location.href;
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("=");
      this.code = strs[1].split("&")[0];
      this.state = strs[2];
      console.log(this.code, this.state);
      this.bund()
    }
    
    this.writeMessageShow = false;
    this.bindWechat();
  }
};
</script>


<style lang="stylus">
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
    width: 16%;
    top: 30;
    margin: auto;

    .nav {
      font-family: PingFangSC-Medium;
      color: #FFFFFF;
      font-size: 20px;
      margin: 130px 0 0 0;
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

.inforchanges {
  display: flex;
  flex-direction: column;
  height: 900px;

  .dialogTitle {
    font-family: PingFangSC-Regular;
    color: #373737;
    font-size: 16px;
    text-align: left;
    margin: 0 0 0 55px;

    span:nth-child(2) {
      margin: 0 0 0 5px;
    }
  }

  .el-dialog__footer {
    text-align: center;
    padding: 20px 0 60px 0;
  }

  .dialogCode {
    display: flex;
    flex-direction: row;
    margin: 20px 0 0 55px;
    font-family: PingFangSC-Regular;
    color: #373737;
    font-size: 16px;

    span:nth-child(1) {
      line-height: 40px;
    }
  }

  .cards {
    width: 460px;
    height: 545px;
    border-radius: 5px;
    background: #FFFFFF;
    margin: auto;

    .tab {
      margin: 72px 56px 0;

      .form-item {
        margin: 20px 0 10px -50px;

        .phone-span {
          font-size: 16px;
          color: #5A5A5A;
          cursor: default;
          margin: 0 0 0 -80px;
        }

        .infor-button {
          width: 270px;
          height: 43px;
          margin: 30px 50px 0 -60px;
          background: #02B9B8;
          border-color: #02B9B8;
        }
      }

      .wx-phone {
        font-family: PingFangSC-Regular;
        color: #373737;
        font-size: 16px;
        text-align: left;
        margin: 30px 0 0 0;
      }

      .wx-bind {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 30px 0 0 0;

        .wx-img {
          display: flex;
          flex-direction: row;

          div:nth-child(2) {
            font-family: PingFangSC-Regular;
            color: #373737;
            font-size: 16px;
            margin: 0 0 0 10px;
            line-height: 28px;
          }
        }

        .wx-infor {
          font-family: PingFangSC-Regular;
          color: #373737;
          font-size: 16px;
          cursor: pointer;
        }

        .wx-button {
          .el-button {
            width: 94px;
            height: 30px;
            border: 0.75px solid rgba(2, 185, 184, 1);
            border-radius: 5px;
            font-family: PingFangSC-Regular;
            color: #02B9B8;
            font-size: 16px;
          }
        }
      }

      .el-tabs__item {
        font-size: 18px;
        font-family: PingFangSC-Regular;
        color: #666666;
      }

      .el-tabs__nav-wrap::after {
        width: 85%;
      }

      .el-tabs__item.is-active {
        color: #02B9B8;
      }

      .el-tabs-pane {
        border: 1px solid red;
      }
    }
  }
}
</style>
