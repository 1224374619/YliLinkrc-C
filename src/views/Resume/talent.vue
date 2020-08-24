<template>
  <div style="margin:96px 0 0 0;">
    <div class="resume-navs">
      <div>
        平台人才库
        <span style="font-size:12px;margin:0 0 0 20px">当前仅支持在线简历</span>
      </div>
    </div>
    <div class="resume-seconds">
      <el-form :inline="true" :model="formInline" label-width="100px" class="demo-form-inline">
        <el-form-item label="意向城市">
          <el-cascader style="width:200px" v-model="formInline.city" :props="props" :options="city"></el-cascader>
        </el-form-item>
        <el-form-item label="企业行业">
          <el-cascader
            style="width:200px"
            v-model="formInline.industry"
            :props="props"
            :options="industry"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="职位类型">
          <el-cascader
            style="width:200px"
            v-model="formInline.positionCatalog"
            :props="props"
            :options="positionCatalog"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="最高学历">
          <el-select style="width:200px" v-model="formInline.degree" placeholder="最高学历">
            <el-option
              v-for="item in optionsDegree"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作年限">
          <el-select style="width:200px" v-model="formInline.workYear" placeholder="工作年限">
            <el-option
              v-for="item in optionsWorkYear"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-date-picker
            style="width:95px"
            v-model="formInline.birthdayMin"
            type="year"
            placeholder="选择"
          ></el-date-picker>-
          <el-date-picker
            style="width:95px"
            v-model="formInline.birthdayMax"
            type="year"
            placeholder="选择"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="display: flex;justify-content: flex-end;">
          <el-button @click="back">重置</el-button>
          <el-button @click="onSubmit" style="background:#FF7152;color:#ffffff">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="uploadFile" type="text" style="float:right;margin:0 20px 0 0">批量下载简历</el-button>
      <el-table :data="tableData" style="width: 98%;margin:0 auto" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="fullName" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column label="年龄">
          <template slot-scope="scope">
            <span>{{scope.row.age}}岁</span>
          </template>
        </el-table-column>
        <el-table-column label="工作年限" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.workAge}}年</span>
          </template>
        </el-table-column>
        <el-table-column label="海外工作年限" show-overflow-tooltip width="90">
          <template slot-scope="scope">
            <span>{{scope.row.overseasAge}}年</span>
          </template>
        </el-table-column>
        <el-table-column prop="district" label="现居地" show-overflow-tooltip></el-table-column>
        <el-table-column prop="degree" label="学历" show-overflow-tooltip></el-table-column>
        <el-table-column prop="school" label="毕业院校" show-overflow-tooltip></el-table-column>
        <el-table-column prop="targetPosition" label="求职意向" show-overflow-tooltip></el-table-column>
        <el-table-column label="投递本公司" width="95">
          <template slot-scope="scope">
            <span v-if="scope.row.isSubOurCompany">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="90">
          <template slot-scope="scope">
            <el-button style="color:#FF7152" @click="examing(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="upload(scope.row)" style="color:#FF7152" type="text" size="small">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        class="pagination"
        :page-sizes="page.pageSizeOpts"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import citys from "../../assets/city.json";
import positionCatalog from "../../assets/positionCatalog.json";
import industry from "../../assets/industry.json";
const timeUtil = require("../../timeUtil.js");
import qs from "qs";
export default {
  name: "home",
  data() {
    return {
      positionCatalog: [],
      city: [],
      industry: [],
      props: {
        value: "code",
        label: "tag",
        children: "children"
      },
      optionsDegree: [
        {
          value: "0",
          label: "初中及以下"
        },
        {
          value: "1",
          label: "中专/中技"
        },
        {
          value: "2",
          label: "高中"
        },
        {
          value: "3",
          label: "大专"
        },
        {
          value: "4",
          label: "本科"
        },
        {
          value: "5",
          label: "硕士"
        },
        {
          value: "6",
          label: "博士"
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
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      formInline: {
        city: "",
        industry: "",
        positionCatalog: "",
        degree: "",
        workYear: "",
        birthdayMin: "",
        birthdayMax: ""
      },
      birthdayMin: "",
      birthdayMax: "",
      activeName: "first",
      currentPage4: 4,
      tableData: [],
      arrResume: [],
      multipleSelection: []
    };
  },
  methods: {
    //下载简历
    handleSelectionChange(val) {
      this.arrResume = [];
      this.multipleSelection = val;
      this.multipleSelection.forEach((item, index, array) => {
        this.arrResume.push(item.id);
      });
    },
    //下载
    upload (tab) {
      this.arrResume.push(tab.id)
      this.uploadFile()
    },
    uploadFile() {
      let params = {
        resumeIds: this.arrResume
      };
      let resumeList = qs.stringify(
        { resumeIds: this.arrResume },
        { arrayFormat: "repeat" }
      );
      this.$local
        .get("/business-core/resumes/dowload?" + resumeList, {
          responseType: "blob"
        })
        .then(res => {
          const disposition = res.headers["content-disposition"];
          let fileName = disposition.substring(
            disposition.indexOf("filename=") + 9,
            disposition.length
          );
          // iso8859-1的字符转换成中文
          fileName = decodeURI(escape(fileName));
          // 去掉双引号
          fileName = fileName.replace(/\"/g, "");
          const content = res.data;
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          console.log(blob);
          if (window.navigator.msSaveOrOpenBlob) {
            // console.log(2)
            navigator.msSaveBlob(blob, fileName);
          } else {
            // console.log(3)
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            //释放内存
            window.URL.revokeObjectURL(link.href);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //列表
    platform() {
      if (this.formInline.birthdayMin) {
        this.birthdayMin = this.formInline.birthdayMin.getTime();
        this.birthdayMax = this.formInline.birthdayMax.getTime();
      } else {
        this.birthdayMin = null;
        this.birthdayMax = null;
      }
      let workAgeMin;
      let workAgeMax;
      switch (this.formInline.workYear) {
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
      let city = timeUtil.CodeToTag(
        [
          this.formInline.city[0],
          this.formInline.city[1],
          this.formInline.city[2]
        ],
        this.city
      );
      let positionCatalog = timeUtil.CodeToTag(
        [
          this.formInline.positionCatalog[0],
          this.formInline.positionCatalog[1],
          this.formInline.positionCatalog[2]
        ],
        this.positionCatalog
      );
      let industry = timeUtil.CodeToTag(
        [this.formInline.industry[0], this.formInline.industry[1]],
        this.industry
      );
      console.log(this.formInline.degree);
      let degree = timeUtil.qualifications(this.formInline.degree);

      let params = {
        birthdayMax: this.birthdayMax,
        birthdayMin: this.birthdayMin,
        city: city[1] ? city[1] : null,
        degree: degree ? degree : null,
        industry: this.formInline.industry[0]
          ? {
              first: industry[0] ? industry[0] : null,
              secondary: industry[1] ? industry[1] : null
            }
          : null,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionCatalog: this.formInline.positionCatalog[0]
          ? {
              first: positionCatalog[0] ? positionCatalog[0] : null,
              secondary: positionCatalog[1] ? positionCatalog[1] : null,
              third: positionCatalog[2] ? positionCatalog[2] : null
            }
          : null,
        province: city[0] ? city[0] : null,
        sortBy: null,
        sortOrder: null,
        workAgeMax: workAgeMax ? workAgeMax : null,
        workAgeMin: workAgeMin ? workAgeMin : null
      };
      this.$http
        .post("/business-core/platformTalentPool/databases/search", params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查看
    examing(tab) {
      console.log(tab);
      this.$router.push({
        path: "/resume/talent/Detail",
        query: {
          resumeIds: tab.id
        }
      });
    },
    //重置
    back() {
      this.formInline = {
        city: "",
        industry: "",
        positionCatalog: "",
        degree: "",
        workYear: "",
        birthdayMin: "",
        birthdayMax: ""
      };
    },
    onSubmit() {
      this.platform();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      this.platform();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.platform();
    }
  },
  created() {
    this.city = citys.data;
    this.positionCatalog = positionCatalog.data;
    this.industry = industry.data;
    this.platform();
  }
};
</script>


<style lang="stylus" scoped>
.resume-navs {
  width: 100%;
  height: 50px;
  background: #FAFAFA;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 50px;
  margin: -80px 0 0 0;

  div {
    margin: 0 0 0 20px;
    color: #1890FF;
  }
}

.resume-seconds {
  width: 100%;
  height: auto;
  background: #ffffff;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);
}

.demo-form-inline {
  margin: 20px 35px 0 20px;
}
</style>

