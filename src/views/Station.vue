<template>
  <div class="station">
    <div v-if="deliverOne">
      <deliver :from-data="this.companyId" @backEmit="backEmit(arguments)"></deliver>
    </div>
    <div class="station-nav" v-if="stationNav">
      <div class="station-nav-name">
        <span>{{positionIdList.positionName}}</span>
        <span v-if="positionIdList.salaryMin === 35">{{positionIdList.salaryMin}}k以上</span>
        <span v-else>{{positionIdList.salaryMin}}-{{positionIdList.salaryMax}}k</span>
      </div>
      <div class="station-nav-content">
        <div class="content-nav" style="width:500px;">
          <span>{{positionIdList.company.address.district}} | {{positionIdList.workAgeMin}}-{{positionIdList.workAgeMax}}年 | {{positionIdList.degreeMin}} | {{positionIdList.jobType}}</span>
        </div>
        <div class="content-article">
          <span>发布时间：{{positionIdList.publishedTime | formatDate}}</span>
        </div>
        <div style="margin:0 0 0 155px" v-if="al">
          <span v-if="almsg">
            <el-button
              id="deliver"
              style="width:140px;height:40px;margin:0 70px 0 0;background:#327cf3;color:#fff"
              @click="showdeliver"
            >投递简历</el-button>
          </span>
          <span v-if="msg">
            <el-button
              type="primary"
              icon="el-icon-check"
              style="width:140px;height:40px;margin:0 70px 0 0;border:0px solid red"
            >已投递</el-button>
          </span>
        </div>
        <div v-if="all" class="content-collect">
          <span v-if="isshowCollect">
            <el-button class="collect" style="width:140px;height:40px" @click="iscollect()" plain>收藏</el-button>
          </span>
          <span v-if="showCollect">
            <el-button
              type="primary"
              icon="el-icon-star-off"
              style="width:140px;height:40px;border:0px solid red"
            >已收藏</el-button>
          </span>
        </div>
        <div style="margin:0 0 0 165px" v-if="showDeliver">
          <span style="margin:0 0 0 0">
            <el-button
              style="width:280px;height:40px;background:#9b9b9b;border:1px solid #9b9b9b"
              type="primary"
            >已失效</el-button>
          </span>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <span style="font-size:16px;color:#455379">简历中要至少要填写"基本信息"和"校园经历",否则无法投递呦</span>
        <span slot="footer" class="dialog-footer">
          <el-button
            style="width:94px;height:34px"
            @click="dialogVisible = false"
            class="cancel"
          >取 消</el-button>
          <el-button
            type="primary"
            style="margin-right:160px;width:94px;height:34px;"
            @click="dialogVisible = false"
          >完善简历</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisibleOne" width="30%">
        <span style="font-size:34px;color:#52c41a;">
          <i class="el-icon-circle-check"></i>
        </span>
        <br />
        <span style="font-size:16px;color:#455379;">投递成功，静候佳音吧~~~</span>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="isdeliver()"
            style="margin:0 40% 5px 0;width:94px;height:34px"
          >好的</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="station-foot" v-if="stationFoot">
      <div class="station-foot-content">
        <p>职位描述</p>
        <p>{{positionIdList.description}}</p>
        <p>招聘要求</p>
        <p>{{positionIdList.requirement}}</p>
        <div class="station-foot-foot">
          <div class="station-foot-foot-one">工作地点:</div>
          <div class="station-foot-foot-two">
            <span
              style="font-size:18px"
            >{{positionIdList.company.address.province+' ' +' '+positionIdList.company.address.city}} {{positionIdList.workAddress.detail}}</span>
            <!-- <span>查看地图</span> -->
          </div>
          <el-amap
            vid="amap"
            :plugin="plugin"
            :events="events"
            class="amap"
            style="width:859px;height:188px;margin:20px 0 70px 96px"
            :center="center"
            :zoom="zoom"
          >
            <el-amap-marker :position="center" vid="amapMarker"></el-amap-marker>
          </el-amap>
        </div>
      </div>
      <div class="station-foot-aside">
        <div class="station-foot-aside-nav">
          <div class="station-foot-aside-nav-img">
            <img
              @click="next(companyIdList.id)"
              style="width 112px;height:112px;cursor:pointer;border-radius:5px"
              :src="url"
            />
          </div>
          <div class="station-foot-aside-nav-article">
            <div class="company-name">
              <span @click="next(companyIdList.id)">{{companyIdList.fullName}}</span>
            </div>
            <div class="company-type">
              <span>
                <i class="el-icon-menu"></i>
                {{companyIdList.industrySecondary}}
              </span>
            </div>
            <div class="company-status">
              <span>
                <i class="el-icon-s-data"></i>
                {{companyIdList.nature}}
              </span>
            </div>
            <div class="company-num">
              <span>
                <i class="el-icon-coordinate"></i>
                {{companyIdList.size}}
              </span>
            </div>
          </div>
        </div>
        <div class="station-foot-aside-footer">
          <div class="footer-nav">
            <span>公司职位</span>
            <span style="cursor:pointer" @click="next(companyIdList.id,companyIdList.id)">查看更多 》</span>
          </div>
          <div style="margin:25px 0 0 0">
            <div
              v-if="More"
              class="aside-footer"
              v-for="(list,index) in hotpositionList.slice(0,6)"
              :key="index"
              @click="nextjoblist(list.id)"
            >
              <div class="company-post">
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
              <div class="company-address">
                <span>{{companyName}}</span>

                <span>{{$CodeToTag.CodeToTag([list.workAddress.province,list.workAddress.county],citysal)[0]+$CodeToTag.CodeToTag([list.workAddress.province,list.workAddress.county],citysal)[1]}}</span>
              </div>
            </div>
          </div>
          <div v-if="noMore" style="margin-top:20px">
            <h4>暂无更多职位</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>    

<script>
import Deliver from "components/Deliver.vue";
// import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import positionCatalog from "../assets/positionCatalog.json";
import industrys from "../assets/industry.json";
import citys from "../assets/city.json";
import {
  showdeliver,
  companyDetail,
  positionlist,
  // positionSearch,
  brief,
  positionDetail,
  showdeli,
  showcoll,
  iscollect
} from "apis/account";
import Cookies from "js-cookie";
// import { error } from 'util';
export default {
  name: "station",
  components: {
    Deliver
    // BaiduMap
  },
  data() {
    return {
      companyId: "",
      positiId: "",
      companyName: "",
      noMore: false,
      More: true,
      hotpositionList: [],
      positionIdList: [],
      companyIdList: [],
      industryList: [],
      radio: 3,
      dialogVisibleTwo: false,
      almsg: true,
      msg: false,
      num: 1,
      deliverOne: false,
      stationNav: true,
      stationFoot: true,
      dialogVisibleOne: false,
      dialogVisible: false,
      // map:false,
      // mapList:false,
      showDeliver: false,
      isshowCollect: true,
      showCollect: false,
      isshow: true,
      url: "",
      cId: "",
      citysal: [],
      resumesId: "",

      nearbyInfo: [], // 周边信息---高德反馈（周边建筑信息）
      addressInfo: "", // 城市信息---高德反馈（省市区、adcode）
      center: [121.59996, 31.197646], // 高德地图中心点
      zoom: 15, // 地图缩放
      events: {
        click: e => {
          // 点击地图的时候，获取点击的经纬度，并将地图中心点移自此处
          let m = e.lnglat;
          self.addrInput = "";
          self.center = [m.lng, m.lat];
          self.GDmapGetInfoOfNearby(m.lng, m.lat, self); // 获取周边信息
        }
      },
      plugin: [
        {
          pName: "Geolocation",
          noIpLocate: 1, // ios11： 禁止ip定位：ios11之后默认是ip定位，参数为1则是禁止ip定位
          events: {
            init: o => {
              self.GDinit(o, self); // 获取当前位置
            }
          }
        }
      ]
    };
  },
  methods: {
    //返回（$emit）
    backEmit(c) {
      this.dialogVisibleOne = c[0];
      this.stationNav = c[1];
      this.stationFoot = c[1];
      this.deliverOne = c[0];
    },
    next(id, sid) {
      this.$router.push({
        path: "/position",
        query: {
          id: id,
          sid: sid
        }
      });
    },
    //确认投递
    showdeliver() {
      let token = Cookies.get("token");
      if (token) {
        showdeliver(this.positiId, this.resumesId)
          .then(res => {
            if (res.data.code == 200) {
              this.almsg = false;
              this.msg = true;
              this.dialogVisibleTwo = false;
              this.dialogVisibleOne = true;
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
              this.dialogVisibleTwo = false;
              this.dialogVisibleOne = false;
              this.$notify.error({
                title: "错误",
                message: error.response.data.message
              });
            }
          });
      } else {
        this.$notify.error({
          title: "错误",
          message: "请先登录后再进行投递"
        });
        // this.$router.push({ path: "/login" });
      }
    },
    nextjoblist(id) {
      this.positiId = id;
      this.positionId();
      this.showdeli();
      this.showcoll();
    },
    //获取所有企业行业
    allposition() {
      industry()
        .then(res => {
          if (res.data.code == 200) {
            this.industryList = res.data.data;
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
    // more() {
    //   this.$router.push({
    //         path: "/position",
    //         query: {
    //           id: id
    //         }
    //       });
    // },
    // 地图加载完毕事件
    handler() {
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    //获取公司详情
    comId() {
      companyDetail(this.companyId)
        .then(res => {
          if (res.data.code == 200) {
            this.companyIdList = res.data.data;
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
    //岗位列表
    positionCompany() {
      positionlist(this.companyId)
        .then(res => {
          if (res.data.code == 200) {
            this.hotpositionList = res.data.data.list;
            if (this.hotpositionList.length > 2) {
              this.noMore = false;
              this.More = true;
            } else {
              this.noMore = true;
              this.More = false;
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
    },
    //获取岗位详情
    positionId() {
      positionDetail(this.positiId)
        .then(res => {
          this.companyId = res.data.data.company.id;
          this.companyName = res.data.data.company.companyName;
          if (res.data.code == 200) {
            this.positionIdList = res.data.data;
            if (res.data.data.company.logoUrl) {
              this.url = res.data.data.company.logoUrl;
            } else {
              this.url =
                "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";
            }

            if (this.positionIdList.isGraduate == true) {
              this.positionIdList.isGraduate = "应届生";
            } else {
              this.positionIdList.isGraduate = "非应届生";
            }

            if (this.positionIdList.jobType == 0) {
              this.positionIdList.jobType = "全职";
            } else if (this.positionIdList.jobType == 1) {
              this.positionIdList.jobType = "兼职";
            } else {
              this.positionIdList.jobType = "实习";
            }
            if (res.data.data.isValid == false) {
              this.showDeliver = true;
              this.isshowCollect = false;
              this.showCollect = false;
              this.msg = false;
              this.almsg = false;
            } else {
              this.showDeliver = false;
              this.al = true;
              this.all = true;
            }
            this.positionCompany(), this.comId();
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
    //判断简历是否投递
    showdeli() {
      showdeli(this.positiId)
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data === true) {
              this.almsg = false;
              this.msg = true;
            } else {
              this.almsg = true;
              this.msg = false;
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
    },
    //判断简历是否收藏
    showcoll() {
      showcoll(this.positiId)
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data === false) {
              this.showCollect = false;
              this.isshowCollect = true;
            } else {
              this.showCollect = true;
              this.isshowCollect = false;
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
    },
    //向岗位投递简历
    isclick() {
      this.dialogVisibleTwo = true;

      // if(this.num == 1) {
      //     this.dialogVisible = true
      // }else{
      //     this.dialogVisibleOne = true
      // }
      // this.showDeliver = false,
      // this.showCollect = false,
      // this.map = true,
      // this.mapList = true
    },
    //城市
    citise() {
      city()
        .then(res => {
          if (res.data.code == 200) {
            this.citysal = res.data.data;
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
    iscollect() {
      iscollect(this.positiId)
        .then(res => {
          if (res.data.code == 200) {
            this.isshowCollect = false;
            this.showCollect = true;
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
    //获取简历简讯
    brief() {
      brief()
        .then(res => {
          if (res.data.code == 200) {
            this.resumesId = res.data.data.defaultResumeId;
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$message({
              message: "页面丢失，请重新加载",
              type: "error"
            });
          } else if (error.response.status === 403) {
            this.$message({
              message: "登陆超时，请重新登录",
              type: "error"
            });
          } else {
            this.$message({
              message: error.response.data.message,
              type: "warning"
            });
          }
        });
    },
    isdeliver() {
      this.dialogVisibleOne = false;
      // this.stationNav = false;
      // this.stationFoot = false;
      // this.deliverOne = true;
    }
  },
  created() {
    let token = Cookies.get("token");
    this.citysal = citys.data;
    this.positiId = this.$route.query.id;
    if (token) {
      this.brief();
      this.showdeli();
      this.showcoll();
    }
    this.positionId();
  },
  filters: {
    level(level) {
      const map = ["国有企业", "外资企业", "合资企业", "民营企业", "事业单位"];
      return map[level];
    },
    levels(levels) {
      const map = ["初中及以下", "职中", "大专", "本科", "硕士", "博士"];
      return map[levels];
    },
    size(size) {
      const map = ["小于10人", "10-100人", "100-500人", "500人以上"];
      return map[size];
    }
  }
};
</script>

<style lang="stylus">
.station {
  margin: 80px auto 0;
  display: flex;
  flex-direction: column;
  width: 1440px;
  cursor: default;
  background: #FAFAFA;

  .station-nav {
    margin: 3% 0 0 0;
    display: flex;
    flex-direction: column;

    .station-nav-name {
      display: flex;
      flex-direction: row;
    }

    .station-nav-name span {
      padding: 0 0 0 2%;
    }

    .station-nav-name span:nth-child(1) {
      font-size: 28px;
      color: #373737;
      font-weight: bold;
      margin: 60px 0 0 146px;
    }

    .station-nav-name span:nth-child(2) {
      font-size: 24px;
      color: #327cf3;
      font-weight: bold;
      line-height: 45px;
      margin: 60px 0 0 60px;
    }

    .station-nav-content {
      display: flex;
      flex-direction: row;
      font-size: 15px;
      line-height: 60px;

      .content-nav {
        color: #777777;
        font-size: 18px;
        margin: 0 0 0 176px;
        text-align: left;
      }

      .content-article {
        color: #A2A2A2;
        font-size: 18px;
        margin: 0 0 0 -100px;
        width: 260px;
      }

      .content-collect {
        .el-button.is-plain:hover {
          color: #327cf3;
          border-color: #327cf3;
        }
      }
    }

    .cancel:hover {
      background: #1d366e;
      color: white;
      border-color: #1d366e;
    }
  }

  .station-foot {
    display: flex;
    flex-direction: row;
    margin: 50px 0 0 0;
    background-color: white;

    .station-foot-content {
      display: flex;
      flex-direction: column;
      width: 1010px;
      text-align: left;
      background-color: white;
    }

    .station-foot-content p:nth-child(1) {
      font-size: 18px;
      color: #327cf3;
      margin: 40px 0 0 96px;
    }

    .station-foot-content p:nth-child(2) {
      font-size: 16px;
      color: #535353;
      margin: 10px 0 0 96px;
      width: 854px;
      white-space: pre-line;
    }

    .station-foot-content p:nth-child(3) {
      font-size: 18px;
      color: #327cf3;
      margin: 40px 0 0 96px;
    }

    .station-foot-content p:nth-child(4) {
      font-size: 16px;
      color: #535353;
      margin: 10px 0 0 96px;
      width: 854px;
      white-space: pre-line;
    }

    .station-foot-aside {
      width: 334px;
      background-color: white;
      margin: 40px 0 0 0;
    }

    .station-foot-aside-nav {
      display: flex;
      flex-direction: row;

      .station-foot-aside-nav-img {
        margin: 20px 0 0 30px;
      }

      .station-foot-aside-nav-article {
        margin: 6% 0 0 6%;
        text-align: left;
        cursor: pointer;

        .company-name, .company-name span {
          font-size: 18px;
          font-weight: bold;
          color: #373737;
        }

        .company-type {
          padding: 10px 0 0 0;
          font-size: 12px;
          color: #808080;
        }

        .company-status {
          padding: 10px 0 0 0;
          font-size: 12px;
          color: #808080;
        }

        .company-num {
          padding: 10px 0 0 0;
          font-size: 13px;
          color: #636f8d;
        }
      }
    }

    .station-foot-aside-footer {
      display: flex;
      flex-direction: column;
      margin: 0 0 0 0;

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
        margin: 0 0 0 30px;
      }

      .footer-nav span:nth-child(2) {
        font-family: PingFangSC-Semibold;
        color: #373737;
        font-size: 14px;
        margin: 0 30px 0 0;
      }

      .aside-footer {
        margin: 2px 0 0 0;
        cursor: pointer;
        border: 1px solid #f0f0f0;

        .company-post {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 14px;
          color: #455379;
          padding: 2% 0 0 0;
        }

        .company-post span:nth-child(1) {
          margin: 0 0 0 30px;
          font-size: 14px;
          color: #373737;
        }

        .company-post span:nth-child(2) {
          margin: 0 30px 0 0;
          font-size: 14px;
          color: #373737;
        }

        .company-address {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 10px;
          color: #cbcbcb;
          padding: 4% 0 0 0;
        }

        .company-address span:nth-child(1) {
          margin: -3px 0 7px 30px;
          font-size: 12px;
          color: #373737;
        }

        .company-address span:nth-child(2) {
          margin: -3px 30px 7px 0;
          font-size: 12px;
          color: #cbcbcb;
        }

        .line {
          width: 90%;
          border: 0.5px solid #e5e5e5;
          margin: 2% 0 0 5%;
        }
      }
    }

    .station-foot-content span {
      margin: 0 0 0 2%;
      color: #6a7184;
      font-size: 14px;
      padding: 1% 0 0 0;
    }

    .station-foot-foot {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 5% 0 0 0;

      .station-foot-foot-one {
        margin: 40px 0 0 96px;
        font-size: 18px;
        color: #327cf3;
      }

      .station-foot-foot-two {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #5D5D5D;
        margin: 20px 0 0 96px;
      }

      .bm-view {
        margin: 10px 0 20px 42px;
        width: 620px;
        height: 70px;
      }

      .anchorBL {
        display: none;
      }

      .station-foot-foot-two span:nth-child(1) {
        font-size: 13px;
        font-weight: bold;
      }

      .station-foot-foot-two span:nth-child(2) {
        margin: 0 38px 0 0;
        font-size: 13.5px;
        font-weight: bold;
        color: #6ec5d2;
        cursor: pointer;
      }

      .station-foot-foot-three {
        margin: 0 0 0 2%;
      }
    }
  }
}
</style>
