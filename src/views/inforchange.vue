<template>
<div>
  <div class="inforchanges" style="background-color:#327cf3;">
    <customized-nav class="nav" />
    <div class="cards">
      <div class="tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="修改密码" name="first">
            <div  v-if="active===1">
              <el-form
                :model="ruleForm"
                :rules="rules"
                style="color:#5A5A5A;"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="手机号" style="margin:20px 70px 10px 3px">
                  <span style="font-size:16px;color:#5A5A5A;cursor:default;margin:0 0 0 -160px">{{phoneOne}}</span>
                </el-form-item>
                <el-form-item label="验证码" prop="code" >
                  <captchaPass v-model="ruleForm.code" :fromData="this.phoneOne" />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" >
                  <el-input
                    style="width:250px;height:43px;"
                    placeholder="请输入新密码（6-24位数字和字母）"
                    v-model="ruleForm.newPassword"
                    show-password
                  ></el-input>
                  <!-- <password-input v-model="ruleForm.newPassword" placeholder="请输入新密码（6-24位数字和字母）" /> -->
                </el-form-item>
                <el-form-item label="确认密码" prop="checknewPassword">
                  <el-input
                    style="width:250px;height:43px"
                    placeholder="请确认输入新密码"
                    v-model="ruleForm.checknewPassword"
                    show-password
                  ></el-input>
                  <!-- <password-input v-model="ruleForm.checknewPassword" placeholder="请确认输入新密码" /> -->
                </el-form-item>
                <el-form-item>
                  <el-button
                    style="width:270px;height:43px;margin:30px 50px 0 -60px;background: #327cf3;border-color:#327cf3"
                    @click="submitForm('ruleForm')"
                    type="primary"
                  >重置密码</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
                  <el-tab-pane label="换绑手机" name="second">
                    <div  v-if="active===1">
              <el-form
                :model="newRuleForm"
                :rules="newRules"
                ref="newRuleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="手机号" style="margin:20px 70px 10px 3px">
                  <span style="font-size:16px;color:#5A5A5A;margin:0 0 0 -160px;cursor:default;">{{phoneOne}}</span>
                </el-form-item>
                <el-form-item label="密码" prop="nowPassword">
                  <el-input
                    style="width:250px;height:43px"
                    placeholder="请确认输入登陆密码"
                    v-model="newRuleForm.nowPassword"
                    
                  ></el-input>
                </el-form-item>
                <el-form-item label="新手机号" prop="newPhone">
                  <span>
                    <el-input
                      style="width:250px;height:43px"
                      v-model="newRuleForm.newPhone"
                      placeholder="请确认输入新手机号"
                    ></el-input>
                  </span>
                </el-form-item>
                <el-form-item label="验证码" prop="newCode">
                  <captchaPhone :fromData="this.newRuleForm.newPhone" v-model="newRuleForm.newCode" />
                </el-form-item>
                <el-form-item>
                  <el-button
                    @click="phoneSubmitForm('newRuleForm')"
                    style="width:270px;height:43px;margin:30px 50px 0 -55px;background: #327cf3;border-color:#327cf3"
                    type="primary"
                  >换绑手机</el-button>
                </el-form-item>
              </el-form>
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
  <customized-footer/>
</div>  
</template>

<script>
// import Captcha from "components/captcha.vue";
// import PasswordInput from "components/password-input.vue";
import CustomizedNav from 'components/customized-nav.vue';
import CustomizedFooter from 'components/customized-footer.vue';
import captchaPass from "components/captchaPass.vue";
import captchaPhone from "components/captchaPhone.vue";
import { resetPassword,resetPhone } from "apis/account";
export default {
  name: "inforchange",
  components: {
    // Captcha,
    CustomizedNav,
    CustomizedFooter,
    captchaPass,
    // PasswordInput,
    captchaPhone
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      phone: "",
      password: "",
      phoneOne: "",
      active: 1,
      activeName:'first',
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
          { pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/,message: '密码限6-24位数字和字母', trigger: ['change','blur'] },
        ],
        checknewPassword: [
          { required: true,validator: validatePass2, trigger: "blur" }
        ]
      },
      newRules: {
        newCode: [
          { required: true, message: "请输入验证码", trigger: "change" }
        ],
        nowPassword: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
          { pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/,message: '密码限6-24位数字和字母', trigger: ['change','blur'] },
        ],
        newPhone: [
          {required: true, message: '请填写手机号', trigger: 'change' },
          { pattern:/^[1][35789][0-9]{9}$/,message: '请输入正确的手机号', trigger: ['change','blur'] },
        ]
      }
    };
  },
  methods: {
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
          this.$local.put('consumer-user/account/password',params).then(res => {
            if (res.data.code == 200) {
              this.$store.commit("LOGOUT");
              this.$router.push({path: "/reset-result"});
            }
          }).catch(error => {
            this.$message({
                message:error.response.data.message,
                type: 'error'
              })
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
          this.$local.put('consumer-user/account/phone',params).then(res => {
            if (res.data.code == 200) {
              this.$store.commit("LOGOUT");
              this.inforchangeBack = true
            }
          }).catch(error => {
            this.$message({
              message: error.response.data.message,
              type: 'error'
            });
          });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.phoneOne = window.sessionStorage.getItem('user')
  }
};
</script>


<style lang="stylus">
  .inforchanges
    display flex
    flex-direction column
    height 900px
    .cards
      width 460px
      height 545px
      border-radius 5px
      background #FFFFFF
      margin auto 
      .tab 
        margin 72px 0 0 0
        .el-tabs__item
          font-size 22px
          color #373737
        .el-tabs__nav-scroll
          margin 0 0 0 50px
        .el-form-item__error
          left -15px
        .el-tabs__item.is-active 
          color #327cf3  
        .el-form-item__label
          margin 0 0 0 -20px
        .el-input__inner
          margin 0 0 0 -80px  
        .el-tabs__active-bar  
          background-color #327cf3
        .el-tabs__content 
        .el-tab-pane
          margin 20px 0 0 0 
        .inforchange-right
          width 810px
          margin 90px 0 0 10px
          background white
          color #1d366e
</style>
