<template>
  <div class="jobintension">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      :rules="rules"
      ref="formInline"
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
          :props="props"
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

      <el-form-item class="cancel" style="margin:0 21px 20px 0">
        <el-button @click="cancel" style="margin:0 20px 0 550px" plain>取消</el-button>
        <el-button type="primary" @click="JobT('formInline')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  jobintensionadd,
  industry,
  city,
  allpositionCatalog,
  option
} from "../../apis/account";
import industrys from "../../assets/industry.json";
import citys from "../../assets/city.json";
import positionCatalog from "../../assets/positionCatalog.json";
import options from "../../assets/option.json";
const timeUtil = require('../../timeUtil.js');
export default {
  name: "jobintension",
  props: ["JobintenDegree"],
  data() {
    return {
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
      props: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      propsOne: {
        value: "tag",
        label: "tag",
        children: "children",
      },
      propsTwo: {
        value: "tag",
        label: "tag",
        children: "children",
      },
      datePicker: false,
      formInline: {
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
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("jobintensionEmit", false, true);
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
        salaryMax: this.salaryMax,
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          jobintensionadd(this.JobintenDegree, params).then(res => {
            if (res.data.code == 200) {
              this.$emit("jobintensionEmit", false, true);
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
    //城市
    //   city() {
    //   city()
    //   .then(res => {
    //       if (res.data.code == 200) {
    //         this.options = res.data.data
    //       }
    //     })
    //     // .catch(error => {});
    // },
    //获取所有企业行业
    // allposition() {
    //  industry().then(res => {
    //     if (res.data.code == 200) {
    //       this.industryList = res.data.data
    //     }
    //   })
    //   // .catch(error =>{});
    // },
    //获取所有职位类型
    // allpositionCatalog() {
    //   allpositionCatalog().then(res => {
    //     if (res.data.code == 200) {
    //       this.positionCatalogList = res.data.data
    //     }
    //   })
    //   // .catch(error =>{});
    // },
    //获取简单选项信息
    option() {
      this.workStateList = this.optionList.jobType;
      this.monthPayList = this.optionList.salaryRange;
      this.jobSearchStatus = this.optionList.jobSearchStatus;
      // .catch(error =>{});
    }
  },
  created() {
    this.industryList = industrys.data;
    this.options = citys.data;
    this.optionList = options.data;
    this.positionCatalogList = positionCatalog.data;
    this.option();
  }
};
</script>

<style lang="stylus" scoped>.el-form-item {
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
</style>