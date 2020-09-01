<template>
  <div class="captcha">
    <el-input class="input" type="captcha" v-model="captchaInput" placeholder="请输入验证码"></el-input>
    <el-button class="btn" @click="getCaptcha" :disabled="frozen">{{ captchaStatusText }}</el-button>
  </div>
</template>

<script>
const captchaLabel = '获取验证码';
const countNumber = 60;

export default {
  name: 'captcha',
  props:['fromData'],
  data() {
    return {
      frozen: false,
      counter: countNumber,
      captchaInput: '',
      captchaStatusText: captchaLabel,
    }
  },
  methods: {
    getCaptcha() {
      this.frozen = true;
      const handler = setInterval(() => {
        this.captchaStatusText = `${captchaLabel}(${--this.counter}s)`;
        if (this.counter === 0) {
          clearInterval(handler);
          this.counter = countNumber;
          this.captchaStatusText = captchaLabel;
          this.frozen = false;
        }
      }, 1000);
      this.$local.post('consumer-user/account/phone/vcode',{phone:this.fromData}).catch(error => {
              if (error.response.status === 404) {
                this.$notify.error({
                  title: "错误",
                  message: "页面丢失，请重新加载"
                });
              } else if (error.response.status === 403) {
                this.$notify.error({
                  title: "错误",
                  message: "登陆超时，请重新登录"
                });
              } else {
                this.$notify.error({
                  title: "错误",
                  message: error.response.data.message
                });
              }
            });
    }
  },
  watch: {
    captchaInput() {
      this.$emit('input', this.captchaInput);
    }
  }
}
</script>

<style lang="stylus" >
.captcha
  display flex
  flex-direction row
  .input
    width 144px
    height 43px
    margin 0 0 0 5px
  .el-input__inner 
    &::placeholder 
      color #cbcbcb 
      font-size 14px 
  .btn
    width 117px
    height 40px
    margin 0 0 2px 20px
    font-size 16px
    color #327cf3
    border 1px solid #327cf3

</style>
