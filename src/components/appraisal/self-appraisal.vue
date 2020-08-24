<template>
  <div class="jobintension">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      :rules="rules"
      ref="formInline"
    >
      <el-form-item label="工作描述" style="margin-left:-10px;">
        <el-input
          type="textarea"
          v-model="formInline.personalDescription"
          style="width:583px;"
          placeholder="资料完善程度高，被选中的几率越大呦"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item style="margin:0 0 20px 420px">
        <el-button @click="cancel" style="margin:0 10px 0 0" plain>取消</el-button>
        <el-button @click="keep('formInline')" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "self-appraisal",
  props: ["professionalDegree"],
  data() {
    return {
      formInline: {
        personalDescription: ""
      },
      rules: {
        prizeAward: [
          { required: true, message: "请输入奖项名称", trigger: "blur" },
          { min: 0, max: 50, message: "仅限50个字符", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        prizeTime: [
          { required: true, message: "请选择获奖时间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("selfappraisalemit", false, true);
    },
    keep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .put(`/consumer-core/resume/${this.professionalDegree}/evaluation`, { content:this.formInline.personalDescription })
            .then(res => {
              if (res.data.code == 200) {
                this.$emit("selfappraisalemit", false, true);
              }
            });
        } else {
          return false;
        }
      });
    },
  }
};
</script>

<style lang="stylus"> 
  .el-button.is-plain:hover
    color #327cf3
    border-color #327cf3 
  .el-form-item
    padding 0 0 0 60px
  .el-button
    width 94px 
    height 34px
    vertical-align middle
    padding 0px  
  .element.style
    height 200px  
</style>