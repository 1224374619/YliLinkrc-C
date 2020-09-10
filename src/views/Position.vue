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
              <p class="company-content">
                {{this.companyIdList.description}}
              </p>
              <div class="positon-footer">
                <div class="address">
                  <p class="company-address">公司地址</p>
                </div>
                <div class="map-ad">
                  <div class="map-address">
                    <span
                      class="map-address-span"
                    >{{companyIdList.address.detail}}</span>
                  </div>
                  <el-amap vid="amap" :plugin="plugin" :events="events" class="amap" style="width:859px;height:188px;margin:0 0 80px 0" :center="center" :zoom="zoom">
                    <el-amap-marker :position="center" vid="amapMarker"></el-amap-marker>
                  </el-amap>
                </div> 
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="在招职位" name="second">
            <div class="postType">
              <div style="text-align:left;margin:0 0 40px 0" class="list">
                <!-- <span
                  class="postType-span"
                  style="margin:10px 0 0 0;font-size:18px;padding:0 25px 0 0;color:#373737"
                >职位类型：</span> -->
                <!-- <span
                  class="posttype-span" style="padding:0 45px 0 0;cursor:pointer;color:#666666;font-size:16px" @click="apointPosition(item)" v-for="(item,index) in positionCatalogList" :key='index'
                >{{item.positionCatalog/10000|positionCatalog}}（{{item.num}}）</span>    -->
              </div>
              <div v-for="(list,index) in tableData" :key="index" @click="next(list.id,list.id)" style="width:1248px;">
                <div class="position-tab">
                  <div v-if="list.positionName.length > 15" style="color:#313131;font-size:20px;margin:0 0 0 15px;width:300px;text-align:left;">{{list.positionName.substr(0,4) + '...'}}</div>
                  <div v-else style="color:#313131;font-size:20px;margin:0 0 0 15px;width:300px;text-align:left">{{list.positionName}}</div>
                  <div v-if='list.workAgeMax == null' style="color:#8A8A8A;font-size:18px;margin:0 0 0 0;width:300px;text-align:left;">{{list.workAddress.city}} | 10年以上 | {{list.degreeMin}}</div>
                  <div v-else style="color:#8A8A8A;font-size:18px;margin:0 0 0 0;width:300px;text-align:left;">{{list.workAddress.city}} | {{list.workAgeMin}}-{{list.workAgeMax}}年 | {{list.degreeMin}}</div>
                  <div style="margin:0 0 0 180px;width:100px;text-align:left;color:#327cf3;font-size:20px" v-if="list.salaryMin === 35">{{list.salaryMin}}k以上</div>
                  <div style="margin:0 0 0 180px;width:100px;text-align:left;color:#327cf3;font-size:20px" v-else>{{list.salaryMin}}-{{list.salaryMax}}k</div>
                  <div style="margin:0 0 0 180px;color:#8A8A8A;font-size:16px">{{list.publishedTime | formatDate}}</div>
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
import positionCatalog from '../assets/positionCatalog.json'
import industrys from '../assets/industry.json'
import citys from '../assets/city.json'
const timeUtil = require("../timeUtil.js");
import {
  companyDetail,
  positionlist,
  positionCatalogs,
} from "apis/account";
// import { error } from 'util';
export default {
  name: "position",
  components: {
    // BaiduMap
  },
  data() {
    let self = this;
    return {
      page: {
                total: 0,
                pageSize: 10,
                current: 1,
                pageSizeOpts: [10,20,30]
            },
      companId:'',
      companIds:'',
      citysal:[],
      industryList:[],
      time:'',
      companyIdList:'',
      table: false,
      information: true,
      activeName: "first",
      posiCatalogList:[],
      url:
        "",
      tableData: [],
      positionCatalog:'',
      positionCatalogList:[],
      id:'',

      nearbyInfo: [], // 周边信息---高德反馈（周边建筑信息）
      addressInfo: '', // 城市信息---高德反馈（省市区、adcode）
      center: [121.59996, 31.197646], // 高德地图中心点
      zoom: 15, // 地图缩放
      events: {
        'click': (e) => { // 点击地图的时候，获取点击的经纬度，并将地图中心点移自此处
          let m = e.lnglat;
          self.addrInput = '';
          self.center = [m.lng, m.lat];
          self.GDmapGetInfoOfNearby(m.lng, m.lat, self); // 获取周边信息
        }
      },
      plugin: [
          {
            pName: "Geolocation",
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  console.log(result.addressComponent.province); 
                  console.log(result.position.lng,result.position.lat);  //  能获取定位的所有信息
                  if (result && result.position) {
                  // 经纬度
                    self.lng = result.position.lng; 
                    self.lat = result.position.lat;
                    // 地址信息
                    self.str = result.formattedAddress;
                    self.center = [self.lng, self.lat];
                    self.loaded = true;
                    self.$nextTick();
                    sessionStorage.setItem(
                      "id",
                      JSON.stringify(
                        // result.position.lng + "," + result.position.lat
                        result.formattedAddress   // 把地址信息储存的本地缓存上
                      )
                    );
                  }
                });
              }
            }
          }
        ]
    };
  },
  methods: {
    // // 地图加载完毕事件
    // handler(BMap, map) {
    //   console.log(BMap, map)
    //   this.center.lng = 116.404
    //   this.center.lat = 39.915
    //   this.zoom = 15;
    // },
    isclick() {
      this.table = true;
      this.information = false;
    },
    //获取公司详情
    companyId() {
      companyDetail(this.companId).then(res => {
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
          pageNum:this.page.current,pageSize:this.page.pageSize
        }
      positionlist(this.companId,params).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total
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
      let apointPosition = item.positionCatalog
      let params = {
        pageNum:this.page.current,pageSize:this.page.pageSize,positionCatalog:apointPosition
      }
      positionlist(this.companId,params).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total
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
      positionCatalogs(this.companId).then(res => {
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
      this.page.pageSize = val
      this.page.current = 1
      let params = {
        pageNum:this.page.current,
        pageSize:this.page.pageSize
      }
      positionlist(this.companId,params).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total
            var time = this.tableData[0].publishedTime
            this.changeTime(time)
          }
      });
    },
    handleCurrentChange(val) {
      this.page.current = val
       let params = {
        pageNum:this.page.current,
        pageSize:this.page.pageSize
      }
      positionlist(this.companId,params).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total
            var time = this.tableData[0].publishedTime
            this.changeTime(time)
          }
      });
    },
    next(id,sid) {
      this.$router.push({ path: "/position",query:{
            id: this.companId,
            sid: sid
          }});
      this.$router.push({ path: "/station",query:{
            id: id,
            sid: sid
          }});    
    },
    changeTime(time) {
      var commonTime = "";
      if (time) {
        var unixTimestamp = new Date(time * 1);
        commonTime = unixTimestamp.toLocaleString();
        this.time = commonTime
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
        allpositionCatalog().then(res => {
          if (res.data.code == 200) {
            this.posiCatalogList = res.data.data
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
  },
   
  created() {
    this.positionCatalogList = positionCatalog.data
    this.industryList = industrys.data
    this.citysal = citys.data
    // this.allpositionCatalog()
    this.companId = this.$route.query.id
    this.companIds = this.$route.query.sid
    // this.citise() 
    this.companyId();
    // this.allposition()
    this.positionCataloga()
    // this.positionCataloga();
    if(this.companIds === undefined){
      this.activeName = 'first'
    }else{
      let params = {
          pageNum:this.page.current,pageSize:this.page.pageSize
        }
      positionlist(this.companId,params).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total
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
      this.activeName = 'second'
    }
    
  },
  filters:{
    position(position) {
      const map = ["初中及以下", "职中", "大专", "本科", "硕士", "博士"];
      return map[position];
    },
    level(level){
      const map=["国有企业","外资企业","合资企业","民营企业",'事业单位']
      return map[level]
    },
    size(size) {
      const map = ["小于10人", "10-100人", "100-500人", "500人以上"];
      return map[size];
    },
    positionCatalog(positionCatalog){
      const map=['',"销售|客服|市场","财务|人力资源|行政","项目|质量|高级管理","IT|互联网|通信",'房产|建筑|物业管理','金融','采购|贸易|交通|物流','生产|制造','传媒|印刷|艺术|设计','咨询|法律|教育|翻译','服务业','能源|环保|农业|科研','兼职|实习|社工|其他']
      return map[positionCatalog]
    },
  },
};
</script>
<style lang="stylus">    
  .position 
    display flex
    flex-direction column
    margin 100px auto 0 
    width 1440px
    cursor default
    background-color white
    .positon-nav 
      display flex
      flex-direction row
      .block
        margin 60px 0 30px 96px
      .aside
        .aside-nav
          text-align left 
          font-size 28px
          color #373737
          font-weight bold
          padding 0 0 0 10px 
          margin 75px 0 0 0 
        .aside-footer
          margin 23px 0 0 0 
          color #808080
          font-size 18px  
        .aside-footer span
          padding 0 0 0 10px 
    .positon-content 
      .tab 
        margin 0 0 0 96px
        .el-tabs__item.is-active 
          color #327cf3
        .el-tabs__item
          font-size 22px
          font-weight 800
          color #373737
        .el-tabs__nav-wrap::after
          background-color red 
          height 2px
          z-index 1
        .el-tabs__active-bar  
          background-color #327cf3
        .el-tabs__content 
        .el-tab-pane
          margin 20px 0 0 0   
        .position-tab
          display flex
          flex-direction row 
          margin 15px 0 0 0
          font-size 14px 
          font-family PingFangSC-Regular
          cursor pointer
          line-height 68px
          height 68px
        .position-tab:hover  
          background #FAFAFA
        .line-tab 
          width 1260px
          border 0.5px solid #e5e5e5
          margin 15px 0 0 0 
        .postType span
          font-size 13px 
          color #455379
        .postType span:hover
          color #617dcb 
        .el-tabs__nav-wrap:after 
          background-color white
          z-index 1
        .company
          text-align left
          font-size 18px
          color #327cf3
          margin 5px 0 0 0
          font-weight bold
        .company-content
          text-align left
          font-size 16px 
          color #535353
          margin 0 0 0 0
          width 854px
          white-space pre-line
        .positon-footer
          margin 40px 0 0 0
          .address
            .company-address
              text-align left
              font-size 18px
              color #327cf3
              font-weight bold 
          .map-ad    
            box-shadow 0px 3px 9px 0px rgba(223,223,223,0.77)
            width 859px
            .map-address
              display flex
              flex-direction row
              justify-content space-between
              margin 30px 0 20px 24px
              .map-address-span
                font-size 18px
                font-family PingFangSC-Regular
                color: #5D5D5D
                margin 20px 0 0 0
              .map-address-map
                font-size 14px
                color #bbdf4f
                cursor pointer
                margin 0 355px 0 0
          .bm-view
            margin 10px 0 20px 0
            width 620px
            height 70px
          .anchorBL
            display none  
</style>
