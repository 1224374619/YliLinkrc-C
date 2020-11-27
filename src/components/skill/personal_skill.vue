<template>
  <div class="jobintension">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      :rules="rules"
      ref="formInline"
    >
      <el-form-item label="技能名称" style="margin:0 0 0 10px" prop="technicalName">
        <el-input style="width:234px;height:36px" v-model="formInline.technicalName" placeholder></el-input>
      </el-form-item>
      <el-form-item label="掌握程度" prop="level" style="margin:0 0 20px 80px">
        <el-select style="width:234px;height:36px" v-model="formInline.level" placeholder>
          <el-option label="一般" value="0"></el-option>
          <el-option label="良好" value="1"></el-option>
          <el-option label="熟练" value="2"></el-option>
          <el-option label="精通" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="获奖证书" style="margin:0 170px 0 0">
        <el-upload
          class="avatar-upload"
          style="margin:0 0 0 0"
          :action="uploadUrl"
          :data="uploadData"
          :headers="myHeaders"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div
            style="margin:-20px 0 0 0;width:130px"
            class="el-upload__tip"
            slot="tip"
          >只能上传jpg/png文件</div>
          <div style="margin:-20px 0 0 0;width:130px" class="el-upload__tip" slot="tip">且不超过2Mb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="语种" style="visibility:hidden">
        <el-input style="width:242px;height:36px" placeholder></el-input>
      </el-form-item>
      <br />
      <el-form-item class="cancel" style="margin:0 0 20px 535px">
        <el-button @click="cancel" plain style="margin:0 20px 0 0">取消</el-button>
        <el-button @click="keep('formInline')" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let token = Cookies.get("token");
import Cookies from "js-cookie";
import { skilladd, skilladdurl } from "../../apis/account";
export default {
  name: "personal_skill",
  props: ["professionalDegree"],
  data() {
    return {
      perId: "",
      file: "",
      imageUrl: "",
      myHeaders: { "Auth-Token": Cookies.get("token") },
      uploadData: {
        label: "resume-cert"
      },
      formInline: {
        technicalName: "",
        level: ""
      },
      rules: {
        technicalName: [
          { required: true, message: "请输入技能名称", trigger: "blur" },
          { min: 0, max: 50, message: "仅限50个字符", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        level: [{ required: true, message: "请选择掌握程度", trigger: "blur" }]
      }
    };
  },
  computed: {
    uploadUrl() {
      return '/api/v2/file-service/files/upload';
    }
  },
  methods: {
    cancel() {
      this.$emit("skillEmit", false, true);
    },
    //新增
    keep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            skill: this.formInline.technicalName,
            level: this.formInline.level,
            file: this.file === "" ? null : this.file
          };
          skilladd(this.professionalDegree, params).then(res => {
            if (res.data.code == 201) {
              this.perId = res.data.data.addedModule.id;
              skilladdurl(this.professionalDegree, this.perId);
            }
          });
          this.$emit("skillEmit", false, true);
          // .catch(error => {});
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.file = res.data;
    },
    handleAvatarError(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        message: "图片上传失败，请重新上传"
      });
    },
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
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-right: 30px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
