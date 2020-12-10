<template>
  <div class="jobintension">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      :rules="rules"
      ref="formInline"
    >
      <el-form-item label="公司名称" style="margin:0 0 0 10px" prop="post">
        <el-input style="width:234px;height:36px" v-model="formInline.post" placeholder></el-input>
      </el-form-item>
      <el-form-item label="职位名称" prop="postName" style="margin:0 0 20px 9px">
        <el-input style="width:234px;height:46px" v-model="formInline.postName" placeholder></el-input>
      </el-form-item>
      <el-form-item label="税前月薪" style="margin:0 0 0 20px" prop="monthPay">
        <el-input style="width:234px;" v-model="formInline.monthPay" placeholder></el-input> K 
      </el-form-item>
      <el-form-item label="工作时间" class="block" prop="workTime" style="margin:0 0 20px 9px">
        <el-date-picker
          style="width:234px;"
          v-model="formInline.workTime"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="工作描述" style="margin-left:20px" prop="jobDescription">
        <el-input
          type="textarea"
          maxlength="1600"
          show-word-limit
          v-model="formInline.jobDescription"
          style="width:624px"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item class="cancel" style="margin:0 0 20px 505px">
        <el-button @click="cancel" plain style="margin:0 20px 0 0">取消</el-button>
        <el-button @click="keep('formInline')" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { workadd } from "../../apis/account";
export default {
  name: "work",
  props: ["workDegree"],
  data() {
    return {
      formInline: {
        jobDescription: "",
        monthPay: "",
        trade: "",
        postName: "",
        post: "",
        workTime: []
      },
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   }
      // },
      industryList: [],
      propsOne: {
        value: "code",
        label: "tag",
        children: "children",
        emitPath: false
      },
      rules: {
        post: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 0, max: 36, message: "仅限36个字", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        postName: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
          { min: 0, max: 10, message: "仅限10个字", trigger: "blur" }
        ],
        trade: [{ required: true, message: "请选择行业", trigger: "blur" }],
        workTime: [
          { required: true, message: "请选择工作时间", trigger: "blur" }
        ],
        monthPay: [
          { min: 0, max: 5, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ],
        jobDescription: [
          {
            min: 0,
            max: 800,
            message: "仅限800个字",
            trigger: "blur"
          },
          { required: true, message: "请填写工作描述", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("workEmit", false, true);
    },
    // //获取所有企业行业
    // allposition() {
    //   this.$http.get("/constant/industry").then(res => {
    //     if (res.data.code == 200) {
    //       this.industryList = res.data.data;
    //     }
    //   });
    // },
    //新增
    keep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let til = this.formInline.workTime[0].getTime();
          let till = this.formInline.workTime[1].getTime();
          let ti = this.$moment(till).format("YYYY-MM");
          let end = this.$moment(new Date().getTime()).format("YYYY-MM");
          if (ti === end) {
            var eduTime = null;
          } else {
            eduTime = till;
          }
          let params = {
            beginTime: til,
            endTime: eduTime,
            company: this.formInline.post,
            position: this.formInline.postName,
            description: this.formInline.jobDescription,
            salaryBeforeTax: this.formInline.monthPay
          };
          workadd(this.workDegree, params)
            .then(res => {
              if (res.data.code == 201) {
                this.$emit("workEmit", false, true);
              }
            })
            .catch(error => {
              
            });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    // this.allposition();
  }
};
</script>

<style lang="stylus">.el-form-item {
  padding: 0 0 0 30px;
}

.el-button {
  width: 94px;
  height: 34px;
  vertical-align: middle;
  padding: 0px;
}

.block {
  .el-range-editor.el-input__inner {
    height: 40px;
  }
}
</style>