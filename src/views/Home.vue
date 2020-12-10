<template>
  <div style="width:1440px;background:#FFFFFF;border:1px solid #FFFFFF;margin:90px auto 0">
    <div class="home">
      <div>
        <el-dialog
          class="dialog"
          title="切换城市"
          :visible.sync="dialogVisible"
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
            <el-tooltip class="item" v-model="visible" effect="light" placement="bottom-start">
              <el-input
                placeholder="请选择省份"
                :disabled="true"
                style="width:138px;height:32px;font-size:16px;"
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
                  style="float:left;text-align:center;margin:10px 0 0 8px;padding:6px 10px 0 10px;font-size:16px;height:26px;cursor:pointer"
                  v-for="(item,index) in city"
                  :key="index"
                >{{item.tag}}</span>
              </div>
            </el-tooltip>
            <el-tooltip
              class="item"
              :disabled="disabled"
              v-model="visibleOne"
              effect="light"
              placement="bottom"
            >
              <el-input
                placeholder="请选择城市"
                :disabled="true"
                v-model="cityInput"
                style="width:138px;height:32px;margin:0 0 0 40px;font-size:16px"
              >
                <i style="cursor:auto" slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
              </el-input>
              <div style="width:473px;height:140px;overflow-y:scroll;" slot="content">
                <span
                  class="spanCity"
                  slot="reference"
                  @click="citiss(item)"
                  style="float:left;text-align:center;margin:10px 0 0 8px;padding:6px 10px 0 10px;font-size:16px;height:26px;cursor:pointer"
                  v-for="(item,index) in citis"
                  :key="index"
                >{{item.tag}}</span>
              </div>
            </el-tooltip>
          </div>
          <div style="height:60px"></div>
          <span slot="footer" class="dialog-footer">
            <el-button style="margin:0 20px 0 0" @click="dialogVisible = false" plain>取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div style="width:1440px;height:40px;background:#F1F1F1;">
        <div>
          <img
            style="height:30px;margin:7px 0 0 93px;float:left"
            :src="require('../assets/images/laba.png')"
          />
          <span
            style="font-family:PingFangSC-Regular;color: #373737;line-height:45px;float:left"
          >【公告】 建议使用谷歌浏览器或360浏览器最新版极速模式访问，以获得更佳体验！</span>
        </div>
      </div>
      <div class="joblist-search">
        <el-input
          class="CompanySelect"
          v-model="provinceButton"
          :disabled="true"
          style="width:160px;height:60px;font-size:14px"
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
          type="primary"
          style="width:160px;height:60px;"
        >
          <el-option
            v-for="(item,index) in perList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          class="searchContent"
          v-model="searchContent"
          style="width:470px;font-size:12px"
          placeholder="请输入内容"
        ></el-input>
        <el-button class="search-button" style="border-radius:0 2px 2px 0;" @click="search">搜 索</el-button>
      </div>
      <el-amap
        vid="amap"
        :plugin="plugin"
        :events="events"
        class="amap"
        style="width:859px;height:0px;margin:0 0 0 0"
        :center="center"
        :zoom="zoom"
      >
        <el-amap-marker :position="center" vid="amapMarker"></el-amap-marker>
      </el-amap>
      <!-- <div style="text-align:left;margin:4px 0 0 11%">
        <span style="font-size:12px;color:#617dcb">热门搜索：</span>
        <span style="font-size:12px;color:#7d8dcd">
          <a
            href="#"
            style="padding:0 0 0 15px;text-decoration:none"
            v-for="(item,index) in keywordList"
            :key="index"
          >{{item.content}}</a>
        </span>
      </div>-->
      <div class="carousel">
        <el-carousel :interval="5000" height="580px">
          <el-carousel-item v-for="(item,index) in carouselImgs" :key="index">
            <img style="width:1440px;" :src="item" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div
        style="text-align:left;color:#373737;font-size:22px;margin:61px 0 0 96px;font-weight:600"
      >热门企业</div>
      <div class="company" style="border:1px solid white">
        <!-- <vue-seamless-scroll :data="imgList" :class-option="optionLeft" class="seamless-warp2">
          <span slot="left-switch" class="left-arrow"></span>
          <span slot="right-switch" class="right-arrow"></span>
          <img v-for="(item,index) in imgList" :src="item.idView" :key="index" class="banner_img" />
        </vue-seamless-scroll>-->
        <md-card>
          <md-card-media>
            <!-- swiper -->
            <div style="position: relative;">
              <swiper
                :options="swiperOption"
                ref="swiperOption"
                v-if="imgList.length>0"
                style="width:1000px;"
              >
                <swiper-slide v-for="(item,index) in imgList" :key="index">
                  <img style="width:176px;height:176px;" :src="item.idView" class="banner_img" />
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
              <!-- <div
                style="width:30px;height:20px;margin:-10px 0 0 0;"
                class="swiper-button-prev"
                slot="button-prev"
              ></div>
              <div
                style="width:30px;height:20px;margin:-10px 0 0 0"
                class="swiper-button-next"
                slot="button-next"
              ></div>-->
            </div>
          </md-card-media>
        </md-card>
      </div>
      <!-- <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item style="border:1px solid red;width:50px" v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>-->
      <div class="tabs">
        <el-tabs v-model="activeName">
          <!-- <el-tab-pane label="为你推荐" name="first" v-if="recommend">
            <div class="demo">
              <div class="desc" v-for="(list,index) in listRecommend" :key="index">
                <div class="desc-first" @click="descOne(list.id)">
                  <span>{{list.positionName}}</span>
                  <span>{{list.salaryMin}}-{{list.salaryMax}}k</span>
                </div>

                <div
                  @click="descOne(list.id)"
                  class="desc-second"
                  v-if="list.workAgeMax == null"
                >{{$CodeToTag.CodeToTag([parseInt(parseInt(list.positionCatalog/100)*100/10000)*10000,parseInt(list.positionCatalog/100)*100,list.positionCatalog],positionCatalogList)[2]}} | 10年以上 | {{list.degreeMin|level}}</div>
                <div
                  class="desc-second"
                  v-else
                >{{$CodeToTag.CodeToTag([parseInt(parseInt(list.positionCatalog/100)*100/10000)*10000,parseInt(list.positionCatalog/100)*100,list.positionCatalog],positionCatalogList)[2]}} | {{list.workAgeMin}}-{{list.workAgeMax}}年 | {{list.degreeMin|level}}</div>
                <div class="line"></div>
                <div class="desc-third" @click="desc(list.company.id)">
                  <img
                    style="width:50px;height:50px;margin:10px 0 0 5px"
                    :src="require('../assets/images/company1.jpg')"
                  />
                  <div class="third-content">
                    <span>{{list.company.companyName}}</span>
                    <span>{{list.company.size}}人 | 
                      {{$CodeToTag.CodeToTag([parseInt(list.company.industry/100)*100,list.company.industry],industryList)[1]}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="热门职位" name="second">
            <div class="demo" v-for="(list,index) in hotpositionList" :key="index">
              <div class="desc">
                <div class="desc-first">
                  <span>{{list.positionName}}</span>
                  <span>{{list.salaryMax}}-{{list.salaryMin}}k</span>
                </div>
                <div
                  class="desc-second"
                >{{list.positionCatalog}} | {{list.workAgeMax}}-{{list.workAgeMin}}年 | {{list.degreeMin}}</div>
                <div class="line"></div>
                <div class="desc-third">
                  <img
                    style="width:50px;height:50px;margin:10px 0 0 5px"
                    :src="require('../assets/images/company1.jpg')"
                  />
                  <div class="third-content">
                    <span>迪卡侬</span>
                    <span>50-100人 | 电子商务，文化...</span>
                  </div>
                </div>
              </div>
              <div class="desc">
                <div class="desc-first">
                  <span>产品经理</span>
                  <span>4-5k</span>
                </div>
                <div class="desc-second">上海 徐汇区 | 1-3年 | 本科</div>
                <div class="line"></div>
                <div class="desc-third">
                  <img
                    style="width:50px;margin:10px 0 0 5px"
                    :src="require('../assets/images/company1.jpg')"
                  />
                  <div class="third-content">
                    <span>迪卡侬</span>
                    <span>50-100人 | 电子商务，文化...</span>
                  </div>
                </div>
              </div>
              <div class="desc">
                <div class="desc-first">
                  <span>产品经理</span>
                  <span>4-5k</span>
                </div>
                <div class="desc-second">上海 徐汇区 | 1-3年 | 本科</div>
                <div class="line"></div>
                <div class="desc-third">
                  <img
                    style="width:50px;height:50px;margin:10px 0 0 5px"
                    :src="require('../assets/images/company1.jpg')"
                  />
                  <div class="third-content">
                    <span>迪卡侬</span>
                    <span>50-100人 | 电子商务，文化...</span>
                  </div>
                </div>
              </div> 
            </div>
          </el-tab-pane>-->
          <el-tab-pane label="最新职位" name="first">
            <div class="demo">
              <div
                class="desc"
                v-for="(list,index) in newpositionList"
                :key="index"
                style="float:left"
              >
                <div class="desc-first" @click="descOne(list.id)" style="cursor:pointer">
                  <span
                    v-if="list.positionName.length > 10"
                  >{{list.positionName.substr(0,10) + '...'}}</span>
                  <span v-else>{{list.positionName}}</span>
                  <span v-if="list.salaryMin === 35">{{list.salaryMin}}k以上</span>
                  <span v-else>{{list.salaryMin}}-{{list.salaryMax}}k</span>
                </div>
                <div
                  @click="descOne(list.id)"
                  class="desc-second"
                  style="cursor:pointer"
                  v-if="list.workAgeMax == null"
                >{{$CodeToTag.CodeToTag([parseInt(parseInt(list.catalogCode/100)*100/10000)*10000,parseInt(list.catalogCode/100)*100,list.catalogCode],positionCatalogList)[2]}} | 10年以上 | {{list.degreeMin}}</div>
                <div
                  @click="descOne(list.id)"
                  class="desc-second"
                  style="cursor:pointer"
                  v-else-if="list.workAgeMin == 0"
                >{{$CodeToTag.CodeToTag([parseInt(parseInt(list.catalogCode/100)*100/10000)*10000,parseInt(list.catalogCode/100)*100,list.catalogCode],positionCatalogList)[2]}} | 无工作经验 | {{list.degreeMin}}</div>
                <div
                  class="desc-second"
                  v-else
                  style="cursor:pointer"
                >{{$CodeToTag.CodeToTag([parseInt(parseInt(list.catalogCode/100)*100/10000)*10000,parseInt(list.catalogCode/100)*100,list.catalogCode],positionCatalogList)[2]}} | {{list.workAgeMin}}-{{list.workAgeMax}}年 | {{list.degreeMin}}</div>
                <div class="line"></div>
                <div class="desc-third" @click="desc(list.company.id)">
                  <img
                    v-if="list.company.logoUrl"
                    style="width:45px;height:45px;margin:20px 0 0 24px;cursor:pointer;border-radius:5px"
                    :src="list.company.logoUrl"
                  />
                  <img
                    v-else
                    style="width:45px;height:45px;margin:20px 0 0 24px;border-radius:5px"
                    :src="url"
                  />
                  <div class="third-content">
                    <span>{{list.company.companyName}}</span>
                    <span v-if="list.company.size === '500人以上'">{{list.company.size}} | {{list.company.industrySecondary}}</span>
                    <span v-else>{{list.company.size}}人 | {{list.company.industrySecondary}}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="button">
        <el-button
          plain
          @click="more"
          style="width:178px;height:43px;font-size:18px;background:#327cf3;color:#ffffff;border-color:#327cf3;letter-spacing:6px;text-align:center;padding-left:6px;margin:60px 0 100px 0"
        >查看更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  // carousel,
  // recommendation,
  newposition,
  // hotcompany,
  // hotposition,
  // hotkeyword,
  // industry,
  allpositionCatalog,
  homeSearch,
  companySearch,
  // city,
  brief
} from "apis/account";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import positionCatalog from "../assets/positionCatalog.json";
import industrys from "../assets/industry.json";
import citys from "../assets/city.json";
import Cookies from "js-cookie";
export default {
  name: "home",
  data() {
    let self = this;
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 10,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerGroup: 5,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        paginationClickable: true,
        pagination: ".swiper-pagination",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      visible: false,
      visibleOne: false,
      positiId: "",
      cityInput: "",
      positionCatalogList: [],
      provinceButton: "",
      cityButton: "",
      districtButton: "",
      searchContent: "",
      animate: false,
      listRecommend: [],
      city: [],
      citis: [],
      industryList: [],
      disabled: false,
      show: "",
      disabledOne: false,
      // recommend: true,
      activeName: "first",
      value: "上海市",
      company: "职位",
      url:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      dialogVisible: false,
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
      carouselImgs: [
        require("../assets/images/46.jpg"),
        require("../assets/images/big.jpg"),
        require("../assets/images/2020.jpg"),
        require("../assets/images/join.jpg")
      ],
      //热门企业
      imgList: [
        { id: 1, idView: require("../assets/images/a1.png") },
        { id: 2, idView: require("../assets/images/a2.png") },
        { id: 3, idView: require("../assets/images/a3.png") },
        { id: 4, idView: require("../assets/images/a4.png") },
        { id: 5, idView: require("../assets/images/a5.png") },
        { id: 6, idView: require("../assets/images/a6.png") },
        { id: 7, idView: require("../assets/images/a7.png") },
        { id: 8, idView: require("../assets/images/a8.png") },
        { id: 9, idView: require("../assets/images/a9.png") },
        { id: 10, idView: require("../assets/images/a10.png") },
        { id: 11, idView: require("../assets/images/a11.png") },
        { id: 12, idView: require("../assets/images/a12.png") },
        { id: 13, idView: require("../assets/images/a13.png") },
        { id: 14, idView: require("../assets/images/a7.png") },
        { id: 15, idView: require("../assets/images/a8.png") }
      ],
      keywordList: [
        { content: "前端" },
        { content: "java" },
        { content: "python" }
      ],
      hotpositionList: [],
      newpositionList: [],
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
      },
      sliceArr: [],
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
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(result);
                self.cityButton = result.addressComponent.city;
                self.provinceButton = result.addressComponent.province;
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
                    "adcode",
                    // result.position.lng + "," + result.position.lat
                    result.addressComponent.adcode // 把地址信息储存的本地缓存上
                  );
                }
              });
            }
          }
        }
      ]
    };
  },
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 4
      };
    }
  },
  methods: {
    next() {
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    more() {
      this.$router.push({
        path: "/joblist"
      });
    },
    //tabs--最新
    new() {
      newposition().then(res => {
        if (res.data.code == 200) {
          this.newpositionList = res.data.data;
        }
      });
      // .catch(error => {
      //   // this.$message({
      //   //     message:error.response.data.message,
      //   //     type: 'error'
      //   //   })
      // });
    },
    doLogin() {
      this.showLoginModal = false;
      this.isLogin = true;
    },
    search() {
      if (this.company == "公司") {
        let params = {
          addresses: [
            {
              city: this.cityButton,
              district: null,
              province: this.provinceButton
            }
          ],
          industries: null,
          industryCodes: null,
          keywords: this.searchContent,
          natures: null,
          pageNum: 1,
          pageSize: 10,
          size: null,
          sortBy: null,
          sortOrder: null
        };
        companySearch(params)
          .then(res => {
            if (res.data.code == 200) {
              window.sessionStorage.setItem(
                "lsitOne",
                JSON.stringify(res.data.data)
              );
              let a = window.sessionStorage.getItem("adcode");
              // console.log(JSON.stringify(res.data.data))
              this.$router.push({
                path: "/joblist",
                query: {
                  thisId: "123",
                  citycode: this.citycode === undefined ? a : this.citycode
                }
              });
            }
          })
          .catch(error => {
            
          });
      } else {
        let params = {
          addresses: [
            {
              city: this.cityButton ? this.cityButton : null,
              district: null,
              province: this.provinceButton
            }
          ],
          degreeMin: null,
          industries: null,
          industryCodes: null,
          isGraduate: true,
          jobType: null,
          keywords: this.searchContent,
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
        homeSearch(params)
          .then(res => {
            if (res.data.code == 200) {
              window.sessionStorage.setItem(
                "lsit",
                JSON.stringify(res.data.data)
              );
              window.sessionStorage.setItem(
                "lsittwo",
                JSON.stringify(res.data.data)
              );
              window.sessionStorage.setItem("citycode", this.citycode);
              let a = window.sessionStorage.getItem("adcode");
              this.$router.push({
                path: "/joblist",
                query: {
                  thisId: "1234",
                  citycode: this.citycode === undefined ? a : this.citycode
                }
              });
            }
          })
          .catch(error => {
            
          });
      }
    },
    desc(id) {
      this.$router.push({
        path: "/position",
        query: {
          id: id
        }
      });
    },
    descOne(id) {
      this.$router.push({
        path: "/station",
        query: {
          id: id
        }
      });
    },
    citys(item, index) {
      this.visible = false;
      this.provinceButton = item.tag;
      this.provincecode = item.code;
      this.curr = index;
      this.citis = this.city[this.curr].children;
      if (this.citis === undefined) {
        this.disabled = true;
        this.cityInput = this.provinceButton;
      } else {
        this.disabled = false;
        this.cityButton = this.provinceButton;
        this.cityInput = "不限";
      }
    },
    citiss(item) {
      this.visibleOne = false;
      this.cityInput = item.tag;
      this.cityButton = item.tag;
      this.citycode = item.code;
    },
    cits() {
      this.sliceArr = this.items.children;
      // this.cityButton = this.items.children[1].tag;
      this.cityInput = "不限";
      this.provinceButton = this.items.tag;
      this.citis = this.items.children;
      // this.citycode = this.items.children[0].code;
      this.provincecode = this.items.code;
    },
    //城市
    citises() {
      this.cityId = window.sessionStorage.getItem("adcode");
      switch (parseInt(this.cityId / 10000) * 10000) {
        case 110000:
          this.items = this.city[0];
          this.cits();
          break;
        case 120000:
          this.items = this.city[1];
          this.cits();
          break;
        case 130000:
          this.items = this.city[2];
          this.cits();
          break;
        case 140000:
          this.items = this.city[3];
          this.cits();
          break;
        case 150000:
          this.items = this.city[4];
          this.cits();
          break;
        case 210000:
          this.items = this.city[5];
          this.cits();
          break;
        case 220000:
          this.items = this.city[6];
          this.cits();
          break;
        case 230000:
          this.items = this.city[7];
          this.cits();
          break;
        case 310000:
          this.items = this.city[8];
          this.cits();
          break;
        case 320000:
          this.items = this.city[9];
          this.cits();
          break;
        case 330000:
          this.items = this.city[10];
          this.cits();
          break;
        case 340000:
          this.items = this.city[11];
          this.cits();
          break;
        case 350000:
          this.items = this.city[12];
          this.cits();
          break;
        case 360000:
          this.items = this.city[13];
          this.cits();
          break;
        case 370000:
          this.items = this.city[14];
          this.cits();
          break;
        case 410000:
          this.items = this.city[15];
          this.cits();
          break;
        case 420000:
          this.items = this.city[16];
          this.cits();
          break;
        case 430000:
          this.items = this.city[17];
          this.cits();
          break;
        case 440000:
          this.items = this.city[18];
          this.cits();
          break;
        case 450000:
          this.items = this.city[19];
          this.cits();
          break;
        case 460000:
          this.items = this.city[20];
          this.cits();
          break;
        case 500000:
          this.items = this.city[21];
          this.cits();
          break;
        case 510000:
          this.items = this.city[22];
          this.cits();
          break;
        case 520000:
          this.items = this.city[23];
          this.cits();
          break;
        case 530000:
          this.items = this.city[24];
          this.cits();
          break;
        case 540000:
          this.items = this.city[25];
          this.cits();
          break;
        case 610000:
          this.items = this.city[26];
          this.cits();
          break;
        case 620000:
          this.items = this.city[27];
          this.cits();
          break;
        case 630000:
          this.items = this.city[28];
          this.cits();
          break;
        case 640000:
          this.items = this.city[29];
          this.cits();
          break;
        case 650000:
          this.items = this.city[30];
          this.cits();
          break;
        case 710000:
          this.items = this.city[31];
          this.cits();
          break;
        case 810000:
          this.items = this.city[32];
          this.cits();
          break;
        case 820000:
          this.items = this.city[33];
          this.cits();
          break;
      }
      // .catch(error => {});
    },
    doLogot() {
      this.isLogin = false;
    },
    doRegister() {},
    doResetPwd() {},
    redirectToSearchResult() {
      this.$router.push({ path: "/search" });
    },
    // //获取简历简讯
    // brief() {
    //   brief().then(res => {
    //     if (res.data.code == 200) {
    //       if (res.data.data.target == null) {
    //         this.recommend = false;
    //       } else {
    //         this.recommend = true;
    //       }
    //     }
    //   });
    // }
  },
  created() {
    let token = Cookies.get("token");
    this.new();
    this.positionCatalogList = positionCatalog.data;
    this.industryList = industrys.data;
    this.city = citys.data;
    // if (token) {
    //   this.brief();
    // } else {
    // }
    this.citises();
    // this.industry();
    // this.carousel();
    // this.hotcompany();
    // this.hotkeyword();
    // this.hotposition();

    // this.recommendation();
    // this.allposition();
    // this.cits()
    // if (this.recommend == false) {
    //   this.activeName = "second";
    // } else {
    //   this.activeName = "first";
    // }
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
  },
  watch: {
    cityInput: function() {
      // if (this.cityInput === '不限') {
      //   this.cityButton = this.provinceButton
      // }else{
      //   this.cityButton = this.cityInput
      // }
    }
  }
  // mounted() {
  //   this.companyScrolling();
  // }
};
</script>


<style lang="stylus">
.home {
  cursor: default;

  .dialog {
    display: flex;
    flex-direction: column;

    .el-icon-close:before {
      font-size: 24px;
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

  .joblist-search {
    width: 976px;
    height: 60px;
    background: white;
    margin: 61px auto;
    border: 0px solid rgba(229, 229, 229, 1);
    box-shadow: 0px 1px 4px 0px rgba(212, 212, 212, 0.5);

    .CompanySelect {
      .el-select-dropdown__item:hover {
        background: #FAFAFA;
      }

      .el-input__inner {
        border: 0px solid red;
        font-size: 22px;
        text-align: center;
        margin: 10px 0 0 0;
        cursor: pointer;
      }

      .el-input__icon {
        margin: 5px 30px 0 0;
        width: 11px;
        line-height: 50px;
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

    .joblist-after {
      border: 0.5px solid #dbdbdb;
    }

    .el-icon-search:before {
      color: red;
      font-size: 17px;
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

  .carousel {
    margin: 0 0 0 0;
    width: 1440px;
  }

  .company {
    margin: 10px auto;
    overflow: hidden;
    width: 1080px;

    .swiper-pagination-bullet-active {
      background: #327cf3 !important;
    }

    .swiper-button-prev {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%23a42a2e'%2F%3E%3C%2Fsvg%3E");
      width: 6%;
      height: 6%;
    }
  }

  .swiper-button-next {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%23a42a2e'%2F%3E%3C%2Fsvg%3E");
    width: 6%;
    height: 6%;
  }
}

.tabs {
  width: 1300px;

  .el-tabs__content {
    background: #FAFAFA;
    width: 1440px;
  }

  .el-tab-pane {
    margin: 50px 0 0 96px;
  }

  .el-tabs__item {
    font-size: 22px;
    color: #373737;
  }

  .el-tabs__active-bar {
    background-color: #327cf3;
    margin: 20px 0 0 0;
  }

  .el-tabs__item.is-active {
    color: #327cf3;
  }

  .el-tabs__nav-scroll {
    margin: 0 0 0 96px;
  }

  .el-tabs {
    margin: 70px 0 0 0;

    .demo {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .desc:hover {
        box-shadow: 0px 3px 10px 0px rgba(214, 214, 214, 1);
      }

      .desc {
        width: 398px;
        height: 213px;
        margin: 25px 25px 0 0;
        background: #FFFFFF;
        border-radius: 5px;
        border: 0.75px solid rgba(229, 229, 229, 1);

        .desc-first {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .desc-first span:nth-child(1) {
          margin: 35px 0 0 24px;
          font-family: PingFangSC-Regular;
          color: #373737;
          font-size: 20px;
        }

        .desc-first span:nth-child(2) {
          margin: 35px 24px 0 0;
          font-family: PingFangSC-Regular;
          color: #a42a2e;
          font-size: 20px;
        }

        .desc-second {
          text-align: left;
          margin: 6px 0 0 24px;
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #959595;
        }

        .line {
          width: 350px;
          border: 0.5px solid #f5F5F5;
          margin: 20px 0 0 24px;
        }

        .desc-third {
          display: flex;
          flex-direction: row;

          .third-content {
            display: flex;
            flex-direction: column;
            margin: 0 0 0 10px;
          }

          .third-content span:nth-child(1) {
            text-align: left;
            margin: 20px 0 0 0;
            color: #505050;
            font-size: 16px;
            font-weight: bold;
          }

          .third-content span:nth-child(2) {
            margin: 5px 0 0 0;
            color: #959595;
            font-size: 14px;
            font-weight: 500;
            text-align: left;
          }
        }
      }
    }
  }
}

.button {
  height: 200px;
  background: #fafafa;
}
</style>

<style lang="stylus">
.spanCity:hover {
  background: #f4f4f4;
}

.el-tabs__nav-wrap:after {
  background-color: #f0f0f0;
}

a {
  color: #1d366e;
}

a:active {
  color: #617dcb;
}

a:hover {
  color: #7d8dcd;
}

.seamless-warp2 {
  overflow: hidden;
  width: 1500px;
  border: 0px solid red;
}

.el-tabs__nav-wrap:after {
  background-color: #ffffff;
}

.el-icon-arrow-up:before {
  margin: 0 50px 0 0;
}

.banner_img {
  border: 1px solid #E3E3E3;
}

.banner_img:hover {
  border: 0px solid #E3E3E3;
  box-shadow: 0px 3px 8px 0px rgba(222, 222, 222, 100);
}

.el-select-dropdown__item {
  font-size: 16px;
}

.el-select-dropdown__item.selected {
  color: #327cf3;
}

.el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
  cursor: auto;
  color: #585858;
}
</style>