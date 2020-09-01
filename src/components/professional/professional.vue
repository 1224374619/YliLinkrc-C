<template>
  <div class="jobintension">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules" ref="formInline">
            <el-form-item label="职称等级" prop="professional" style="margin:0 105px 0 0">
                <el-input style="width:234px;height:36px" v-model="formInline.professional" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="语种" style="visibility:hidden;margin:0 5px 0 0" >
                <el-input style="width:234px;height:36px" v-model="formInline.languages" placeholder=""></el-input>
            </el-form-item><br>
            <el-form-item class='cancel' style="margin:0 0 20px 505px">
            <el-button @click="cancel" plain style="margin:0 20px 0 0">取消</el-button>
            <el-button @click="keep('formInline')" type="primary">保存</el-button>
            </el-form-item>
          </el-form>
  </div>
</template>

<script>
import {
professionaladd
} from "../../apis/account";
export default {
  name: 'professional',
  props: ["professionalDegree"],
  data() {
    return {
         formInline: {
          professional: '',
          languages: ''
        },
        rules: {
          professional: [
            { required: true, message: "请输入职称信息", trigger: "blur" },
            { min: 0, max: 50, message: "仅限50个字符", trigger: "blur" }
          ]
      }
    }
  },
  methods :{
    cancel() {
      this.$emit("professionalEmit",false,true)
    },
    //新增
    keep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            qual:this.formInline.professional
          }
          professionaladd(this.professionalDegree,params).then(res => {
            if (res.data.code == 201) {
              this.$emit("professionalEmit",false,true)
            }
          })
          .catch(error => {
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
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style lang="stylus" scoped> 
  .el-form-item
    padding 0 0 0 60px
  .el-button
    width 94px 
    height 34px
    vertical-align middle
    padding 0px   
</style>