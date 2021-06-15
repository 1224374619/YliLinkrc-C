<template>
  <div class="apprasies">
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
    <div v-if="this.appraiseList.activityMode == 0">
      <div class="nav">
        <img src="../../assets/images/shang.jpg" />
      </div>
      <div class="asset">
        <div class="img">
          <img :src="this.appraiseList.activityPosterUrl" />
        </div>
        <div class="content">
          <div>{{this.appraiseList.activityName}}</div>
          <div>
            <button
              v-if="this.appraiseList.activityRegistrationState === 'REGISTRATION_NOT_STARTED'"
              style="margin:14px 0 0 0;pointer-events: none;"
            >未开始</button>
            <button
              v-else-if="this.appraiseList.activityRegistrationState === 'REGISTRATION_IN_PROGRESS'"
              style="margin:14px 0 0 0;pointer-events: none;"
            >进行中</button>
            <button v-else style="margin:14px 0 0 0;pointer-events: none;">已截止</button>
          </div>
          <div>
            <div>
              <img src="../../assets/images/time.png" />
            </div>
            <div>
              <span>活动时间：{{this.appraiseList.activityStartTime|formatDateFourth}}-{{this.appraiseList.activityEndTime|formatDateFourth}}</span>
            </div>
          </div>
          <div>
            <div>
              <img src="../../assets/images/address.png" />
            </div>
            <div>
              <span>报名地点：线上</span>
            </div>
          </div>
          <div>
            <div>
              <img src="../../assets/images/person.png" />
            </div>
            <div>
              <span>报名人数：{{this.appraiseList.registeredNum}} / {{this.appraiseList.registrationNum}}</span>
            </div>
          </div>
        </div>
        <div class="bans">
          <div v-if="this.appraiseList.activityRegistrationState === 'REGISTRATION_NOT_STARTED'">
            <button style="pointer-events: none;" @click="enlist()" class="appraises-button">报名未开始</button>
          </div>
          <div v-if="this.appraiseList.activityRegistrationState === 'REGISTRATION_IN_PROGRESS'">
            <button
              v-if="this.appraiseList.registrationStatus === 'DID_NOT_SIGN_UP'"
              @click="enlist()"
              class="appraise-button"
            >去报名</button>
            <button
              v-else-if="this.appraiseList.registrationStatus === 'REGISTERED'"
              class="appraise-button"
              @click="abolishEnlist()"
            >取消报名</button>
            <button
              v-else-if="this.appraiseList.registrationStatus === 'CANCELED'"
              class="appraises-button"
              style="pointer-events: none;"
            >报名已取消</button>
          </div>
          <div v-if="this.appraiseList.activityRegistrationState === 'REGISTRATION_IS_UP'">
            <div v-if="this.appraiseList.registrationStatus === 'REGISTERED'">
              <button style="pointer-events: none;" class="appraises-button">已报名</button>
            </div>
            <div v-if="this.appraiseList.registrationStatus === 'DID_NOT_SIGN_UP'">
              <button style="pointer-events: none;" class="appraises-button">报名已截止</button>
            </div>
            <div v-if="this.appraiseList.registrationStatus === 'CANCELED'">
              <button style="pointer-events: none;" class="appraises-button">报名已取消</button>
            </div>
          </div>
          <!-- <div v-if="this.appraiseList.registrationStatus === 'CANCELED'">
            <button style="pointer-events: none;" class="appraises-button">报名已取消</button>
          </div>-->
        </div>
      </div>
      <div class="footer">
        <div class="img">
          <img src="../../assets/images/huo.png" />
        </div>
        <div class="content" v-html="this.appraiseList.activityContent"></div>
      </div>
      <!-- <div class="contact">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="联系人姓名">
            <el-input disabled v-model="appraiseList.contactName" placeholder></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号">
            <el-input disabled v-model="appraiseList.contactPhone" placeholder></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱" style="margin:0 70px 0 0">
            <el-input disabled v-model="appraiseList.contactEmail" placeholder></el-input>
          </el-form-item>
        </el-form>
      </div>-->
    </div>

    <div v-else>
      <div class="nav">
        <img src="../../assets/images/xia.jpg" />
      </div>
      <div class="asset">
        <div class="img">
          <img :src="this.appraiseList.activityPosterUrl" />
        </div>
        <div class="content">
          <div>{{this.appraiseList.activityName}}</div>
          <div>
            <button
              v-if="this.appraiseList.activityRegistrationState === 'REGISTRATION_NOT_STARTED'"
              style="margin:14px 0 0 0;pointer-events: none;"
            >未开始</button>
            <button
              v-else-if="this.appraiseList.activityRegistrationState === 'REGISTRATION_IN_PROGRESS'"
              style="margin:14px 0 0 0;pointer-events: none;"
            >进行中</button>
            <button v-else style="margin:14px 0 0 0;pointer-events: none;">已截止</button>
          </div>
          <div>
            <div>
              <img src="../../assets/images/time.png" />
            </div>
            <div>
              <span>活动时间：{{this.appraiseList.activityStartTime|formatDateFourth}}-{{this.appraiseList.activityEndTime|formatDateFourth}}</span>
            </div>
          </div>
          <div>
            <div>
              <img src="../../assets/images/address.png" />
            </div>
            <div>
              <span>报名地点：线上</span>
            </div>
          </div>
          <div>
            <div>
              <img src="../../assets/images/person.png" />
            </div>
            <div>
              <span>报名人数：{{this.appraiseList.registeredNum}} / {{this.appraiseList.registrationNum}}</span>
            </div>
          </div>
        </div>
        <div class="bans">
          <div v-if="this.appraiseList.activityRegistrationState === 'REGISTRATION_NOT_STARTED'">
            <button style="pointer-events: none;" @click="enlist()" class="appraises-button">报名未开始</button>
          </div>
          <div v-if="this.appraiseList.activityRegistrationState === 'REGISTRATION_IN_PROGRESS'">
            <button
              v-if="this.appraiseList.registrationStatus === 'DID_NOT_SIGN_UP'"
              @click="enlist()"
              class="appraise-button"
            >去报名</button>
            <button
              v-else-if="this.appraiseList.registrationStatus === 'REGISTERED'"
              class="appraise-button"
              @click="abolishEnlist()"
            >取消报名</button>
            <button
              v-else-if="this.appraiseList.registrationStatus === 'CANCELED'"
              class="appraises-button"
              style="pointer-events: none;"
            >报名已取消</button>
          </div>
          <div v-if="this.appraiseList.activityRegistrationState === 'REGISTRATION_IS_UP'">
            <div v-if="this.appraiseList.registrationStatus === 'REGISTERED'">
              <button style="pointer-events: none;" class="appraises-button">已报名</button>
            </div>
            <div v-if="this.appraiseList.registrationStatus === 'DID_NOT_SIGN_UP'">
              <button style="pointer-events: none;" class="appraises-button">报名已截止</button>
            </div>
            <div v-if="this.appraiseList.registrationStatus === 'CANCELED'">
              <button style="pointer-events: none;" class="appraises-button">报名已取消</button>
            </div>
          </div>
          <!-- <div v-if="this.appraiseList.registrationStatus === 'CANCELED'">
            <button style="pointer-events: none;" class="appraises-button">报名已取消</button>
          </div>-->
        </div>
      </div>
      <div class="footer">
        <div class="img">
          <img src="../../assets/images/huo.png" />
        </div>
        <div class="content" v-html="this.appraiseList.activityContent"></div>
      </div>
      <!-- <div class="contact">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="联系人姓名">
            <el-input disabled v-model="appraiseList.contactName" placeholder></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号">
            <el-input disabled v-model="appraiseList.contactPhone" placeholder></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱" style="margin:0 70px 0 0">
            <el-input disabled v-model="appraiseList.contactEmail" placeholder></el-input>
          </el-form-item>
        </el-form>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea: "",
      activityId: "",
      id: "",
      appraiseList: {},
      dialogVisible: false,
      dialogVisibles: false,
      formInline: {
        contactName: "",
        contactPhone: "",
        contactEmail: ""
      },
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
      rules: {
        surname: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 24, message: "长度在 0 到 12 个字", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 0 到 10 个字", trigger: "blur" }
        ],
        age: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 0 到 10个字", trigger: "blur" }
        ],
        position: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 0 到 10 个字", trigger: "blur" }
        ],
        record: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 0 到 10 个字", trigger: "blur" }
        ],
        school: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 0 到 10 个字", trigger: "blur" }
        ],
        major: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 5 到 10 个字", trigger: "blur" }
        ],
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
      formAttributeBodies: [
        {
          chineseName: "",
          groupId: 0,
          englishName: "",
          isNumeric: true,
          unit: null
        }
      ],
      registrationSpec: {},
      registrationSpecs: {}
    };
  },
  methods: {
    //取消报名
    abolishEnlist() {
      this.dialogVisibles = true;
      this.activityId = this.id;
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
            this.appraiseDetail();
          } else {
          }
        })
        .catch(error => {});
    },
    //去报名
    enlist() {
      this.activityId = this.id;
      this.$http
        .get(`/consumer-core/activity/form/${this.id}`)
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
                this.appraiseDetail();
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
    //获取活动详情
    appraiseDetail() {
      this.$http
        .get(`/consumer-core/activity/${this.id}`)
        .then(res => {
          if (res.data.code == 200) {
            this.appraiseList = res.data.data;
          } else {
          }
        })
        .catch(error => {});
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.appraiseDetail();
  }
};
</script>
<style lang="stylus">
img {
  height: 100%;
}

.apprasies {
  width: 1440px;
  height: auto;
  margin: 96px auto 0;

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

  .nav {
    z-index: 20;

    img {
      width: 1440px;
      height: 380px;
    }
  }

  .asset {
    width: 1248px;
    height: 370px;
    background: #FFFFFF;
    box-shadow: 0px 8px 18px 0px rgba(212, 212, 212, 0.5);
    position: relative;
    top: -150px;
    left: 96px;
    z-index: 30;
    display: flex;
    flex-direction: row;

    .img {
      width: 375px;
      height: 211px;
      margin: 79px 0 0 76px;

      img {
        width: 375px;
        height: 211px;
      }
    }

    .content {
      margin: 79px 0 0 20px;

      div:nth-child(1) {
        font-family: PingFangSC-Medium;
        color: #373737;
        font-size: 28px;
        text-align: left;
      }

      div:nth-child(2) {
        text-align: left;

        button {
          width: 113px;
          height: 29px;
          border: 1px solid rgba(50, 124, 243, 0.29);
          font-family: PingFangSC-Medium;
          color: #02B9B8;
          font-size: 18px;
          border-radius: 15px;
          background: #ffffff;
        }
      }

      div:nth-child(3) {
        display: flex;
        flex-direction: row;
        height: 20px;
        margin: 24px 0 0 0;

        img {
          width: 20px;
          height: 20px;
          margin: 0 0 7px 0;
        }

        span {
          font-family: PingFangSC-Regular;
          color: #555555;
          font-size: 16px;
          line-height: 20px;
        }
      }

      div:nth-child(4) {
        display: flex;
        flex-direction: row;
        height: 20px;
        margin: 14px 0 0 0;

        img {
          width: 20px;
          height: 20px;
          margin: 0 0 7px 0;
        }

        span {
          font-family: PingFangSC-Regular;
          color: #555555;
          font-size: 16px;
          line-height: 20px;
        }
      }

      div:nth-child(5) {
        display: flex;
        flex-direction: row;
        height: 20px;
        margin: 14px 0 0 0;

        img {
          width: 20px;
          height: 20px;
          margin: 0 0 7px 0;
        }

        span {
          font-family: PingFangSC-Regular;
          color: #555555;
          font-size: 16px;
          line-height: 20px;
        }
      }
    }

    .bans {
      margin: 163px 0 0 82px;

      .appraise-button {
        width: 90px;
        height: 44px;
        border: 0.75px solid rgba(50, 124, 243, 1);
        background: #ffffff;
        font-family: PingFangSC-Medium;
        color: #02B9B8;
        font-size: 18px;
        border-radius: 5px;
        margin: 10px 0 0 160px;
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
        margin: 10px 0 0 160px;
      }
    }
  }

  .contact {
    margin: 30px 0 30px 0;
  }

  .footer {
    position: relative;
    top: -100px;

    img {
      width: 155px;
      height: 55px;
    }

    .content {
      width: 1248px;
      word-wrap: break-word;
      margin: 30px auto;
      font-family: PingFangSC-Regular;
      color: #111111;
      font-size: 18px;
      text-align: left;
    }
  }
}
</style>