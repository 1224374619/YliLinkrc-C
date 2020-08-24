<template>
  <div class="asp">
    <div class="asp-content">
      <div class="asp-form">
        <div class="asp-table">
          <el-dialog
            title="新增地址"
            :visible.sync="centerDialogVisible"
            :show-close="false"
            width="35%"
            style="margin:200px 0 0 0"
            center
          >
            <div>
              <div class="loading-text">
                <el-form
                  :model="ruleForms"
                  :rules="rule"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="所在地" prop="city">
                    <el-cascader v-model="ruleForms.city" :props="props" :options="cityList"></el-cascader>
                  </el-form-item>
                  <el-form-item label="详细地址" prop="detailAddress">
                    <el-input type="textarea" v-model="ruleForms.detailAddress"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div style="text-align:center">
                <el-button
                  style="width:100px;height:40px;line-height:0px;margin:35px 0 0 0"
                  plain
                  @click="centerDialogVisible = false"
                >取消</el-button>
                <el-button
                  style="width:100px;height:40px;line-height:0px;margin:35px 0 0 20px"
                  type="primary"
                  @click="addAddress"
                >确定</el-button>
              </div>
            </div>
          </el-dialog>
          <el-dialog
            title="编辑地址"
            :visible.sync="centerDialogVisibles"
            :show-close="false"
            width="35%"
            style="margin:200px 0 0 0"
            center
          >
            <div>
              <div class="loading-text">
                <el-form
                  :model="ruleFormes"
                  :rules="rule"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="所在地" prop="city">
                    <el-cascader v-model="ruleFormes.city" :props="props" :options="cityList"></el-cascader>
                  </el-form-item>
                  <el-form-item label="详细地址" prop="detailAddress">
                    <el-input type="textarea" v-model="ruleFormes.detailAddress"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div style="text-align:center">
                <el-button
                  style="width:100px;height:40px;line-height:0px;margin:35px 0 0 0"
                  plain
                  @click="centerDialogVisible = false"
                >取消</el-button>
                <el-button
                  @click="editAddress"
                  style="width:100px;height:40px;line-height:0px;margin:35px 0 0 20px"
                  type="primary"
                >确定</el-button>
              </div>
            </div>
          </el-dialog>
          <div style="margin:19px 0 0 0">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="职位名称" prop="positionName">
                <el-input style="width:240px" placeholder="职位名称" v-model="ruleForm.positionName"></el-input>
              </el-form-item>
              <el-form-item label="工作性质" prop="nature">
                <el-select style="width:240px" v-model="ruleForm.nature" placeholder="工作性质">
                  <el-option
                    v-for="item in optionsNature"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位分类" prop="positionCatalog">
                <el-cascader
                  style="width:240px"
                  :options="positionCatalogList"
                  :props="propsTwo"
                  v-model="ruleForm.positionCatalog"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="月薪范围" prop="salary">
                <el-select style="width:240px" v-model="ruleForm.salary" placeholder="职位分类">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最低学历" prop="degree">
                <el-select style="width:240px" v-model="ruleForm.degree" placeholder="最低学历">
                  <el-option
                    v-for="item in optionsDegree"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作年限" prop="workYear">
                <el-select style="width:240px" v-model="ruleForm.workYear" placeholder="工作年限">
                  <el-option
                    v-for="item in optionsWorkYear"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作地区">
                <el-select style="width:500px" v-model="ruleForm.workCity" placeholder>
                  <el-option
                    v-for="item in addressList"
                    :key="item.id"
                    class="option"
                    :label="item.detail"
                    :value="item.id"
                  >
                    <span style="float: left">{{ item.detail }}</span>
                    <span
                      @click="deleteAddress(item)"
                      class="span-hover"
                      style="float: right; color: #8492a6; font-size: 13px"
                    >删除</span>
                    <span
                      @click="editAddressre(item)"
                      class="span-hover"
                      style="float: right; color: #8492a6; font-size: 13px;margin:0 10px 0 0"
                    >编辑</span>
                  </el-option>
                  <el-option style="text-align:center">
                    <span @click="centerDialogVisible = true">
                      <i class="el-icon-plus"></i>新增地址
                    </span>
                  </el-option>
                </el-select>
                <br />
                <!-- <el-input
                  style="width:500px;margin:20px 0 0 0"
                  placeholder="详细地址：街道门牌信息等"
                  type="textarea"
                  v-model="ruleForm.desc"
                ></el-input>-->
              </el-form-item>
              <el-form-item label="职位描述" prop="positionCatalogDetail">
                <el-input
                  style="width:500px;"
                  type="textarea"
                  placeholder="必填，请输入300字以下内容"
                  v-model="ruleForm.positionCatalogDetail"
                ></el-input>
              </el-form-item>
              <el-form-item label="求职要求" prop="JobSearch">
                <el-input
                  style="width:500px;"
                  type="textarea"
                  placeholder="必填，请输入300字以下内容"
                  v-model="ruleForm.JobSearch"
                ></el-input>
              </el-form-item>
              <el-form-item label="技能标签" prop="skills">
                <el-input
                  style="width:500px;"
                  type="textarea"
                  placeholder="选填"
                  v-model="ruleForm.skills"
                ></el-input>
              </el-form-item>
              <el-form-item label="负责HR" prop="HR">
                <el-select v-model="ruleForm.HR" placeholder="请选择责HR">
                  <el-option
                    v-for="item in HRlist"
                    :key="item.id"
                    :label="item.realName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="投递邮箱" prop="email">
                <el-input style="width:240px" v-model="ruleForm.email"></el-input>
                <el-button style="margin:0 0 0 20px" @click.prevent="addDomain">新增</el-button>
              </el-form-item>
              <el-form-item
                v-for="(domain, index) in ruleForm.domains"
                :label="''"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
              >
                <el-input style="width:240px" v-model="ruleForm.value"></el-input>
                <el-button style="margin:0 0 0 20px" @click.prevent="removeDomain(domain)">删除</el-button>
              </el-form-item>
              <el-form-item label="上线时间" prop="onlineTime">
                <el-date-picker @change="online" v-model="ruleForm.onlineTime" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="下线时间" prop="offlineTime">
                <el-date-picker @change="offline" v-model="ruleForm.offlineTime" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <!-- <el-form-item label="上线日常">
                <span style="width:240px">13天</span>
              </el-form-item>-->
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">上线</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import positionCatalog from "../../assets/positionCatalog.json";
import city from "../../assets/city.json";
import { CodeToTag } from "../../cookie.js";
export default {
  data() {
    return {
      ruleForm: {
        positionName: "",
        nature: "",
        positionCatalog: [],
        salary: "",
        degree: "",
        workYear: "",
        workCity: "",
        desc: "",
        positionCatalogDetail: "",
        JobSearch: "",
        skills: "",
        HR: "",
        email: "",
        domains: [],
        value: "",
        onlineTime: "",
        offlineTime: "",
        onlineDay: ""
      },
      props: {
        value: "tag",
        label: "tag",
        children: "children"
      },

      ruleForms: {
        detailAddress: "",
        city: ""
      },
      ruleFormes: {
        detailAddress: "",
        city: ""
      },
      centerDialogVisible: false,
      centerDialogVisibles: false,
      propsTwo: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      propsOne: {
        value: "code",
        label: "tag",
        children: "children"
      },
      options: [
        {
          value: "0",
          label: "1K以下"
        },
        {
          value: "1",
          label: "1K-2K"
        },
        {
          value: "2",
          label: "2K-4K"
        },
        {
          value: "3",
          label: "4K-6K"
        },
        {
          value: "4",
          label: "6K-8K"
        },
        {
          value: "5",
          label: "6K-8K"
        },
        {
          value: "6",
          label: "8K-10K"
        },
        {
          value: "7",
          label: "10K-15K"
        },
        {
          value: "8",
          label: "15K-25K"
        },
        {
          value: "9",
          label: "25K-35K"
        },
        {
          value: "10",
          label: "35K以上"
        }
      ],
      optionsDegree: [
        {
          value: 0,
          label: "初中及以下"
        },
        {
          value: 1,
          label: "中专/中技"
        },
        {
          value: 2,
          label: "高中"
        },
        {
          value: 3,
          label: "大专"
        },
        {
          value: 4,
          label: "本科"
        },
        {
          value: 5,
          label: "硕士"
        },
        {
          value: 6,
          label: "博士"
        }
      ],
      optionsNature: [
        {
          value: 0,
          label: "全职"
        },
        {
          value: 1,
          label: "兼职"
        },
        {
          value: 2,
          label: "实习"
        }
      ],

      optionsWorkYear: [
        {
          value: "0",
          label: "无"
        },
        {
          value: "1",
          label: "1-3年"
        },
        {
          value: "2",
          label: "3-5年"
        },
        {
          value: "3",
          label: "5-10年"
        },
        {
          value: "4",
          label: "10年以上"
        }
      ],
      companyId: "",
      positionCatalogList: [],
      cityList: [],
      HRlist: [],
      addressList: [],
      positionID: "",
      rules: {
        positionName: [
          { required: true, message: "请输入职位名称", trigger: "blur" }
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        nature: [
          { required: true, message: "请选择工作性质", trigger: "change" }
        ],
        positionCatalog: [
          { required: true, message: "请选择职位分类", trigger: "change" }
        ],
        salary: [
          { required: true, message: "请选择薪资范围", trigger: "change" }
        ],
        degree: [
          { required: true, message: "请选择最低学历", trigger: "change" }
        ],
        workYear: [
          { required: true, message: "请选择工作年限", trigger: "change" }
        ],
        workCity: [
          { required: true, message: "请选择工作城市", trigger: "change" }
        ],
        positionCatalogDetail: [
          { required: true, message: "请填写职位描述", trigger: "change" },
          {
            min: 0,
            max: 300,
            message: "长度在 0 到 500 个字符",
            trigger: "blur"
          }
        ],
        JobSearch: [
          { required: true, message: "请填写求职要求", trigger: "change" },
          {
            min: 0,
            max: 500,
            message: "长度在 0 到 500 个字符",
            trigger: "blur"
          }
        ],
        HR: [{ required: true, message: "请填写负责HR", trigger: "change" }],
        email: [
          { required: true, message: "请填写投递邮箱", trigger: "change" }
        ],
        onlineTime: [
          { required: true, message: "请选择上线时间", trigger: "change" }
        ],
        offlineTime: [
          { required: true, message: "请选择下线时间", trigger: "change" }
        ]
      },
      rule: {
        city: [{ required: true, message: "请选择地址", trigger: "blur" }],
        detailAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      id: "",
      publishedTime:'',
      logoutTime:''
    };
  },
  methods: {
    //编辑
    editAddressre(tab) {
      this.id = tab.id;
      this.centerDialogVisibles = true;
      this.ruleFormes.city = [tab.province, tab.city, tab.district];
      this.ruleFormes.detailAddress = tab.detail;
    },
    //删除公司地址
    deleteAddress(tab) {
      this.$http
        .delete(`/business-core/companies/addresses/${tab.id}`)
        .then(res => {
          if (res.data.code == "204") {
            this.ruleForm.workCity = "";
            this.address();
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //新增公司地址
    addAddress() {
      let params = {
        city: this.ruleForms.city[1],
        detail: this.ruleForms.detailAddress,
        district: this.ruleForms.city[2],
        province: this.ruleForms.city[0]
      };
      this.$http
        .post(`/business-core/companies/addresses`, params)
        .then(res => {
          if (res.data.code == "201") {
            this.centerDialogVisible = false;
            this.address();
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //编辑公司地址
    editAddress() {
      let params = {
        city: this.ruleFormes.city[1],
        detail: this.ruleFormes.detailAddress,
        district: this.ruleFormes.city[2],
        province: this.ruleFormes.city[0]
      };
      this.$http
        .put(`/business-core/companies/addresses/${this.id}`, params)
        .then(res => {
          if (res.data.code == "200") {
            this.centerDialogVisibles = false;
            this.address();
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //列出公司下所有地址
    address() {
      this.$http
        .get(`/business-core/companies/addresses`)
        .then(res => {
          if (res.data.code == "200") {
            this.addressList = res.data.data;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取公司简讯
    brief() {
      this.$http
        .get("/business-core/companyes/brief")
        .then(res => {
          if (res.data.code == "200") {
            this.companyId = res.data.data.id;
            this.address();
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取公司HR
    ListHR() {
      this.$http
        .get("/business-core/companyAccounts/listHr")
        .then(res => {
          if (res.data.code == "200") {
            this.HRlist = res.data.data;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    online() {
      this.logoutTime = this.ruleForm.onlineTime.getTime();
    },
    offline() {
      this.publishedTime = this.ruleForm.offlineTime.getTime();
    },
    //获取职位详情
    positionDetail() {
      this.$http
        .get(`/business-core/positions/${this.positionID}`)
        .then(res => {
          let response = res.data.data;
          let salaryName;
          switch (response.salaryMin) {
            case 0:
              salaryName = "0";
              break;
            case 1:
              salaryName = "1";
              break;
            case 2:
              salaryName = "2";
              break;
            case 4:
              salaryName = "3";
              break;
            case 6:
              salaryName = "4";
              break;
            case 8:
              salaryName = "5";
              break;
            case 10:
              salaryName = "6";
              break;
            case 15:
              salaryName = "7";
              break;
            case 25:
              salaryName = "8";
              break;
            case 35:
              salaryName = "9";
              break;
          }
          let workAgeName;
          switch (response.workAgeMin) {
            case 0:
              workAgeName = "0";
              break;
            case 1:
              workAgeName = "1";
              break;
            case 3:
              workAgeName = "2";
              break;
            case 5:
              workAgeName = "3";
              break;
            case 10:
              workAgeName = "4";
              break;
          }
          if (res.data.code == "200") {
            this.ruleForm = {
              positionName: response.positionName,
              nature: response.jobTypeCode,
              positionCatalog: [
                response.catalogFirst,
                response.catalogSecondary,
                response.catalogThird
              ],
              salary: salaryName,
              degree: response.degreeMinCode,
              workYear: workAgeName,
              workCity: response.addressId,
              positionCatalogDetail: response.description,
              JobSearch: response.requirement,
              HR: response.manager,
              email: response.email,
              onlineTime: response.publishedTime,
              offlineTime: response.offlineTime
            };
            this.logoutTime = response.publishedTime
            this.publishedTime = response.offlineTime
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //发布
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.ruleForm.onlineTime);
        let degreeName;
        switch (this.ruleForm.degree) {
          case 0:
            degreeName = "初中及以下";
            break;
          case 1:
            degreeName = "中专/中技";
            break;
          case 2:
            degreeName = "高中";
            break;
          case 3:
            degreeName = "大专";
            break;
          case 4:
            degreeName = "本科";
            break;
          case 5:
            degreeName = "硕士";
            break;
          case 6:
            degreeName = "博士";
            break;
        }
        let natureName;
        switch (this.ruleForm.nature) {
          case 0:
            natureName = "全职";
            break;
          case 1:
            natureName = "兼职";
            break;
          case 2:
            natureName = "实习";
            break;
        }
        let salaryMin;
        let salaryMax;
        switch (this.ruleForm.salary) {
          case "0":
            salaryMin = 0;
            salaryMax = 1;
            break;
          case "1":
            salaryMin = 1;
            salaryMax = 2;
            break;
          case "2":
            salaryMin = 2;
            salaryMax = 4;
            break;
          case "3":
            salaryMin = 4;
            salaryMax = 6;
            break;
          case "4":
            salaryMin = 6;
            salaryMax = 8;
            break;
          case "5":
            salaryMin = 8;
            salaryMax = 10;
            break;
          case "6":
            salaryMin = 10;
            salaryMax = 15;
            break;
          case "7":
            salaryMin = 15;
            salaryMax = 25;
            break;
          case "8":
            salaryMin = 25;
            salaryMax = 35;
            break;
          case "9":
            salaryMin = 35;
            salaryMax = null;
            break;
        }
        let workAgeMin;
        let workAgeMax;
        switch (this.ruleForm.workYear) {
          case "0":
            workAgeMin = 0;
            workAgeMax = 0;
            break;
          case "1":
            workAgeMin = 1;
            workAgeMax = 3;
            break;
          case "2":
            workAgeMin = 3;
            workAgeMax = 5;
            break;
          case "3":
            workAgeMin = 5;
            workAgeMax = 10;
            break;
          case "4":
            workAgeMin = 10;
            workAgeMax = null;
            break;
          default:
            workAgeMin = null;
            workAgeMax = null;
            break;
        }
        if (valid) {
          let params = {
            addressId: this.ruleForm.workCity,
            catalogCode: null,
            catalogFirst: this.ruleForm.positionCatalog[0],
            catalogSecondary: this.ruleForm.positionCatalog[1],
            catalogThird: this.ruleForm.positionCatalog[2],
            companyId: this.companyId,
            degreeMin: degreeName,
            degreeMinCode: this.ruleForm.degree,
            description: this.ruleForm.positionCatalogDetail,
            email: this.ruleForm.email,
            isGraduate: true,
            jobType: natureName,
            jobTypeCode: this.ruleForm.nature,
            managerId: this.ruleForm.HR,
            positionName: this.ruleForm.positionName,
            proxyEmail: this.ruleForm.email,
            requirement: this.ruleForm.JobSearch,
            salaryMax: salaryMax,
            salaryMin: salaryMin,
            published: true,
            sourceType: null,
            sourceUrl: null,
            workAgeMax: workAgeMax,
            workAgeMin: workAgeMin,
            offlineTime: this.logoutTime,
            publishedTime: this.publishedTime
          };
          this.$http
            .put(`/business-core/positions/${this.positionID}`, params)
            .then(res => {
              if (res.data.code == 200) {
                console.log("success");
              } else {
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.ruleForm.desc = "";
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.ruleForm.domains.indexOf(item);
      if (index !== -1) {
        this.ruleForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.ruleForm.domains.push({
        value: "",
        key: Date.now()
      });
    }
  },
  mounted: function() {},
  updated: function() {},
  created() {
    this.positionID = this.$route.query.position;
    this.positionCatalogList = positionCatalog.data;
    this.cityList = city.data;
    this.ListHR();
    this.brief();
    this.positionDetail();
  }
};
</script>
<style>
.asp-content {
  width: 100%;
  background: #ffffff;
}
.asp-form {
  width: 98%;
  border: 1px solid #ffffff;
}
.asp-table {
  width: 100%;
  border: 1px solid #ffffff;
  background: #ffffff;
  margin: 10px 0 0 0;
}
</style>