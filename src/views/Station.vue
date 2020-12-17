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
        <div class="content-nav" style="width:500px;" v-if="positionIdList.workAgeMax == null">
          <span>{{this.positionIdListaddress.city}} | 10年以上 | {{positionIdList.degreeMin}} | {{positionIdList.jobType}}</span>
        </div>
        <div class="content-nav" style="width:500px;" v-else-if="positionIdList.workAgeMin == 0">
          <span>{{this.positionIdListaddress.city}} | 无工作经验 | {{positionIdList.degreeMin}} | {{positionIdList.jobType}}</span>
        </div>
        <div class="content-nav" style="width:500px;" v-else>
          <span>{{this.positionIdListaddress.city}} | {{positionIdList.workAgeMin}}-{{positionIdList.workAgeMax}}年 | {{positionIdList.degreeMin}} | {{positionIdList.jobType}}</span>
        </div>
        <div class="content-article">
          <span>发布时间：{{positionIdList.publishedTime | formatDate}}</span>
        </div>
        <div style="margin:0 0 0 155px" v-if="al">
          <span v-if="almsg">
            <el-button
              id="deliver"
              style="width:140px;height:40px;margin:0 70px 0 0;background:#02B9B8;color:#fff"
              @click="showdeliver"
            >投递简历</el-button>
          </span>
          <span v-if="msg">
            <el-button
              plain
              icon="el-icon-check"
              style="width:140px;height:40px;margin:0 70px 0 0;border: 1px solid rgba(216,216,216,1);color: #B7B7B7"
            >已投递</el-button>
          </span>
        </div>
        <div v-if="all" class="content-collect">
          <span v-if="isshowCollect">
            <el-button
              class="collect"
              style="width:140px;height:40px;background:#02B9B8;color:#fff"
              @click="iscollect()"
            >收藏</el-button>
          </span>
          <span v-if="showCollect">
            <el-button
              @click="iscancel"
              plain
              icon="el-icon-star-off"
              style="width:140px;height:40px;border: 1px solid rgba(216,216,216,1);color: #B7B7B7"
            >已收藏</el-button>
          </span>
        </div>
        <div style="margin:0 0 0 165px" v-if="showDeliver">
          <span style="margin:0 0 0 0">
            <el-button
              style="width:280px;height:40px;background:#9b9b9b;border:1px solid #9b9b9b"
              type="primary"
            >该职位已下线</el-button>
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
    <!-- <div style="margin:0 0 0 990px;width:300px">
      <el-radio-group
        v-model="paperclip"
        class="radio-group"
        v-for="(item,index) in resumeLists"
        :key="index"
      >
        <el-radio
          style="font-family: PingFangSC-Regular;color: #666666;font-size:18px;margin:15px 0 0 0"
          :label="item.isDefault"
        >
          <i class="el-icon-paperclip"></i>
          {{item.resumeName}}
        </el-radio>
        <br />
      </el-radio-group>
    </div>-->
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
            >{{this.positionIdListworkAddress.province+' ' +' '+this.positionIdListworkAddress.city}} {{this.positionIdListworkAddress.detail}}</span>
            <!-- <span>查看地图</span> -->
          </div>
          <!-- <el-amap
            vid="amap"
            :plugin="plugin"
            :events="events"
            class="amap"
            style="width:859px;height:188px;margin:20px 0 45px 96px"
            :center="center"
            :zoom="zoom"
          >
            <el-amap-marker :position="center" vid="amapMarker"></el-amap-marker>
          </el-amap>-->
          <baidu-map
            :center="center"
            :zoom="zoom"
            style="width:859px;height:188px;margin:20px 0 45px 96px"
            @click="getLocationPoint"
            :scroll-wheel-zoom="true"
          ></baidu-map>
        </div>

        <div class="station-appraise" v-if="this.apprasiseEvaluation">
          <div class="station-appraise-nav">
            <div style="margin:30px 0 0 30px">{{evaluationLists.companyName}}面试评价</div>
            <div style="margin:30px 0 0 40px">综合面试评分：</div>
            <div style="margin:35px 0 0 0;width:140px">
              <el-rate disabled v-model="value2" :colors="colors"></el-rate>
            </div>
            <div style="margin:31px 0 0 10px;">{{evaluationLists.overallExperienceNum}}.0</div>
            <div style="margin:31px 0 0 0;">（来自{{evaluationLists.evaluations.total}}条评价）</div>
          </div>
          <div class="station-appraise-line"></div>

          <div v-for="(item,index) in evaluationLists.evaluations.list" :key="index" >
            <div class="station-appraise-aside">
              <div>
                <img style="width:50px;height:50px;margin:0 0 0 30px" :src="item.avatar" />
              </div>
              <div class="appraise-nav">
                <div>{{item.appraiser}}</div>
              </div>
              <div class="appraise-aside" style="margin:15px 0 0 54px">
                面试体验：
                <el-rate disabled style="width:140px;" v-model="item.interviewExperience" :colors="colors"></el-rate>
              </div>
              <div
                class="appraise-aside"
                style="margin:15px 0 0 20px;"
                v-if="item.positionName.length>10"
              >面试职位：{{item.positionName.substring(0,10)}}</div>
              <div
                class="appraise-aside"
                style="margin:15px 0 0 20px;"
                v-else
              >面试职位：{{item.positionName}}</div>
              <div style="margin:15px 0 0 55px">{{item.createdTime|formatDateOne}}</div>
            </div>
            <div class="station-appraise-select">
              <el-radio-group
                v-model="radio1"
                size="medium"
                v-for="(list,index) in item.evaluationInterviewLabelBodes"
                :key="index"
              >
                <el-radio-button :label="list.interviewLabel|thelevel"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="station-appraise-content">
              <div>
                <span style="margin:0 0 0 -7px">【面试过程】</span>
                <span>{{item.content}}</span>
              </div>
              <div>企业回复</div>
              <div class="third">
                <div>
                  <img style="width:50px;height:50px;margin:15px 0 0 15px" :src="item.sublist[0].avatar" />
                </div>
                <div>
                  <div
                    style="margin:5px 0 0 10px;color: #A2A2A2"
                  >{{evaluationLists.companyName}}HR.人事</div>
                  <div style="margin:0 0 0 10px" v-if="item.sublist === null"></div>
                  <div style="margin:5px 0 0 10px" v-else>{{item.sublist[0].content}}</div>
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
                <!-- <div style="display: flex;flex-direction: row;margin:20px 0 0 0">
                  <img style="width:25px;height:25px" src="../assets/images/book.png" />
                  <span style="line-height:25px">2</span>
                </div>-->
              </div>
              <!-- <div style="color:#317cf3;display:flex; justify-content:flex-end;margin:15px 0 0 0">
                <div v-if="!item.isReply" @click="morereply(item)">
                  展示更多回复
                  <i style="margin:3px 0 0 0" class="el-icon-arrow-right"></i>
                </div>
                <div v-else @click="morereply(item)">
                  收起
                  <i style="margin:3px 0 0 0" class="el-icon-arrow-down"></i>
                </div>
              </div>

              <div style="background: #FAFAFA;width: 794px;margin: 20px 0 0 0" v-if="item.isReply">
                <div v-for="(list,cindex) in childList" :key="cindex">
                  <div class="discuss">
                    <div style="width:600px;margin:16px 0 15px 0">
                      <span class="nav">{{list.appraiser}}</span>
                      {{list.content}}
                    </div>
                    <div style="width:160px;margin:16px 0 0 0">
                      <span>赞（{{list.likeNum}}）</span>
                      <span @click="list.isReply = !list.isReply">回复（{{list.likeNum}}）</span>
                    </div>
                  </div>
                  <div v-if="list.isReply">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
                    <button
                      @click="addecaluation(list)"
                      style="width:81px;height:33px;background:#02B9B8;color:#fff;font-size:20px;border:1px solid #02B9B8;border-radius:5px;margin:15px 0 15px 650px;"
                    >发表</button>
                  </div>
                 
                </div>
              </div>-->
            </div>
          </div>

          <div v-if="this.morejumpers">
            <button @click="more()" class="station-appraise-button">查看更多</button>
          </div>
          <div v-if="this.morepagers" style="margin:0 0 30px 0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.current"
              :page-sizes="page.pageSizeOpts"
              style="margin: 0 0 0 190px"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            ></el-pagination>
          </div>
        </div>
      </div>

      <div class="station-foot-aside">
        <div class="station-foot-aside-nav">
          <div class="station-foot-aside-nav-img">
            <img
              @click="next(companyIdList.id)"
              style="width 112px;height:112px;cursor:pointer;border-radius:5px;"
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

                <span>{{list.workAddress.city}}</span>
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
// import AMap from "AMap";
import Deliver from "components/Deliver.vue";
// import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import positionCatalog from "../assets/positionCatalog.json";
import industrys from "../assets/industry.json";
import citys from "../assets/city.json";
import {
  showdeliver,
  companyDetail,
  positionlist,
  isfavorite,
  // positionSearch,
  brief,
  positionDetail,
  showdeli,
  showcoll,
  iscollect
} from "apis/account";
// let amapManager = new AMapManager();
import Cookies from "js-cookie";
import Vuex from "vuex";
// import { error } from 'util';
export default {
  name: "station",
  components: {
    Deliver
    // BaiduMap
  },
  data() {
    return {
      morejumpers: false,
      morepagers: false,
      apprasiseEvaluation: true,
      radio1: "",
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      interviewExperience: 0,
      paperclip: true,
      resumeLists: [],
      evaluationLists: {
        evaluations: {
          list: []
        }
      },
      companyId: "",
      positiId: "",
      companyName: "",
      noMore: false,
      More: true,
      al: true,
      all: true,
      hotpositionList: [],
      positionIdList: [],
      positionIdListaddress: {},
      positionIdListworkAddress: {},
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

      value2: 5,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],

      center: { lng: "", lat: "" },
      zoom: 13
    };
  },

  methods: {
    //取消对岗位的收藏
    iscancel() {
      isfavorite(this.positiId)
        .then(res => {
          if (res.data.code === "200") {
            this.showcoll();
          }
        })
        .catch(error => {
         
        });
    },
    //评论分页
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionIds: [this.positiId],
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post(`/consumer-core/evaluation/position`, params)
        .then(res => {
          if (res.data.data.evaluations.total === 0) {
            this.apprasiseEvaluation = false;
          } else {
            this.evaluationLists = res.data.data;
          }
        })
        .catch(error => {});
    },
    handleCurrentChange(val) {
      this.page.current = val;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionIds: [this.positiId],
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post(`/consumer-core/evaluation/position`, params)
        .then(res => {
          if (res.data.data.evaluations.total === 0) {
            this.apprasiseEvaluation = false;
          } else {
            this.evaluationLists = res.data.data;
          }
        })
        .catch(error => {});
    },
    //查看更多
    more() {
      let params = {
        pageNum: 1,
        pageSize: 10,
        positionIds: [this.positiId],
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post(`/consumer-core/evaluation/position`, params)
        .then(res => {
          this.evaluationLists = res.data.data;
          this.page.total = res.data.data.evaluations.total;
          this.morejumpers = false;
          this.morepagers = true;
        })
        .catch(error => {});
    },
    //点赞
    like(list) {
      this.$http
        .post(`/consumer-core/evaluation/like/${list.id}`)
        .then(res => {
          this.evaluationList();
        })
        .catch(error => {});
    },
    //根据职位id获取职位评价列表‘
    evaluationList() {
      let params = {
        pageNum: 1,
        pageSize: 5,
        positionIds: [this.positiId],
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post(`/consumer-core/evaluation/position`, params)
        .then(res => {
          if (res.data.data.evaluations.total === 0) {
            this.apprasiseEvaluation = false;
          } else {
            this.evaluationLists = res.data.data;
            if (res.data.data.evaluations.total > 5) {
              this.morejumpers = true;
            } else {
              this.morejumpers = false;
            }
          }
        })
        .catch(error => {});
    },
    //获取所有简历
    resumeList() {
      this.$http
        .get(`/consumer-core/resume/list`)
        .then(res => {
          this.resumeLists = res.data.data;
        })
        .catch(error => {});
    },
    getLocationPoint(e) {
      // this.lng = e.point.lng;
      // this.lat = e.point.lat;
      /* 创建地址解析器的实例 */
      let geoCoder = new BMap.Geocoder();
      /* 获取位置对应的坐标 */
      geoCoder.getPoint(this.positionIdList.workAddress.detail, point => {
        console.log(point);
        this.center.lng = point.lng;
        this.center.lat = point.lat;
      });
      // /* 利用坐标获取地址的详细信息 */
      // geoCoder.getLocation(e.point, res=>{
      //     console.log(res);
      // })
    },
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
            
          });
      } else {
        this.$notify.error({
          title: "错误",
          message: "请先登录后再进行投递"
        });
        // this.$router.push({ path: "/login" });
      }
    },
    // nextjoblist(id) {
    //   this.positiId = id;
    //   this.positionId();
    //   this.showdeli();
    //   this.showcoll();
    // },
    //获取所有企业行业
    allposition() {
      industry()
        .then(res => {
          if (res.data.code == 200) {
            this.industryList = res.data.data;
          }
        })
        .catch(error => {
          
        });
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
            this.positionIdListaddress = res.data.data.company.address;
            this.positionIdListworkAddress = res.data.data.workAddress;
            this.getLocationPoint();
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
      this.resumeList();
      
    }
    this.positionId();
    this.evaluationList();
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
    },
    thelevel(thelevel) {
      var a;
      switch (thelevel) {
        case "THE_BENEFITS_PACKAGE_IS_FANTASTIC":
          a = "福利待遇特别棒";
          break;
        case "THE_INTERVIEWER_IS_DANIEL":
          a = "面试官是大牛";
          break;
        case "THE_ENVIRONMENT_IS_VERY_GOOD":
          a = "环境非常nice";
          break;
        case "THE_INTERVIEWER_IS_VERY_KIND":
          a = "面试官很和善";
          break;
        case "INTERVIEW_EFFICIENCY_IS_VERY_HIGH":
          a = "面试效率很高";
          break;
        case "THE_SALARY_DOES_NOT_MATCH_THE_LABEL":
          a = "薪资跟标注不符";
          break;
        case "THE_INTERVIEWER_IS_TOO_DEMANDING":
          a = "面试官太苛刻";
          break;
        case "THE_ENVIRONMENT_IS_SO_SO":
          a = "环境一般般";
          break;
        case "THE_INTERVIEWER_IS_VERY_SERIOUS":
          a = "面试官很严肃";
          break;
        case "WHEN_THE_SEAS_RUN_DRY_AND_THE_ROCKS_CRUMBLE":
          a = "等到海枯石烂";
          break;
      }
      return a;
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
      color: #02B9B8;
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
          color: #02B9B8;
          border-color: #02B9B8;
        }
      }
    }

    .cancel:hover {
      background: #1d366e;
      color: white;
      border-color: #1d366e;
    }
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    text-align: left;
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
      color: #02B9B8;
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
      color: #02B9B8;
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

    .station-appraise {
      margin: 0 55px 0 96px;
      border: 1px solid rgba(236, 236, 236, 1);
      height: auto;
      border-radius: 5px;

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
          color: #02B9B8;
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

      .station-appraise-line {
        border: 1px solid #f8f8f8;
        margin: 20px 30px 0 30px;
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
        margin: 0 0 30px 350px;
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
        margin: 15px 0 30px 30px;

        .el-radio-button--medium .el-radio-button__inner {
          padding: 2px 10px;
          font-size: 14px;
          border-radius: 20px;
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
          color: #272822;
          background-color: #fff;
          border-color: #dee1e6;
          box-shadow: -1px 0 0 0 #02B9B8;
        }
      }

      .station-appraise-content {
        height: auto;
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

        .active {
          display: none;
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
            color: #02B9B8;
            font-size: 16px;
            margin: 16px 10px 0 16px;
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

    .station-foot-foot {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 5% 0 0 0;

      .station-foot-foot-one {
        margin: 40px 0 0 96px;
        font-size: 18px;
        color: #02B9B8;
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
