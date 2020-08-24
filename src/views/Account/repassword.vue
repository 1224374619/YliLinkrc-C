<template>
  <div class="container" style="background:#ffffff">
    <div class="nav">
      <span style="margin:0 0 0 20px">重置密码</span>
    </div>
    <div class="aside">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        style="margin:20px 0 0 0"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input style="width:240px" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="vcode">
          <el-input style="width:240px;margin:0 20px 0 0" v-model="ruleForm.vcode"></el-input>
          <el-button class="btn" @click="getCaptcha" :disabled="frozen">{{ captchaStatusText }}</el-button>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input style="width:240px" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input style="width:240px" v-model="ruleForm.repassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePassword('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const captchaLabel = "获取验证码";
const countNumber = 60;
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      frozen: false,
      counter: countNumber,
      captchaInput: "",
      captchaStatusText: captchaLabel,
      ruleForm: {
        phone: "",
        password: "",
        repassword: "",
        vcode: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^[1][3578][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: ["change", "blur"]
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/,
            message: "密码限6-24位数字和字母",
            trigger: ["change", "blur"]
          }
        ],
        repassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        vcode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //修改密码
    updatePassword() {
      let params = {
        agree: true,
        password: this.ruleForm.password,
        phone: this.ruleForm.phone,
        vcode: this.ruleForm.vcode
      };
      this.$http
        .put("/business-user/account/password", params)
        .then(res => {
          if (res.data.code == "200") {
            this.$message({
              message: "恭喜你，修改成功",
              type: "success"
            });
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //验证码
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
      this.$locals.post("/business-user/account/phone/vcode", {
        phone: this.ruleForm.phone
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.nav {
  margin: 30px 0 0 0;
  width: 960px;
  border: 1px solid red;
  height: 50px;
  background: #F1F1F1;
  font-family: PingFangSC-Medium;
  color: #327cf3;
  line-height: 50px;
  font-size: 16px;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);
}

.aside {
  width: 960px;
  border: 1px solid red;
  height: auto;
  background: #ffffff;
  margin: 20px 0 0 0;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);
}
</style>