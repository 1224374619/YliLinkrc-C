<template>
  <div class="jobintension">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules" ref="formInline">
            <el-form-item label="语种" style="margin:0 0 0 20px" prop="languages">
                <el-input style="width:234px;height:36px" v-model="formInline.languages" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="听力能力" prop="listenAbility" style="margin:0 0 20px 50px">
                <el-select style="width:234px;height:36px" v-model="formInline.listenAbility" placeholder="">
                <el-option label="一般" value="0"></el-option>
                <el-option label="良好" value="1"></el-option>
                <el-option label="熟练" value="2"></el-option>
                <el-option label="精通" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="读写能力" prop="readAbility" style="margin:0 110px 0 0">
                <el-select style="width:234px;height:36px" v-model="formInline.readAbility" placeholder="">
                <el-option label="一般" value="0"></el-option>
                <el-option label="良好" value="1"></el-option>
                <el-option label="熟练" value="2"></el-option>
                <el-option label="精通" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学历" style="visibility:hidden;margin-left:-15px">
              <el-select style="width:234px;height:36px" placeholder>
                <el-option label value="shanghai"></el-option>
                <el-option label value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class='cancel' style="margin:0 0 20px 515px">
            <el-button @click='cancel' style="margin:0 20px 0 0" plain>取消</el-button>
            <el-button @click="keep('formInline')" type="primary">保存</el-button>
            </el-form-item>
          </el-form>
  </div>
</template>

<script>
import {
languageadd
} from "../../apis/account";
export default {
  name: 'language',
  props: ["languageDegree"],
  data() {
    return {
         formInline: {
          languages: '',
          listenAbility: '',
          readAbility:''
        },
         rules: {
          languages: [
            { required: true, message: "请输入语种", trigger: "blur" },
            { min: 0, max: 10, message: "仅限10个字", trigger: "blur" }
            // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
          ],
          listenAbility: [
            { required: true, message: "请选择听说能力", trigger: "blur" },
          ],
          readAbility: [
            { required: true, message: "请选择读写能力", trigger: "blur" }
          ],
        }
    }
  },
  methods: {
    cancel() {
      this.$emit("languageEmit",false,true)
    },
    //新增
    keep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            listenAndSpeak:Number(this.formInline.listenAbility),language:this.formInline.languages,readAndWrite:Number(this.formInline.readAbility)
          }
          languageadd(this.languageDegree,params).then(res => {
            if (res.data.code == 201) {
              this.$emit("languageEmit",false,true)
            }
          })
          .catch(error => {
              
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
    padding 0 0 0 54px
  .el-button
    width 94px 
    height 34px
    vertical-align middle
    padding 0px
  .keep:hover
    border-color #7d8dcd    
</style>