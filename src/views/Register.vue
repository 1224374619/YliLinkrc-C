<template>
  <div class="container">
    <!-- <customized-nav class="nav" :ctlHideMenus="true" /> -->
    <div class="body">
      <div class="form">
        <div class="logo"><img style="height:40px;margin:57px 0 0 0" @click="gotoHomeUI" :src="require('../assets/images/logo.png')" /></div>
        <div class="photo">
          <div style="margin:89px 0 0 174px">
            <img style="height:392px;" :src="require('../assets/images/de.png')" />
          </div>
          <div class="formlet" style="margin:0 0 0 158px">
            <div class="header">
              <span class="deng">注册</span>
              <el-button style="margin:39px 0 0 0;color:#373737;font-size:16px;font-wight:500;text-align:right" @click="business" type="text">企业用户</el-button>
            </div>
            <div class="formls">
              <el-form ref="form" :rules="rules" :model="form" label-width="-60px">
                <el-form-item label="" prop="tel">
                  <el-input prefix-icon="el-icon-mobile-phone" style="width:270px;height:43px;" v-model.number="form.tel" placeholder="请输入登录手机号"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                  <el-input prefix-icon="el-icon-lock" :type="show.old?'text':'password'"  style="width:270px;height:43px;" placeholder="请输入密码" v-model="form.password">
                    <img
                                                    :src="show.old?require('../assets/images/yan.png'):require('../assets/images/bi.png')"
                                                    slot="suffix"
                                                    alt=""
                                                    style="margin:0 5px 0 0"
                                                    @click="show.old=!show.old"
                                            >
                  </el-input>
                  <!-- <password-input v-model="form.password" /> -->
                </el-form-item>
                <el-form-item label="" prop="captcha">
                  <captcha :fromData="this.form.tel" v-model="form.captcha"/>
                </el-form-item>
                <el-form-item>
                  <el-button style="width:270px;height:43px;margin:20px 0 0 0;background:#327cf3;color:#fff" class="full" @click="onSubmit" :disabled="!form.checkLicense">立即注册</el-button>
                </el-form-item>
                <el-form-item prop="checkLicense" style="margin:-20px 0 20px 0;">
                  <el-checkbox style="margin:0 100px 20px 0;" v-model="form.checkLicense">我已同意<el-button style="color:#327cf3;font-size:14px;" type="text" @click="gotoUserPrivacyLicenseUI">《用户协议及隐私策略》</el-button></el-checkbox>
                </el-form-item>
              </el-form>
            </div>
            <div class="adjunctive">
              <el-button style="margin:-30px 0 0 0;color:#373737;font-size:16px" type="text" @click="gotoLoginUI">立即登录</el-button>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
    <div class="successRegister" v-if="disabled">
      <div>
        <img style="width:172px;margin:57px 0 0 0" @click="gotoHomeUI" :src="require('../assets/images/success.png')" />
      </div>
      <div>
        <p style="color:#2C2C2C;font-size:20px;font-weight:600">注册成功</p>
        <p style="color:#565656;font-size:14px;margin:-10px 0 0 0">完善简历之后就可以去投递啦！</p>
      </div>
      <div>
        <el-button style="width:270px;height:43px;margin:60px 0 0 0;font-size:18px" class="full" type="primary" @click="gotoLoginUI">立即登录</el-button>
      </div>
    </div>
    <!-- <customized-footer :showSimple="true" /> -->
  </div>
</template>

<script>
// import CustomizedFooter from 'components/customized-footer.vue';
// import CustomizedNav from 'components/customized-nav.vue';
import Captcha from 'components/captcha.vue';
// import PasswordInput from 'components/password-input.vue';

export default {
  name: 'register',
  components: {
    // CustomizedFooter,
    // CustomizedNav,
    Captcha,
    // PasswordInput,
  },
  data() {
    return {
      form: {
        tel: '',
        password: '',
        captcha: '',
        checkLicense: false,  
      },
      show: {
          old:false,
          new:false,
          check: false,
      },
      disabled:false,
      rules: {
        tel: [
          { required: true, message: '请输入登录手机号', trigger: 'blur' },
          { pattern:/^[1][3578][0-9]{9}$/,message: '请输入正确的手机号', trigger: ['change','blur'] },
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/,message: '密码限6-24位数字和字母', trigger: ['change','blur'] },
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
          this.$local.post('consumer-user/account/register',{phone:this.form.tel,password:this.form.password,vcode:this.form.captcha,agree:true}).then(res => {
          if (res.data.code == 200) {
            this.open2();
            // this.$router.push({ path: '/login' });
          }
        }).catch(error =>{
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
    getCaptcha() {
        this.$router.push({ path: '/login'});
        this.instance.close()
    },
    open2() {
        const h = this.$createElement;
        this.instance = this.$notify({
          title: '提示',
          // dangerouslyUseHTMLString: true,
          message: h('div', null, [
            h('div', null, '注册成功，请登录'),
            h('div', {
                    style: {
                      padding: '5px 13px',
                      borderRadius: '5px',
                      margin: '10px 2px 0px 0',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'inline-block',
                      webkitTransitionDuration: '0.4s',
                      transitionDuration: '0.4s',
                      cursor: 'pointer',
                      backgroundColor: '#409eff',
                      color: 'white',
                      border: '1px solid #409eff',
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
                  }, '确认')
          ]),
        });  
         
      },
    business() {
      window.open('http://47.102.145.186/business/#/register');
    },
    gotoLoginUI() {
      this.$router.push({ path: 'login' });
    },
    gotoUserPrivacyLicenseUI() {
      window.open(this.$router.resolve({ name: 'user-license' }).href, '_blank');
    }
  }
}
</script>

<style lang="stylus">
  .container
    display flex
    flex-direction column
    justify-content center
    align-items center
    background #327cf3
    height 100%
    .body
      .form
        width 1176px
        height 684px
        background #FFFFFF
        margin 0 auto
        box-shadow 0px 2px 12px 0px rgba(55,6,6,0.50)
        border-radius 3px
        .logo
          margin 0 750px 0 0
        .photo  
          display flex
          flex-direction row
          .formlet
            display flex
            flex-direction column
            width 270px
            .header
              display flex
              flex-direction row
              margin-bottom 20px
              justify-content space-between 
              .deng
                font-family PingFangSC-Medium
                color #327cf3
                font-size 24px
                margin 39px 0 0 0
                font-weight 500
            .formls
              .el-input__inner
                background-color: #f7f7f7
                border none
              .el-input__inner:focus 
                border:1px solid #CCCCCC
                background-color: #ffffff
              .el-form-item.is-error .el-input__inner 
                border-color #f56c6c
              .el-checkbox__input.is-checked .el-checkbox__inner
                background-color #327cf3
                border-color #327cf3  
              .el-checkbox__inner
                border 1px solid #979797  
              .el-checkbox__inner:hover
                border 1px solid #327cf3
              .el-input__inner 
                &::placeholder 
                  color #cbcbcb
              .el-input__inner:focus
                color #373737   
    .successRegister
      width 350px
      height 473px
      background #FFFFFF
      margin 280px 0 0  785px
      box-shadow 0px 2px 12px 0px rgba(55,6,6,0.50)
      border-radius 3px        
</style>

