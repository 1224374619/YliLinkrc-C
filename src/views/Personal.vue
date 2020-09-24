<template>
  <div class="personal">
    <el-dialog
      title
      :visible.sync="dialogSuccess"
      :show-close="false"
      style="width:700px;margin-left:25%;margin-top:5%;border-radius:5px"
    >
      <!-- <div style="display:flex;flex-direction:column;">
            <div>
              <img :src="require('../assets/images/pjs.png')"
          />
            </div>
            <div style="font-family: PingFangSC-Medium;color: #2C2C2C;font-size:20px">评价失败</div>
            <div style="font-family: PingFangSC-Regular;color: #565656;font-size:14px;margin:10px 0 70px 0">请稍后有重试~</div>
            <div><el-button style="width:270px;height:40px;margin:0 0 40px 0" type="primary">确定</el-button></div>
      </div>-->
      <div style="display:flex;flex-direction:column;">
        <div>
          <img :src="require('../assets/images/pjs.png')" />
        </div>
        <div style="font-family: PingFangSC-Medium;color: #2C2C2C;font-size:20px">抱歉，您已失去评价资格！</div>
        <div
          style="font-family: PingFangSC-Regular;color: #565656;font-size:14px;margin:10px 0 70px 0"
        >已失去评价资格～</div>
        <div>
          <el-button style="width:270px;height:40px;margin:0 0 40px 0" type="primary">确定</el-button>
        </div>
      </div>
      <!-- <div style="display:flex;flex-direction:column;">
        <div>
          <img :src="require('../assets/images/pj.png')" />
        </div>
        <div style="font-family: PingFangSC-Medium;color: #2C2C2C;font-size:20px">评价成功</div>
        <div
          style="font-family: PingFangSC-Regular;color: #565656;font-size:14px;margin:10px 0 70px 0"
        >感谢你的点评~</div>
        <div>
          <el-button style="width:270px;height:40px;margin:0 0 40px 0" type="primary">返回</el-button>
        </div>
      </div>-->
    </el-dialog>
    <div class="personal-left" v-if="appraise">
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
    <div class="personal-left" v-if="appraise">
      <div class="personal-nav">
        给你的面试
        <span>吐个槽</span>吧～
      </div>
      <div class="personal-aside">
        <div>
          <span>面试进度</span>
          <el-radio-group v-model="radio1" size="medium">
            <el-radio-button label="面试中"></el-radio-button>
            <el-radio-button label="已通过"></el-radio-button>
            <el-radio-button label="失之交臂"></el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin:20px 0 0 0">
          <span>面试难度</span>
          <el-radio-group v-model="radio1" size="medium">
            <el-radio-button label="容易"></el-radio-button>
            <el-radio-button label="还行"></el-radio-button>
            <el-radio-button label="好难"></el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin:20px 0 0 0">
          <span>面试官</span>
          <el-radio-group v-model="radio1" size="medium" style="margin:0 0 0 15px">
            <el-radio-button label="亲切"></el-radio-button>
            <el-radio-button label="还行"></el-radio-button>
            <el-radio-button label="专业"></el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin:20px 0 0 0">
          <span>公司印象</span>
          <el-radio-group v-model="radio1" size="medium">
            <el-radio-button label="很好"></el-radio-button>
            <el-radio-button label="还行"></el-radio-button>
            <el-radio-button label="不太好"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="personal-select">
        <div class="personal-selects">
          <span>面试体验</span>
          <el-rate style="margin:0 0 0 10px" show-text v-model="value2" :colors="colors"></el-rate>
        </div>
      </div>
      <div class="personal-footer">
        <div class="personal-footers">
          <span>面试故事（选填）</span>
          <el-input
            type="textarea"
            style="width:674px"
            :autosize="{ minRows: 4, maxRows: 8}"
            placeholder="留下更多你想说的话..."
            v-model="textarea2"
          ></el-input>
        </div>
      </div>
      <div class="personal-button">
        <div class="personal-buttons">
          <el-button class="button" @click="open" type="primary">匿名发表</el-button>
          <el-button class="button" type="info" disabled>匿名发表</el-button>
        </div>
      </div>
    </div>
    <div class="personal-left">
      <div class="personals-nav">
        产品经理 面试
        <span>面试进度：已完成</span>
      </div>
      <div class="personals-aside">
        <div>
          <span>面试体验：</span>
          <span>4.0</span>分
        </div>
      </div>
      <div class="personals-select">
        <div>
          <span>面试难度：</span>
          <span>容易</span>
        </div>
        <div style="margin:0 0 0 40px">
          <span>面试官：</span>
          <span>亲切</span>
        </div>
        <div style="margin:0 0 0 40px">
          <span>公司印象：</span>
          <span>还行</span>
        </div>
      </div>
      <div class="personal-footer">
        <div class="personal-footers">
          <span>面试故事</span>
          <el-input
            type="textarea"
            style="width:674px;font-family: PingFangSC-Regular;color: #737373;font-size:16px"
            :autosize="{ minRows: 4, maxRows: 8}"
            v-model="textarea"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="personal-right">
      <div class="right-nav">
        <span class="span-hover" @click="edit">编辑</span>
        <!-- <img
          v-if="this.avatarUrl == ''"
          :src="require('../assets/images/156.png')"
          style="border-radius:53px;margin:-20px auto;width:82px;"
        />-->
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
import Cookies from "js-cookie";
export default {
  name: "personal",
  components: {},
  data() {
    return {
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      dialogError: false,
      dialogSuccess: true,
      textarea:
        "able to work under high pressure and time limitation . able work under high pressure and time limitation. able towork under high pressure and time limitation.able to work under high pressure and time limitation.able to work under high pressure and time limitation.able to work under high pressure and time limitation. to work under pressure and time limitation.able to work under high pressure and time limitation.",
      value2: null,
      appraise: false,
      radio1: "",
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
    open() {
      this.$confirm("请评价面试体验～", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showClose: false,
        center: true,
        showCancelButton: false,
        showConfirmButton: false
      })
        .then(() => {})
        .catch(() => {});
    },
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
      favorite()
        .then(res => {
          if (res.status === 200) {
            this.favoriteList = res.data.data.list;
            this.page.total = res.data.data.total;
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
    //取消对岗位的收藏
    iscancel(c) {
      isfavorite(c)
        .then(res => {
          if (res.data.code === "200") {
            this.favorite();
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
      searched(params)
        .then(res => {
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
  },
  created() {
    let token = Cookies.get("token");
    if (token) {
      this.favorite();
      this.submitt();
      this.brief();
    }
  }
};
</script>

<style lang="stylus">
.el-message-box__content {
  font-size: 20px;
  font-family: PingFangSC-Medium;
  color: #2C2C2C;
}

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

    .personal-nav {
      margin: 60px 0 0 168px;
      font-size: 14px;
      text-align: left;

      span {
        font-family: PingFangSC-Regular;
        color: #373737;
        letter-spacing: 0.7;
        font-size: 16px;
      }
    }

    .personals-nav {
      margin: 60px 0 0 168px;
      font-size: 20px;
      text-align: left;
      font-family: PingFangSC-Medium;
      color: #373737;

      span {
        font-family: PingFangSC-Regular;
        color: #666666;
        font-size: 16px;
      }
    }

    .personals-aside {
      margin: 40px 0 0 168px;
      text-align: left;

      span:nth-child(2) {
        font-family: PingFangSC-Regular;
        color: #327CF3;
      }
    }

    .personals-select {
      margin: 25px 0 0 168px;
      display: flex;
      flex-direction: row;
      font-family: PingFangSC-Regular;
      color: #327CF3;
      font-size: 16px;
    }

    .personal-aside {
      text-align: left;
      margin: 50px 0 0 168px;

      span {
        font-family: PingFangSC-Regular;
        color: #606060;
        font-size: 16px;
      }

      .el-radio-button--medium .el-radio-button__inner {
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 20px;
        margin: 0 0 0 39px;
        width: 130px;
      }

      .el-radio-button__inner {
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
        background: #fff;
        border: 1px solid #dcdfe6;
        font-weight: 500;
        border-left: 1;
        margin: 0 0 0 20px;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        margin: 0;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 20px;
      }

      .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        box-shadow: -1px 0 0 0 #409eff;
      }
    }

    .personal-select {
      margin: 40px 0 0 168px;

      .personal-selects {
        display: flex;
        flex-direction: row;

        .el-icon-star-off:before {
          content: '\e717';
          font-size: 26px;
          padding: 0 0 0 15px;
        }

        .el-icon-star-on:before {
          content: '\e797';
          font-size: 26px;
          padding: 0 0 0 15px;
        }

        span {
          font-family: PingFangSC-Medium;
          color: #373737;
          font-size: 20px;
        }
      }
    }

    .personal-footer {
      margin: 40px 0 0 168px;

      .personal-footers {
        display: flex;
        flex-direction: column;

        .el-textarea__inner:focus {
          outline: none;
          border-color: #dcdfe6;
        }

        .el-textarea__inner {
          display: block;
          resize: vertical;
          padding: 5px 15px;
          line-height: 1.5;
          box-sizing: border-box;
          width: 100%;
          font-size: inherit;
          color: #606266;
          background: #FAFAFA;
          background-image: none;
          border: 1px solid #FAFAFA;
          border-radius: 4px;
          transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          margin: 20px 0 0 0;
        }

        span {
          font-family: PingFangSC-Medium;
          color: #373737;
          font-size: 20px;
          text-align: left;
        }
      }
    }

    .personal-button {
      font-size: 20px;
      margin: 40px 0 0 0;

      .button {
        width: 200px;
        height: 40px;
      }
    }

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
