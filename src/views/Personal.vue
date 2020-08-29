<template>
  <div class="personal">
    <div class="personal-left">
      <el-tabs v-model="activeName" class="personal-tabs" v-if="showTabs">
        <el-tab-pane :label="`投递记录（${throwNum = this.page1.total}）`" name="first">
          <div
            style="width:854px;cursor:pointer"
            class="hover"
            v-for="(list,index) in submittedList"
            :key="index"
            @click="nextjoblist(list.id)"
          >
            <div class="tabs-first">
              <span v-if="list.positionName.length > 10">
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">{{list.positionName}}</div>
                  <span style="margin:0 0 0 0">{{list.positionName.slice(0, 10)+'...'}}</span>
                </el-tooltip>
              </span>
              <span v-else>{{list.positionName}}</span>
              <span v-if="list.salaryMin === 35">{{list.salaryMin}}k以上</span>
              <span v-else>{{list.salaryMin}}-{{list.salaryMax}}k</span>
            </div>
            <div class="tabs-second">
              <span v-if="list.company.companyName.length > 10">
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">{{list.company.companyName}}</div>
                  <span style="margin:0 0 0 0">{{list.company.companyName.slice(0, 8)+'...'}}</span>
                </el-tooltip>
              </span>
              <span v-else>{{list.company.companyName}}</span>
              <span
                v-if="list.workAgeMax == null"
              >{{list.workAddress.city}} | 10年以上 | {{list.degreeMin}}</span>
              <span
                v-else
              >{{list.workAddress.city}} | {{list.workAgeMin}}-{{list.workAgeMax}}年 | {{list.degreeMin}}</span>
              <span>
                {{list.operatedHistory[0].operatedTime|formatDate}}
                <el-tooltip class="item" effect="light" placement="top-end">
                  <div slot="content">
                    <div
                      style="padding:5px 0 5px 0;color:#373737;font-size:12px"
                      v-for="(item,index) in list.operatedHistory"
                      :key="index"
                    >{{item.operatedTime|formatDateThree}} {{item.operation}}</div>
                  </div>
                  <span
                    class="sap"
                    style="font-size:18px;color:#373737;"
                  >{{list.operatedHistory[0].operation}}</span>
                </el-tooltip>
              </span>
            </div>
            <div class="tabs-line"></div>
          </div>
          <div class="tabs-pagination">
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
        </el-tab-pane>
        <el-tab-pane :label="`我的收藏（${collectNum = this.page.total}）`" name="second">
          <div
            style="width:854px;cursor:pointer"
            class="hover"
            v-for="(list,index) in favoriteList"
            :key="index"
          >
            <div class="tabs-first" @click="nextjoblist(list.id)">
              <span v-if="list.positionName.length > 10">
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">{{list.positionName}}</div>
                  <span style="margin:0 0 0 0">{{list.positionName.slice(0, 10)+'...'}}</span>
                </el-tooltip>
              </span>
              <span v-else>{{list.positionName}}</span>
              <span v-if="list.salaryMin === 35">{{list.salaryMin}}k以上</span>
              <span v-else>{{list.salaryMin}}-{{list.salaryMax}}k</span>
            </div>
            <div class="collect-second">
              <span
                @click="nextjoblist(list.id)"
                class="collect-company"
                v-if="list.company.companyName.length > 10"
              >
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">{{list.company.companyName}}</div>
                  <span style="margin:0 0 0 0">{{list.company.companyName.slice(0, 8)+'...'}}</span>
                </el-tooltip>
              </span>
              <span
                @click="nextjoblist(list.id)"
                class="collect-company"
                v-else
              >{{list.company.companyName}}</span>
              <span
                @click="nextjoblist(list.id)"
                class="collect-city"
                v-if="list.workAgeMax == null"
              >{{list.workAddress.city}} | 10年以上 | {{list.degreeMin}}</span>
              <span
                @click="nextjoblist(list.id)"
                class="collect-city"
                v-else
              >{{list.workAddress.city}} | {{list.workAgeMin}}-{{list.workAgeMax}}年 | {{list.degreeMin}}</span>
              <span class="collect-button">
                <el-button type="primary" @click="iscancel(list.id)">取消收藏</el-button>
              </span>
            </div>
            <div class="collect-line"></div>
          </div>
          <div class="collect-pagination">
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
        </el-tab-pane>
      </el-tabs>
      <div style="font-size:15px;line-height:500px" v-if="isshowTabs">你还没有任何投递记录呦~~</div>
    </div>
    <div class="personal-right">
      <div class="right-nav">
        <span class="span-hover" @click="edit">编辑</span>
        <!-- <img
          v-if="this.avatarUrl == ''"
          :src="require('../assets/images/156.png')"
          style="border-radius:53px;margin:-20px auto;width:82px;"
        /> -->
        <img
          :src="this.avatarUrl"
          style="border-radius:40px;margin:-20px auto;width:82px;height:82px"
        />
        <span class="span-name" v-if="showInfor">
          {{fullName}}
          <img v-if="this.sex === '0'" :src="require('../assets/images/nn.svg')" />
          <img v-else :src="require('../assets/images/n.svg')" />
        </span>
        <div v-if="showInfor" class="infor">
          <span class="span-city">现居{{city}} | {{workAge}}年工作经验 | {{age}}岁</span>
          <span class="span-type">求职状态：{{jobSearchStatus}}</span>
        </div>
        <div v-if="showWarn" style="font-size:14px;padding:10px 0 10px 0">个人信息未填写完整，快快来补充吧</div>
      </div>
      <div class="right-footer">
        <div class="footer-nav">
          <span>推荐职位</span>
          <span style="cursor:pointer" @click="next">查看更多 》</span>
        </div>
        <div
          v-if="Tjposition"
          v-for="(list,index) in positionList.slice(0, 6)"
          :key="index"
          @click="nextjoblist(list.id)"
          style="padding:0 0 5px 0"
        >
          <div class="footer-article">
            <span v-if="list.positionName.length > 10">
              <el-tooltip placement="bottom" effect="light">
                <div slot="content">{{list.positionName}}</div>
                <span style="margin:0 0 0 0">{{list.positionName.slice(0, 10)+'...'}}</span>
              </el-tooltip>
            </span>
            <span v-else>{{list.positionName}}</span>
            <span v-if="list.salaryMin === 35">{{list.salaryMin}}k以上</span>
            <span v-else>{{list.salaryMin}}-{{list.salaryMax}}k</span>
          </div>
          <div class="footer-foot">
            <span>{{list.company.companyName}}</span>

            <span>{{$CodeToTag.CodeToTag([list.workAddress.province,list.workAddress.county],citysal)[0]+$CodeToTag.CodeToTag([list.workAddress.province,list.workAddress.county],citysal)[1]}}</span>
          </div>
          <div class="footer-line"></div>
        </div>
        <div
          v-if="QSposition"
          style="color:#373737;font-size:16px;height:300px;margin:60px 0 0 0"
        >缺少推荐职位</div>
      </div>
    </div>
  </div>
</template>

<script>
import { submitted, brief, favorite, isfavorite, searched } from "apis/account";
import citys from "../assets/city.json";
export default {
  name: "personal",
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
      Tjposition: false,
      QSposition: true,
      avatarUrl: "",
      defaultResumeId: "",
      throwNum: "",
      collectNum: "",
      activeName: "first",
      showInfor: true,
      showWarn: true,
      showWarnone: false,
      showTabs: true,
      isshowTabs: false,
      submittedList: [],
      favoriteList: [],
      positionList: [],
      fullName: "",
      city: "",
      citysal: [],
      workAge: "",
      age: "",
      state: "",
      workState: "",
      jobSearchStatus: "",
      county: "",
      sex: "",
      degreeMin: "",
      industry: "",
      isGraduate: "",
      jobType: "",
      keyword: "",
      pageNum: 0,
      pageSize: 10,
      province: "",
      publishedInterval: "",
      salaryMax: "",
      salaryMin: "",
      size: "",
      workAgeMax: "",
      workAgeMin: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize
      };
      favorite(params).then(res => {
        if (res.data.code === 200) {
          this.favoriteList = res.data.data.list;
          this.page.total = res.data.data.total;
        }
      });
    },
    handleCurrentChange(val) {
      this.page.current = val;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize
      };
      favorite(params).then(res => {
        if (res.data.code === 200) {
          this.favoriteList = res.data.data.list;
          this.page.total = res.data.data.total;
        }
      });
    },
    handleSizeChange1(val) {
      this.page1.pageSize = val;
      this.page1.current = 1;
      let params = {
        pageNum: this.page1.current,
        pageSize: this.page1.pageSize
      };
      submitted(params).then(res => {
        if (res.data.code == 200) {
          this.submittedList = res.data.data.list;
          this.page1.total = res.data.data.total;
        }
      });
    },
    handleCurrentChange1(val) {
      this.page1.current = val;
      let params = {
        pageNum: this.page1.current,
        pageSize: this.page1.pageSize
      };
      submitted(params).then(res => {
        if (res.data.code == 200) {
          this.submittedList = res.data.data.list;
          this.page1.total = res.data.data.total;
        }
      });
    },
    next() {
      this.$router.push({ path: "/joblist" });
    },
    nextjoblist(id) {
      this.$router.push({
        path: "/station",
        query: {
          id: id
        }
      });
    },
    toPerson() {
      this.$router.push({ path: "/inforchange" });
    },
    //编辑个人信息
    edit() {
      // datacenterBus.$emit("myFun",false)   //$emit这个方法会触发一个事件
      if (this.defaultResumeId === 0) {
        this.$router.push({ path: "/gap" });
      } else {
        this.$router.push({ path: "/resume" });
      }
    },
    //获取投递过的岗位
    submitt() {
      submitted().then(res => {
        if (res.data.code == 200) {
          this.submittedList = res.data.data.list;
          this.page1.total = res.data.data.total;
        }
      });
    },
    //获取简历简讯
    brief() {
      brief().then(res => {
        if (res.data.code === "200") {
          if (res.data.data.base === null) {
            this.showWarn = true;
            this.showInfor = false;
          } else {
            this.showWarn = false;
            this.showInfor = true;
          }
          this.avatarUrl = res.data.data.base.avatarUrl;
          this.defaultResumeId = res.data.data.defaultResumeId;
          this.fullName = res.data.data.base.fullName;
          this.city = res.data.data.base.province + res.data.data.base.city;
          this.workAge = res.data.data.base.workAge;
          this.age = res.data.data.base.age;
          this.jobSearchStatus = res.data.data.target.jobSearchStatus;
          if (res.data.data.target.jobSearchStatus === 1) {
            this.jobSearchStatus = "离职-延时到岗";
          } else if (res.data.data.target.jobSearchStatus === 0) {
            this.jobSearchStatus = "离职-随时到岗";
          } else if (res.data.data.target.jobSearchStatus === 2) {
            this.jobSearchStatus = "在职-考虑机会";
          } else if (res.data.data.target.jobSearchStatus === 3) {
            this.jobSearchStatus = "在职-暂不到岗";
          }
          if (res.data.data.target.jobType === 1) {
            this.state = "实习";
          } else if (res.data.data.target.jobType === 2) {
            this.state = "全职";
          } else if (res.data.data.target.jobType === 3) {
            this.state = "兼职";
          }
        }
      });
    },
    //获取收藏的岗位
    favorite() {
      favorite().then(res => {
        if (res.status === 200) {
          this.favoriteList = res.data.data.list;
          this.page.total = res.data.data.total;
        }
      });
    },
    //取消对岗位的收藏
    iscancel(c) {
      isfavorite(c).then(res => {
        if (res.data.code === "200") {
          this.favorite();
        }
      });
    },

    //城市
    // citise() {
    //   city().then(res => {
    //     if (res.data.code === 200) {
    //       this.citysal = res.data.data;
    //     }
    //   });
    // },
    //获取推荐岗位
    searched() {
      let params = {
        addresses: null,
        degreeMin: null,
        industries: null,
        industryCodes: null,
        isGraduate: true,
        jobType: null,
        keywords: null,
        natures: null,
        pageNum: 1,
        pageSize: 10,
        positionCatalog: null,
        publishedInterval: null,
        publishedTime: null,
        salaryMax: null,
        salaryMin: null,
        size: null,
        sortBy: null,
        sortOrder: null,
        workAgeMax: null,
        workAgeMin: null
      };
      searched(params).then(res => {
        if (res.data.code === 200) {
          this.positionList = res.data.data.list;
          if (res.data.data.total === 0) {
            this.Tjposition = false;
            this.QSposition = true;
          } else {
            this.Tjposition = true;
            this.QSposition = false;
          }
        }
      });
    }
  },
  created() {
    this.favorite();
    this.submitt();
    this.brief();
    // this.searched();
  },
  filters: {
    level(level) {
      const map = ["初中及以下", "职中", "大专", "本科", "硕士", "博士"];
      return map[level];
    },
    industry(industry) {
      if (industry == 1) {
        const map = [
          "",
          "酒店/餐饮",
          "旅游/度假",
          "医疗/护理/美容/保健/卫生服务"
        ];
        return map[industry];
      }
      if (industry == 2) {
        const map = [
          "",
          "计算机软件",
          "网络游戏",
          "IT服务(系统/数据/维护)",
          "计算机硬件",
          "互联网/电子商务",
          "电子技术/半导体/集成电路",
          "通信、电信运营/增值服务",
          "通信/电信/网络设备"
        ];
        return map[industry];
      }
      if (industry == 3) {
        const map = [
          "",
          "保险",
          "银行",
          "信托/担保/拍卖/典当",
          "基金/证券/期货/投资"
        ];
        return map[industry];
      }
      if (industry == 4) {
        const map = [
          "",
          "零售/批发",
          "贸易/进出口",
          "快速消费品（食品/饮料/烟酒/日化）",
          "耐用消耗品",
          "租赁服务"
        ];
        return map[industry];
      }
      if (industry == 5) {
        const map = [
          "",
          "文体教育|工艺美术",
          "教育/培训/院校",
          "礼品/玩具/工艺美术/收藏品/奢侈品"
        ];
        return map[industry];
      }
      if (industry == 6) {
        const map = [
          "",
          "办公用品及设备",
          "航空/航天研究与制造",
          "医疗设备/器械",
          "加工制造（原料加工/模具）",
          "医药/生物工程",
          "大型设备/机电设备/重工业",
          "印刷/包装/造纸",
          "汽车/摩托车",
          "仪器仪表及工业自动化"
        ];
        return map[industry];
      }
      if (industry == 7) {
        const map = [
          "",
          "房地产/建筑/建材/工程",
          "物业管理/商业中心",
          "家居/室内设计/装饰装潢"
        ];
        return map[industry];
      }
      if (industry == 8) {
        const map = [
          "",
          "专业服务/咨询(财会/法律/人力资源等)",
          "广告/会展/公关",
          "中介服务",
          "外包服务",
          "检验/检测/认证"
        ];
        return map[industry];
      }
      if (industry == 9) {
        const map = ["", "娱乐/体育/休闲", "媒体/出版/影视/文化传媒"];
        return map[industry];
      }
      if (industry == 10) {
        const map = ["", "跨领域经营", "农/林/牧/渔", "其他"];
        return map[industry];
      }
      if (industry == 11) {
        const map = ["", "交通/运输", "物流/仓储"];
        return map[industry];
      }
      if (industry == 12) {
        const map = [
          "",
          "环保",
          "石油/石化/化工",
          "能源/矿产/采掘/冶炼",
          "电气/电力/水利"
        ];
        return map[industry];
      }
      if (industry == 13) {
        const map = ["", "学术/科研", "政府/公共事业/非盈利机构"];
        return map[industry];
      }
    }
  }
};
</script>

<style lang="stylus">
.personal {
  cursor: default;
  display: flex;
  flex-direction: row;
  margin: 90px auto 0;
  width: 1440px;
  background: #ffffff;

  .hover:hover {
    background: #f7f7f7;
  }

  .personal-left {
    width: 1010px;
    background: white;

    .personal-tabs {
      margin: 56px 0 0 96px;
    }

    .el-tabs__item.is-active {
      color: #327cf3;
    }

    .el-tabs__item {
      font-size: 22px;
      font-weight: 800;
      color: #373737;
    }

    .el-tabs__active-bar {
      background-color: #327cf3;
    }

    .el-tabs__content, .el-tab-pane {
      margin: 20px 0 0 0;
    }

    .el-tabs__nav-wrap:after {
      height: 0px;
    }

    .collect-second {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10px 0 15px 0;
    }

    .collect-line {
      width: 100%;
      margin: 8px 0 0 0;
      border: 0.5px solid #f0f0f0;
    }

    .collect-pagination {
      margin: 30px 0 0 0;
      padding: 0 0 20px 0;
    }

    .collect-company {
      font-size: 16px;
      margin: 0 0 0 10px;
      width: 150px;
      text-align: left;
    }

    .collect-city {
      margin: 2px 205px 1px 70px;
      font-size: 16px;
      color: #959595;
    }

    .collect-button {
      margin: -5px 10px 0 0;
      font-size: 16px;
      width: 94px;
      height: 32px;

      .button {
        background-color: #327cf3;
        border: 1px solid #327cf3;
        margin: -6px 0 0 0;
      }

      .button:focus {
        background-color: #d8d8d8;
        border: 1px solid #d8d8d8;
      }
    }

    .tabs-first {
      display: flex;
      flex-direction: row;
      font-family: PingFangSC-Regular;
      font-size: 20px;
      margin: 16px 0 0 0;
      text-align: left;
    }

    .tabs-first span:nth-child(1) {
      color: #373737;
      margin: 10px 0 0 10px;
      width: 280px;
    }

    .tabs-first span:nth-child(2) {
      color: #C52B2B;
      margin: 10px 0 0 40px;
      width: 120px;
    }

    .tabs-second {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
      margin: 10px 0 0 0;
    }

    .tabs-second span:nth-child(1) {
      font-size: 16px;
      color: #636363;
      margin: 0 0 0 10px;
      width: 150px;
    }

    .tabs-second span:nth-child(2) {
      margin: 2px 0 7px 40px;
      width: 300px;
      color: #959595;
      font-size: 16px;
    }

    .tabs-second span:nth-child(3) {
      text-align: left;
      font-size: 18px;
      width: 200px;
    }

    .tabs-second span:nth-child(4) {
      text-align: left;
      width: 200px;
      color: #373737;
      font-size: 18px;
    }

    .tabs-second p {
      margin: 0 10px 0 0;
      font-size: 14px;
      text-align: right;
      width: 160px;
      color: #909090;

      .time {
        font-size: 14px;
        margin: 0 0 0 20px;
        color: #909090;
      }
    }

    .tabs-line {
      width: 100%;
      margin: 10px 0 0 0;
      border: 0.5px solid #f0f0f0;
    }

    .tabs-pagination {
      margin: 30px 0 0 0;
      padding: 0 0 20px 0;
      color: #1d366e;
    }
  }

  .personal-right {
    width: 334px;
    margin: 90px 0 0 0;

    .right-nav {
      display: flex;
      flex-direction: column;
      background: #fafafa;
      width: 334px;

      .span-hover {
        font-family: PingFangSC-Regular;
        color: #373737;
        font-size: 16px;
        cursor: pointer;
        margin: 20px 0 0 230px;
        opacity: 0;
      }

      &:hover {
        .span-hover {
          opacity: 1;
        }
      }

      .span-name {
        font-family: PingFangSC-Regular;
        color: #373737;
        font-size: 16px;
        margin: 30px 0 0 20px;
        text-align: center;
      }

      .span-name img {
        width: 15px;
        height: 15px;
        margin: 0 0 0 5px;
        border-radius: 7px;
      }

      .infor {
        display: flex;
        flex-direction: column;

        .span-city {
          font-family: PingFangSC-Regular;
          color: #5C5C5C;
          font-size: 14px;
          margin: 10px 0 0 0;
        }

        .span-type {
          font-family: PingFangSC-Regular;
          color: #373737;
          font-size: 16px;
          margin: 10px 0 20px 0;
        }
      }
    }

    .right-nav img {
      font-family: PingFangSC-Regular;
      color: #909090;
      width: 110px;
      height: 110px;
      margin: 0 0 0 90px;
    }

    .right-footer {
      background: white;
      margin: 20px 0 60px 0;
      border: 1px solid rgba(204, 204, 204, 1);

      .footer-nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 24px 0 0 0;
      }

      .footer-nav span:nth-child(1) {
        font-family: PingFangSC-Semibold;
        color: #373737;
        font-size: 16px;
        margin: 0 0 0 40px;
      }

      .footer-nav span:nth-child(2) {
        font-family: PingFangSC-Semibold;
        color: #373737;
        font-size: 12px;
        margin: 3px 40px 0 0;
      }

      .footer-article {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 15px 0 0 0;
      }

      .footer-article span:nth-child(1) {
        font-family: PingFangSC-Semibold;
        color: #373737;
        font-size: 16px;
        margin: 0 0 0 40px;
      }

      .footer-article span:nth-child(2) {
        font-family: PingFangSC-Semibold;
        color: #C52B2B;
        font-size: 14px;
        margin: 0 40px 0 0;
      }

      .footer-foot {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 5px 0 5px 0;
      }

      .footer-foot span:nth-child(1) {
        font-family: PingFangSC-Semibold;
        font-size: 12px;
        margin: 0 0 0 40px;
      }

      .footer-foot span:nth-child(2) {
        font-family: PingFangSC-Semibold;
        font-size: 12px;
        margin: 0 40px 0 0;
        color: #959595;
      }

      .footer-line {
        width: 334px;
        border: 0.5px solid #f0f0f0;
        margin: 10px 0 0 0;
      }
    }
  }
}
</style>
