<template>
  <div class="gapDetail">
    <div class="steps">
      <el-steps :active="this.num" finish-status="success" simple style="margin-top: 20px">
        <el-step title="填写个人基本信息"></el-step>
        <el-step title="填写求职意愿"></el-step>
        <el-step title="填写教育经历"></el-step>
      </el-steps>
    </div>
    <div class="basicinfo" v-if="basicinfo">
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
              <el-select
                style="width:234px;height:36px"
                v-model="formInline.jobHunting"
                placeholder
              >
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
            <el-form-item class="cancel" style="margin:40px 0 20px 0">
              <el-button style="width:200px" type="primary" @click="keepBase('formInline')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="jobintension" v-if="jobintension">
      <el-form
        :inline="true"
        :model="JobformInline"
        class="demo-form-inline"
        :rules="rules"
        ref="JobformInline"
      >
        <el-form-item label="职位类型" style="margin:0 0 0 10px" prop="postType">
          <el-cascader
            style="width:234px;height:34px"
            :options="positionCatalogList"
            :props="propsTwo"
            v-model="formInline.postType"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="工作城市" style="margin:0 10px 20px 79px" prop="city">
          <el-cascader
            style="width:234px;height:34px"
            :options="options"
            :props="propsCity"
            v-model="formInline.city"
          ></el-cascader>
        </el-form-item>
        <br />
        <el-form-item label="企业行业" style="margin:0 0 0 10px" prop="industry">
          <el-cascader
            style="width:234px;height:34px"
            :options="industryList"
            :props="propsOne"
            v-model="formInline.industry"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="薪资范围" style="margin:0 10px 20px 79px" prop="scope">
          <el-select style="width:234px;height:34px" v-model="formInline.scope" placeholder>
            <el-option
              v-for="(list,index) in monthPayList"
              :key="index"
              :label="list.tag"
              :value="list.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="求职状态" style="margin:0 0 0 10px" prop="status">
          <el-select
            id="name"
            style="width:234px;height:34px"
            v-model="formInline.status"
            placeholder
            @change="Jobstate()"
          >
            <el-option
              v-for="(list,index) in jobSearchStatus"
              :key="index"
              :label="list.tag"
              :value="list.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作类型" style="margin:0 10px 20px 79px" prop="jobType">
          <el-select style="width:234px;height:34px" v-model="formInline.jobType" placeholder>
            <el-option
              v-for="(list,index) in workStateList"
              :key="index"
              :label="list.tag"
              :value="list.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="到岗时间" class="block" v-if="datePicker" style="margin:0 420px 0 0">
          <el-date-picker
            style="width:234px;height:34px"
            :disabled="this.formInline.status === 1||this.formJobintension.status === '离职-延时到岗'?false:true"
            v-model="formInline.reportTime"
            type="date"
            placeholder="请选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="cancel" style="margin:0 0 20px 0">
          <el-button style="width:200px" type="primary" @click="JobT('JobformInline')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="education" v-if="education">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        :rules="edurules"
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
        <br />
        <el-form-item label="专业" style="margin:0 0 0 10px" prop="major">
          <el-input style="width:234px;height:36px" v-model="formInline.major" placeholder></el-input>
        </el-form-item>
        <el-form-item label="学历" style="margin:0 10px 20px 9px" prop="qualifications">
          <el-select
            style="width:234px;height:36px"
            v-model="formInline.qualifications"
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
        <br />
        <el-form-item label="是否统招" style="width:355px;margin:0 0 0 10px" prop="general">
          <el-radio style="width:112px;height:40px" v-model="formInline.general" border label="0">是</el-radio>
          <el-radio
            style="width:112px;height:40px;margin:0 0 0 -20px"
            v-model="formInline.general"
            border
            label="1"
          >否</el-radio>
        </el-form-item>
        <el-form-item label="学历" style="visibility:hidden">
          <el-select style="width:242px;height:36px" placeholder>
            <el-option label value="shanghai"></el-option>
            <el-option label value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item class="cancel" style="margin:0 0 20px 0">
          <el-button style="width:200px" @click="keep('formInline')" type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
let token = Cookies.get("token");
import Cookies from "js-cookie";
import {
  jobintensionadd,
  industry,
  allpositionCatalog,
  option,
  eduadd,
  informationkeep,
  city
} from "../apis/account";
import citys from "../assets/city.json";
const timeUtil = require("../timeUtil.js");

import industrys from "../assets/industry.json";
import positionCatalog from "../assets/positionCatalog.json";
import options from "../assets/option.json";

export default {
  name: "basicinfo",
  props: ["fromData"],
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
      num:0,
      basicinfo: true,
      jobintension: false,
      education: false,
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
      edurules: {
        schoolName: [
          { required: true, message: "请输入学校名称", trigger: "blur" },
          { min: 0, max: 36, message: "仅限36个字符", trigger: "blur" }
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
        general: [
          { required: true, message: "请选择教育类型", trigger: "change" }
        ],
        qualifications: [
          { required: true, message: "请选择学历", trigger: "change" }
        ]
      },

      options: [],
      monthPayList: [],
      workStateList: [],
      jobSearchStatus: [],
      industryList: [],
      optionList: [],
      positionCatalogList: [],
      salaryMin: "",
      salaryMax: "",
      // pickerOptionsOne: {
      //   disabledDate(time) {
      //     return time.getTime() < Date.now();
      //   }
      // },
      propsCity: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      propsOne: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      propsTwo: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      datePicker: false,
      JobformInline: {
        postType: [],
        scope: "",
        city: [],
        status: "",
        jobType: "",
        reportTime: "",
        industry: []
      },
      rules: {
        postType: [
          { required: true, message: "请选择职位类型", trigger: "blur" }
        ],
        city: [{ required: true, message: "请选择意向城市", trigger: "blur" }],
        industry: [
          { required: true, message: "请选择企业行业", trigger: "blur" }
        ],
        scope: [{ required: true, message: "请选择薪资范围", trigger: "blur" }],
        status: [
          { required: true, message: "请选择求职状态", trigger: "blur" }
        ],
        jobType: [
          { required: true, message: "请选择工作类型", trigger: "blur" }
        ]
      },

      uploadData: {
        label: "resume-avatar"
      },
      myHeaders: { "Auth-Token": token },
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
            max: 24,
            message: "长度在 0 到 24 个字符",
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
            pattern: /^[1][3578][0-9]{9}$/,
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
      },
      defaultResumeId: ""
    };
  },
  methods: {
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
            degree: timeUtil.qualifications(
              parseInt(this.formInline.qualifications)
            ),
            degreeCode: this.formInline.qualifications,
            major: this.formInline.major,
            school: this.formInline.schoolName,
            isUnified: this.formInline.general
          };
          eduadd(this.defaultResumeId, params)
            .then(res => {
              if (res.data.code == 201) {
                this.$router.push({ path: "/resume" });
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
    Jobstate() {
      if (this.formInline.status == 1) {
        this.datePicker = true;
      } else {
        this.datePicker = false;
      }
    },
    JobT(formName) {
      switch (this.formInline.scope) {
        case 0:
          this.salaryMin = 0;
          this.salaryMax = 1;
          break;
        case 1:
          this.salaryMin = 1;
          this.salaryMax = 2;
          break;
        case 2:
          this.salaryMin = 2;
          this.salaryMax = 4;
          break;
        case 3:
          this.salaryMin = 4;
          this.salaryMax = 6;
          break;
        case 4:
          this.salaryMin = 6;
          this.salaryMax = 8;
          break;
        case 5:
          this.salaryMin = 8;
          this.salaryMax = 10;
          break;
        case 6:
          this.salaryMin = 10;
          this.salaryMax = 15;
          break;
        case 7:
          this.salaryMin = 15;
          this.salaryMax = 25;
          break;
        case 8:
          this.salaryMin = 25;
          this.salaryMax = 35;
          break;
        case 9:
          this.salaryMin = 35;
          this.salaryMax = null;
          break;
      }
      let til = new Date(this.formInline.reportTime).getTime();
      let params = {
        arriveTime: til,
        cities: [
          {
            city: this.formInline.city[1],
            district: this.formInline.city[2],
            province: this.formInline.city[0]
          }
        ],
        industries: [
          {
            first: this.formInline.industry[0],
            secondary: this.formInline.industry[1]
          }
        ],
        jobSearchStatus: timeUtil.jobSearchStatus(
          parseInt(this.formInline.status)
        ),
        jobSearchStatusCode: this.formInline.status,
        jobType: timeUtil.jobType(parseInt(this.formInline.jobType)),
        jobTypeCode: this.formInline.jobType,
        positionCatalogs: [
          {
            first: this.formInline.postType[0],
            secondary: this.formInline.postType[1],
            third: this.formInline.postType[2]
          }
        ],
        salaryMin: this.salaryMin,
        salaryMax: this.salaryMax
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          jobintensionadd(this.defaultResumeId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.basicinfo = false;
                this.jobintension = false;
                this.education = true;
                this.num = 2
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

    keepBase(formName) {
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
          let CodeToTag = timeUtil.CodeToTag(
            [
              this.formInline.city[0],
              this.formInline.city[1],
              this.formInline.city[2]
            ],
            this.options
          );
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
            degree: timeUtil.qualifications(
              parseInt(this.formInline.educationLevel)
            ),
            degreeCode: Number(this.formInline.educationLevel),
            email: this.formInline.email,
            phone: this.formInline.phone,
            isGraduate: this.formInline.isGraduate == 0 ? true : false
          };
          informationkeep(this.defaultResumeId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.basicinfo = false;
                this.jobintension = true;
                this.education = false;
                this.num = 1
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
        }
      });
    },
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
    //获取简历简讯
    brief() {
      this.$http
        .get("/consumer-core/resume/brief")
        .then(res => {
          if (res.status === 200) {
            this.defaultResumeId = res.data.data.defaultResumeId;
          } else {
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
    },
    option() {
      this.workStateList = this.optionList.jobType;
      this.monthPayList = this.optionList.salaryRange;
      this.jobSearchStatus = this.optionList.jobSearchStatus;
    }
  },
  created() {
    this.options = citys.data;
    this.token = Cookies.get("token");
    this.industryList = industrys.data;
    this.optionList = options.data;
    this.positionCatalogList = positionCatalog.data;
    this.option();
    this.brief();
  },
  computed: {
    uploadUrl() {
      return "/api/file-service/files/upload";
    }
  }
};
</script>

<style lang="stylus" scoped>
.gapDetail {
  width: 1440px;
  margin: 100px auto 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  .steps {
    margin: 20px 0 0 0;
    width: 100%;
  }

  .basicinfo {
    width: 1010px;
    margin: 0 auto 0;

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

  .jobintension {
    width: 1010px;
    margin: 50px auto 0;

    .el-form-item {
      padding: 0 0 0 30px;
    }

    .el-button {
      width: 94px;
      height: 34px;
      vertical-align: middle;
      padding: 0px;
    }

    .keep:hover {
      border-color: #7d8dcd;
    }
  }

  .education {
    width: 1010px;
    margin: 50px auto 0;
  }
}
</style>

