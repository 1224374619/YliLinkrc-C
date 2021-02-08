<template>
  <div class="joblist">
    <div class="joblist-search">
      <div class="joblist-input">
        <el-input placeholder="搜索公司或职位" v-model="joblistSearch" class="input-with-select">
          <el-select
            v-model="positionOrcompany"
            @change="getVendorId"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in perList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button slot="append" @click="searches" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div class="joblist-article">
      <div class="article-searchList">
        <div style="margin:40px 0 30px 0;">
          <div class="article" style="margin-top:10px">
            <span class="article-title" style="margin-left:-10px">行政区域：</span>
            <el-radio-group
              size="small"
              v-model="district"
              style="margin-top:-1px;margin-left:28px;"
            >
              <el-radio-button size="small" style="margin-left:-10px" label="50">不限</el-radio-button>
            </el-radio-group>
            <el-radio-group
              size="small"
              v-model="district"
              style="width:750px;margin-top:-1px;margin-left:-3px;"
            >
              <el-radio-button
                class="article-content"
                :label="list.code"
                v-for="(list,index) in districtArr.slice(0, 5)"
                :key="index"
              >{{list.tag}}</el-radio-button>
            </el-radio-group>
            <br />

            <span
              style="font-size:14px;margin-top:3px;margin-left:185px;cursor:pointer;color:#02B9B8;"
              @click="moreCity"
            >
              更多
              <i v-if="this.moreDistrict === false" class="el-icon-caret-bottom"></i>
              <i v-else class="el-icon-caret-top"></i>
            </span>
          </div>
          <div style="margin:5px 0 0 78px" class="article">
            <el-radio-group
              size="small"
              style="width:650px;"
              v-model="district"
              v-if="moreDistrict"
            >
              <el-radio-button
                class="article-content"
                style="padding:0 20px 0 0;"
                v-for="(list,index) in districtArr.slice(5)"
                :label="list.code"
                :key="index"
              >{{list.tag}}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="article" v-if="showPosition" style="margin-top:17px">
            <span class="article-title">工作经验：</span>
            <el-radio-group
              size="small"
              v-model="workExperience"
              style="margin-top:-1px;margin-left:0px"
            >
              <el-radio-button size="small" class="article-content" label="15">不限</el-radio-button>
              <el-radio-button
                class="article-content"
                :label="index"
                v-for="(list,index) in workExperienceList"
                :key="index"
              >{{list.tag}}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="article" v-if="showPosition" style="margin-top:17px">
            <span class="article-title">最低学历：</span>
            <el-radio-group
              size="small"
              v-model="Education"
              style="margin-top:-1px;margin-left:0px"
            >
              <el-radio-button size="small" class="article-content" label="15">不限</el-radio-button>
              <el-radio-button
                class="article-content"
                :label="index"
                v-for="(list,index) in EducationList"
                :key="index"
              >{{list.tag}}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="article" v-if="showPosition" style="margin-top:17px">
            <span class="article-title">月薪范围：</span>
            <el-radio-group size="small" v-model="monthPay" style="margin-top:-1px;margin-left:0px">
              <el-radio-button size="small" class="article-content" label="15">不限</el-radio-button>
              <el-radio-button
                class="article-content"
                :label="index"
                v-for="(list,index) in monthPayList"
                :key="index"
              >{{list.tag}}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="article" v-if="showPosition" style="margin-top:17px">
            <span class="article-title">工作类型：</span>
            <el-radio-group
              size="small"
              v-model="workState"
              style="margin-top:-1px;margin-left:0px"
            >
              <el-radio-button size="small" class="article-content" label="15">不限</el-radio-button>
              <el-radio-button
                class="article-content"
                :label="index"
                v-for="(list,index) in workStateList"
                :key="index"
              >{{list.tag}}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="article" style="margin-top:17px">
            <span class="article-title">公司规模：</span>
            <el-radio-group size="small" v-model="scale" style="margin-top:-1px;margin-left:0px">
              <el-radio-button size="small" class="article-content" label="15">不限</el-radio-button>
              <el-radio-button
                class="article-content"
                :label="index"
                v-for="(list,index) in scaleList"
                :key="index"
              >{{list.tag}}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="article" style="margin-top:17px">
            <span class="article-title">企业性质：</span>
            <el-checkbox-group
              size="small"
              v-model="qualitys"
              style="margin-top:-1px;margin-left:30px;"
            >
              <el-checkbox-button
                size="small"
                @change="qualitysHandle"
                style="margin-left:-10px"
                label="5"
              >不限</el-checkbox-button>
            </el-checkbox-group>
            <el-checkbox-group
              size="small"
              v-model="quality"
              style="margin-top:-1px;margin-left:0px"
            >
              <el-checkbox-button
                class="article-content"
                @change="qualityHandle"
                :label="list.tag"
                v-for="(list,index) in qualityList"
                :key="index"
              >{{list.tag}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="article" v-if="showPosition" style="margin-top:17px">
            <el-radio-group size="small" v-model="release">
              <span style="margin-left:-50px" class="article-title">发布时间：</span>
              <el-radio-button class="article-content" label="5">不限</el-radio-button>
              <el-radio-button
                class="article-content"
                :label="index"
                v-for="(list,index) in releaseList"
                :key="index"
              >{{list.tag}}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="article" style="margin-top:17px">
            <span class="article-title">公司行业：</span>
            <el-radio-group
              size="small"
              v-model="industry"
              style="margin-top:-1px;;margin-left:20px;"
            >
              <el-radio-button size="small" label="10000">不限</el-radio-button>
            </el-radio-group>
            <el-radio-group
              size="small"
              v-model="industry"
              style="width:750px;margin-top:-1px;;margin-left:2px;"
            >
              <el-radio-button
                class="article-content"
                :label="list.code"
                v-for="(list,index) in industryList.slice(0, 5)"
                :key="index"
              >{{list.tag}}</el-radio-button>
            </el-radio-group>
            <span
              style="font-size:14px;margin-top:3px;margin-left:185px;cursor:pointer;color:#02B9B8"
              @click="moreIndustry"
            >
              更多
              <i v-if="this.moreIndustries === false" class="el-icon-caret-bottom"></i>
              <i v-else class="el-icon-caret-top"></i>
            </span>
          </div>
          <div style="margin:5px 0 0 135px;" class="article">
            <el-radio-group
              size="small"
              v-model="industry"
              style="width:770px"
              v-if="moreIndustries"
            >
              <el-radio-button
                class="article-content"
                style="margin-left:-40px;padding:0 60px 0 0;margin-top:5px"
                v-for="(list,index) in industryList.slice(5)"
                :label="list.code"
                :key="index"
              >{{list.tag}}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="article-button" v-if="articleButton" style="margin:40px 0 30px 0">
          <el-button
            @click="cancelButton"
            style="margin:0 0 16px 870px;width:105px;height:35px;line-height:3px;color:#ffffff;font-size:16px;padding:0px;background:#02B9B8"
          >清除筛选</el-button>
          <el-button
            @click="keepButton"
            style="margin:0 0 16px 30px;width:105px;height:35px;line-height:3px;color:#ffffff;font-size:16px;padding:0px;background:#02B9B8"
          >立即筛选</el-button>
        </div>
      </div>
    </div>
    <div class="joblist-content" v-if="joblistCompany">
      <div class="content" v-for="(item,index) in companyList" :key="index">
        <div class="content-img">
          <img :src="item.logoUrl" />
        </div>
        <div class="content-infor">
          <span>{{item.companyName}}</span>
          <span>{{item.address.city}} | {{item.size}}人 | {{item.industryFirst}}</span>
        </div>
        <div class="content-job">
          <span>
            在招职位
            {{item.recruitedPositionNum}}个
          </span>
        </div>
        <div class="content-button">
          <el-button @click="compan(item.id)" class="button" type="primary">进入企业主页</el-button>
        </div>
      </div>
      <div class="footer-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="page.pageSizeOpts"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
    <div class="joblist-footer" v-if="joblistJob">
      <div
        class="joblist-hover"
        style="cursor:pointer"
        v-for="(item,index) in positionList"
        :key="index"
        @click="posion(item.id)"
      >
        <div class="footer-first" style="margin-top:-20px">
          <span>{{item.positionName}}</span>
          <span v-if="item.salaryMin == 35">{{item.salaryMin}}k以上</span>
          <span v-else>{{item.salaryMin}}-{{item.salaryMax}}k</span>
          <span
            v-if="item.company.companyName.length > 10"
          >{{item.company.companyName.substr(0,9) + '...'}}</span>
          <span v-else>{{item.company.companyName}}</span>
        </div>
        <div class="footer-second">
          <span
            v-if="item.workAgeMax == null"
          >{{item.workAddress.city}} | 10年以上 | {{item.degreeMin}}</span>
          <span
            v-else-if="item.workAgeMin == 0"
          >{{item.workAddress.city}} | 无工作经验 | {{item.degreeMin}}</span>
          <span
            v-else
          >{{item.workAddress.city}} | {{item.workAgeMin}}-{{item.workAgeMax}}年 | {{item.degreeMin}}</span>

          <span>{{item.company.industrySecondary}} | {{item.company.size}}人</span>
          <span>{{item.publishedTime | formatDate}}</span>
        </div>
        <div class="footer-line"></div>
      </div>
      <div class="footer-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="page.pageSizeOpts"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
    <div class="joblist-footer" v-if="contentNull" style="margin-top:-10px">
      <img style="margin:250px 0 0 0" :src="require('../assets/images/np.png')" />
      <h5 style="color:#7C7C7C;font-size:16px;margin:-10px 0 0 0">未找到相关职位呦</h5>
      <h5 style="color:#7C7C7C;font-size:16px;margin:2px 0 250px 0">换个筛选条件试试呗</h5>
    </div>
    <div class="joblist-footer" v-if="companyNull" style="margin-top:-10px">
      <img style="margin:250px 0 0 0" :src="require('../assets/images/np.png')" />
      <h5 style="color:#7C7C7C;font-size:16px;margin:-10px 0 0 0">未找到相关公司呦</h5>
      <h5 style="color:#7C7C7C;font-size:16px;margin:2px 0 250px 0">换个筛选条件试试呗</h5>
    </div>
  </div>
</template>
<script>
import "../cookie.js";
import industrys from "../assets/industry.json";
import citys from "../assets/city.json";
import option from "../assets/option.json";
const timeUtil = require("../timeUtil.js");
import { companySearch, positionSearch } from "apis/account";

export default {
  name: "joblist",
  components: {},
  data() {
    return {
      joblistJob: true,
      joblistCompany: false,
      articleButton: false,
      isGraduate: "",
      workAgeMin: "",
      workAgeMax: "",
      salaryMin: "",
      salaryMax: "",
      contentNull: false,
      companyNull: false,
      companyList: [{ address: {} }],
      positionList: [],
      city: [],
      perList: [
        {
          value: "职位",
          label: "职位"
        },
        {
          value: "公司",
          label: "公司"
        }
      ],
      positionOrcompany: "职位",
      joblistSearch: "",
      showPosition: true,
      //行政区域筛选
      district: "50",
      moreDistrict: false,
      districtArr: [],
      //工作经验
      workExperienceList: [],
      workExperience: "15",
      //最低学历
      EducationList: [],
      Education: "15",
      //月薪范围
      monthPayList: [],
      monthPay: "15",
      //工作类型
      workStateList: [],
      workState: "15",
      //公司规模
      scaleList: [],
      scale: "15",
      //企业性质
      qualityList: [],
      quality: [],
      qualitys: ["5"],
      //发布时间
      releaseList: [
        { code: 0, tag: "一天以内" },
        { code: 1, tag: "三天以内" },
        { code: 2, tag: "五天以内" },
        { code: 3, tag: "七天以内" },
        { code: 4, tag: "十五天以内" }
      ],
      release: 5,
      //行业
      industry: "10000",
      industryList: [],
      moreIndustries: false,

      optionList: {},
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      }
    };
  },
  methods: {
    //行政区域更多
    moreCity() {
      this.moreDistrict = !this.moreDistrict;
    },
    //行业更多
    moreIndustry() {
      this.moreIndustries = !this.moreIndustries;
    },
    //企业性质不限
    qualityHandle() {
      console.log(this.quality);
      this.qualitys = [];
    },
    qualitysHandle() {
      this.qualitys = ["5"];
      this.quality = [];
    },
    //清楚筛选
    cancelButton() {
      this.district = "50";
      this.workExperience = "15";
      this.Education = "15";
      this.monthPay = "15";
      this.workState = "15";
      this.scale = "15";
      this.release = 5;
      this.qualitys = ["5"];
      this.quality = [];
      this.industry = "10000";
      this.joblistSearch = "";
      this.isdistrict = false;
      setTimeout(() => {
        this.articleButton = false;
      }, 300);
    },
    //立即筛选
    keepButton() {
      this.searches();
    },
    //搜索职位 公司
    search() {
      let that = this;
      if (this.positionOrcompany == "公司") {
        let CodeToTag = timeUtil.CodeToTag(
          [
            parseInt(this.district / 10000) * 10000,
            parseInt(this.district / 100) * 100,
            this.district
          ],
          this.city
        );

        let params = {
          addresses:
            this.district === "50"
              ? [
                  {
                    city: null,
                    district: null,
                    province: that.$store.state.cityName
                  }
                ]
              : [
                  {
                    city: CodeToTag[1],
                    district: CodeToTag[2],
                    province: CodeToTag[0]
                  }
                ],
          industries:
            this.industry === "10000"
              ? null
              : [
                  {
                    first: timeUtil.positionCatalog(parseInt(this.industry)),
                    secondary: null
                  }
                ],
          industryCodes: this.industry === "10000" ? null : [this.industry],
          keywords: this.joblistSearch,
          pageNum: this.page.current,
          pageSize: this.page.pageSize,
          natures: null,

          size:
            this.scale === "15" ? null : timeUtil.size(parseInt(this.scale)),
          sortBy: null,
          sortOrder: null
        };
        companySearch(params).then(res => {
          if (res.data.code == 200) {
            this.joblistJob = false;
            // this.$router.push({
            //   path: "/joblist"
            // });
            (this.page.current = 1),
              (this.page.pageSize = 10),
              (this.companyList = res.data.data.list);
            // this.companyList = JSON.parse(
            //   window.sessionStorage.getItem("lsittwo")
            // ).list;
            this.page.total = res.data.data.total;
            if (res.data.data.total == 0) {
              this.joblistJob = false;
              this.joblistCompany = false;
              this.contentNull = false;
              this.companyNull = true;
            } else {
              this.joblistJob = false;
              this.joblistCompany = true;
              this.contentNull = false;
              this.companyNull = false;
            }
          }
        });
        // .catch(error => {});
      } else if (this.positionOrcompany == "职位") {
        switch (this.monthPay) {
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
          default:
            this.salaryMin = null;
            this.salaryMax = null;
            break;
        }
        switch (this.workExperience) {
          case 0:
            this.workAgeMin = 0;
            this.workAgeMax = 0;
            break;
          case 1:
            this.workAgeMin = 1;
            this.workAgeMax = 3;
            break;
          case 2:
            this.workAgeMin = 3;
            this.workAgeMax = 5;
            break;
          case 3:
            this.workAgeMin = 5;
            this.workAgeMax = 10;
            break;
          case 4:
            this.workAgeMin = 10;
            this.workAgeMax = null;
            break;
          default:
            this.workAgeMin = null;
            this.workAgeMax = null;
            break;
        }
        switch (this.release) {
          case "0":
            this.release = 1;
            break;
          case "1":
            this.release = 3;
            break;
          case "2":
            this.release = 5;
            break;
          case "3":
            this.release = 7;
            break;
          case "4":
            this.release = 15;
            break;
        }
        if (this.workExperience == 0) {
          this.isGraduate = false;
        } else {
          this.isGraduate = true;
        }
        let CodeToTag = timeUtil.CodeToTag(
          [
            parseInt(this.district / 10000) * 10000,
            parseInt(this.district / 100) * 100,
            this.district
          ],
          this.city
        );
        let paramsPosition = {
          addresses:
            this.district === "50"
              ? [
                  {
                    city: null,
                    district: null,
                    province: that.$store.state.cityName
                  }
                ]
              : [
                  {
                    city: CodeToTag[1],
                    district: CodeToTag[2],
                    province: CodeToTag[0]
                  }
                ],
          degreeMin:
            this.Education === "15"
              ? null
              : timeUtil.qualifications(parseInt(this.Education)),
          industries:
            this.industry === "10000"
              ? null
              : [
                  {
                    first: timeUtil.positionCatalog(parseInt(this.industry)),
                    secondary: null
                  }
                ],
          isGraduate: null,
          industryCodes: this.industry === "10000" ? null : [this.industry],
          jobType:
            this.workState === "15"
              ? null
              : timeUtil.jobType(parseInt(this.workState)),
          keywords: this.joblistSearch ? this.joblistSearch : null,
          pageNum: this.page.current,
          pageSize: this.page.pageSize,
          natures: this.qualitys[0] === "5" ? null : this.quality,

          publishedInterval:
            this.release === 5
              ? null
              : timeUtil.release(parseInt(this.release)),
          publishedTime: null,
          positionCatalog: null,
          salaryMax: this.salaryMax,
          salaryMin: this.salaryMin,
          size:
            this.scale === "15" ? null : timeUtil.size(parseInt(this.scale)),
          sortBy: null,
          sortOrder: null,
          workAgeMax: this.workAgeMax,
          workAgeMin: this.workAgeMin
        };
        positionSearch(paramsPosition).then(res => {
          if (res.data.code == 200) {
            this.$router.push({
              path: "/joblist"
            });
              (this.joblistCompany = false);
            this.positionList = res.data.data.list;
            this.page.total = res.data.data.total;
            if (res.data.data.total == 0) {
              this.joblistCompany = false;
              this.joblistJob = false;
              this.contentNull = true;
              this.companyNull = false;
            } else {
              this.joblistJob = true;
              this.contentNull = false;
              this.companyNull = false;
            }
          }
        });
        // .catch(error => {});
      }
    },
    searches() {
      let that = this;
      if (this.positionOrcompany == "公司") {
        let CodeToTag = timeUtil.CodeToTag(
          [
            parseInt(this.district / 10000) * 10000,
            parseInt(this.district / 100) * 100,
            this.district
          ],
          this.city
        );

        let params = {
          addresses:
            this.district === "50"
              ? [
                  {
                    city: null,
                    district: null,
                    province: that.$store.state.cityName
                  }
                ]
              : [
                  {
                    city: CodeToTag[1],
                    district: CodeToTag[2],
                    province: CodeToTag[0]
                  }
                ],
          industries:
            this.industry === "10000"
              ? null
              : [
                  {
                    first: timeUtil.positionCatalog(parseInt(this.industry)),
                    secondary: null
                  }
                ],
          industryCodes: this.industry === "10000" ? null : [this.industry],
          keywords: this.joblistSearch,
          pageNum: 1,
          natures: null,
          pageSize: 10,
          size:
            this.scale === "15" ? null : timeUtil.size(parseInt(this.scale)),
          sortBy: null,
          sortOrder: null
        };
        companySearch(params).then(res => {
          if (res.data.code == 200) {
            this.joblistJob = false;
            this.companyList = res.data.data.list;
            // this.companyList = JSON.parse(
            //   window.sessionStorage.getItem("lsittwo")
            // ).list;
            this.page.total = res.data.data.total;
            if (res.data.data.total == 0) {
              this.joblistJob = false;
              this.joblistCompany = false;
              this.contentNull = false;
              this.companyNull = true;
            } else {
              this.joblistJob = false;
              this.joblistCompany = true;
              this.contentNull = false;
              this.companyNull = false;
            }
          }
        });
        // .catch(error => {});
      } else if (this.positionOrcompany == "职位") {
        switch (this.monthPay) {
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
          default:
            this.salaryMin = null;
            this.salaryMax = null;
            break;
        }
        switch (this.workExperience) {
          case 0:
            this.workAgeMin = 0;
            this.workAgeMax = 0;
            break;
          case 1:
            this.workAgeMin = 1;
            this.workAgeMax = 3;
            break;
          case 2:
            this.workAgeMin = 3;
            this.workAgeMax = 5;
            break;
          case 3:
            this.workAgeMin = 5;
            this.workAgeMax = 10;
            break;
          case 4:
            this.workAgeMin = 10;
            this.workAgeMax = null;
            break;
          default:
            this.workAgeMin = null;
            this.workAgeMax = null;
            break;
        }
        switch (this.release) {
          case "0":
            this.release = 1;
            break;
          case "1":
            this.release = 3;
            break;
          case "2":
            this.release = 5;
            break;
          case "3":
            this.release = 7;
            break;
          case "4":
            this.release = 15;
            break;
        }
        if (this.workExperience == 0) {
          this.isGraduate = false;
        } else {
          this.isGraduate = true;
        }
        let CodeToTag = timeUtil.CodeToTag(
          [
            parseInt(this.district / 10000) * 10000,
            parseInt(this.district / 100) * 100,
            this.district
          ],
          this.city
        );
        let paramsPosition = {
          addresses:
            this.district === "50"
              ? [
                  {
                    city: null,
                    district: null,
                    province: that.$store.state.cityName
                  }
                ]
              : [
                  {
                    city: CodeToTag[1],
                    district: CodeToTag[2],
                    province: CodeToTag[0]
                  }
                ],
          degreeMin:
            this.Education === "15"
              ? null
              : timeUtil.qualifications(parseInt(this.Education)),
          industries:
            this.industry === "10000"
              ? null
              : [
                  {
                    first: timeUtil.positionCatalog(parseInt(this.industry)),
                    secondary: null
                  }
                ],
          isGraduate: null,
          industryCodes: this.industry === "10000" ? null : [this.industry],
          jobType:
            this.workState === "15"
              ? null
              : timeUtil.jobType(parseInt(this.workState)),
          keywords: this.joblistSearch ? this.joblistSearch : null,
          pageNum: 1,
          natures: this.qualitys[0] === "5" ? null : this.quality,
          pageSize: 10,
          publishedInterval:
            this.release === 5
              ? null
              : timeUtil.release(parseInt(this.release)),
          publishedTime: null,
          positionCatalog: null,
          salaryMax: this.salaryMax,
          salaryMin: this.salaryMin,
          size:
            this.scale === "15" ? null : timeUtil.size(parseInt(this.scale)),
          sortBy: null,
          sortOrder: null,
          workAgeMax: this.workAgeMax,
          workAgeMin: this.workAgeMin
        };
        positionSearch(paramsPosition).then(res => {
          if (res.data.code == 200) {
            this.joblistCompany = false;
            this.positionList = res.data.data.list;
            this.page.total = res.data.data.total;
            if (res.data.data.total == 0) {
              this.joblistCompany = false;
              this.joblistJob = false;
              this.contentNull = true;
              this.companyNull = false;
            } else {
              this.joblistJob = true;
              this.contentNull = false;
              this.companyNull = false;
              // window.sessionStorage.setItem(
              //   "lsittwo",
              //   JSON.stringify(res.data.data)
              // );
              // if (this.district === "") {
              //   window.sessionStorage.setItem(
              //     "citycode",
              //     parseInt(this.citycode)
              //   );
              // } else {
              //   window.sessionStorage.setItem(
              //     "citycode",
              //     parseInt(this.district)
              //   );
              // }
            }
          }
        });
        // .catch(error => {});
      }
    },
    //职位公司筛选
    getVendorId() {
      if (this.positionOrcompany == "公司") {
        this.showPosition = false;
      } else {
        this.showPosition = true;
      }
    },
    //获取简单选项信息
    option() {
      this.qualityList = this.optionList.companyNature;
      this.scaleList = this.optionList.companySize;
      this.workStateList = this.optionList.jobType;
      this.monthPayList = this.optionList.salaryRange;
      this.EducationList = this.optionList.eduDegree;
      this.workExperienceList = this.optionList.workAgeRange;
    },
    //公司详情
    compan(id) {
      this.$router.push({
        path: "/joblist",
        query: {
          id: 1
        }
      });
      this.$router.push({
        path: "/position",
        query: {
          id: id
        }
      });
    },
    //职位详情
    posion(id) {
      this.$router.push({
        path: "/joblist",
        query: {
          id: 1
        }
      });
      this.$router.push({
        path: "/station",
        query: {
          id: id
        }
      });
    },
    //城市数据
    cityForm() {
      let cityName = this.$store.state.cityName;
      this.city.forEach((item, index, array) => {
        //执行代码
        if (item.tag === cityName) {
          this.adcode = item.code
        }
      });
      let resDate = parseInt(this.adcode / 10000) * 10000;
      if (
        resDate === 110000 ||
        resDate === 120000 ||
        resDate === 310000 ||
        resDate === 500000
      ) {
        this.city.forEach((item, index, array) => {
          //执行代码
          if (item.code === parseInt(this.adcode / 10000) * 10000) {
            this.districtArr = item.children[0].children;
          }
        });
      } else {
        this.city.forEach((item, index, array) => {
          //执行代码
          if (item.code === parseInt(this.adcode / 10000) * 10000) {
            this.districtArr = item.children;
          }
        });
      }
    },
    //分页
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      this.search();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.search();
    },

    CodeToTag(codeArr, list, Alias) {
      /*
    * codeArr{
    *   type:array,
    *   作用:将需要匹配的code从父到子按顺序放入数组中
    *   例如： ['省','市']=>[310000,310104]
    * }
    * list{
    *   type:array,
    *   作用:数据匹配源，必须是数组，且必须是嵌套接口，children中是子元素节点
    *   例如：
    *    {
            children: [{code: 110101, tag: "东城区", parent: 110000, level: 2},…]
            code: 110000
            level: 1
            parent: 0
            tag: "北京市"
          }
    * }
    * Alias{
    *   type:Object,
    *   作用:更改目标匹配字段的别名，可不填
    *   例如：
    *    (默认)：
         {
            targetCode:code,
            targetTag:tag,
         }
         (可修改为)：
         {
            targetCode:value,
            targetTag:label,
         }
    * }
    *
    * */
      let defaultTarget = {
        targetCode: "code",
        targetTag: "tag"
      };
      if (!(Array.isArray(codeArr) && Array.isArray(list))) {
        throw new Error("codeArr&list must be Array!");
      }
      if (Alias) {
        if (Alias.constructor === Object) {
          defaultTarget = Object.assign(defaultTarget, Alias);
        } else {
          throw new Error("Alias must be Object!");
        }
      }
      const tagArr = [];
      const { targetCode, targetTag } = defaultTarget;
      const getTag = (itemCode, itemList) => {
        const targetList = itemList.filter(
          item => item[targetCode] === itemCode
        )[0];
        if (targetList) {
          tagArr.push(targetList[targetTag]);
          if (targetList.children && targetList.children.length > 0) {
            getTag(codeArr[tagArr.length], targetList.children);
          }
        }
      };
      getTag(codeArr[tagArr.length], list);
      return tagArr;
    }
  },
  watch: {
    "$store.state.adcode": function(val) {
      console.log(val);
      this.district = "50";
      //你需要执行的代码
      let resDate = parseInt(val / 10000) * 10000;
      if (
        resDate === 110000 ||
        resDate === 120000 ||
        resDate === 310000 ||
        resDate === 500000
      ) {
        this.city.forEach((item, index, array) => {
          //执行代码
          if (item.code === parseInt(val / 10000) * 10000) {
            this.districtArr = item.children[0].children;
          }
        });
      } else {
        this.city.forEach((item, index, array) => {
          //执行代码
          if (item.code === parseInt(val / 10000) * 10000) {
            this.districtArr = item.children;
          }
        });
      }
    },

    monthPay: function() {
      this.articleButton = true;
    },
    district: function() {
      this.articleButton = true;
    },
    workExperience: function() {
      this.articleButton = true;
    },
    Education: function() {
      this.articleButton = true;
    },
    workState: function() {
      this.articleButton = true;
    },
    industry: function() {
      this.articleButton = true;
    },
    scale: function() {
      this.articleButton = true;
    },
    release: function() {
      this.articleButton = true;
    },
    quality: function() {
      this.articleButton = true;
      if (this.quality.length === 0) {
        this.qualitys = ["5"];
      }
    },
    industry: function() {
      this.articleButton = true;
    }
  },
  created() {
    let that = this;
    console.log(that.$store.state.cityName);
    if (this.$route.query.homeSearch) {
      this.joblistSearch = this.$route.query.homeSearch;
      this.positionOrcompany = this.$route.query.positionOrcompany;
    }
    this.industryList = industrys.data;
    this.city = citys.data;
    this.optionList = option.data;
    this.option();
    this.cityForm();
    setTimeout(function() {
      that.searches();
    }, 1000);
  },
  filters: {
    level(level) {
      const map = [
        "初中及以下",
        "职中",
        "高中",
        "大专",
        "本科",
        "硕士",
        "博士"
      ];
      return map[level];
    },
    size(size) {
      const map = ["小于10人", "10-100人", "100-500人", "500人以上"];
      return map[size];
    }
  }
};
</script>

<style lang="stylus">
.joblist {
  width: 1440px;
  margin: 76px auto 0;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;

  .joblist-search {
    width: 100%;
    height: 218px;
    background: #ccf1f1;
    margin: 0 auto;
    border: 1px solid rgba(229, 229, 229, 1);
    box-shadow: 0px 1px 4px 0px rgba(212, 212, 212, 0.5);
  }

  .joblist-input {
    width: 700px;
    height: 78px;
    margin: 70px auto;
    background: #FFFFFF;
    box-shadow: 0px 4px 20px 0px rgba(113, 165, 164, 0.3);

    .el-select .el-input {
      width: 120px;
    }

    .el-input__inner {
      height: 78px;
      border: 1px solid #ffffff;
    }

    .el-input-group__append {
      border: 1px solid #fff;
      background: #02B9B8;
      width: 128px;
    }

    .el-icon-search:before {
      content: '\e778';
      color: #ffffff;
      font-weight: bold;
      font-size: 30px;
    }

    .input-with-select .el-input-group__prepend {
      background-color: #fff;
      border: 1px solid #fff;
    }

    .el-input-group--append .el-input__inner {
      font-family: PingFangSC-Regular;
      color: #585858;
      font-size: 20px;
      background: #FFFFFF;
    }
  }

  .joblist-article {
    width: 1440px;
    background: #ffffff;
    border: 1px solid #ffffff;
    box-shadow: 0px 2px 12px 0px rgba(180, 180, 180, 0.4);

    .article-searchList {
      width: 1248px;
      background: #ffffff;
      margin: 0 0 0 96px;

      .article {
        display: flex;
        flex-direction: row;

        .article-content, .article-content-first {
          font-family: PingFangSC-Regular;
          color: #02B9B8;
          font-size: 16px;
          margin: 0 0 0 20px;
        }

        .article-title {
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #575757;
        }

        .el-radio-button__inner {
          border: 0px solid #02B9B8;
        }

        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background-color: #02B9B8;
          box-shadow: -1px 0 0 0 #02B9B8;
          border-radius: 0 0 0 0;
          color: white;
        }

        .el-radio-button--small .el-radio-button__inner {
          padding: 6px 12px;
          line-height: 20px;
          font-size: 16px;
          color: #575757;
          background: #ffffff;
        }

        .el-checkbox-button__inner {
          padding: 6px 12px;
          line-height: 20px;
          font-size: 16px;
          color: #575757;
          background: #ffffff;
        }

        .el-checkbox-button.is-checked .el-checkbox-button__inner {
          background-color: #02B9B8;
          box-shadow: -1px 0 0 0 #02B9B8;
          border-radius: 0 0 0 0;
          color: white;
        }
      }
    }
  }

  .joblist-article div:nth-child(1) {
    margin: 0 0 0 51px;
    text-align: left;
  }

  .joblist-article div:nth-child(8) {
    margin: 0 0 0 39px;
    text-align: left;
  }

  .joblist-article div {
    margin: 6px 0 0 39px;
    text-align: left;
  }

  .joblist-content {
    width: 1248px;
    margin: 10px 96px 0 96px;
    background: white;

    .content:hover {
      box-shadow: 0px 3px 10px 0px rgba(214, 214, 214, 1);
    }

    .footer-pagination {
      margin: 60px 0 125px 0;
      color: #02B9B8;
    }

    .content {
      display: flex;
      flex-direction: row;
      height: 104px;
      border: 1px solid rgba(239, 239, 239, 1);
      margin: 5px 0 0 0;

      .content-line {
        width: 1248px;
        border: 0.5px solid #f0f0f0;
        margin: 0 0 0 38px;
      }

      .content-img img {
        width: 74px;
        height: 74px;
        float: left;
        border-radius: 5px;
        margin: 15px 0 0 40px;
      }

      .content-infor {
        display: flex;
        flex-direction: column;
        float: left;
        width: 600px;
      }

      .content-infor span:nth-child(1) {
        text-align: left;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        margin: 27px 0 8px 12px;
        color: #313131;
      }

      .content-infor span:nth-child(2) {
        text-align: left;
        font-family: PingFangSC-Regular;
        color: #959595;
        font-size: 16px;
        margin: 4px 0 8px 12px;
      }

      .content-job {
        margin: 0 0 0 0;
      }

      .content-job span {
        font-family: PingFangSC-Regular;
        color: #959595;
        font-size: 18px;
        line-height: 104px;
      }

      .content-button {
        margin: 27px 0 0 260px;

        .button {
          width: 128px;
          height: 54px;
          text-align: center;
          font-size: 18px;
          line-height: 3px;
          vertical-align: middle;
        }
      }
    }
  }

  .joblist-footer {
    width: 1248px;
    padding: 50px 96px 0 96px;
    background: white;
    font-family: PingFangSC-Regular;

    .joblist-hover:hover {
      box-shadow: 0px 1px 8px 0px rgba(180, 180, 180, 0.53);
    }

    .joblist-hover {
      border: 1px solid rgba(239, 239, 239, 1);
      margin: 0 0 8px 0;
    }

    .footer-first {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }

    .footer-first span:nth-child(1) {
      margin: 40px 0 0 40px;
      font-family: PingFangSC-Regular;
      color: #313131;
      width: 300px;
      font-size: 20px;
    }

    .footer-first span:nth-child(2) {
      margin: 40px 0 0 0;
      font-family: PingFangSC-Regular;
      width: 100px;
      color: #a42a2e;
      font-size: 20px;
    }

    .footer-first span:nth-child(3) {
      margin: 36px 350px 0 100px;
      font-family: PingFangSC-Regular;
      color: #313131;
      font-size: 20px;
      width: 200px;
    }

    .footer-second {
      display: flex;
      flex-direction: row;
      text-align: left;
      justify-content: space-between;
    }

    .footer-second span:nth-child(1) {
      margin: 9px 0 15px 40px;
      font-family: PingFangSC-Regular;
      color: #959595;
      width: 300px;
      font-size: 16px;
    }

    .footer-second span:nth-child(3) {
      margin: 9px 100px 0 0;
      font-family: PingFangSC-Regular;
      color: #909090;
      width: 100px;
      font-size: 16px;
    }

    .footer-second span:nth-child(2) {
      margin: 9px 0 0 230px;
      font-family: PingFangSC-Regular;
      color: #959595;
      font-size: 14px;
      width: 228px;
    }

    .footer-line {
      width: 930px;
      border: 0 solid #f0f0f0;
      margin: 5px 0 0 38px;
    }

    .footer-pagination {
      margin: 60px 0 125px 0;
      color: #02B9B8;
    }
  }

  .dialog {
    display: flex;
    flex-direction: column;

    .el-button.is-plain:hover {
      border-color: #dfdfdf;
      color: #c7282d;
      background: white;
    }

    .el-icon-close:before {
      font-size: 24px;
      color: white;
    }

    .el-dialog__header {
      padding: 20px 20px 10px;
      background: #02B9B8;
    }

    .el-dialog__title {
      font-size: 20px;
      color: #ffffff;
      line-height: 25px;
      margin: 0 450px 0 0;
    }

    .el-dialog__body {
      height: 210px;
    }

    .dialog-title span {
      font-size: 14.5px;
      font-family: PingFangSC-Regular;
      color: #959595;
      float: left;
      margin: -40px 0 0 0;
    }

    .dialog-city-first {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: #1d366e;
      float: left;
      margin: -10px 0 0 0;
    }

    .dialog-city-first span {
      padding: 0 40px 0 0;
    }

    .dialog-city-second {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: #1d366e;
      text-align: left;
      margin: 25px 0 0 0;
    }

    .dialog-city-second span {
      padding: 0 40px 0 0;
    }

    .dialog-province span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: #02B9B8;
      float: left;
      margin: 0 0 0 20px;
    }

    .dialog-cascader {
      display: flex;
      flex-direction: row;
      margin: 20px 0 0 20px;
    }
  }
}
</style>
<style lang="stylus">
.el-checkbox-button__inner {
  padding: 6px 12px;
  line-height: 20px;
  border: 0px solid #617dcb;
  font-size: 16px;
}

.el-checkbox-button.is-checked .el-checkbox-button__inner {
  background-color: #02B9B8;
  box-shadow: -1px 0 0 0 #02B9B8;
  border-radius: 0 0 0 0;
  color: white;
}

.el-checkbox-button:first-child .el-checkbox-button__inner {
  border-left: 0px solid #dcdfe6;
}

.el-icon-arrow-up:before {
  color: #dbdbdb;
}

.el-tooltip__popper.is-light {
  background: #FFFFFF;
  box-shadow: 0px 2px 8px 0px rgba(225, 225, 225, 0.77);
  border: 0px solid #303133;
}

.el-tooltip__popper .popper__arrow {
  border-width: 0px;
  margin: 2px 0 0 0;
}

.spanCity:hover {
  background: #f4f4f4;
}

.chanff {
  background: white;
  height: 26px;
  line-height: 20px;
  margin: 5px 0 0 8px;
  padding: 10px 0 0 0;
}

.chanff:hover {
  color: #02B9B8;
}
</style>

