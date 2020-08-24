<template>
  <div class="container" style = 'background:#ffffff'> 
    <el-dialog title="更换头像" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div style="margin:-20px 0 0 0">上传头像：</div>
      <div style="margin: 20px auto;width:100%">
        <el-upload
          class="avatar-uploaders"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="更换手机号"
      :visible.sync="dialogVisiblephone"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input style="width:240px" placeholder="请输入手机号" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="phone">
          <el-input style="width:240px" placeholder="请输入原密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="vcode">
          <el-input
            style="width:240px;margin:0 20px 0 0"
            placeholder="请输入验证码"
            v-model="ruleForm.vcode"
          ></el-input>
          <el-button class="btn" @click="getCaptcha" :disabled="frozen">{{ captchaStatusText }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisiblephone = false">取消</el-button>
          <el-button type="primary" @click="updatePhone('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="更换邮箱"
      :visible.sync="dialogVisibleemail"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForms"
        :rules="rule"
        ref="ruleForms"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="邮箱账号" prop="email">
          <el-input style="width:240px" v-model="ruleForms.email"></el-input>
        </el-form-item>
         <el-form-item label="验证码" prop="vcode">
          <el-input
            style="width:240px;margin:0 20px 0 0"
            placeholder="请输入验证码"
            v-model="ruleForms.vcode"
          ></el-input>
          <el-button class="btn" @click="getCaptchas" :disabled="frozen">{{ captchaStatusText }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisibleemail = false">取消</el-button>
          <el-button type="primary" @click="updateEmail('ruleForms')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="nav">
      <span style="margin:0 0 0 20px">账号管理</span>
    </div>
    <div class="aside">
      <div>
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div @click="avatar" style="font-size:14px;color:#ff7152;margin:10px 0 0 65px">更换头像</div>
      </div>
      <div class="right">
        <div style="text-align:right;margin:0 0 0 30px">
          <!-- <div>账号：</div> -->
          <div>姓名：</div>
          <div>角色：</div>
          <!-- <div>所属组织：</div> -->
          <div>手机号：</div>
          <div>邮箱：</div>
        </div>
        <div>
          <!-- <div>{{formDate.phone}}</div> -->
          <div>{{formDate.realName}}</div>
          <div>{{formDate.role}}</div>
          <!-- <div>{{formDate.role}}</div> -->
          <div>
            {{formDate.phone}}
            <span
              @click="dialogVisiblephone = true"
              style="font-size:14px;color:#ff7152;line-height:16px"
            >更换绑定手机号</span>
          </div>
          <div>
            {{formDate.email}}
            <span
              @click="dialogVisibleemail = true"
              style="font-size:14px;color:#ff7152;line-height:16px"
            >更换绑定邮箱</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const captchaLabel = "获取验证码";
const countNumber = 60;
export default {
  data() {
    // 手机号验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      frozen: false,
      counter: countNumber,
      captchaInput: "",
      captchaStatusText: captchaLabel,

      dialogVisible: false,
      dialogVisiblephone: false,
      dialogVisibleemail: false,
      ruleForm: {
        phone: "",
        vcode: "",
        password: ""
      },
      ruleForms: {
        email: ""
      },
      rules: {
        vcode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        email: [
          { required: true, message: "请填写邮箱", trigger: "change" },
          {
            pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+(com|cn|net|com.cn|com.tw|com.hk)$/,
            message: "邮箱格式错误",
            trigger: ["change", "blur"]
          }
        ]
      },
      rule: {
        email: [
          { required: true, message: "请填写邮箱", trigger: "change" },
          {
            pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+(com|cn|net|com.cn|com.tw|com.hk)$/,
            message: "邮箱格式错误",
            trigger: ["change", "blur"]
          }
        ],
        vcode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      formDate: {}
    };
  },
  methods: {
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
    },
    getCaptchas() {
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
        phone: this.formDate.phone
      });
    },
    //修改手机号
    updatePhone() {
      let params = {
        password: this.ruleForm.password,
        phone: this.ruleForm.phone,
        vcode: this.ruleForm.vcode
      };
      this.$http
        .put("/business-user/account/phone", params)
        .then(res => {
          if (res.data.code == "200") {
            this.dialogVisiblephone = false;
            this.base();
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //修改邮箱
    updateEmail() {
      let params = {
        email: this.ruleForms.email,
        vcode: this.ruleForms.vcode
      };
      this.$http
        .put("/business-user/account/email", params)
        .then(res => {
          if (res.data.code == "200") {
            this.dialogVisibleemail = false;
            this.base();
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //图片上传
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //获取用户得基本信息
    base() {
      this.$http
        .get("/business-user/account")
        .then(res => {
          if (res.data.code == "200") {
            this.formDate = res.data.data;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    avatar() {
      this.dialogVisible = true;
    }
  },
  created() {
    this.base();
  },
  computed: {
    uploadUrl() {
      return "/business-user/account/avatar";
    }
  }
};
</script>

<style lang="stylus" scoped>
.nav {
  margin: 30px 0 0 0;
  width: 960px;
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
  display: flex;
  flex-direction: row;
  width: 960px;
  border: 1px solid red;
  height: auto;
  background: #ffffff;
  margin: 20px 0 0 0;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);

  .right {
    display: flex;
    flex-direction: row;
    margin: -20px 0 100px 0;

    div {
      padding: 30px 0 0 0;
    }
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 30px 0 0 40px;
}
.avatar-uploaders .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0 0 0 230px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>