<template>
  <div class="appraise">
    <div class="nav">
      <img src="../../assets/images/appraise.jpg" />
    </div>
    <div class="tabs">
      <el-dialog title :visible.sync="dialogVisible" width="26%">
        <div class="dialog-nav">请填写报名表单信息</div>
        <div class="dialog-line"></div>
        <div>
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
            style="font-family: PingFangSC-Regular;color: #5A5A5A;font-size:16px;margin:30px 0 0 0"
          >
            <el-form-item label="姓名" style="padding:0 40px 0 0">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="昵称" style="padding:0 40px 0 0">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机" style="padding:0 40px 0 0">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button plain>取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">提交</el-button>
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
          <el-button plain>取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </span>
      </el-dialog>
      <el-tabs v-model="activeName">
        <el-tab-pane label="线上活动" name="first">
          <div class="demo" v-if="activeDemo">
            <div style="padding:30px 0 0 20px">
              <div class="demo-aside">
                <img class="imgs" src="../../assets/images/b1.png" />
              </div>
              <div class="demo-nav">
                <img src="../../assets/images/bans.png" />
              </div>
              <div class="demo-footer">
                <div class="appraise-name">上海银领技术人才技术论坛交流会</div>
                <div class="appraise-time">
                  <div>活动时间：2020.10.10-2020.11.11</div>
                  <div>报名时间：2020.10.10-2020.11.11</div>
                  <div>报名人数：5 / 100</div>
                </div>
                <div>
                  <button class="appraise-button">去报名</button>
                </div>
              </div>
            </div>
            <div style="padding:30px 0 0 20px">
              <div class="demo-aside">
                <img class="imgs" src="../../assets/images/b1.png" />
              </div>
              <div class="demo-nav">
                <img src="../../assets/images/bans.png" />
              </div>
              <div class="demo-footer">
                <div class="appraise-name">上海银领技术人才技术论坛交流会</div>
                <div class="appraise-time">
                  <div>活动时间：2020.10.10-2020.11.11</div>
                  <div>报名时间：2020.10.10-2020.11.11</div>
                  <div>报名人数：5 / 100</div>
                </div>
                <div>
                  <button class="appraise-button">去报名</button>
                </div>
              </div>
            </div>
            <div style="padding:30px 0 0 20px">
              <div class="demo-aside">
                <img class="imgs" src="../../assets/images/b1.png" />
              </div>
              <div class="demo-nav">
                <img src="../../assets/images/bans.png" />
              </div>
              <div class="demo-footer">
                <div class="appraise-name">上海银领技术人才技术论坛交流会</div>
                <div class="appraise-time">
                  <div>活动时间：2020.10.10-2020.11.11</div>
                  <div>报名时间：2020.10.10-2020.11.11</div>
                  <div>报名人数：5 / 100</div>
                </div>
                <div>
                  <button class="appraise-button">去报名</button>
                </div>
              </div>
            </div>

            <div style="padding:30px 0 0 20px">
              <div class="demo-aside">
                <img class="imgs" src="../../assets/images/b1.png" />
              </div>
              <div class="demo-nav">
                <img src="../../assets/images/bans.png" />
              </div>
              <div class="demo-footer">
                <div class="appraise-name">上海银领技术人才技术论坛交流会</div>
                <div class="appraise-time">
                  <div>活动时间：2020.10.10-2020.11.11</div>
                  <div>报名时间：2020.10.10-2020.11.11</div>
                  <div>报名人数：5 / 100</div>
                </div>
                <div>
                  <button class="appraise-button" @click="enroll">去报名</button>
                </div>
              </div>
            </div>
            <div style="padding:30px 0 0 20px">
              <div class="demo-aside">
                <img class="imgs" src="../../assets/images/b1.png" />
              </div>
              <div class="demo-nav">
                <img src="../../assets/images/bans.png" />
              </div>
              <div class="demo-footer">
                <div class="appraise-name">上海银领技术人才技术论坛交流会</div>
                <div class="appraise-time">
                  <div>活动时间：2020.10.10-2020.11.11</div>
                  <div>报名时间：2020.10.10-2020.11.11</div>
                  <div>报名人数：5 / 100</div>
                </div>
                <div>
                  <button class="appraise-button" @click="enroll">去报名</button>
                </div>
              </div>
            </div>
            <div style="padding:30px 0 0 20px">
              <div class="demo-aside">
                <img class="imgs" src="../../assets/images/b1.png" />
              </div>
              <div class="demo-nav">
                <img src="../../assets/images/bans.png" />
              </div>
              <div class="demo-footer">
                <div class="appraise-name">上海银领技术人才技术论坛交流会</div>
                <div class="appraise-time">
                  <div>活动时间：2020.10.10-2020.11.11</div>
                  <div>报名时间：2020.10.10-2020.11.11</div>
                  <div>报名人数：5 / 100</div>
                </div>
                <div>
                  <button class="appraise-button" @click="enroll">去报名</button>
                </div>
              </div>
            </div>
            <div class="pagination">
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
          </div>
          <div class="demos" v-else>
            <img src="../../assets/images/ass.png" />
            <div>还没有可以参加的活动哦～</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="线下活动" name="second">
          <div class="demo"></div>
        </el-tab-pane>
        <el-tab-pane label="我参与的" name="third">
          <div class="demo"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      dialogVisible: false,
      dialogVisibles: false,
      activeDemo: false,
      textarea: "",
      page: {
        total: 0,
        pageSize: 5,
        current: 1,
        pageSizeOpts: [5, 10, 20]
      },
      form: {
        name: ""
      }
    };
  },
  methods: {
    enroll() {
      console.log("1313111111111");
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
    },
    handleCurrentChange(val) {
      this.page.current = val;
    }
  },
  created() {}
};
</script>

<style lang="stylus">
.appraise {
  width: 1440px;
  height: auto;
  margin: 96px auto 0;

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
        margin: -30px 0 0 0;

        .pagination {
          margin: 60px 0 90px 0;
        }

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
              margin: 110px 50px 0 0;
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
              color: #327CF3;
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
            left: 15px;
          }

          .demo-nav {
            margin: -230px 0 0 10px;
            position: relative;
            z-index: 40;
            top: 200px;
            width: 375px;
            height: 211px;
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