<template>
  <div class="jobintension">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules" ref="formInline">
      <el-form-item label="奖项名称" style="margin:0 0 0 10px" prop="prizeAward">
        <el-input style="width:234px;height:36px" v-model="formInline.prizeAward" placeholder></el-input>
      </el-form-item>
      <el-form-item label="获奖时间" prop="prizeTime" style="margin:0 0 20px 80px">
        <el-date-picker
          style="width:234px;height:36px"
          v-model="formInline.prizeTime"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="获奖证书" style="margin:0 170px 0 0" >
        <el-upload
          class="avatar-upload"
          :action="uploadUrl"
          :data="uploadData"
          :headers="myHeaders"
          style="margin-left:0px"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div style="margin:-20px 0 0 0;width:130px" class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
          <div style="margin:-20px 0 0 0;width:130px" class="el-upload__tip" slot="tip">且不超过2Mb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="语种" style="visibility:hidden">
        <el-input style="width:242px;height:36px" placeholder></el-input>
      </el-form-item>
      <br />
      <el-form-item class='cancel' style="margin:0 0 20px 535px">
        <el-button @click="cancel"  style="margin:0 20px 0 0" plain>取消</el-button>
        <el-button @click="keep('formInline')" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let token = Cookies.get("token");
import Cookies from "js-cookie";
import {
 awardsadd,
 awardskeepurl
} from "../../apis/account";
export default {
  name: "awards",
  props: ["professionalDegree"],
  data() {
    return {
      imageUrl:'',
      file:'',
      myHeaders: { "Auth-Token": Cookies.get("token") },
      uploadData: {
        label: "resume-cert"
      },
      perId:'',
      formInline: {
        prizeAward: "",
        prizeTime: ""
      },
      //  pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   }
      // },
       rules: {
          prizeAward: [
            { required: true, message: "请输入奖项名称", trigger: "blur" },
            { min: 0, max: 50, message: "仅限50个字符", trigger: "blur" }
            // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
          ],
          prizeTime: [
            { required: true, message: "请选择获奖时间", trigger: "blur" },
          ],
          // imageUrl: [
          //   { required: true, message: "请上传图片", trigger: "blur" },
          // ],
        }
    };
  },
  methods: {
     cancel() {
      this.$emit("awardsemit",false,true) 
    },
    //新增
    keep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let til = this.formInline.prizeTime.getTime();
          let params = {
            file:this.file === ''?null:this.file,acquiredTime:til,award:this.formInline.prizeAward
          }
            awardsadd(this.professionalDegree,params).then(res => {
                if (res.data.code == 201) {
                  this.$emit("awardsemit",false,true)
                  this.perId = res.data.data.addedModule.id
                  awardskeepurl(this.professionalDegree,this.perId)
                  // .then(res => {
        
                  //   }).catch(error => {});
                }
              }).catch(error => {
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
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.file = res.data
      },
      handleAvatarError(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        message: "图片上传失败，请重新上传"
      });
    },
  },
  computed: {
      uploadUrl() {
        return '/api/v2/file-service/files/upload';
      }
    },
};
</script>

<style lang="stylus"> 
  .el-form-item
    padding 0 0 0 30px
  .el-button
    width 94px 
    height 34px
    vertical-align middle
    padding 0px 
  .el-icon-circle-close:before
    color white 
    padding 50px 0 0 0
  .el-image-viewer__btn el-image-viewer__close 
    margin 0 0 0 -100px    
</style>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-right:30px
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
</style>