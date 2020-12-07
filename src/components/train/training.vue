<template>
  <div class="jobintension">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      :rules="rules"
      ref="formInline"
    >
      <el-form-item label="培训课程" style="margin:0 0 0 15px" prop="trainCourse">
        <el-input style="width:234px;height:36px" v-model="formInline.trainCourse" placeholder></el-input>
      </el-form-item>
      <el-form-item label="培训机构" prop="trainCourse" style="margin:0 0 20px 70px">
        <el-input style="width:234px;height:36px" v-model="formInline.trainCours" placeholder></el-input>
      </el-form-item>
      <el-form-item label="培训时间" class="block" style="margin:0 90px 0 0" prop="trainTime">
        <el-date-picker
          style="width:234px"
          v-model="formInline.trainTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="学历" style="visibility:hidden;margin-left:-15px">
        <el-select style="width:234px;height:36px" placeholder>
          <el-option label value="shanghai"></el-option>
          <el-option label value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class='cancel' style="margin:0 0 20px 535px">
        <el-button @click="cancel" plain style="margin:0 20px 0 0">取消</el-button>
        <el-button @click="keep('formInline')" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
trainadd
} from "../../apis/account";
export default {
  name: "training",
  props: ["trainDegree"],
  data() {
    return {
      til:'',
      till:'',
      formInline: {
        trainCourse: "",
        trainCours: "",
        trainTime: ""
      },
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   }
      // },
      trainTime: [],
      rules: {
        trainCourse: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          { min: 0, max: 20, message: "仅限20个字", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        trainCours: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          { min: 0, max: 20, message: "仅限20个字", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("trainEmit", false, true);
    },
    //新增
    keep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let til = this.formInline.trainTime[0].getTime();
          // let till = this.formInline.trainTime[1].getTime();
          // let ti = this.$moment(till).format("YYYY-MM");
          // let end = this.$moment(new Date().getTime()).format("YYYY-MM");
          if (this.formInline.trainTime[0] === undefined) {
            this.til = null
            this.till = null
          } else {
            this.til = this.formInline.trainTime[0].getTime();
            this.till = this.formInline.trainTime[1].getTime();
          }
          
          let params = {
            beginTime: this.til,
            endTime: this.till,
            institution: this.formInline.trainCours,
            lesson: this.formInline.trainCourse
          }
          trainadd(this.trainDegree,params)
            .then(res => {
              if (res.data.code == 201) {
                this.$emit("trainEmit", false, true);
              }
            })
            .catch(error => {
              
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-form-item {
  padding: 0 0 0 30px;
}

.el-button {
  width: 94px;
  height: 34px;
  vertical-align: middle;
  padding: 0px;
}
</style>