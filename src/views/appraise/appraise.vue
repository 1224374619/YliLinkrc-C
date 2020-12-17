<template>
  <div class="appraise">
    <div class="nav">
      <el-carousel :interval="5000" height="380px">
        <el-carousel-item v-for="(item,index) in carouselImgs" :key="index">
          <img style="width:1440px;" :src="item" />
        </el-carousel-item>
      </el-carousel>
      <!-- <img src="../../assets/images/bus.jpg" /> -->
    </div>
    <div class="tabs">
      <el-dialog title :visible.sync="dialogVisible" width="26%">
        <div class="dialog-nav">请填写报名表单信息</div>
        <div class="dialog-line"></div>
        <div>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="100px"
            style="font-family: PingFangSC-Regular;color: #5A5A5A;font-size:16px;margin:30px 0 0 0"
          >
            <el-form-item
              style="padding:0 40px 0 0"
              v-for="(item, index) in this.formAttributeBodies"
              :key="index"
              :label="item.chineseName"
              :prop="item.englishName"
            >
              <el-input
                placeholder="请填写"
                style="width:234px;margin:0 35px 0 0"
                v-model="form[item.englishName]"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button plain @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="formEnroll('form')">提交</el-button>
        </span>
      </el-dialog>
      <el-dialog title :visible.sync="dialogVisibles" width="26%">
        <div class="dialog-nav">请输入活动取消原因</div>
        <div>
          <el-input
            type="textarea"
            style="width:335px;margin:20px 0 0 0"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="30"
            show-word-limit
          ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button plain @click="dialogVisibles = false">取消</el-button>
          <el-button type="primary" @click="abolishEnlists()">确定</el-button>
        </span>
      </el-dialog>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="线上活动" name="first" style="margin:50px 0 0 85px">
          <div class="demo" v-if="activeDemo">
            <div style="padding:30px 0 0 20px" v-for="(item,index) in this.tableData" :key="index">
              <div class="demo-aside">
                <img
                  class="imgs"
                  v-if="item.activityProceedState === 'HAVE_NOT_STARTED'"
                  src="../../assets/images/b1.png"
                />
                <img
                  class="imgs"
                  v-else-if="item.activityProceedState === 'UNDERWAY'"
                  src="../../assets/images/b2.png"
                />
                <img class="imgs" v-else src="../../assets/images/b3.png" />
              </div>
              <div class="demo-nav" @click="appraiseDetail(item)">
                <img :src="item.activityPosterUrl" />
              </div>
              <div class="demo-footer">
                <div class="appraise-name">{{item.activityName}}</div>
                <div class="appraise-time">
                  <div>活动时间：{{item.activityStartTime | formatDateFourth}}-{{item.activityEndTime | formatDateFourth}}</div>
                  <div>报名时间：{{item.registrationStartTime| formatDateFourth}}-{{item.registrationEndTime| formatDateFourth}}</div>
                  <div>报名人数：{{item.registeredNum}} / {{item.registrationNum}}</div>
                </div>
                <div>
                  <div v-if="item.activityRegistrationState === 'REGISTRATION_NOT_STARTED'">
                    <button
                      style="pointer-events: none;"
                      @click="enlist(item)"
                      class="appraises-button"
                    >报名未开始</button>
                  </div>
                  <div v-if="item.activityRegistrationState === 'REGISTRATION_IN_PROGRESS'">
                    <button
                      v-if="item.registrationStatus === 'DID_NOT_SIGN_UP'"
                      @click="enlist(item)"
                      class="appraise-button"
                    >去报名</button>
                    <button
                      v-else-if="item.registrationStatus === 'REGISTERED'"
                      class="appraise-button"
                      @click="abolishEnlist(item)"
                    >取消报名</button>
                    <button
                      v-else-if="item.registrationStatus === 'CANCELED'"
                      style="pointer-events: none;"
                      class="appraises-button"
                    >取消已报名</button>
                  </div>
                  <div v-if="item.activityRegistrationState === 'REGISTRATION_IS_UP'">
                    <div v-if="item.registrationStatus === 'REGISTERED'">
                      <button style="pointer-events: none;" class="appraises-button">已报名</button>
                    </div>
                    <div v-if="item.registrationStatus === 'DID_NOT_SIGN_UP'">
                      <button style="pointer-events: none;" class="appraises-button">报名已截止</button>
                    </div>
                    <div v-if="item.registrationStatus === 'CANCELED'">
                      <button style="pointer-events: none;" class="appraises-button">报名已取消</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination" v-if="activeDemo">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.current"
              :page-sizes="page.pageSizeOpts"
              class="pagination"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            ></el-pagination>
          </div>
          <div class="demos" v-else>
            <img src="../../assets/images/ass.png" />
            <div>还没有可以参加的活动哦～</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="线下活动" name="second" style="margin:50px 0 0 85px">
          <div class="demo" v-if="activeDemo">
            <div style="padding:30px 0 0 20px" v-for="(item,index) in this.tableData" :key="index">
              <div class="demo-aside">
                <img
                  class="imgs"
                  v-if="item.activityProceedState === 'HAVE_NOT_STARTED'"
                  src="../../assets/images/b1.png"
                />
                <img
                  class="imgs"
                  v-else-if="item.activityProceedState === 'UNDERWAY'"
                  src="../../assets/images/b2.png"
                />
                <img class="imgs" v-else src="../../assets/images/b3.png" />
              </div>
              <div class="demo-nav" @click="appraiseDetail(item)">
                <img :src="item.activityPosterUrl" />
              </div>
              <div class="demo-footer">
                <div class="appraise-name">{{item.activityName}}</div>
                <div class="appraise-time">
                  <div>活动时间：{{item.activityStartTime | formatDateFourth}}-{{item.activityEndTime | formatDateFourth}}</div>
                  <div>报名时间：{{item.registrationStartTime| formatDateFourth}}-{{item.registrationEndTime| formatDateFourth}}</div>
                  <div>报名人数：{{item.registeredNum}} / {{item.registrationNum}}</div>
                </div>
                <div>
                  <div v-if="item.activityRegistrationState === 'REGISTRATION_NOT_STARTED'">
                    <button
                      style="pointer-events: none;"
                      @click="enlist(item)"
                      class="appraises-button"
                    >报名未开始</button>
                  </div>
                  <div v-if="item.activityRegistrationState === 'REGISTRATION_IN_PROGRESS'">
                    <button
                      v-if="item.registrationStatus === 'DID_NOT_SIGN_UP'"
                      @click="enlist(item)"
                      class="appraise-button"
                    >去报名</button>
                    <button
                      v-else-if="item.registrationStatus === 'REGISTERED'"
                      class="appraise-button"
                      @click="abolishEnlist(item)"
                    >取消报名</button>
                  </div>
                  <div v-if="item.activityRegistrationState === 'REGISTRATION_IS_UP'">
                    <div v-if="item.registrationStatus === 'REGISTERED'">
                      <button style="pointer-events: none;" class="appraises-button">已报名</button>
                    </div>
                    <div v-if="item.registrationStatus === 'DID_NOT_SIGN_UP'">
                      <button style="pointer-events: none;" class="appraises-button">报名已截止</button>
                    </div>
                    <div v-if="item.registrationStatus === 'CANCELED'">
                      <button style="pointer-events: none;" class="appraises-button">报名已取消</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination" v-if="activeDemo">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.current"
              :page-sizes="page.pageSizeOpts"
              class="pagination"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            ></el-pagination>
          </div>
          <div class="demos" v-else>
            <img src="../../assets/images/ass.png" />
            <div>还没有可以参加的活动哦～</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我参与的" name="third" style="margin:50px 0 0 85px">
          <div class="demo" v-if="activeDemo">
            <div style="padding:30px 0 0 20px" v-for="(item,index) in this.tableData" :key="index">
              <div class="demo-aside">
                <img
                  class="imgs"
                  v-if="item.activityProceedState === 'HAVE_NOT_STARTED'"
                  src="../../assets/images/b1.png"
                />
                <img
                  class="imgs"
                  v-else-if="item.activityProceedState === 'UNDERWAY'"
                  src="../../assets/images/b2.png"
                />
                <img class="imgs" v-else src="../../assets/images/b3.png" />
              </div>
              <div class="demo-nav" @click="appraiseDetail(item)">
                <img :src="item.activityPosterUrl" />
              </div>
              <div class="demo-footer">
                <div class="appraise-name">{{item.activityName}}</div>
                <div class="appraise-time">
                  <div>活动时间：{{item.activityStartTime | formatDateFourth}}-{{item.activityEndTime | formatDateFourth}}</div>
                  <div>报名时间：{{item.registrationStartTime| formatDateFourth}}-{{item.registrationEndTime| formatDateFourth}}</div>
                  <div>报名人数：{{item.registeredNum}} / {{item.registrationNum}}</div>
                </div>
                <div>
                  <div v-if="item.activityRegistrationState === 'REGISTRATION_NOT_STARTED'">
                    <button
                      style="pointer-events: none;"
                      @click="enlist(item)"
                      class="appraises-button"
                    >报名未开始</button>
                  </div>
                  <div v-if="item.activityRegistrationState === 'REGISTRATION_IN_PROGRESS'">
                    <button
                      v-if="item.registrationStatus === 'DID_NOT_SIGN_UP'"
                      @click="enlist(item)"
                      class="appraise-button"
                    >去报名</button>
                    <button
                      v-else-if="item.registrationStatus === 'REGISTERED'"
                      class="appraise-button"
                      @click="abolishEnlist(item)"
                    >取消报名</button>
                    <button
                      v-else-if="item.registrationStatus === 'CANCELED'"
                      class="appraises-button"
                      style="pointer-events: none;"
                    >报名已取消</button>
                  </div>
                  <div v-if="item.activityRegistrationState === 'REGISTRATION_IS_UP'">
                    <div v-if="item.registrationStatus === 'REGISTERED'">
                      <button style="pointer-events: none;" class="appraises-button">已报名</button>
                    </div>
                    <div v-if="item.registrationStatus === 'DID_NOT_SIGN_UP'">
                      <button style="pointer-events: none;" class="appraises-button">报名已截止</button>
                    </div>
                    <div v-if="item.registrationStatus === 'CANCELED'">
                      <button style="pointer-events: none;" class="appraises-button">报名已取消</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination" v-if="activeDemo">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.current"
              :page-sizes="page.pageSizeOpts"
              class="pagination"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            ></el-pagination>
          </div>
          <div class="demos" v-else>
            <img src="../../assets/images/ass.png" />
            <div>还没有可以参加的活动哦～</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        surname: [{ required: true, message: "请输入", trigger: "blur" },{ min: 0, max: 12, message: "长度在 0 到 12 个字", trigger: "blur" }],
        sex: [{ required: true, message: "请输入", trigger: "blur" },{ min: 0, max: 1, message: "长度在 0 到 1 个字", trigger: "blur" }],
        age: [{ required: true, message: "请输入", trigger: "blur" },{ min: 0, max: 1, message: "长度在 0 到 1 个字", trigger: "blur" }],
        position: [{ required: true, message: "请输入", trigger: "blur" },{ min: 0, max: 10, message: "长度在 0 到 10 个字", trigger: "blur" }],
        record: [{ required: true, message: "请输入", trigger: "blur" },{ min: 0, max: 10, message: "长度在 0 到 10 个字", trigger: "blur" }],
        school: [{ required: true, message: "请输入", trigger: "blur" },{ min: 0, max: 10, message: "长度在 0 到 10 个字", trigger: "blur" }],
        major: [{ required: true, message: "请输入", trigger: "blur" },{ min: 0, max: 20, message: "长度在 5 到 20 个字", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^[1][356789][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: ["change", "blur"]
          }
        ],
        email: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+(com|cn|net|com.cn|com.tw|com.hk)$/,
            message: "邮箱格式错误",
            trigger: ["change", "blur"]
          }
        ]
      },
      carouselImgs: [
        require("../../assets/images/appraise-03.jpg"),
        require("../../assets/images/appraise-02.jpg"),
        require("../../assets/images/appraise-01.jpg")
      ],
      formAttributeBodies: [
        {
          chineseName: "",
          groupId: 0,
          englishName: "",
          isNumeric: true,
          unit: null
        }
      ],
      form: {
        surname: "",
        phone: "",
        email: "",
        sex: "",
        age: "",
        position: "",
        record: "",
        school: "",
        major: ""
      },
      registrationSpec: {},
      registrationSpecs: {},
      tableData: [],
      isParticipate: false,
      activityMode: 0,
      activeName: "first",
      dialogVisible: false,
      dialogVisibles: false,
      activeDemo: true,
      textarea: "",
      page: {
        total: 0,
        pageSize: 6,
        current: 1,
        pageSizeOpts: [6]
      },
      activityId: ""
    };
  },
  methods: {
    //活动详情
    appraiseDetail(item) {
      this.$router.push({
        path: "/appraiseDetail",
        query: { id: item.id }
      });
    },
    //取消报名
    abolishEnlist(res) {
      this.dialogVisibles = true;
      this.activityId = res.id;
    },
    abolishEnlists() {
      let params = {
        activityId: this.activityId,
        reason: this.textarea
      };
      this.$http
        .put(`/consumer-core/activity/registration`, params)
        .then(res => {
          if (res.data.code == 200) {
            this.dialogVisibles = false;
            this.textarea = "";
            this.enroll();
            this.$notify({
              title: "成功",
              message: "取消报名成功",
              type: "success"
            });
          } else {
          }
        })
        .catch(error => {});
    },
    //去报名
    enlist(res) {
      this.activityId = res.id;
      this.$http
        .get(`/consumer-core/activity/form/${res.id}`)
        .then(res => {
          if (res.data.code == 200) {
            this.dialogVisible = true;
            this.formAttributeBodies = res.data.data;
          } else {
          }
        })
        .catch(error => {});
    },
    formEnroll(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.forms();
          let params = {
            activityId: this.activityId,
            registrationSpec: this.registrationSpecs
          };
          this.$http
            .post("/consumer-core/activity/registration", params)
            .then(res => {
              if (res.data.code == 200) {
                this.dialogVisible = false;
                this.enroll();
                this.$notify({
                  title: "成功",
                  message: res.data.message,
                  type: "success"
                });
              } else {
              }
            })
            .catch(error => {
              this.dialogVisible = false;
              this.form = {
                surname: "",
                phone: "",
                email: "",
                sex: "",
                age: "",
                position: "",
                record: "",
                school: "",
                major: ""
              };
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //form
    forms() {
      this.formAttributeBodies.forEach((item, index, array) => {
        //执行代码
        this.registrationSpec[item.id] = this.form[item.englishName];
      });
      this.registrationSpecs = JSON.stringify(this.registrationSpec);
    },
    //tab切换
    handleClick(tab, event) {
      if (tab.name === "first") {
        this.activityMode = 0;
        this.isParticipate = false;
        this.enroll();
      } else if (tab.name === "second") {
        this.activityMode = 1;
        this.isParticipate = false;
        this.enroll();
      } else {
        this.activityMode = null;
        this.isParticipate = true;
        this.enroll();
      }
    },
    enroll() {
      let params = {
        activityMode: this.activityMode,
        isParticipate: this.isParticipate,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post("/consumer-core/activity/list", params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total;
            if (this.page.total === 0) {
              this.activeDemo = false;
            } else {
              this.activeDemo = true;
            }
          } else {
          }
        })
        .catch(error => {});
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      this.enroll();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.enroll();
    }
  },
  created() {
    this.enroll();
  }
};
</script>

<style lang="stylus">
.appraise {
  width: 1440px;
  height: auto;
  margin: 77px auto 0;

  .nav {
    padding: 20px 0 0 0;
  }

  .tabs {
    width: 1300px;

    .dialog-nav {
      font-family: PingFangSC-Medium;
      color: #444444;
      font-size: 18px;
      text-align: left;
      margin: 0 0 0 40px;
    }

    .dialog-line {
      width: 332px;
      border: 0.5px solid #f1f3f4;
      margin: 20px 0 0 40px;
    }

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
      background-color: #02B9B8;
      margin: 20px 0 0 0;
    }

    .el-tabs__item.is-active {
      color: #02B9B8;
    }

    .el-tabs__nav-scroll {
      margin: 0 0 0 96px;
    }

    .el-tabs {
      margin: 70px 0 0 0;
      width: 1440px;

      .pagination {
        margin: 60px 0 90px 0;
      }

      .demo {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: -30px 0 0 0;

        div {
          .demo-footer {
            background: #FFFFFF;
            border: 1px solid rgba(231, 231, 231, 1);
            width: 394px;
            height: 284px;
            border-radius: 5px;
            z-index: 30;
            margin: 120px 0 0 0;

            .appraise-name {
              font-family: PingFangSC-Medium;
              color: #373737;
              font-size: 20px;
              margin: 110px 50px 0 25px;
              text-align: left;
            }

            .appraise-time {
              font-family: PingFangSC-Regular;
              color: #888888;
              font-size: 14px;
              text-align: left;
              margin: 10px 0 0 25px;

              div {
                margin: 3px 0 0 0;
              }
            }

            .appraise-button {
              width: 90px;
              height: 44px;
              border: 0.75px solid rgba(50, 124, 243, 1);
              background: #ffffff;
              font-family: PingFangSC-Medium;
              color: #02B9B8;
              font-size: 18px;
              border-radius: 5px;
              margin: 10px 0 0 230px;
            }

            .appraises-button {
              width: 110px;
              height: 44px;
              border: 0.75px solid rgba(188, 188, 188, 1);
              background: #ffffff;
              font-family: PingFangSC-Medium;
              color: #BCBCBC;
              font-size: 18px;
              border-radius: 5px;
              margin: 10px 0 0 230px;
            }
          }

          .demo-aside {
            width: 96px;
            height: 32px;
            position: relative;
            z-index: 50;
            top: 15px;
            left: 10px;
          }

          .demo-nav {
            margin: -230px 0 0 10px;
            position: relative;
            z-index: 40;
            top: 200px;
            cursor: pointer;
            width: 375px;
            height: 211px;
            border-radius: 7px;
            box-shadow: 0px 3px 10px 0px rgba(214, 214, 214, 1);

            .demo-nav:hover {
              box-shadow: 0px 3px 10px 0px rgba(214, 214, 214, 1);
            }

            img {
              width: 375px;
              height: 211px;
              border-radius: 7px;
            }
          }
        }
      }

      .demos {
        .el-tabs__content {
          background: #ffffff;
          width: 1440px;
        }

        img {
          width: 420px;
          height: 312px;
        }

        div {
          font-family: PingFangSC-Regular;
          color: #7C7C7C;
          font-size: 16px;
          margin: 40px 0 90px 0;
        }
      }
    }
  }
}
</style>