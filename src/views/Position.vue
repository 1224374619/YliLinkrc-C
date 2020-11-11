<template>
  <div class="position">
    <div class="positon-nav">
      <div class="block">
        <img style="height:118px;border-radius:5px" :src="this.companyIdList.logoUrl" />
      </div>
      <div class="aside">
        <div class="aside-nav" @click="isclick()">{{companyIdList.fullName}}</div>
        <div class="aside-footer">
          <span>
            <i style="font-size:18px" class="el-icon-menu"></i>
          </span>
          <span>{{companyIdList.industrySecondary}}</span>
          <span style="margin:0 0 0 32px">
            <i class="el-icon-s-data"></i>
          </span>
          <span>{{this.companyIdList.nature}}</span>
          <span>
            <i style="margin:0 0 0 32px" class="el-icon-s-custom"></i>
          </span>
          <span>{{this.companyIdList.size}}</span>
        </div>
      </div>
    </div>
    <div class="positon-content">
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="企业信息" name="first">
            <div class="information" v-if="information">
              <p class="company">公司介绍:</p>
              <p class="company-content">{{this.companyIdList.description}}</p>
              <div class="positon-footer">
                <div class="address">
                  <p class="company-address">公司地址</p>
                </div>
                <div class="map-ad">
                  <div class="map-address">
                    <span class="map-address-span">{{companyIdList.address.detail}}</span>
                  </div>
                  <baidu-map
                    :center="center"
                    :zoom="zoom"
                    style="width:859px;height:188px;margin:0 0 45px 0"
                    @click="getLocationPoint"
                    :scroll-wheel-zoom="true"
                  ></baidu-map>
                </div>
              </div>
              <div class="station-appraise" v-if="this.apprasiseEvaluation">
                <div class="station-appraise-nav">
                  <div style="margin:30px 0 0 30px">{{evaluationLists.companyName}}面试评价</div>
                  <div style="margin:30px 0 0 40px">综合面试评分：</div>
                  <div style="margin:35px 0 0 0;width:140px">
                    <el-rate v-model="value2" :colors="colors"></el-rate>
                  </div>
                  <div style="margin:31px 0 0 10px;">{{evaluationLists.overallExperienceNum}}.0</div>
                  <div style="margin:31px 0 0 0;">（来自{{evaluationLists.evaluations.total}}条评价）</div>
                </div>
                <div class="personal-footers" v-if="radiobutton">
                  <el-radio-group size="medium" v-model="usercode" @change="radioChange">
                    <el-radio-button label="null">全部</el-radio-button>
                    <el-radio-button label="90000">传媒/艺术/设计</el-radio-button>
                    <el-radio-button label="80000">生产/制造</el-radio-button>
                    <el-radio-button label="120000">能源/农业/科研</el-radio-button>
                    <el-radio-button label="40000">IT/互联网/通信</el-radio-button>
                    <el-radio-button label="30000">项目/质量/管理</el-radio-button>
                    <el-radio-button label="0">其他</el-radio-button>
                  </el-radio-group>
                </div>
                <div class="station-appraise-line"></div>
                <div
                  v-for="(item,index) in evaluationLists.evaluations.list"
                  :key="index"
                  style="height:330px"
                >
                  <div class="station-appraise-aside">
                    <div>
                      <img
                        style="width:50px;height:50px;margin:0 0 0 30px"
                        :src="item.avatar"
                      />
                    </div>
                    <div class="appraise-nav">
                      <div>{{item.appraiser}}</div>
                    </div>
                    <div class="appraise-aside" style="margin:15px 0 0 54px">
                      面试体验：
                      <el-rate
                        style="width:140px;"
                        v-model="item.interviewExperience"
                        :colors="colors"
                      ></el-rate>
                    </div>
                    <div
                      class="appraise-aside"
                      style="margin:15px 0 0 20px;"
                    >面试职位：{{item.positionName}}</div>
                    <div style="margin:15px 0 0 55px">{{item.createdTime|formatDateOne}}</div>
                  </div>
                  <div class="station-appraise-select">
                    <el-radio-group v-model="radio1" size="medium">
                      <el-radio-button label="福利待遇特别棒"></el-radio-button>
                    </el-radio-group>
                  </div>
                  <div class="station-appraise-content">
                    <div style="text-align:left">
                      <span style="margin:0 0 0 -7px">【面试过程】</span>
                      <span>{{item.content}}</span>
                    </div>
                    <div v-if="item.sublist !== null" style="margin:0 0 0 -720px">企业回复</div>
                    <div v-if="item.sublist !== null" class="third">
                      <div>
                        <img
                          style="width:50px;height:50px;margin:15px 0 0 15px"
                          :src="item.avatar"
                        />
                      </div>
                      <div>
                        <div
                          style="margin:5px 0 0 5px;color: #A2A2A2;text-align:left"
                        >{{evaluationLists.companyName}}HR.人事</div>
                        <div style="margin:0 0 0 5px;text-align:left">{{item.sublist[0].content}}</div>
                      </div>
                      <div>
                        <div>{{item.createdTime|formatDateOne}}</div>
                      </div>
                    </div>
                    <div class="station-appraise-footer">
                      <div
                        style="display: flex;flex-direction: row;margin:20px 0 0 0"
                        @click="like(item)"
                      >
                        <img
                          v-if="item.isLike"
                          style="width:25px;height:25px"
                          src="../assets/images/zan.png"
                        />
                        <img v-else style="width:25px;height:25px" src="../assets/images/hzan.png" />
                        <span style="line-height:25px">{{item.likeNum}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="this.jumper">
                  <button @click="more()" class="station-appraise-button">查看更多</button>
                </div>
                <div v-if="this.pager">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.current"
                    :page-sizes="page.pageSizeOpts"
                    style="margin:30px 0 30px 0"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total"
                  ></el-pagination>
                </div>
              </div>
            </div>
            <!-- <div class="station-appraise" >
              <div style="height:800px">
                <div class="station-appraise-nav">
                  <div style="margin:30px 0 0 30px">银领面试评价</div>
                  <div style="margin:30px 0 0 40px">综合面试评分：</div>
                  <div style="margin:35px 0 0 0;width:140px">
                    <el-rate v-model="value2" :colors="colors"></el-rate>
                  </div>
                  <div style="margin:31px 0 0 10px;">4.0</div>
                  <div style="margin:31px 0 0 0;">（来自15条评价）</div>
                </div>
                <div class="station-appraise-radio">
                  <el-radio-group v-model="radio1" size="medium">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="产品经理"></el-radio-button>
                    <el-radio-button label="UI设计师"></el-radio-button>
                    <el-radio-button label="前端开发"></el-radio-button>
                    <el-radio-button label="后端开发"></el-radio-button>
                  </el-radio-group>
                </div>
                <div class="station-appraise-line"></div>
                <div class="station-appraise-aside">
                  <div>
                    <img
                      style="width:50px;height:50px;margin:0 0 0 30px"
                      src="../assets/images/89.png"
                    />
                  </div>
                  <div class="appraise-nav">
                    <div>匿名用户</div>
                  </div>
                  <div class="appraise-aside" style="margin:15px 0 0 94px">
                    面试体验：
                    <el-rate style="width:140px;" v-model="value2" :colors="colors"></el-rate>
                  </div>
                  <div class="appraise-aside" style="margin:15px 0 0 50px">面试职位：产品经理</div>
                  <div style="margin:15px 0 0 75px">2020-02-14</div>
                </div>
                <div class="station-appraise-select">
                  <el-radio-group v-model="radio1" size="medium">
                    <el-radio-button label="福利待遇特别棒"></el-radio-button>
                  </el-radio-group>
                </div>
                <div class="station-appraise-content">
                  <div style="text-align:left">
                    <span style="margin:0 0 0 -7px">【面试过程】</span>
                    <span>able to work under high pressure and time limitation . able work under high pressure and time limitation. able towork under high pressure and time limitation.able to work under high pressure and time limitation.able to work under high pressure and time limitation.able to work under high pressure and time limitation. to work under pressure and time limitation.able to work under high pressure and time limitation.</span>
                  </div>
                  <div style="margin:0 0 0 -720px">企业回复</div>
                  <div class="third">
                    <div>
                      <img
                        style="width:50px;height:50px;margin:15px 0 0 15px"
                        src="../assets/images/89.png"
                      />
                    </div>
                    <div>
                      <div style="margin:5px 0 0 -200px;color: #A2A2A2">银领.HR.人事</div>
                      <div style="margin:0 0 0 5px">每天在宽敞舒适的环境办公心情会更好哦～</div>
                    </div>
                    <div>
                      <div>2020-02-14</div>
                    </div>
                  </div>
                  <div class="station-appraise-footer">
                    <div style="display: flex;flex-direction: row;margin:20px 35px 0 0">
                      <img style="width:25px;height:25px" src="../assets/images/zan.png" />
                      <span style="line-height:25px">1820</span>
                    </div>
                    <div style="display: flex;flex-direction: row;margin:20px 0 0 0">
                      <img style="width:25px;height:25px" src="../assets/images/book.png" />
                      <span style="line-height:25px">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>-->
          </el-tab-pane>
          <el-tab-pane label="在招职位" name="second">
            <div class="postType">
              <div style="text-align:left;margin:0 0 40px 0" class="list">
                <!-- <span
                  class="postType-span"
                  style="margin:10px 0 0 0;font-size:18px;padding:0 25px 0 0;color:#373737"
                >职位类型：</span>-->
                <!-- <span
                  class="posttype-span" style="padding:0 45px 0 0;cursor:pointer;color:#666666;font-size:16px" @click="apointPosition(item)" v-for="(item,index) in positionCatalogList" :key='index'
                >{{item.positionCatalog/10000|positionCatalog}}（{{item.num}}）</span>-->
              </div>
              <div
                v-for="(list,index) in tableData"
                :key="index"
                @click="next(list.id,list.id)"
                style="width:1248px;"
              >
                <div class="position-tab">
                  <div
                    v-if="list.positionName.length > 15"
                    style="color:#313131;font-size:20px;margin:0 0 0 15px;width:300px;text-align:left;"
                  >{{list.positionName.substr(0,4) + '...'}}</div>
                  <div
                    v-else
                    style="color:#313131;font-size:20px;margin:0 0 0 15px;width:300px;text-align:left"
                  >{{list.positionName}}</div>
                  <div
                    v-if="list.workAgeMax == null"
                    style="color:#8A8A8A;font-size:18px;margin:0 0 0 0;width:300px;text-align:left;"
                  >{{list.workAddress.city}} | 10年以上 | {{list.degreeMin}}</div>
                  <div
                    v-else
                    style="color:#8A8A8A;font-size:18px;margin:0 0 0 0;width:300px;text-align:left;"
                  >{{list.workAddress.city}} | {{list.workAgeMin}}-{{list.workAgeMax}}年 | {{list.degreeMin}}</div>
                  <div
                    style="margin:0 0 0 180px;width:100px;text-align:left;color:#327cf3;font-size:20px"
                    v-if="list.salaryMin === 35"
                  >{{list.salaryMin}}k以上</div>
                  <div
                    style="margin:0 0 0 180px;width:100px;text-align:left;color:#327cf3;font-size:20px"
                    v-else
                  >{{list.salaryMin}}-{{list.salaryMax}}k</div>
                  <div
                    style="margin:0 0 0 180px;color:#8A8A8A;font-size:16px"
                  >{{list.publishedTime | formatDate}}</div>
                </div>
              </div>
              <div class="footer-pagination" style="margin:15px 0 15px 0">
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
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import positionCatalog from "../assets/positionCatalog.json";
import industrys from "../assets/industry.json";
import citys from "../assets/city.json";
const timeUtil = require("../timeUtil.js");
import Cookies from "js-cookie";
import { companyDetail, positionlist, positionCatalogs } from "apis/account";
// import { error } from 'util';
export default {
  name: "position",
  components: {
    // BaiduMap
  },
  data() {
    let self = this;
    return {
      radiobutton: false,
      usercode: "",
      jumper: false,
      pager: false,
      evaluationLists: {
        evaluations: {
          list: []
        }
      },
      value2: 5,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      apprasiseEvaluation: true,
      radio1: "",
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      companId: "",
      companIds: "",
      citysal: [],
      industryList: [],
      time: "",
      companyIdList: "",
      table: false,
      information: true,
      activeName: "first",
      posiCatalogList: [],
      url: "",
      tableData: [],
      positionCatalog: "",
      positionCatalogList: [],
      id: "",

      center: { lng: "", lat: "" },
      zoom: 13

      // nearbyInfo: [], // 周边信息---高德反馈（周边建筑信息）
      // addressInfo: "", // 城市信息---高德反馈（省市区、adcode）
      // center: [121.59996, 31.197646], // 高德地图中心点
      // zoom: 15, // 地图缩放
      // events: {
      //   click: e => {
      //     // 点击地图的时候，获取点击的经纬度，并将地图中心点移自此处
      //     let m = e.lnglat;
      //     self.addrInput = "";
      //     self.center = [m.lng, m.lat];
      //     self.GDmapGetInfoOfNearby(m.lng, m.lat, self); // 获取周边信息
      //   }
      // },
      // plugin: [
      //   {
      //     pName: "Geolocation",
      //     events: {
      //       init(o) {
      //         // o 是高德地图定位插件实例
      //         o.getCurrentPosition((status, result) => {
      //           console.log(result.addressComponent.province);
      //           console.log(result.position.lng, result.position.lat); //  能获取定位的所有信息
      //           if (result && result.position) {
      //             // 经纬度
      //             self.lng = result.position.lng;
      //             self.lat = result.position.lat;
      //             // 地址信息
      //             self.str = result.formattedAddress;
      //             self.center = [self.lng, self.lat];
      //             self.loaded = true;
      //             self.$nextTick();
      //             sessionStorage.setItem(
      //               "id",
      //               JSON.stringify(
      //                 // result.position.lng + "," + result.position.lat
      //                 result.formattedAddress // 把地址信息储存的本地缓存上
      //               )
      //             );
      //           }
      //         });
      //       }
      //     }
      //   }
      // ]
    };
  },
  methods: {
    //筛选
    radioChange() {
      let params = {
        pageNum: 1,
        pageSize: 10,
        code: parseInt(this.usercode),
        positionIds: [],
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post(`/consumer-core/evaluation/company/${this.companId}`, params)
        .then(res => {
          this.evaluationLists = res.data.data;
          this.page.total = res.data.data.evaluations.total;
          // this.jumper = false;
          // this.pager = true;
          // this.radiobutton = true
        })
        .catch(error => {});
    },
    //评论分页
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionIds: [],
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post(`/consumer-core/evaluation/company/${this.companId}`, params)
        .then(res => {
          this.evaluationLists = res.data.data;
          this.page.total = res.data.data.evaluations.total;
          this.jumper = false;
          this.pager = true;
        })
        .catch(error => {});
    },
    handleCurrentChange(val) {
      this.page.current = val;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionIds: [],
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post(`/consumer-core/evaluation/company/${this.companId}`, params)
        .then(res => {
          this.evaluationLists = res.data.data;
          this.page.total = res.data.data.evaluations.total;
          this.jumper = false;
          this.pager = true;
        })
        .catch(error => {});
    },
    //查看更多
    more() {
      let params = {
        pageNum: 1,
        pageSize: 10,
        code: null,
        positionIds: [],
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post(`/consumer-core/evaluation/company/${this.companId}`, params)
        .then(res => {
          this.evaluationLists = res.data.data;
          this.page.total = res.data.data.evaluations.total;
          this.jumper = false;
          this.pager = true;
          this.radiobutton = true;
        })
        .catch(error => {});
    },
    // //获取公司所有职位列表用于筛选
    // filtrate() {
    //   this.$http
    //     .get(`/consumer-core/position/filtrate/list/${this.companId}`)
    //     .then(res => {})
    //     .catch(error => {});
    // },
    //点赞
    like(list) {
      this.$http
        .post(`/consumer-core/evaluation/like/${list.id}`)
        .then(res => {
          this.evaluationList();
        })
        .catch(error => {});
    },
    //根据公司id获取公司评价列表‘
    evaluationList() {
      let params = {
        code: null,
        pageNum: 1,
        pageSize: 5,
        positionIds: [],
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post(`/consumer-core/evaluation/company/${this.companId}`, params)
        .then(res => {
          if (res.data.data.evaluations.total === 0) {
            this.apprasiseEvaluation = false;
          } else {
            this.evaluationLists = res.data.data;
            console.log(this.evaluationLists.evaluations.total)
            if (this.evaluationLists.evaluations.total > 5) {
              this.jumper = true;
            } else {
              this.jumper = false;
            }
            // this.value2 = res.data.data.overallExperienceNum
          }
        })
        .catch(error => {});
    },
    getLocationPoint(e) {
      // this.lng = e.point.lng;
      // this.lat = e.point.lat;
      /* 创建地址解析器的实例 */
      let geoCoder = new BMap.Geocoder();
      /* 获取位置对应的坐标 */
      geoCoder.getPoint(this.companyIdList.address.detail, point => {
        console.log(point);
        this.center.lng = point.lng;
        this.center.lat = point.lat;
      });
      // /* 利用坐标获取地址的详细信息 */
      // geoCoder.getLocation(e.point, res=>{
      //     console.log(res);
      // })
    },
    isclick() {
      this.table = true;
      this.information = false;
    },
    //获取公司详情
    companyId() {
      companyDetail(this.companId)
        .then(res => {
          if (res.data.code == 200) {
            this.companyIdList = res.data.data;
            this.getLocationPoint();
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
    //获取岗位列表
    handleClick(e) {
      if (e.index == 1) {
        let params = {
          pageNum: this.page.current,
          pageSize: this.page.pageSize
        };
        positionlist(this.companId, params)
          .then(res => {
            if (res.data.code == 200) {
              this.tableData = res.data.data.list;
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
      }
    },
    //获取指定岗位列表
    apointPosition(item) {
      let apointPosition = item.positionCatalog;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionCatalog: apointPosition
      };
      positionlist(this.companId, params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
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
    //岗位分类
    positionCataloga() {
      positionCatalogs(this.companId)
        .then(res => {
          if (res.data.code == 200) {
            this.positionCatalogList = res.data.data.list;
            // this.positionCatalog = res.data.data.list[0].positionCatalog;
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
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize
      };
      positionlist(this.companId, params).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.list;
          this.page.total = res.data.data.total;
          var time = this.tableData[0].publishedTime;
          this.changeTime(time);
        }
      });
    },
    handleCurrentChange(val) {
      this.page.current = val;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize
      };
      positionlist(this.companId, params).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.list;
          this.page.total = res.data.data.total;
          var time = this.tableData[0].publishedTime;
          this.changeTime(time);
        }
      });
    },
    next(id, sid) {
      this.$router.push({
        path: "/position",
        query: {
          id: this.companId,
          sid: sid
        }
      });
      this.$router.push({
        path: "/station",
        query: {
          id: id,
          sid: sid
        }
      });
    },
    changeTime(time) {
      var commonTime = "";
      if (time) {
        var unixTimestamp = new Date(time * 1);
        commonTime = unixTimestamp.toLocaleString();
        this.time = commonTime;
      }
      return commonTime;
    },
    //城市
    citise() {
      city().then(res => {
        if (res.data.code == 200) {
          this.citysal = res.data.data;
        }
      });
    },
    //获取所有职位类型
    allpositionCatalog() {
      allpositionCatalog()
        .then(res => {
          if (res.data.code == 200) {
            this.posiCatalogList = res.data.data;
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
    this.positionCatalogList = positionCatalog.data;
    this.industryList = industrys.data;
    this.citysal = citys.data;
    // this.allpositionCatalog()
    this.companId = this.$route.query.id;
    this.companIds = this.$route.query.sid;
    // this.citise()
    // this.filtrate();
    
    this.companyId();
    // this.allposition()
    this.evaluationList();
    this.positionCataloga();

    if (this.companIds === undefined) {
      this.activeName = "first";
    } else {
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize
      };
      positionlist(this.companId, params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
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
      this.activeName = "second";
    }
  },
  filters: {
    position(position) {
      const map = ["初中及以下", "职中", "大专", "本科", "硕士", "博士"];
      return map[position];
    },
    level(level) {
      const map = ["国有企业", "外资企业", "合资企业", "民营企业", "事业单位"];
      return map[level];
    },
    size(size) {
      const map = ["小于10人", "10-100人", "100-500人", "500人以上"];
      return map[size];
    }
  }
};
</script>
<style lang="stylus">.position {
  display: flex;
  flex-direction: column;
  margin: 100px auto 0;
  width: 1440px;
  cursor: default;
  background-color: white;

  .positon-nav {
    display: flex;
    flex-direction: row;

    .block {
      margin: 60px 0 30px 96px;
    }

    .aside {
      .aside-nav {
        text-align: left;
        font-size: 28px;
        color: #373737;
        font-weight: bold;
        padding: 0 0 0 10px;
        margin: 75px 0 0 0;
      }

      .aside-footer {
        margin: 23px 0 0 0;
        color: #808080;
        font-size: 18px;
      }

      .aside-footer span {
        padding: 0 0 0 10px;
      }
    }
  }

  .positon-content {
    .tab {
      margin: 0 0 0 96px;

      .el-tabs__item.is-active {
        color: #327cf3;
      }

      .el-tabs__item {
        font-size: 22px;
        font-weight: 800;
        color: #373737;
      }

      .el-tabs__nav-wrap::after {
        background-color: red;
        height: 2px;
        z-index: 1;
      }

      .el-tabs__active-bar {
        background-color: #327cf3;
      }

      .el-tabs__content, .el-tab-pane {
        margin: 20px 0 0 0;
      }

      .position-tab {
        display: flex;
        flex-direction: row;
        margin: 15px 0 0 0;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        cursor: pointer;
        line-height: 68px;
        height: 68px;
      }

      .position-tab:hover {
        background: #FAFAFA;
      }

      .line-tab {
        width: 1260px;
        border: 0.5px solid #e5e5e5;
        margin: 15px 0 0 0;
      }

      .postType span {
        font-size: 13px;
        color: #455379;
      }

      .postType span:hover {
        color: #617dcb;
      }

      .el-tabs__nav-wrap:after {
        background-color: white;
        z-index: 1;
      }

      .company {
        text-align: left;
        font-size: 18px;
        color: #327cf3;
        margin: 5px 0 0 0;
        font-weight: bold;
      }

      .company-content {
        text-align: left;
        font-size: 16px;
        color: #535353;
        margin: 30px 0 0 0;
        width: 854px;
        white-space: pre-line;
      }

      .positon-footer {
        margin: 40px 0 0 0;

        .address {
          .company-address {
            text-align: left;
            font-size: 18px;
            color: #327cf3;
            font-weight: bold;
          }
        }

        .map-ad {
          box-shadow: 0px 3px 9px 0px rgba(223, 223, 223, 0.77);
          width: 859px;

          .map-address {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 30px 0 20px 24px;

            .map-address-span {
              font-size: 18px;
              font-family: PingFangSC-Regular;
              color: #5D5D5D;
              margin: 20px 0 0 0;
            }

            .map-address-map {
              font-size: 14px;
              color: #bbdf4f;
              cursor: pointer;
              margin: 0 355px 0 0;
            }
          }
        }

        .bm-view {
          margin: 10px 0 20px 0;
          width: 620px;
          height: 70px;
        }

        .anchorBL {
          display: none;
        }
      }

      .station-appraise {
        margin: 0 55px 0 0;
        border: 1px solid rgba(236, 236, 236, 1);
        height: auto;
        border-radius: 5px;
        width: 850px;

        .station-appraise-nav {
          display: flex;
          flex-direction: row;

          div:nth-child(1) {
            font-family: PingFangSC-Medium;
            color: #373737;
            font-size: 22px;
          }

          div:nth-child(2) {
            font-family: PingFangSC-Regular;
            color: #333333;
            font-size: 18px;
            line-height: 35px;
          }

          div:nth-child(4) {
            font-family: PingFangSC-Medium;
            color: #327CF3;
            font-size: 26px;
            line-height: 35px;
          }

          div:nth-child(5) {
            font-family: PingFangSC-Regular;
            color: #666666;
            font-size: 18px;
            line-height: 35px;
          }
        }

        .personal-footers {
          display: flex;
          flex-direction: column;

          .el-radio-button--medium .el-radio-button__inner {
            padding: 10px 10px;
            font-size: 10px;
            border-radius: 20px;
            margin: 20px 0 0 16px;
            width: 102px;
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
            font-size: 10px;
            border-radius: 20px;
          }

          .el-radio-button__orig-radio:checked+.el-radio-button__inner {
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
            box-shadow: -1px 0 0 0 #8cc5ff;
          }
        }

        .station-appraise-radio {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          margin: 0 0 0 15px;

          .el-radio-button--medium .el-radio-button__inner {
            padding: 10px 20px 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            margin: 20px 0 0 16px;
            height: 26px;
          }

          .el-radio-button__inner {
            line-height: 5px;
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
            font-size: 14px;
            border-radius: 20px;
            heigth: 26px;
          }

          .el-radio-button__orig-radio:checked+.el-radio-button__inner {
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
            box-shadow: -1px 0 0 0 #409eff;
          }
        }

        .station-appraise-line {
          border: 0.5px solid #f8f8f8;
          margin: 30px 30px 0 30px;
        }

        .station-appraise-aside {
          display: flex;
          flex-direction: row;
          margin: 20px 0 0 0;

          .appraise-nav {
            display: flex;
            flex-direction: column;
            margin: 15px 0 0 0;
          }

          .appraise-nav div:nth-child(1) {
            font-family: PingFangSC-Medium;
            color: #373737;
            font-size: 16px;
            margin: 0 0 0 5px;
          }

          .appraise-nav div:nth-child(2) {
            font-family: PingFangSC-Medium;
            color: #666666;
            font-size: 16px;
            margin: 0 0 0 5px;
          }

          .appraise-aside {
            display: flex;
            flex-direction: row;
            font-family: PingFangSC-Regular;
            color: #373737;
            font-size: 16px;
            margin: 0 0 0 0;
          }
        }

        .station-appraise-select {
          display: flex;
          flex-direction: row;
          margin: 0 30px 0 30px;

          .el-radio-button--medium .el-radio-button__inner {
            padding: 2px 10px;
            font-size: 14px;
            border-radius: 20px;
            margin: 20px 0 0 16px;
            height: 20px;
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
            heigth: 20px;
          }

          .el-radio-button__orig-radio:checked+.el-radio-button__inner {
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
            box-shadow: -1px 0 0 0 #409eff;
          }

          div:nth-child(1) {
            font-family: PingFangSC-Regular;
            color: #424242;
            font-size: 16px;
          }

          div:nth-child(2) {
            margin: 0 0 0 40px;

            span {
              font-family: PingFangSC-Regular;
              color: #327CF3;
              font-size: 16px;
            }
          }
        }

        .station-appraise-button {
          width: 118px;
          height: 30px;
          border-radius: 5px;
          background: #FFFFFF;
          border: 1px solid rgba(201, 201, 201, 1);
          font-family: PingFangSC-Regular;
          color: #222222;
          letter-spacing: 1.8;
          font-size: 16px;
          margin: 0 0 30px 0;
        }

        .station-appraise-content {
          height: 100px;
          margin: 20px 30px 0 30px;
          font-family: PingFangSC-Regular;
          color: #686868;
          font-size: 16px;

          div:nth-child(2) {
            font-family: PingFangSC-Regular;
            color: #777777;
            font-size: 16px;
            margin: 10px 0 0 0;
          }

          .third {
            background: rgba(50, 124, 243, 0.05);
            border: 1px solid rgba(50, 124, 243, 0.2);
            border-radius: 4px;
            width: 794px;
            height: 83px;
            margin: 10px 0 0 0;
            display: flex;
            flex-direction: row;

            div:nth-child(3) {
              font-family: PingFangSC-Regular;
              color: #555555;
              margin: 15px 0 0 300px;
              font-size: 16px;
            }

            div:nth-child(2) {
              font-family: PingFangSC-Regular;
              color: #888888;
              font-size: 16px;
            }
          }

          .station-appraise-footer {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin: 0 0 30px 0;
          }

          .discuss {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            span {
              font-family: PingFangSC-Regular;
              color: #373737;
              font-size: 16px;
            }

            .nav {
              font-family: PingFangSC-Regular;
              color: #327CF3;
              font-size: 16px;
              margin: 16px 0 0 16px;
            }
          }

          .discusses {
            .line {
              margin: 20px 15px 0 15px;
              width: 96%;
              border: 1px solid rgba(236, 236, 236, 1);
            }
          }
        }
      }
    }
  }
}
</style>
