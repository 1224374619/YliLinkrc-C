<template>
  <div>
    <div class="dialogCity">
      <el-dialog
        title
        :visible.sync="dialogVisibleCity"
        style="height:1000px;width:1150px;margin:0 auto"
      >
        <div class="title">按省份选择</div>
        <div style="margin:20px 0 0 20px; display: flex;flex-direction: row;">
          <el-tooltip class="item" v-model="visible" effect="light" placement="bottom-start">
            <el-input
              placeholder="请选择省份"
              :disabled="true"
              style="width:138px;height:32px;font-size:16px;"
              v-model="provinces"
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
                @click="checkProvince(item,index)"
                style="float:left;text-align:center;margin:10px 0 0 8px;padding:6px 10px 0 10px;font-size:16px;height:26px;cursor:pointer"
                v-for="(item,index) in citylist"
                :key="index"
              >{{item.tag}}</span>
            </div>
          </el-tooltip>
          <el-tooltip
            style="margin:0 180px 0 40px;"
            v-model="visibleOne"
            effect="light"
            placement="bottom"
          >
            <el-input
              placeholder="请选择城市"
              :disabled="true"
              v-model="cities"
              style="width:138px;height:32px;;font-size:16px"
            >
              <i style="cursor:auto" slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
            </el-input>
            <div style="width:473px;height:140px;overflow-y:scroll;" slot="content">
              <span
                class="spanCity"
                slot="reference"
                @click="checkCity(item)"
                style="float:left;text-align:center;margin:10px 0 0 8px;padding:6px 10px 0 10px;font-size:16px;height:26px;cursor:pointer"
                v-for="(item,index) in districtlist"
                :key="index"
              >{{item.tag}}</span>
            </div>
          </el-tooltip>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button plain @click="dialogVisibleCity = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleCity = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <nav :class="scroll>0?'navFls':'navFl'">
      <div class="nav-body">
        <el-amap
          vid="amap"
          :plugin="plugin"
          :events="events"
          class="amap"
          style="width:1px;height:0px;"
          :center="center"
          :zoom="zoom"
        >
          <el-amap-marker :position="center" vid="amapMarker"></el-amap-marker>
        </el-amap>

        <img
          style="height:40px;width:160px"
          @click="gotoHomeUI"
          alt="银领人才网"
          :src="require('../assets/images/logo.png')"
        />
        <span
          
          style="margin:5px 0 0 50px;color:#858585;width:200px;text-align:left;"
          @click="dialogVisibleCity = true"
        >
          {{this.provinces}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <div class="menu">
          <div class="group">
            <router-link style="margin:0 0 0 15px" to="/home" index="1">
              <span>首页</span>
            </router-link>
            <router-link style="margin:0 0 0 60px" to="/joblist" index="2">
              <span>职位</span>
            </router-link>
            <router-link
              style="margin:0 0 0 60px"
              v-if="this.defaultResumeId === 0"
              to="/gap"
              index="3"
            >
              <span>简历</span>
            </router-link>
            <router-link style="margin:0 0 0 60px" v-else to="/resume" index="3">
              <span>简历</span>
            </router-link>
            <router-link style="margin:0 0 0 60px" to="/aboutus/:id" index="4">
              <span>联系我们</span>
            </router-link>
            <router-link style="margin:0 0 0 60px" to="/appraise" index="5">
              <span>活动中心</span>
            </router-link>
          </div>
          <div class="btn-set" v-if="!this.token">
            <router-link
              style="color:#838383;font-size:18px"
              tag="button"
              :to="{name:'login'}"
              index="1"
            >登录</router-link>
            <router-link tag="button" :to="{name:'register'}" index="2">注册</router-link>
          </div>
          <div class="user-operations" v-else>
            <el-dropdown trigger="hover" style="margin:0 10px 0 0">
              <el-badge
                :value="this.$store.state.value"
                class="item"
                size="mini"
                style="margin:5px 20px 0 0"
              >
                <img style="width:22px;height:22px" :src="require('../assets/images/ling.png')" />
              </el-badge>
              <el-dropdown-menu slot="dropdown" style="width:412px;height:258px;">
                <div
                  style="width:412px;height:210px;border-bottom:1px solid #fafafa;cursor:default;overflow:scroll;overflow-x:hidden;"
                >
                  <div class="badge" v-for="(item,index) in notificationlist" :key="index">
                    <span
                      v-if="item.title.length>17"
                      style="color:#6C6C6C;font-size:14px;margin-left:24px;"
                    >{{item.title.substring(0,17)}}...</span>
                    <span
                      v-else
                      style="color:#6C6C6C;font-size:14px;margin-left:24px;"
                    >{{item.title}}</span>
                    <span style="color:#909090;font-size:12px;margin-right:25px;">
                      <el-badge
                        :is-dot="!item.isRead"
                        class="item"
                      >{{item.releaseTime|formatDateOne}}</el-badge>
                    </span>
                  </div>
                </div>
                <div
                  style="border: 1px solid rgba(244, 244, 244, 1);box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);height:60px;display: flex;flex-direction: row;"
                >
                  <el-button
                    style="margin:7px 0 0 17%;width:120px;font-size:12px"
                    @click="chorusle"
                    type="primary"
                  >全部标为已读</el-button>
                  <el-button
                    style="margin:7px 0 0 7%;width:120px;font-size:12px"
                    @click="NewsDetail"
                    type="primary"
                  >查看全部</el-button>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
            <span
              v-if="this.fullName.length>4"
              style="line-height:65px;color:#373737;margin:0 20px 0 0;font-size:18px;width:90px;"
            >{{this.fullName.substring(0,4)}}...</span>
            <span
              v-else
              style="line-height:65px;color:#373737;margin:0 20px 0 0;font-size:18px;width:90px;"
            >{{this.fullName}}</span>
            <!-- <span
              v-else
              style="line-height:65px;color:#373737;margin:0 20px 0 0;font-size:18px;width:60px;"
            >{{$store.state.user === null?this.fullName:$store.state.user}}...</span>-->
            <el-dropdown placement="bottom-start" class="ada">
              <!-- <img
                style="margin:10px 0 0 0;height:47px;width:47px"
                v-if="this.avatarUrl === ''"
                :src="require('../assets/images/156.png')"
              />-->
              <img
                style="margin:10px 0 0 0;height:47px;width:47px"
                v-if="this.$store.state.avatarUrl"
                :src="this.$store.state.avatarUrl"
              />
              <img
                style="margin:10px 0 0 0;height:47px;width:47px"
                v-else
                :src="require('../assets/images/mo.png')"
              />
              <el-dropdown-menu slot="dropdown" style="font-size:14px">
                <el-dropdown-item id="personals" @click.native="personal">个人中心</el-dropdown-item>
                <el-dropdown-item
                  id="personals"
                  style="margin:5px 0 0 0"
                  @click.native="inforchange"
                >账号设置</el-dropdown-item>
                <el-dropdown-item
                  id="personals"
                  style="margin:5px 0 0 0"
                  @click.native="detrusion"
                  command="logout"
                >退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";
import citys from "../assets/city.json";
export default {
  name: "customized-nav",
  data() {
    let self = this;
    return {
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
      visibleOne:"",
      citylist: [],
      districtlist: [],
      visible: false,
      dialogVisibleCity: false,
      fullName: "",
      avatarUrl: "",
      chorus: false,
      defaultResumeId: "",
      shown: true,
      token: "",
      notificationlist: [],
      scroll: "",

      provinces: "",
      cities: "",
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
                self.provinces = result.addressComponent.province;
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
                    result.addressComponent.adcode
                  );
                  self.$store.state.adcode = result.addressComponent.adcode;
                  self.$store.state.cityName = result.addressComponent.province;
                  window.sessionStorage.setItem(
                    "adcode",
                    result.addressComponent.adcode
                  );
                  window.sessionStorage.setItem(
                    "cityName",
                    result.addressComponent.province
                  );
                }
              });
            }
          }
        }
      ]
    };
  },
  computed: mapState({
    hasLogin(state) {
      return state.hasLogin;
    }
  }),
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll(e) {
      this.scroll = e.target.scrollTop;
    },
    //市级选择
    checkCity(item) {
      console.log(item);
      this.cities = item.tag;
    },
    //省份选择
    checkProvince(item, index) {
      this.provinces = item.tag;
      this.cities = item.children[0].tag;
      this.districtlist = item.children;
      window.sessionStorage.setItem("adcode", item.code);
      window.sessionStorage.setItem("cityName", item.tag);
      this.$store.state.adcode = item.code;
      this.$store.state.cityName = item.tag;
    },
    initList() {
      // this.value = window.sessionStorage.getItem('value')
      this.myInterval = window.setInterval(() => {
        setTimeout(() => {
          // const token = this.$store.state.token
          this.Message(); //调用接口的方法
        }, 1);
      }, 5000);
    },
    //用户通知
    notification() {
      let params = {
        isRead: null,
        pageNum: 1,
        pageSize: 10,
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .get("/consumer-notification/message", { params: params })
        .then(res => {
          if (res.data.code == "200") {
            this.notificationlist = res.data.data.list;
            let notificationlist = [];
            this.notificationlist.forEach(function(item, index) {
              if (item.isRead === false) {
                notificationlist.push(item.isRead);
              } else {
                return;
              }
            });
            this.$store.state.value = notificationlist.length;
          } else {
          }
        })
        .catch(error => {});
    },
    //消息click
    NewsDetail() {
      this.$router.push({ path: "/NewsDetail" });
    },
    //全部标记
    chorusle() {
      this.$http
        .put("/consumer-notification/message/read")
        .then(res => {
          if (res.data.code == "200") {
            this.chorus = false;
            this.notification();
          } else {
          }
        })
        .catch(error => {});
    },
    //退出
    detrusion() {
      this.$http
        .get("/consumer-user/loggedOut")
        .then(res => {
          this.$store.commit("LOGOUT");
          this.$router.push({ path: "/login" });
        })
        .catch(error => {
          this.$store.commit("LOGOUT");
          this.$router.push({ path: "/login" });
          // this.$message({
          //       message:error.response.data.message,
          //       type: 'error'
          //     })
        });
    },
    //未读
    Message() {
      this.$http
        .get("/consumer-notification/message", { params: { isRead: true } })
        .then(res => {
          if (res.data.code == 200) {
            this.notificationlist = res.data.data.list;
            this.value = res.data.data.total;
            window.sessionStorage.setItem("value", this.value);
          }
        })
        .catch(error => {});
    },
    gotoHomeUI() {
      this.$router.push({ path: "/" });
    },
    gotoLoginUI() {
      this.$router.push({ name: "login" });
    },
    gotoRegisterUI() {
      this.$router.push({ name: "register" });
    },
    inforchange() {
      this.$router.push({ path: "/inforchange" });
    },
    personal() {
      this.$router.push({ path: "/personal" });
    },
    //获取简历简讯
    brief() {
      this.$http
        .get("/consumer-core/resume/brief")
        .then(res => {
          if (res.status === 200) {
            this.defaultResumeId = res.data.data.defaultResumeId;
            console.log(res.data.data.base.fullName)
            if (res.data.data.base.fullName === null) {
              this.fullName = "";
            } else {
              this.fullName = res.data.data.base.fullName;
            }
            console.log(this.fullName.length);
            this.$store.state.avatarUrl = res.data.data.base.avatarUrl;
          } else {
          }
        })
        .catch(error => {});
    }
  },
  // //利用计算属性
  // computed: {
  //   changeMemberTab() {
  //     return this.$store.state.user;
  //   }
  // },
  created() {
    this.citylist = citys.data;
    this.districtlist = this.items.children;
    this.provinces = this.items.tag;
    this.cities = this.items.children[0].tag;
    this.token = Cookies.get("token");
    if (this.token) {
      this.brief();
      this.notification();
    } else {
    }
    this.fullName = window.sessionStorage.getItem("username");
  }
};
</script>

<style lang="stylus">
.dialogCity {
  .title {
    color: #02B9B8;
    font-size: 17px;
    text-align: left;
    margin: 0 0 0 20px;
  }

  .el-dialog__header {
    background: #02B9B8;
    height: 22px;
  }

  .el-icon-close:before {
    content: '\e6db';
    color: #ffffff;
  }

  .el-dialog__body {
    height: 240px;
  }
}

.nav-body {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
  width: 1440px;
  min-width: 1024px;
  height: 100%;

  img {
    height: 40px;
    margin: 0 0 0 96px;
    cursor: pointer;
  }

  .menu {
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: flex-end;
    align-items: center;

    .group {
      display: flex;
      height: 100%;
      flex: 1;
      margin: 0 auto;
      font-family: 'PingFangSC-Regular';

      a {
        color: #838383;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;

        &.router-link-active {
          color: #02B9B8;
          font-family: PingFangSC-Medium;
          border-bottom: 2px solid #02B9B8;

          span {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .user-operations {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      margin: 0 126px 0 0;
    }

    .personals {
      background: red;
    }

    .badge {
      border: 1px solid red;
    }

    img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      margin: 17px 0 0 0;
    }

    .btn-set {
      margin: 0 65px 0 0;

      button {
        cursor: pointer;
        font-size: 18px;
        background: none;
        border: none;
        padding: 0 38px;
        line-height: 20px;
        border-right: solid 2px lightgrey;
        height: 18px;
        color: #838383;

        &:last-child {
          border: none;
        }
      }
    }
  }
}

.navFl {
  z-index: 400;
  font-family: PingFangSC-Regular;
  background: #FFFFFF;
  opacity: 0.9;
  letter-spacing: 1.1;
  box-shadow: 0px 1px 9px #ccc;
  width: 100%;
  position: fixed;
  top: 0;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  height: 76px;
  align-content: center;
  align-items: center;
}

.navFls {
  z-index: 400;
  font-family: PingFangSC-Regular;
  background: #FFFFFF;
  opacity: 1;
  letter-spacing: 1.1;
  box-shadow: 0px 1px 9px #ccc;
  width: 100%;
  position: fixed;
  top: 0;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  height: 76px;
  align-content: center;
  align-items: center;
}
</style>
<style lang="stylus">
.badge {
  height: 40px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.badge:hover {
  background: #fafafa;
}

.el-badge__content {
  margin: 15px 0 0 0;
}

.el-dropdown-menu__item {
  background: white;
}

.el-dropdown-menu__item:hover {
  background: red;
}

#personals:hover {
  background: #f4f4f4;
  color: #6C6C6C;
}

#personals {
  color: #6C6C6C;
}
</style>
