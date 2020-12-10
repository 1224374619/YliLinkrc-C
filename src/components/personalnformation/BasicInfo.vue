<template>
  <div class="basicinfo">
    <div class="basicinfo-first">
      <div class="basicinfo-left">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :data="uploadData"
          :headers="myHeaders"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div style="width:100px" class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2Mb</div>
        </el-upload>
      </div>
      <div class="basicinfo-right" style="margin:53px 0 0 -40px">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          style="width:820px"
          label-width="110px"
          ref="formInline"
          :rules="personalrules"
        >
          <el-form-item label="姓名" style="margin:0 0 0 0" prop="name">
            <el-input
              style="width:234px;height:36px"
              maxlength="24"
              v-model="formInline.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="求职状态" prop="jobHunting">
            <el-select style="width:234px;height:36px" v-model="formInline.jobHunting" placeholder>
              <el-option label value="积极找工作"></el-option>
              <el-option label value="随便看看"></el-option>
              <el-option label value="暂时不换工作"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item label="性别" style="margin:0 0 0 0;" prop="gender">
            <el-radio
              style="width:112px;height:36px"
              v-model="formInline.gender"
              border
              label="0"
            >男性</el-radio>
            <el-radio
              style="width:112px;height:36px;margin:0 0 0 -20px"
              v-model="formInline.gender"
              border
              label="1"
            >女性</el-radio>
          </el-form-item>
          <el-form-item label="工作起始时间">
            <el-date-picker
              style="width:234px;height:36px"
              type="year"
              placeholder="选择日期"
              v-model="formInline.workingSeniority"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="应届" style="margin:0 0 0 0;" prop="isGraduate">
            <el-radio
              style="width:112px;height:36px"
              v-model="formInline.isGraduate"
              border
              label="0"
            >是</el-radio>
            <el-radio
              style="width:112px;height:36px;margin:0 0 0 -20px"
              v-model="formInline.isGraduate"
              border
              label="1"
            >否</el-radio>
          </el-form-item>
          <el-form-item label="政治面貌" prop="politicCountenance">
            <el-select
              style="width:234px;height:36px"
              v-model="formInline.politicCountenance"
              placeholder
            >
              <el-option label="群众" value="0"></el-option>
              <el-option label="团员" value="1"></el-option>
              <el-option label="民主党派" value="2"></el-option>
              <el-option label="预备党员" value="3"></el-option>
              <el-option label="中共党员" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="城市" style="margin:0 0 0 0" prop="city">
            <el-cascader
              :options="options"
              style="width:234px;height:36px"
              v-model="formInline.city"
              :props="props"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="最高学历" prop="educationLevel">
            <el-select
              style="width:234px;height:36px"
              v-model="formInline.educationLevel"
              placeholder
            >
              <el-option label="初中及以下" value="0"></el-option>
              <el-option label="职中" value="1"></el-option>
              <el-option label="高中" value="2"></el-option>
              <el-option label="大专" value="3"></el-option>
              <el-option label="本科" value="4"></el-option>
              <el-option label="硕士" value="5"></el-option>
              <el-option label="博士" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日" style="margin:0 0 0 0" prop="birthday">
            <el-date-picker
              style="width:234px;height:36px"
              type="date"
              :picker-options="pickerOptions"
              placeholder="选择日期"
              v-model="formInline.birthday"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formInline.email" style="width:234px;height:36px" placeholder></el-input>
          </el-form-item>
          <el-form-item label="手机" style="margin:0 0 0 0" prop="phone">
            <el-input v-model="formInline.phone" style="width:234px;height:36px" placeholder></el-input>
          </el-form-item>
          <el-form-item label="海外工作年限" prop="overseasAge">
            <el-select
              style="width:234px;height:36px"
              v-model="formInline.overseasAge"
              :disabled="this.formInline.isGraduate === '0'||this.formInline.isGraduate === ''||this.formInline.workingSeniority === ''?true:false"
              placeholder
            >
              <el-option label="无工作年限" value="0"></el-option>
              <el-option label="1年" value="1" :disabled="disabled"></el-option>
              <el-option label="2年" value="2"></el-option>
              <el-option label="3年" value="3"></el-option>
              <el-option label="4年" value="4"></el-option>
              <el-option label="5年" value="5"></el-option>
              <el-option label="6年" value="6"></el-option>
              <el-option label="7年" value="7"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item class="cancel" style="float:right;margin:0 50px 20px 0">
            <el-button @click="cancel()" style="margin:0 20px 0 0" plain>取消</el-button>
            <el-button type="primary" @click="keep('formInline')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
let token = Cookies.get("token");
import Cookies from "js-cookie";
import { informationkeep, city } from "../../apis/account";
import citys from "../../assets/city.json";
const timeUtil = require('../../timeUtil.js');
export default {
  name: "basicinfo",
  props: ["fromData"],
  // if (value === '') {
  //       callback(new Error('请选择海外工作时间'))
  //     } else
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (
        value >
        this.$moment(new Date().getFullYear()) -
          this.$moment(this.formInline.workingSeniority).format("YYYY")
      ) {
        callback(new Error("海外工作时间不能大于工作时间"));
      } else {
        callback();
      }
    };
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > new Date().setFullYear((new Date().getFullYear()-16))
        }
      },
      uploadData: {
        label: "resume-avatar",
      },
      myHeaders: { "Auth-Token": Cookies.get("token") },
      formInline: {
        name: "",
        jobHunting: "",
        gender: "",
        workingSeniority: "",
        city: "",
        educationLevel: "",
        birthday: "",
        email: "",
        phone: "",
        politicCountenance: "",
        overseasAge: "",
        isGraduate: ""
      },
      token: "",
      disabled: true,
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   }
      // },
      // pickerOptionsOne: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   }
      // },
      imageUrl: "",
      file: "",
      options: [],
      props: {
        value: "code",
        label: "tag",
        children: "children"
      },
      personalrules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 0,
            max: 10,
            message: "长度在 0 到 10 个字",
            trigger: "blur"
          },
          {
            pattern: /^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/,
            message: "姓名仅支持中文汉字与英文字母",
            trigger: "blur"
          }
        ],
        jobHunting: [
          { required: true, message: "请选择求职状态", trigger: "blur" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        isGraduate: [
          { required: true, message: "请选择是否应届", trigger: "blur" }
        ],
        birthday: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        overseasAge: [{ validator: validatePass2, trigger: "change" }],
        educationLevel: [
          { required: true, message: "请选择学历", trigger: "change" }
        ],
        workingSeniority: [
          { required: true, message: "请选择工作年限", trigger: "change" }
        ],
        politicCountenance: [
          { required: true, message: "请选择政治面貌", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请填写手机号", trigger: "change" },
          {
            pattern: /^[1][356789][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: ["change", "blur"]
          }
        ],
        email: [
          { required: true, message: "请填写邮箱", trigger: "change" },
          {
            pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+(com|cn|net|com.cn|com.tw|com.hk)$/,
            message: "邮箱格式错误",
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  methods: {
    keep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formInline.politicCountenance == "群众") {
            this.formInline.politicCountenance = 0;
          } else if (this.formInline.politicCountenance == "团员") {
            this.formInline.politicCountenance = 1;
          } else if (this.formInline.politicCountenance == "民主党派") {
            this.formInline.politicCountenance = 1;
          } else if (this.formInline.politicCountenance == "预备党员") {
            this.formInline.politicCountenance = 3;
          } else if (this.formInline.politicCountenance == "中共党员") {
            this.formInline.politicCountenance = 4;
          }
          let CodeToTag = timeUtil.CodeToTag([this.formInline.city[0],this.formInline.city[1],this.formInline.city[2]],this.options)
          let params = {
            province: CodeToTag[0],
            provinceCode: this.formInline.city[0],
            city: CodeToTag[1],
            cityCode: this.formInline.city[1],
            district: CodeToTag[2],
            districtCode: this.formInline.city[2],
            politicalStatus: timeUtil.politicalStatus(
              parseInt(this.formInline.politicCountenance)
            ),
            politicalStatusCode: Number(this.formInline.politicCountenance),

            avatar: this.file == "" ? null : this.file,
            overseasAge: Number(this.formInline.overseasAge),
            workYear: this.formInline.workingSeniority.getTime(),
            birthday: this.formInline.birthday.getTime(),
            fullName: this.formInline.name,
            sex: timeUtil.sex(parseInt(this.formInline.gender)),
            sexCode: this.formInline.gender,
            degree: timeUtil.qualifications(parseInt(this.formInline.educationLevel)),
            degreeCode: Number(this.formInline.educationLevel),
            email: this.formInline.email,
            phone: this.formInline.phone,
            isGraduate: this.formInline.isGraduate == 0 ? true : false

            // file: this.file == "" ? null : this.file,
            // overseasAge: Number(this.formInline.overseasAge),
            // workYear: this.formInline.workingSeniority.getTime(),
            // politicalStatus: Number(this.formInline.politicCountenance),
            // birthday: this.formInline.birthday.getTime(),
            // county: this.formInline.city[1],
            // fullName: this.formInline.name,
            // sex: this.formInline.gender,
            // province: this.formInline.city[0],
            // degree: Number(this.formInline.educationLevel),
            // email: this.formInline.email,
            // phone: this.formInline.phone,
            // isGraduate: this.formInline.isGraduate == 0 ? true : false
          };
          informationkeep(this.fromData, params)
            .then(res => {
              if (res.data.code == 200) {
                this.$emit("BasicEmit", false, true);
              }
            })
            .catch(error => {
              
            });
        }
      });
    },
    // city() {
    //   city().then(res => {
    //     if (res.data.code == 200) {
    //       this.options = res.data.data;
    //     }
    //   })
    //   // .catch(error =>{});
    // },
    handleAvatarSuccess(res, file) {
      console.log(res.data);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.file = res.data;
    },
    handleAvatarError(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        message: "图片上传失败，请重新上传"
      });
    },
    cancel() {
      this.$emit("BasicEmit", false, true);
    }
  },
  created() {
    this.options = citys.data;
    this.token = Cookies.get("token");
  },
  computed: {
    uploadUrl() {
      return '/api/v3/file-service/files/upload';
    }
  },
  watch: {
    // 'formInline.isGraduate': function(newVal){
    //           console.log(newVal+'122313')
    //       },
    // 'formInline.overseasAge': function(newVal){
    //           console.log(newVal+'122313')
    //       },
    // 'formInline.workingSeniority': function(newVal){
    //          console.log(this.formInline.workingSeniority)
    //       },
    //  isGraduate: function() {
    //    console.log(isGraduate)
    //     // return this.formInline.isGraduate
    //   },
  }
};
</script>

<style lang="stylus" scoped>
.basicinfo {
  width: 1010px;

  .basicinfo-first {
    display: flex;
    flex-direction: row;

    .basicinfo-left {
      margin: 60px 0 0 95px;
      width: 80px;

      .avatar-uploader {
        width: 80px;
      }
    }
  }
}
</style>
<style lang="stylus">
.el-cascader__label:hover {
  border-color: blue;
}

.avatar-uploader .el-upload {
  border: 1px solid #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50px;
  background: #ececec;
}

.avatar-uploader .el-upload:hover {
  border-color: white;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: white;
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

.el-form-item__label {
  font-size: 16px;
}

.el-button--primary {
  background: #327cf3;
  border-color: #327cf3;
}

.el-button {
  color: #FFFFFF;
  font-size: 18px;
  width: 93px;
  height: 33px;
}
</style>