<template>
  <div class="joblist">
    <div class="joblist-search">
      <!-- <el-tooltip
        class="item"
        effect="light"
        :disabled="Unabled"
        placement="bottom-start"
        :manual="itemOne"
      >
        <div slot="content" v-if="this.district[0] === '0'">{{this.districtFive}}</div>
        <div slot="content" v-else>{{this.districtOne}}</div>
        
      </el-tooltip>-->
      <el-input
        v-if="this.district.length === 0 && this.checkboxGroup4.length === 0"
        v-model="cityButton"
        :disabled="true"
        class="CompanyInput"
        style="width:160px;height:60px;text-align:center;"
      >
        <i
          @click="next"
          style="cursor:auto"
          slot="suffix"
          class="el-input__icon el-icon-arrow-down"
        ></i>
      </el-input>
      <el-input
        v-else
        v-model="districtTwo"
        :disabled="true"
        class="CompanyInput"
        style="width:160px;height:60px;text-align:center;"
      >
        <i
          @click="next"
          style="cursor:auto"
          slot="suffix"
          class="el-input__icon el-icon-arrow-down"
        ></i>
      </el-input>
      <span class="joblist-after"></span>
      <el-select
        v-model="company"
        class="CompanySelect"
        @change="getVendorId"
        style="width:160px;height:60px;text-align:center;line-height:60px"
      >
        <el-option
          v-for="item in perList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
        <!-- <option v-for="item in perList" :value="item.value" :key="item.value">{{ item.label }}</option> -->
      </el-select>
      <span class="joblist-after"></span>
      <el-input
        v-model="searchContent"
        class="searchContent"
        style="width:467px;"
        placeholder="搜索职位或者公司"
      ></el-input>
      <el-button class="search-button" style="border-radius:0 2px 2px 0" @click="search">搜 索</el-button>
    </div>
    <div class="joblist-article">
      <div style="margin:40px 0 30px 0">
        <div class="article" style="margin-top:10px">
          <span class="article-title" style="margin-left:-10px">行政区域：</span>
          <el-radio-group size="small" v-model="district" style="margin-top:-1px;margin-left:28px;">
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
              v-for="(list,index) in sliceArr.slice(0, 5)"
              :key="index"
            >{{list.tag}}</el-radio-button>
          </el-radio-group>
          <br />

          <span
            style="font-size:14px;margin-top:3px;margin-left:185px;cursor:pointer;color:#327cf3;"
            @click="moreOne"
          >
            更多
            <i v-if="this.isdistrict === false" class="el-icon-caret-bottom"></i>
            <i v-else class="el-icon-caret-top"></i>
          </span>
        </div>
        <div style="margin:5px 0 0 78px" class="article">
          <el-radio-group size="small" style="width:650px;" v-model="district">
            <el-radio-button
              v-if="isdistrict"
              class="article-content"
              style="padding:0 20px 0 0;"
              v-for="(list,index) in sliceArr.slice(5)"
              :label="list.code"
              :key="index"
            >{{list.tag}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="article" v-if="isshow" style="margin-top:17px">
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
        <div class="article" v-if="isshow" style="margin-top:17px">
          <span class="article-title">最低学历：</span>
          <el-radio-group size="small" v-model="Education" style="margin-top:-1px;margin-left:0px">
            <el-radio-button size="small" class="article-content" label="15">不限</el-radio-button>
            <el-radio-button
              class="article-content"
              :label="index"
              v-for="(list,index) in EducationList"
              :key="index"
            >{{list.tag}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="article" v-if="isshow" style="margin-top:17px">
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
        <div class="article" v-if="isshow" style="margin-top:17px">
          <span class="article-title">工作类型：</span>
          <el-radio-group size="small" v-model="workState" style="margin-top:-1px;margin-left:0px">
            <el-radio-button size="small" class="article-content" label="15">不限</el-radio-button>
            <el-radio-button
              class="article-content"
              :label="index"
              v-for="(list,index) in workStateList"
              :key="index"
            >{{list.tag}}</el-radio-button>
          </el-radio-group>
        </div>
        <div></div>
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
            v-model="qualityOne"
            style="margin-top:-1px;margin-left:30px;"
          >
            <el-checkbox-button
              size="small"
              @change="qualityDemo"
              style="margin-left:-10px"
              label="5"
            >不限</el-checkbox-button>
          </el-checkbox-group>
          <el-checkbox-group size="small" v-model="quality" style="margin-top:-1px;margin-left:0px">
            <el-checkbox-button
              class="article-content"
              @change="qualityDemoOne"
              :label="index"
              v-for="(list,index) in qualityList"
              :key="index"
            >{{list.tag}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div class="article" v-if="isshow" style="margin-top:17px">
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
          <el-radio-group size="small" v-model="dutyOne" style="margin-top:-1px;;margin-left:20px;">
            <el-radio-button size="small" label="1000">不限</el-radio-button>
          </el-radio-group>
          <el-radio-group
            size="small"
            v-model="dutyOne"
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
            style="font-size:14px;margin-top:3px;margin-left:185px;cursor:pointer;color:#327cf3"
            @click="more"
          >
            更多
            <i v-if="this.isduty === false" class="el-icon-caret-bottom"></i>
            <i v-else class="el-icon-caret-top"></i>
          </span>
        </div>
        <div style="margin:5px 0 0 135px" class="article">
          <el-radio-group size="small" v-model="dutyOne" style="width:770px">
            <el-radio-button
              v-if="isduty"
              class="article-content"
              style="margin-left:-40px;padding:0 60px 0 0;margin-top:5px"
              v-for="(list,index) in industryList.slice(5)"
              :label="list.code"
              :key="index"
            >{{list.tag}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="article" style="margin-bottom:10px;margin-top:-1px">
          <el-radio-group size="small" v-model="menu" style="width:700px;margin:0 0 0 67px;">
            <div>111</div>
          </el-radio-group>
        </div>
      </div>
      <div class="article-button" v-if="articleButton" style="margin:40px 0 30px 0">
        <el-button
          @click="cancelButton"
          style="margin:0 0 16px 870px;width:105px;height:35px;line-height:3px;color:#ffffff;font-size:16px;padding:0px;background:#327cf3"
        >清除筛选</el-button>
        <el-button
          @click="keepButton"
          style="margin:0 0 16px 30px;width:105px;height:35px;line-height:3px;color:#ffffff;font-size:16px;padding:0px;background:#327cf3"
        >立即筛选</el-button>
      </div>
    </div>
    <div class="joblist-content" v-if="joblistCompany">
      <div class="content" v-for="(item,index) in companyList" :key="index">
        <div class="content-img">
          <img :src="item.logoUrl" />
        </div>
        <div class="content-infor">
          <span>{{item.companyName}}</span>
          <span>{{item.address.city}} | {{item.size}} | {{item.industrySecondary}}</span>
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
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="page1.current"
          :page-sizes="page1.pageSizeOpts"
          :page-size="page1.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page1.total"
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
            v-else
          >{{item.workAddress.city}} | {{item.workAgeMin}}-{{item.workAgeMax}}年 | {{item.degreeMin}}</span>

          <span>{{item.company.industrySecondary}} | {{item.company.size}}</span>
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
    <el-dialog
      class="dialog"
      :visible.sync="dialogVisible"
      title="切换城市"
      style="width:1150px;margin-left:20%;margin-top:7%"
    >
      <div v-if="show ===false">
        <div class="dialog-title">
          <span>热门城市</span>
        </div>
        <div class="dialog-city-first">
          <span>北京</span>
          <span>天津</span>
          <span>大连</span>
          <span>上海</span>
          <span>南京</span>
          <span>苏州</span>
        </div>
        <div class="dialog-city-second">
          <span>杭州</span>
          <span>武汉</span>
          <span>广州</span>
          <span>深圳</span>
          <span>重庆</span>
          <span>成都</span>
        </div>
      </div>
      <div class="dialog-province">
        <span>按省份选择</span>
      </div>
      <br />
      <div class="dialog-cascader">
        <el-tooltip effect="light" placement="bottom-start" v-model="visible">
          <el-input
            placeholder="请选择省份"
            :disabled="true"
            style="width:138px;height:32px;font-size:16px"
            v-model="provinceButton"
          >
            <i style="cursor:auto" slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
          </el-input>
          <div
            class="tootip"
            style="width:473px;height:140px;overflow-y:scroll;color:#525252"
            slot="content"
          >
            <span
              class="spanCity"
              @click="citys(item,index)"
              style="float:left;text-align:center;margin:10px 0 0 8px;padding:6px 10px 0 10px;font-size:16px;height:26px"
              v-for="(item,index) in city"
              :key="index"
            >{{item.tag}}</span>
          </div>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="light"
          :disabled="disabled"
          placement="bottom"
          v-model="visibleOne"
        >
          <el-input
            placeholder="请选择城市"
            :disabled="true"
            v-model="districtCity"
            style="width:138px;height:32px;margin:0 0 0 40px;font-size:16px"
          >
            <i style="cursor:auto" slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
          </el-input>

          <div
            class="tootip"
            style="width:473px;height:140px;overflow-y:scroll;color:#525252"
            slot="content"
          >
            <span
              class="spanCity"
              @click="citiss(item,index)"
              style="float:left;text-align:center;margin:10px 0 0 8px;padding:6px 10px 0 10px;font-size:16px;height:26px"
              v-for="(item,index) in citis"
              :key="index"
            >{{item.tag}}</span>
          </div>

          <!-- <div style="width:473px;height:140px;overflow-y:scroll;" slot="content">
            <el-checkbox-group v-model="checkboxGroup4">
              <el-checkbox-button
                class="chanff"
                @change="citiss(item,index)"
                :label="item.code"
                v-for="(item,index) in citis"
                :key="index"
              >{{item.tag}}</el-checkbox-button>
            </el-checkbox-group>
          </div>-->
        </el-tooltip>
      </div>
      <div style="height:220px"></div>
      <span slot="footer" class="dialog-footer">
        <el-button style="margin:0 20px 0 0" @click="dialogVisible = false" plain>取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "../cookie.js";
import industrys from "../assets/industry.json";
import citys from "../assets/city.json";
import option from "../assets/option.json";
const timeUtil = require("../timeUtil.js");
import {
  // city,
  companySearch,
  positionSearch
  // enterpriseForm
} from "apis/account";

export default {
  name: "joblist",
  components: {},
  data() {
    return {
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      page1: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      disabled: false,
      curr: -1,
      visible: false,
      visibleOne: false,
      Unabled: false,
      sliceArr: [],
      industryList: [],
      optionList: {},
      qualityList: [],
      workExperienceList: [],
      scaleList: [],
      workStateList: [],
      monthPayList: [],
      EducationList: [],
      menu: [],
      releaseList: [
        { code: 0, tag: "一天以内" },
        { code: 1, tag: "三天以内" },
        { code: 2, tag: "五天以内" },
        { code: 3, tag: "七天以内" },
        { code: 4, tag: "十五天以内" }
      ],
      contentNull: false,
      companyNull: false,
      isduty: false,
      isdistrict: false,
      joblistCompany: false,
      joblistJob: false,
      isshow: true,
      searchContent: "",
      provinceButton: "",
      cityButton: "",
      duty: [],
      checkboxGroup4: [],
      Newdistrict: [],
      itemOne: false,
      articleButton: false,
      district: "50",
      districtOne: "",
      districtTwo: "",
      districtThree: "",
      cityButtons: "",
      districtCity: "",
      workExperience: "15",
      Education: "15",
      monthPay: "15",
      workState: "15",
      industry: "",
      scale: "15",
      salaryMin: "",
      salaryMax: "",
      show: "",
      workAgeMin: "",
      workAgeMax: "",
      quality: [],
      qualityOne: ["5"],
      dutyOne: "1000",
      Beat: "0",
      release: 5,
      isGraduate: "",
      value: "",
      company: "职位",
      signId: "",
      provinceId: "",
      dialogVisible: false,
      positionIdList: [],
      positiId: "",
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
      companyList: [],
      positionList: [],
      city: [],
      citis: [],
      items: {
        code: 310000,
        tag: "上海市",
        parent: 0,
        level: 1,
        children: [
          {
            code: 310101,
            tag: "黄浦区",
            parent: 310000,
            level: 2
          },
          {
            code: 310109,
            tag: "虹口区",
            parent: 310000,
            level: 2
          },
          {
            code: 310110,
            tag: "杨浦区",
            parent: 310000,
            level: 2
          },
          {
            code: 310104,
            tag: "徐汇区",
            parent: 310000,
            level: 2
          },
          {
            code: 310105,
            tag: "长宁区",
            parent: 310000,
            level: 2
          },
          {
            code: 310106,
            tag: "静安区",
            parent: 310000,
            level: 2
          },
          {
            code: 310107,
            tag: "普陀区",
            parent: 310000,
            level: 2
          },
          {
            code: 310116,
            tag: "金山区",
            parent: 310000,
            level: 2
          },
          {
            code: 310117,
            tag: "松江区",
            parent: 310000,
            level: 2
          },
          {
            code: 310118,
            tag: "青浦区",
            parent: 310000,
            level: 2
          },
          {
            code: 310112,
            tag: "闵行区",
            parent: 310000,
            level: 2
          },
          {
            code: 310113,
            tag: "宝山区",
            parent: 310000,
            level: 2
          },
          {
            code: 310114,
            tag: "嘉定区",
            parent: 310000,
            level: 2
          },
          {
            code: 310115,
            tag: "浦东新区",
            parent: 310000,
            level: 2
          },
          {
            code: 310120,
            tag: "奉贤区",
            parent: 310000,
            level: 2
          },
          {
            code: 310151,
            tag: "崇明区",
            parent: 310000,
            level: 2
          }
        ]
      }
    };
  },
  methods: {
    //行业不限
    industryDemo() {
      this.dutyOne = ["1000"];
      this.duty = [];
    },
    industryDemoOne() {
      this.dutyOne = [];
    },
    //企业性质不限
    qualityDemo() {
      this.qualityOne = ["5"];
      this.quality = [];
    },
    qualityDemoOne() {
      this.qualityOne = [];
    },
    // //行政区域不限
    // BeatDemo() {
    //   this.Beat = '0';
    //   this.district = '';
    // },
    // BeatDemoOne() {
    //   this.Beat = '';
    //   console.log(this.district)
    //   // this.Beat = this.district;
    // },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize
      };
      positionSearch(params).then(res => {
        if (res.data.code == 200) {
          this.joblistCompany = false;
          this.contentNull = false;
          this.positionList = res.data.data.list;
          this.page.total = res.data.data.total;
          if (res.data.data.total == 0) {
            this.joblistJob = false;
            this.contentNull = true;
          } else {
            this.joblistJob = true;
          }
        }
      });
      // .catch(error => {});
    },
    handleCurrentChange(val) {
      this.page.current = val;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize
      };
      positionSearch(params).then(res => {
        if (res.data.code == 200) {
          this.joblistCompany = false;
          this.contentNull = false;
          this.positionList = res.data.data.list;
          this.page.total = res.data.data.total;
          if (res.data.data.total == 0) {
            this.joblistJob = false;
            this.contentNull = true;
          } else {
            this.joblistJob = true;
          }
        }
      });
      // .catch(error => {});
    },
    handleSizeChange1(val) {
      this.page1.pageSize = val;
      this.page1.current = 1;
      let params = {
        pageNum: this.page1.current,
        pageSize: this.page1.pageSize
      };
      companySearch(params).then(res => {
        if (res.data.code == 200) {
          this.joblistJob = false;
          this.companyList = res.data.data.list;
          if (res.data.data.total == 0) {
            this.joblistCompany = false;
            this.contentNull = false;
            this.companyNull = true;
          } else {
            this.joblistCompany = true;
            this.contentNull = false;
            this.companyNull = false;
          }
        }
      });
      // .catch(error => {});
    },
    handleCurrentChange1(val) {
      this.page1.current = val;
      let params = {
        pageNum: this.page1.current,
        pageSize: this.page1.pageSize
      };
      companySearch(params).then(res => {
        if (res.data.code == 200) {
          this.joblistJob = false;
          this.companyList = res.data.data.list;
          if (res.data.data.total == 0) {
            this.joblistCompany = false;
            this.contentNull = false;
            this.companyNull = true;
          } else {
            this.joblistCompany = true;
            this.contentNull = false;
            this.companyNull = false;
          }
        }
      });
      // .catch(error => {});
    },
    more() {
      if (this.isduty === true) {
        this.isduty = false;
      } else {
        this.isduty = true;
      }
    },
    moreOne() {
      if (this.isdistrict === true) {
        this.isdistrict = false;
      } else {
        this.isdistrict = true;
      }
    },

    //城市
    citises() {
      switch (parseInt(this.cityId / 10000) * 10000) {
        case 110000:
          this.items = this.city[0];
          this.citsl();
          break;
        case 120000:
          this.items = this.city[1];
          this.citsl();
          break;
        case 130000:
          this.items = this.city[2];
          this.citsl();
          break;
        case 140000:
          this.items = this.city[3];
          this.citsl();
          break;
        case 150000:
          this.items = this.city[4];
          this.citsl();
          break;
        case 210000:
          this.items = this.city[5];
          this.citsl();
          break;
        case 220000:
          this.items = this.city[6];
          this.citsl();
          break;
        case 230000:
          this.items = this.city[7];
          this.citsl();
          break;
        case 310000:
          this.items = this.city[8];
          this.citsl();
          break;
        case 320000:
          this.items = this.city[9];
          this.citsl();
          break;
        case 330000:
          this.items = this.city[10];
          this.citsl();
          break;
        case 340000:
          this.items = this.city[11];
          this.citsl();
          break;
        case 350000:
          this.items = this.city[12];
          this.citsl();
          break;
        case 360000:
          this.items = this.city[13];
          this.citsl();
          break;
        case 370000:
          this.items = this.city[14];
          this.citsl();
          break;
        case 410000:
          this.items = this.city[15];
          this.citsl();
          break;
        case 420000:
          this.items = this.city[16];
          this.citsl();
          break;
        case 430000:
          this.items = this.city[17];
          this.citsl();
          break;
        case 440000:
          this.items = this.city[18];
          this.citsl();
          break;
        case 450000:
          this.items = this.city[19];
          this.citsl();
          break;
        case 460000:
          this.items = this.city[20];
          this.citsl();
          break;
        case 500000:
          this.items = this.city[21];
          this.citsl();
          break;
        case 510000:
          this.items = this.city[22];
          this.citsl();
          break;
        case 520000:
          this.items = this.city[23];
          this.citsl();
          break;
        case 530000:
          this.items = this.city[24];
          this.citsl();
          break;
        case 540000:
          this.items = this.city[25];
          this.citsl();
          break;
        case 610000:
          this.items = this.city[26];
          this.citsl();
          break;
        case 620000:
          this.items = this.city[27];
          this.citsl();
          break;
        case 630000:
          this.items = this.city[28];
          this.citsl();
          break;
        case 640000:
          this.items = this.city[29];
          this.citsl();
          break;
        case 650000:
          this.items = this.city[30];
          this.citsl();
          break;
        case 710000:
          this.items = this.city[31];
          this.citsl();
          break;
        case 810000:
          this.items = this.city[32];
          this.citsl();
          break;
        case 820000:
          this.items = this.city[33];
          this.citsl();
          break;
      }

      // .catch(error => {});
    },
    //省份
    citys(item, index) {
      this.visible = false;
      // this.Beat = '0';
      this.provinceButton = item.tag;
      // this.provincecode = item.code;
      this.curr = index;
      this.citis = this.city[this.curr].children;
      if (this.citis === undefined) {
        this.disabled = true;
        this.districtCity = this.provinceButton;
        this.cityButton = this.provinceButton;
      } else {
        this.cityButton = null;
        this.districtTwo = this.provinceButton;
        this.disabled = false;
        this.checkboxGroup4 = [];
        this.districtCity = "不限";
      }
    },
    //城市
    citiss(item, index) {
      this.sliceArr = item.children;
      this.districtCity = item.tag;
      this.district = "50";
      this.districtTwo = this.districtCity;
      // this.visibleOne = false;
      // this.isdistrict = true;
      // this.districtOne = item.tag;
      this.cityButton = item.tag;
      // this.citycode = item.code;
      // this.district = item.code;
    },
    // cits() {
    //   this.districtCity = "不限";
    //   // this.sliceArr = this.items.children;
    //   // this.cityButton = this.items.children[0].tag;
    //   this.districtOne = this.items.children[0].tag;
    //   this.cityButtons = this.cityButton;
    //   this.provinceButton = this.items.tag;
    //   this.citis = this.items.children;
    //   this.citycode = this.items.children[0].code;
    //   this.provincecode = this.items.code;
    // },
    citsl() {
      this.sliceArr = this.items.children[0].children;
      let b = parseInt(this.cityId);
      let a = parseInt(this.cityId / 10000) * 10000;
      this.cityButton = this.CodeToTag([a, b], this.city)[1];
      this.cityButtons = this.CodeToTag([a, b], this.city)[1];
      // this.districtOne = this.cityButton;
      this.districtTwo = this.items.tag;
      this.provinceButton = this.items.tag;
      this.citis = this.items.children;
      this.district = "50";
      this.districtCity = "不限";
      this.citycode = this.$store.state.citycode;
      this.provincecode = this.items.code;
    },
    cancelButton() {
      this.district = "50";
      this.workExperience = "15";
      this.Education = "15";
      this.monthPay = "15";
      this.workState = "15";
      this.industry = "";
      this.scale = "15";
      this.release = 5;
      this.quality = [];
      this.dutyOne = "1000";
      this.searchContent = "";
      this.isdistrict = false;
      setTimeout(() => {
        this.articleButton = false;
      }, 300);
      this.districtCity = "不限";
      this.checkboxGroup4 = [];
    },
    //立即筛选
    keepButton() {
      this.search();
      // if (this.company == "公司") {
      //   let params = {
      //     counties: this.Beat === "0" ? null : this.district,
      //     industries: this.dutyOne[0] === "1000" ? null : this.duty,
      //     keyword: this.searchContent,
      //     natures: this.qualityOne[0] === "5" ? null : this.quality,
      //     pageNum: 1,
      //     pageSize: 10,
      //     province: this.provincecode,
      //     size: this.scale === "15" ? null : this.scale
      //   };
      //   companySearch(params).then(res => {
      //     if (res.data.code == 200) {
      //       this.joblistJob = false;
      //       this.companyList = res.data.data.list;
      //       this.$router.push({
      //         path: "/joblist",
      //         query: {
      //           id: 1
      //         }
      //       });
      //       this.page1.total = res.data.data.total;
      //       if (res.data.data.total == 0) {
      //         this.joblistCompany = false;
      //         this.contentNull = false;
      //         this.companyNull = true;
      //       } else {
      //         this.joblistCompany = true;
      //         this.contentNull = false;
      //         this.companyNull = false;
      //       }
      //     }
      //   });
      //   // .catch(error => {});
      // } else if (this.company == "职位") {
      //   switch (this.monthPay) {
      //     case 0:
      //       this.salaryMin = 0;
      //       this.salaryMax = 1;
      //       break;
      //     case 1:
      //       this.salaryMin = 1;
      //       this.salaryMax = 2;
      //       break;
      //     case 2:
      //       this.salaryMin = 2;
      //       this.salaryMax = 4;
      //       break;
      //     case 3:
      //       this.salaryMin = 4;
      //       this.salaryMax = 6;
      //       break;
      //     case 4:
      //       this.salaryMin = 6;
      //       this.salaryMax = 8;
      //       break;
      //     case 5:
      //       this.salaryMin = 8;
      //       this.salaryMax = 10;
      //       break;
      //     case 6:
      //       this.salaryMin = 10;
      //       this.salaryMax = 15;
      //       break;
      //     case 7:
      //       this.salaryMin = 15;
      //       this.salaryMax = 25;
      //       break;
      //     case 8:
      //       this.salaryMin = 25;
      //       this.salaryMax = 35;
      //       break;
      //     case 9:
      //       this.salaryMin = 35;
      //       this.salaryMax = null;
      //       break;
      //     default:
      //       this.salaryMin = null;
      //       this.salaryMax = null;
      //       break;
      //   }
      //   switch (this.workExperience) {
      //     case 0:
      //       this.workAgeMin = 0;
      //       this.workAgeMax = 0;
      //       break;
      //     case 1:
      //       this.workAgeMin = 1;
      //       this.workAgeMax = 3;
      //       break;
      //     case 2:
      //       this.workAgeMin = 3;
      //       this.workAgeMax = 5;
      //       break;
      //     case 3:
      //       this.workAgeMin = 5;
      //       this.workAgeMax = 10;
      //       break;
      //     case 4:
      //       this.workAgeMin = 10;
      //       this.workAgeMax = null;
      //       break;
      //     default:
      //       this.workAgeMin = null;
      //       this.workAgeMax = null;
      //       break;
      //   }
      //   switch (this.release) {
      //     case "0":
      //       this.release = 1;
      //       break;
      //     case "1":
      //       this.release = 3;
      //       break;
      //     case "2":
      //       this.release = 5;
      //       break;
      //     case "3":
      //       this.release = 7;
      //       break;
      //     case "4":
      //       this.release = 15;
      //       break;
      //     // default:
      //     //   this.release = null;
      //     //   break;
      //   }
      //   if (this.workExperience == 0) {
      //     this.isGraduate = false;
      //   } else {
      //     this.isGraduate = true;
      //   }
      //   let paramsPosition = {
      //     counties: this.Beat === "0" ? null : this.district,
      //     degreeMin: this.Education === "15" ? null : this.Education,
      //     industries: this.dutyOne[0] === "1000" ? null : this.duty,
      //     isGraduate: this.isGraduate,
      //     jobType: this.workState === "15" ? null : this.workState,
      //     keyword: this.searchContent,
      //     pageNum: 1,
      //     natures: this.qualityOne[0] === "5" ? null : this.quality,
      //     pageSize: 10,
      //     province: this.provincecode,
      //     publishedInterval: this.release === 5 ? null : this.release,
      //     salaryMax: this.salaryMax,
      //     salaryMin: this.salaryMin,
      //     size: this.scale === "15" ? null : this.scale,
      //     workAgeMax: this.workAgeMax,
      //     workAgeMin: this.workAgeMin,
      //     positionCatalog: ""
      //   };
      //   positionSearch(paramsPosition).then(res => {
      //     if (res.data.code == 200) {
      //       this.$router.push({
      //         path: "/joblist"
      //       });
      //       this.joblistCompany = false;
      //       this.positionList = res.data.data.list;
      //       this.page.total = res.data.data.total;
      //       if (res.data.data.total == 0) {
      //         this.joblistCompany = false;
      //         this.joblistJob = false;
      //         this.contentNull = true;
      //         this.companyNull = false;
      //       } else {
      //         this.joblistJob = true;
      //         this.contentNull = false;
      //         this.companyNull = false;
      //       }
      //     }
      //   });
      //   // .catch(error => {});
      // }
    },
    //公司搜索
    search() {
      if (this.company == "公司") {
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
                    city: this.cityButton,
                    district: null,
                    province: this.provinceButton
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
            this.dutyOne === "1000"
              ? null
              : [
                  {
                    first: timeUtil.positionCatalog(parseInt(this.dutyOne)),
                    secondary: null
                  }
                ],
          industryCodes: this.dutyOne === "1000" ? null : [this.dutyOne],
          keywords: this.searchContent,
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
            this.$router.push({
              path: "/joblist"
              // query: {
              //   id: 1
              // }
            });
            window.sessionStorage.setItem(
              "lsittwo",
              JSON.stringify(res.data.data)
            );
            window.sessionStorage.setItem("citycode", this.citycode);
            this.companyList = JSON.parse(
              window.sessionStorage.getItem("lsittwo")
            ).list;
            this.page1.total = res.data.data.total;
            if (res.data.data.total == 0) {
              this.joblistCompany = false;
              this.contentNull = false;
              this.companyNull = true;
            } else {
              this.joblistCompany = true;
              this.contentNull = false;
              this.companyNull = false;
            }
          }
        });
        // .catch(error => {});
      } else if (this.company == "职位") {
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
        console.log(this.dutyOne);
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
                    city: this.cityButton,
                    district: null,
                    province: this.provinceButton
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
            this.dutyOne === "1000"
              ? null
              : [
                  {
                    first: timeUtil.positionCatalog(parseInt(this.dutyOne)),
                    secondary: null
                  }
                ],
          isGraduate: false,
          industryCodes: this.dutyOne === "1000" ? null : [this.dutyOne],
          jobType:
            this.workState === "15"
              ? null
              : timeUtil.jobType(parseInt(this.workState)),
          keywords: this.searchContent,
          pageNum: 1,
          // natures:  this.qualityOne[0] === "5" ? null : this.quality
          //   that.data.checkValueQua.length === 0
          //     ? null
          //     : that.data.checkValueQua,
          natures: null,
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

          // industries: this.dutyOne[0] === "1000" ? null : this.duty
        };
        positionSearch(paramsPosition).then(res => {
          if (res.data.code == 200) {
            this.$router.push({
              path: "/joblist"
            });
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
              window.sessionStorage.setItem(
                "lsittwo",
                JSON.stringify(res.data.data)
              );
              if (this.district === "") {
                window.sessionStorage.setItem(
                  "citycode",
                  parseInt(this.citycode)
                );
              } else {
                window.sessionStorage.setItem(
                  "citycode",
                  parseInt(this.district)
                );
              }
            }
          }
        });
        // .catch(error => {});
      }
    },
    searches() {
      if (this.company == "公司") {
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
                    city: this.cityButton,
                    district: null,
                    province: this.provinceButton
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
            this.dutyOne === "1000"
              ? null
              : [
                  {
                    first: timeUtil.positionCatalog(parseInt(this.dutyOne)),
                    secondary: null
                  }
                ],
          industryCodes: this.dutyOne === "1000" ? null : [this.dutyOne],
          keywords: this.searchContent,
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
            this.$router.push({
              path: "/joblist"
              // query: {
              //   id: 1
              // }
            });
            window.sessionStorage.setItem(
              "lsittwo",
              JSON.stringify(res.data.data)
            );
            window.sessionStorage.setItem("citycode", this.citycode);
            this.companyList = JSON.parse(
              window.sessionStorage.getItem("lsittwo")
            ).list;
            this.page1.total = res.data.data.total;
            if (res.data.data.total == 0) {
              this.joblistCompany = false;
              this.contentNull = false;
              this.companyNull = true;
            } else {
              this.joblistCompany = true;
              this.contentNull = false;
              this.companyNull = false;
            }
          }
        });
        // .catch(error => {});
      } else if (this.company == "职位") {
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
        console.log(this.dutyOne);
        let CodeToTag = timeUtil.CodeToTag(
          [
            parseInt(this.district / 10000) * 10000,
            parseInt(this.district / 100) * 100,
            this.district
          ],
          this.city
        );
        let paramsPosition = {
          addresses:null,
          degreeMin:
            this.Education === "15"
              ? null
              : timeUtil.qualifications(parseInt(this.Education)),
          industries:
            this.dutyOne === "1000"
              ? null
              : [
                  {
                    first: timeUtil.positionCatalog(parseInt(this.dutyOne)),
                    secondary: null
                  }
                ],
          isGraduate: false,
          industryCodes: this.dutyOne === "1000" ? null : [this.dutyOne],
          jobType:
            this.workState === "15"
              ? null
              : timeUtil.jobType(parseInt(this.workState)),
          keywords: this.searchContent,
          pageNum: 1,
          // natures:  this.qualityOne[0] === "5" ? null : this.quality
          //   that.data.checkValueQua.length === 0
          //     ? null
          //     : that.data.checkValueQua,
          natures: null,
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

          // industries: this.dutyOne[0] === "1000" ? null : this.duty
        };
        positionSearch(paramsPosition).then(res => {
          if (res.data.code == 200) {
            this.$router.push({
              path: "/joblist"
            });
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
              window.sessionStorage.setItem(
                "lsittwo",
                JSON.stringify(res.data.data)
              );
              if (this.district === "") {
                window.sessionStorage.setItem(
                  "citycode",
                  parseInt(this.citycode)
                );
              } else {
                window.sessionStorage.setItem(
                  "citycode",
                  parseInt(this.district)
                );
              }
            }
          }
        });
        // .catch(error => {});
      }
    },
    next() {
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
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
    handleItemChange() {
      setTimeout(() => {
        this.close();
      }, 500);
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
    getVendorId() {
      if (this.company == "公司") {
        this.isshow = false;
      } else {
        this.isshow = true;
      }
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
    //使用这个可以监听data中指定数据的变化,然后触发watch中对应的function的处理
    monthPay: function() {
      this.articleButton = true;
    },
    // district: function(value) {
    //   this.articleButton = true;
    //   if (this.district.length === 0) {
    //     this.Beat = '0';
    //     if (this.cityId !== "") {
    //       this.districtTwo = this.cityButton;
    //       this.checkboxGroup4 = value;
    //     } else {
    //       this.districtOne = "黄浦区";
    //       this.districtTwo = "黄浦区";
    //       this.districtCity = "不限";
    //       this.checkboxGroup4 = value;
    //     }
    //   } else {
    //     this.articleButton = true;
    //     this.districtOne = "";
    //     this.districtTwo = "";
    //     this.districtCity = "";
    //     for (var i = 0; i < this.district.length; i++) {
    //       this.districtOne +=
    //         this.CodeToTag(
    //           [parseInt(this.district[i] / 10000) * 10000, this.district[i]],
    //           this.city
    //         )[1] + "  ";
    //       this.districtTwo += this.CodeToTag(
    //         [parseInt(this.district[i] / 10000) * 10000, this.district[i]],
    //         this.city
    //       )[1];
    //       this.districtCity +=
    //         this.CodeToTag(
    //           [parseInt(this.district[i] / 10000) * 10000, this.district[i]],
    //           this.city
    //         )[1] + "  ";
    //     }
    //     this.checkboxGroup4 = this.district;
    //     if (this.districtTwo.length > 6) {
    //       this.districtTwo = this.districtTwo.substr(0, 3) + "...";
    //     } else {
    //       this.districtTwo = this.districtTwo;
    //     }
    //   }
    // },
    district: function() {
      this.articleButton = true;
      // if (this.district.length === 0) {
      //   this.Beat = ["1000"];
      // }
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
        this.qualityOne = ["5"];
      }
    },
    dutyOne: function() {
      this.articleButton = true;
    }
    // checkboxGroup4: function(value) {
    //   if (this.checkboxGroup4.length > 0) {
    //     this.districtOne = "";
    //     this.districtCity = "";
    //     this.district = this.checkboxGroup4;
    //     for (var i = 0; i < this.checkboxGroup4.length; i++) {
    //       this.districtOne +=
    //         this.CodeToTag(
    //           [
    //             parseInt(this.checkboxGroup4[i] / 10000) * 10000,
    //             this.checkboxGroup4[i]
    //           ],
    //           this.city
    //         )[1] + "  ";
    //       this.districtCity +=
    //         this.CodeToTag(
    //           [
    //             parseInt(this.checkboxGroup4[i] / 10000) * 10000,
    //             this.checkboxGroup4[i]
    //           ],
    //           this.city
    //         )[1] + "  ";
    //     }
    //     if (this.districtOne.length > 6) {
    //       this.districtTwo = this.districtOne.substr(0, 6) + "...";
    //     } else {
    //       this.districtTwo = this.districtOne;
    //     }
    //   } else {
    //     this.districtCity = "不限";
    //     if (this.cityId !== "") {
    //       this.districtOne = this.cityButton;
    //       this.districtTwo = this.cityButton;
    //       this.district = value;
    //     } else {
    //       this.districtOne = "黄浦区";
    //       this.districtTwo = "黄浦区";
    //       this.district = value;
    //     }
    //   }
    // },
    // districtCity: function() {
    //   if (
    //     this.districtCity === "不限" ||
    //     this.districtCity === "香港特别行政区" ||
    //     this.districtCity === "澳门特别行政区"
    //   ) {
    //     this.cityButton = this.cityButtons;
    //     this.Unabled = true;
    //   } else {
    //     this.districtTwo = this.districtCity;
    //     this.Unabled = false;
    //     if (this.districtTwo.length > 6) {
    //       this.districtTwo = this.districtTwo.substr(0, 3) + "...";
    //     } else {
    //       this.districtTwo = this.districtTwo;
    //     }
    //   }
    // }
  },
  created() {
    this.industryList = industrys.data;
    this.city = citys.data;
    this.optionList = option.data;
    // this.allposition();
    // this.citise();
    this.option();
    this.positiId = this.$route.query.thisId;
    this.signId = this.$route.query.id;
    this.cityId = window.sessionStorage.getItem("adcode");
    this.contentNull = true;
    if (this.positiId == 123) {
      this.company = "公司";
      this.cityButton = this.signId;
      this.provinceButton = this.provinceId;
      if (this.cityId !== "") {
        this.citises();
      } else {
        this.cits();
      }
      this.companyList = JSON.parse(
        window.sessionStorage.getItem("lsitOne")
      ).list;
      this.page1.total = JSON.parse(
        window.sessionStorage.getItem("lsitOne")
      ).total;
      if (this.companyList === undefined || this.companyList.length === 0) {
        this.isshow = false;
        this.joblistCompany = false;
        this.contentNull = false;
        this.companyNull = true;
      } else {
        this.isshow = false;
        this.joblistCompany = true;
        this.contentNull = false;
        this.companyNull = false;
      }
    } else if (this.positiId == 1234) {
      if (this.cityId !== "") {
        this.citises();
        this.districtCity = this.CodeToTag(
          [parseInt(this.cityId / 10000) * 10000, this.cityId],
          this.city
        )[1];
        let a = parseInt(this.cityId);
        this.checkboxGroup4 = [a];
      } else {
        this.cits();
      }
      this.positionList = JSON.parse(
        window.sessionStorage.getItem("lsit")
      ).list;
      this.page.total = JSON.parse(window.sessionStorage.getItem("lsit")).total;
      if (this.positionList.length == 0 || this.positionList === undefined) {
        this.joblistJob = false;
        this.contentNull = true;
        this.companyNull = false;
      } else {
        this.joblistJob = true;
        this.companyNull = false;
        this.contentNull = false;
      }
    } else if (this.signId == 1) {
      // this.cityId = JSON.parse(window.sessionStorage.getItem("citycode"));
      this.cits();
      this.positionList = JSON.parse(
        window.sessionStorage.getItem("lsittwo")
      ).list;
      this.page1.total = JSON.parse(
        window.sessionStorage.getItem("lsittwo")
      ).total;
      if (this.positionList.length == 0) {
        this.isshow = true;
        this.joblistJob = false;
        this.contentNull = true;
        this.companyNull = false;
      } else {
        this.isshow = true;
        this.joblistJob = true;
        this.contentNull = false;
        this.companyNull = false;
      }
    } else {
      this.searches();
      this.citises();
      this.cits();
      // this.checkboxGroup4 = [310101]
    }
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
  margin: 96px auto 0;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;

  .joblist-search {
    width: 976px;
    height: 60px;
    background: white;
    margin: 61px auto;
    border: 0px solid rgba(229, 229, 229, 1);
    box-shadow: 0px 1px 4px 0px rgba(212, 212, 212, 0.5);

    .joblist-after {
      border: 0.5px solid #dbdbdb;
    }

    .CompanyInput {
      .el-input__inner {
        border: 0px solid red;
        font-size: 22px;
        text-align: center;
      }

      .el-input__icon {
        margin: 0 30px 0 0;
        line-height: 40px;
        width: 11px;
      }

      .el-select .el-input .el-select__caret {
        color: red;
        font-size: 11px;
        transition: transform 0.3s;
        transform: rotate(180deg);
        cursor: point;
      }

      .el-icon-arrow-up:before {
        content: '\e78f';
      }
    }

    .CompanySelect {
      .el-input__inner {
        border: 0px solid red;
        font-size: 22px;
        text-align: center;
      }

      .el-input__icon {
        margin: 0 30px 0 0;
        line-height: 60px;
        width: 11px;
      }

      .el-select .el-input .el-select__caret {
        color: red;
        font-size: 11px;
        transition: transform 0.3s;
        transform: rotate(180deg);
        cursor: point;
      }

      .el-icon-arrow-up:before {
        content: '\e78f';
      }
    }

    .searchContent {
      .el-input__inner {
        border: 0px solid red;
        font-size: 16px;
      }
    }

    .el-icon-search:before {
      color: white;
      font-size: 17px;
    }

    .el-input__inner {
      border: 0px solid red;
    }

    .search-button {
      width: 183px;
      height: 60px;
      font-size: 24px;
      background: #327cf3;
      color: white;
      border: #327cf3;
      font-family: PingFangSC-Regular, sans-serif;
      margin: -5px 0 0 0;
    }

    .search-button:hover {
      border-color: #327cf3;
      background: #327cf3;
    }
  }

  .joblist-article {
    width: 1248px;
    background: #FAFAFA;
    border: 1px solid #FAFAFA;
    margin: 60px 0 0 96px;

    .article {
      display: flex;
      flex-direction: row;

      .article-content, .article-content-first {
        font-family: PingFangSC-Regular;
        color: #327cf3;
        font-size: 16px;
        margin: 0 0 0 20px;
      }

      .article-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #575757;
      }

      .el-radio-button__inner {
        border: 0px solid #327cf3;
      }

      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #327cf3;
        box-shadow: -1px 0 0 0 #327cf3;
        border-radius: 0 0 0 0;
        color: white;
      }

      .el-radio-button--small .el-radio-button__inner {
        padding: 6px 12px;
        line-height: 20px;
        font-size: 16px;
        color: #575757;
        background: #FAFAFA;
      }

      .el-checkbox-button__inner {
        padding: 6px 12px;
        line-height: 20px;
        font-size: 16px;
        color: #575757;
        background: #FAFAFA;
      }

      .el-checkbox-button.is-checked .el-checkbox-button__inner {
        background-color: #327cf3;
        box-shadow: -1px 0 0 0 #327cf3;
        border-radius: 0 0 0 0;
        color: white;
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
      margin: 10px 0 10px 0;
      color: #327cf3;
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
    margin: 10px 96px 0 96px;
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
      margin: 10px 0 10px 0;
      color: #327cf3;
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
      background: #327cf3;
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
      color: #327cf3;
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
  background-color: #327cf3;
  box-shadow: -1px 0 0 0 #327cf3;
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
  color: #327cf3;
}
</style>

