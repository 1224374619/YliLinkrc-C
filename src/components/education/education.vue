<template>
  <div class="education">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      :rules="rules"
      ref="formInline"
      label-width="100px"
    >
      <el-form-item label="学校名称" style="margin:0 0 0 10px" prop="schoolName">
        <el-input style="width:234px;height:36px" v-model="formInline.schoolName" placeholder></el-input>
      </el-form-item>
      <el-form-item label="在校时间" class="block" prop="schoolTime" style="margin:0 10px 20px 9px">
        <!-- :picker-options="pickerOptions" -->
        <el-date-picker
          style="width:234px;"
          v-model="formInline.schoolTime"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="专业" style="margin:0 0 0 10px" prop="major">
        <el-input style="width:234px;height:36px" v-model="formInline.major" placeholder></el-input>
      </el-form-item>
      <el-form-item label="学历" style="margin:0 10px 20px 9px" prop="qualifications">
        <el-select style="width:234px;height:36px" v-model="formInline.qualifications" placeholder>
          <el-option label="初中及以下" value="0"></el-option>
          <el-option label="职中" value="1"></el-option>
          <el-option label="高中" value="2"></el-option>
          <el-option label="大专" value="3"></el-option>
          <el-option label="本科" value="4"></el-option>
          <el-option label="硕士" value="5"></el-option>
          <el-option label="博士" value="6"></el-option>
        </el-select>
      </el-form-item>
      <br />
      <el-form-item label="是否统招" style="width:355px;margin:0 0 0 10px" prop="general">
          <el-radio style="width:112px;height:40px" v-model="formInline.general" border label="0">是</el-radio>
          <el-radio style="width:112px;height:40px;margin:0 0 0 -20px" v-model="formInline.general" border label="1">否</el-radio>
      </el-form-item>
      <el-form-item label="学历" style="visibility:hidden">
        <el-select style="width:242px;height:36px" placeholder>
          <el-option label value="shanghai"></el-option>
          <el-option label value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <br />
      <el-form-item class='cancel' style="margin:0 41px 20px 0">
        <el-button  @click="cancel" style="margin:0 20px 0 555px" plain>取消</el-button>
        <el-button @click="keep('formInline')" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
eduadd
} from "../../apis/account";
const timeUtil = require('../../timeUtil.js');
export default {
  name: "education",
  props: ["educationDegree"],
  data() {
    return {
      formInline: {
        schoolName: "",
        schoolTime: [],
        major: "",
        general: "",
        qualifications: ""
      },
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   }
      // },
      rules: {
        schoolName: [
          { required: true, message: "请输入学校名称", trigger: "blur" },
          { min: 0, max: 36, message: '仅限36个字符', trigger: 'blur' },
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        schoolTime: [
          { required: true, message: "请选择在校时间", trigger: "blur" }
        ],
        major: [
          {
            required: true,
            message: "请输入专业信息",
            trigger: "change"
          },
          { min: 0, max: 36, message: "仅限36个字符", trigger: "blur" }
        ],
        general: [{ required: true, message: "请选择教育类型", trigger: "change" }],
        qualifications: [
          { required: true, message: "请选择学历", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("sendiptVal", false, true);
    },
    //新增
    keep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let til = this.formInline.schoolTime[0].getTime();
          let till = this.formInline.schoolTime[1].getTime();
          let ti = this.$moment(till).format("YYYY-MM");
          let end = this.$moment(new Date().getTime()).format("YYYY-MM");
          if (ti === end) {
            var eduTime = null;
          } else {
            eduTime = till;
          }
          if (this.formInline.general == 0) {
            this.formInline.general = true;
          } else if (this.formInline.general == 1) {
            this.formInline.general = false;
          }
          let params = {
            beginTime: til,
            endTime: eduTime,
            degree: timeUtil.qualifications(parseInt(this.formInline.qualifications)),
            degreeCode: this.formInline.qualifications,
            major: this.formInline.major,
            school: this.formInline.schoolName,
            isUnified: this.formInline.general
          }
          eduadd(this.educationDegree,params).then(res => {
              if (res.data.code == 201) {
                this.$emit("sendiptVal", false, true);
              }
            })
            .catch(error => {
              this.$message({
                  message:error.response.data.message,
                  type: 'error'
                })
            });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    // this.formInline.major = this.educationDegree;
  }
};
</script>

<style lang="stylus">
.el-form-item {
  padding: 0 0 0 30px;
}

.cancel
  .el-button.is-plain:hover
    color #327cf3
    border-color #327cf3

.el-button {
  width: 94px;
  height: 34px;
  vertical-align: middle;
  padding: 0px;
}

.keep:hover {
  border-color: #7d8dcd;
}
</style>
