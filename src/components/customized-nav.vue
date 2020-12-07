<template>
  <div>
    <nav>
      <div class="nav-body">
        <img style="height:40px" @click="gotoHomeUI" :src="require('../assets/images/logo.png')" />
        <!-- <span v-if="!ctlHideMenus" style="margin:5px 0 0 27px;color:#327cf3;">上海<i class="el-icon-caret-bottom"></i></span> -->
        <div class="menu">
          <div class="group" v-if="!ctlHideMenus">
            <router-link to="/home" index="1">
              <span>首页</span>
            </router-link>
            <router-link to="/joblist" index="2">
              <span>职位</span>
            </router-link>
            <router-link v-if="this.defaultResumeId === 0" to="/gap" index="3">
              <span>简历</span>
            </router-link>
            <router-link v-else to="/resume" index="3">
              <span>简历</span>
            </router-link>
            <router-link style="margin:0 0 0 20px" to="/aboutus/:id" index="4">
              <span>联系我们</span>
            </router-link>
            <router-link style="margin:0 0 0 40px" to="/appraise" index="5">
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
                      v-if="item.title.length>20"
                      style="color:#6C6C6C;font-size:14px;margin-left:24px;"
                    >{{item.title.substring(0,20)}}...</span>
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
                  style="border: 1px solid rgba(244, 244, 244, 1);box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);height:60px;display: flex;
  flex-direction: row;"
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
              style="line-height:65px;color:#373737;margin:0 20px 0 0;font-size:18px;width:60px;"
            >{{$store.state.user === null?this.fullName:$store.state.user}}</span>
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
export default {
  name: "customized-nav",
  props: {
    ctlHideMenus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fullName: "",
      avatarUrl: "",
      chorus: false,
      defaultResumeId: "",
      tok: this.$store.state.token,
      shown: true,
      token: "",
      notificationlist: []
    };
  },
  computed: mapState({
    hasLogin(state) {
      return state.hasLogin;
    }
  }),
  methods: {
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
            this.fullName = res.data.data.base.fullName;
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
  //监听执行
  watch: {
    "$store.state.avatarUrl": function(val) {},
    "$store.state.value": function(val) {}
  },
  created() {
    this.token = Cookies.get("token");
    console.log(this.token);
    if (this.token) {
      this.brief();
      this.notification();
    } else {
    }

    this.fullName = window.sessionStorage.getItem("username");
    // if (this.notificationlist.length > 0) {
    //   this.chorus = true;
    // }
  }
};
</script>

<style lang="stylus">
nav {
  z-index: 200;
  font-family: PingFangSC-Regular;
  background-color: #ffffff;
  letter-spacing: 1.1;
  box-shadow: 0px 1px 9px #ccc;
  width: 100%;
  position: fixed;
  top: 0;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  height: 96px;
  align-content: center;
  align-items: center;

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
        margin: 0 0 0 124px;
        font-family: 'PingFangSC-Regular';

        a {
          width: 115px;
          color: #838383;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;

          &.router-link-active {
            color: #327cf3;
            font-family: 'PingFangSC-Medium';
            margin: 0 0 0 0;

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
        margin: 0 96px 0 0;
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
