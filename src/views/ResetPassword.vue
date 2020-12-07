<template>
  <div class="resetpwd-container">
    <!-- <customized-nav class="nav" :ctlHideMenus="true" /> -->
    <div class="body">
      <div class="form">
        <div class="logo"><img style="height:40px;margin:0 290px 30px 0" @click="gotoHomeUI" :src="require('../assets/images/logo.png')" /></div>
        <p class="header">
          <span>重置密码</span>
        </p>
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="手机号" prop="tel">
            <el-input v-model.number="form.tel" style="width:270px;height:43px;"  placeholder="请输入登录手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <captcha :fromData="this.form.tel" style="width:270px;height:43px;" v-model="form.captcha" />
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input style="width:270px;height:43px;" show-password v-model="form.password" :placeholder="'请输入新密码（6-24位数字和字母）'" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input style="width:270px;height:43px;" show-password v-model="form.confirmPassword"  :placeholder="'请再次输入新密码'" />
          </el-form-item>
          <el-form-item>
            <el-button class="full" type="primary" @click="onSubmit">重置密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <customized-footer :showSimple="true" /> -->
  </div>
</template>

<script>
// import CustomizedFooter from 'components/customized-footer.vue';
// import CustomizedNav from 'components/customized-nav.vue';
import Captcha from 'components/captchaCz.vue';
// import PasswordInput from 'components/password-input.vue';
import {resetPassword} from "apis/account";
export default {
  name: 'resetpwd',
  
  components: {
    // CustomizedFooter,
    // CustomizedNav,
    Captcha,
    // PasswordInput,
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        tel: '',
        password: '',
        confirmPassword: '',
        captcha: '',
      },
      rules: {
        tel: [
          { required: true, message: '请输入登录手机号', trigger: 'blur' },
          { pattern:/^[1][356789][0-9]{9}$/,message: '请输入正确的手机号', trigger: ['change','blur'] },
        ],
        password: [
          { required: true, message: '请输入新登录密码', trigger: 'blur' },
          { pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/,message: '密码限6-24位数字和字母', trigger: ['change','blur'] },
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    gotoHomeUI() {
      this.$router.push({ path: "/" });
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let params = {
            agree:true,password:this.form.password, phone:this.form.tel, vcode:this.form.captcha
          }
          this.$local.put('consumer-user/account/password',params).then(res => {
            if (res.data.code == 200) {
              this.$store.commit("LOGOUT");
              this.$router.push({path: "/reset-result"});
            }
          }).catch(error => {
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
  },
}
</script>

<style lang="stylus" scoped>
  .resetpwd-container
    height 100%
    display flex
    flex-direction column
    background #327cf3
    .nav
      position relative
    .body
      display flex
      align-items center
      justify-content center
      flex 1
      position relative
      .form
        padding 40px
        width 460px
        height 500px
        background-color white
        border-radius 3px
        button.full
          width 270px
          height 43px
          margin 30px 0 0 0
        p
          display flex
          flex-direction row
          margin-bottom 20px
          &.header
            justify-content space-between
            margin-left 5px
          span
            font-size 18px 
            color #666666
</style>

<style lang="stylus">
  .resetpwd-container
    .el-form-item__content 
      text-align left
</style>
