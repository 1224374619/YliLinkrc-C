<template>
  <div style="margin:96px 0 0 0;">
    <div class="resume-navs">
      <div>简历详情</div>
    </div>
    <div class="resume-seconds">
      <div class="resume">
        <div class="block">
          <el-avatar style="border-radius:50px" shape="square" :size="100" :src="squareUrl"></el-avatar>
        </div>
        <div class="infor">
          <div style="font-size:20px;margin:0 0 0 10px;color:#373737">{{resumeDeta.base.fullName}}</div>
          <div style="margin:15px 0 0 0">
            <span>{{resumeDeta.base.city}}</span>
            <span>|</span>
            <span>{{resumeDeta.base.degree}}</span>
            <span>|</span>
            <span>{{resumeDeta.base.workAge}}年工作经验</span>
            <span>|</span>
            <span>{{resumeDeta.base.age}}岁</span>
            <span>|</span>
            <span>{{resumeDeta.base.politicalStatus}}</span>
          </div>
          <div style="margin:5px 0 0 0">
            <span>
              <i class="el-icon-mobile-phone" style="margin:0 5px 0 0"></i>
              {{resumeDeta.base.phone}}
            </span>
            <span>|</span>
            <span>
              <i class="el-icon-message" style="margin:0 5px 0 0"></i>
              {{resumeDeta.base.email}}
            </span>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="jotension">
        <div class="title">求职意向</div>
        <div class="jotension-content">
          <div>职位类型：{{resumeDeta.target.positionCatalogs[0].third}}</div>
          <div>工作城市：{{resumeDeta.target.cities[0].province}}</div>
        </div>
        <div class="jotension-content">
          <div>企业行业：{{resumeDeta.target.industries[0].secondary}}</div>
          <div style>薪资范围：{{resumeDeta.target.salaryMin}}-{{resumeDeta.target.salaryMax}}k</div>
        </div>
        <div class="jotension-content">
          <div>求职状态：{{resumeDeta.target.jobSearchStatus}}</div>
          <div style>工作类型：{{resumeDeta.target.jobType}}</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="jotension">
        <div class="title">教育经历</div>
        <div v-for="(item,index) in resumeDeta.eduXps" :key="index">
          <div class="jotension-content">
            <div>{{item.school}}</div>
            <div>{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}</div>
          </div>
          <div class="jotension-content">
            <div>{{item.major}} | {{item.degree}} | {{ item.isUnified ? '统招' : '非统招'}}</div>
          </div>
        </div>
      </div>
      <div class="jotension">
        <div class="title">工作经历</div>
        <div v-for="(item,index) in resumeDeta.workXps" :key="index">
          <div class="jotension-content">
            <div>{{item.company}}</div>
            <div>{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}</div>
          </div>
          <div class="jotension-content">
            <div>{{item.position}} | {{item.salaryBeforeTax}}k</div>
          </div>
          <div class="jotension-content">
            <div>工作内容：{{item.description}}</div>
          </div>
        </div>
      </div>
      <div class="jotension">
        <div class="title">项目经历</div>
        <div v-for="(item,index) in resumeDeta.projects" :key="index">
          <div class="jotension-content">
            <div>{{item.project}} | {{item.company}}</div>
            <div>{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}</div>
          </div>
          <div class="jotension-content">
            <div>个人职责：{{item.duty}}</div>
          </div>
          <div class="jotension-content">
            <div>项目介绍：{{item.description}}</div>
          </div>
        </div>
      </div>
      <div class="jotension">
        <div class="title">培训经历</div>
        <div class="train-content" v-for="(item,index) in resumeDeta.trainings" :key="index">
          <div>{{item.lesson}}</div>
          <div>{{item.institution}}</div>
          <div style="margin:0 0 0 300px">{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}</div>
        </div>
      </div>
      <div class="jotension">
        <div class="title">职称等级</div>
        <div class="train-content" v-for="(item,index) in resumeDeta.qualifications" :key="index">
          <div>{{item.qual}}</div>
        </div>
      </div>
      <div class="jotension">
        <div class="title">专业技能</div>
        <div class="train-content" v-for="(item,index) in resumeDeta.skills" :key="index">
          <div>{{item.skill}}</div>
          <div>{{item.level|level}}</div>
          <!-- <div>证书附件，点击查看大图</div> -->
          <!-- <div>{{item.beginTime|formatDate}}-{{item.endTime|formatDate}}</div> -->
        </div>
      </div>
      <div class="jotension">
        <div class="title">荣誉奖项</div>
        <div class="jotension-content" v-for="(item,index) in resumeDeta.awards" :key="index">
          <div>{{item.award}}</div>
          <!-- <div>{{item.}}</div>
          <div>证书附件，点击查看大图</div>-->
          <div>{{item.acquiredTime|formatDate}}</div>
        </div>
      </div>
      <div class="jotension">
        <div class="title">自我评价</div>
        <div class="train-content">
          <div style="width:700px;">{{resumeDeta.evaluation.content}}</div>
        </div>
      </div>
      <div class="pagination" v-if="this.processedState === 'UNFIT'">
        <el-button plain @click="back">返回</el-button>
        <el-button type="text" @click="uploadFile">立即下载</el-button>
      </div>
      <div class="pagination" v-else-if="this.processedState === 'EMPLOYED'">
        <el-button plain @click="back">返回</el-button>
        <el-button type="text" @click="uploadFile">立即下载</el-button>
      </div>
      <div class="pagination" v-else-if="this.processedState === 'PROCESSING'">
        <el-button plain @click="back">返回</el-button>
        <el-button type="primary" @click="unfit">不合格</el-button>
        <el-button type="primary" @click="offer">录用</el-button>
        <el-button type="text" @click="uploadFile">立即下载</el-button>
      </div>
      <div class="pagination" v-else-if="this.processedState === 'TO_PROCESS'">
        <el-button plain @click="back">返回</el-button>
        <el-button type="primary" @click="unfit">不合格</el-button>
        <el-button type="primary" @click="info">通知面试/笔试</el-button>
        <el-button type="text" @click="uploadFile">立即下载</el-button>
      </div>
      <div class="pagination" v-else-if="this.processedState === 'OFFERED'">
        <el-button plain @click="back">返回</el-button>
        <el-button type="primary" @click="employed">确认入职</el-button>
      </div>
      <div class="pagination" v-else>
        <el-button plain @click="back">返回</el-button>
        <el-button type="primary" @click="uploadFile">立即下载</el-button>
      </div>
    </div>
    <div class="resume-nav">
      <div>操作日志</div>
    </div>
    <div class="resume-seconds">
      <el-timeline :reverse="reverse" style="margin:20px 0 0 0">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >{{activity.content}}</el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      positionId: "",
      resumeId: "",
      resumeIds: "",
      resumeIdes: "",
      resumeDeta: {},
      processedState: "",
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15"
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        }
      ],
      arrResume: [],
    };
  },
  methods: {
    uploadFile() {
      let params = {
        resumeIds: this.arrResume
      };
      let resumeList = qs.stringify(
        { resumeIds: this.arrResume },
        { arrayFormat: "repeat" }
      );
      this.$local
        .get("/business-core/resumes/dowload?" + resumeList, {
          responseType: "blob"
        })
        .then(res => {
          const disposition = res.headers["content-disposition"];
          let fileName = disposition.substring(
            disposition.indexOf("filename=") + 9,
            disposition.length
          );
          // iso8859-1的字符转换成中文
          fileName = decodeURI(escape(fileName));
          // 去掉双引号
          fileName = fileName.replace(/\"/g, "");
          const content = res.data;
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          console.log(blob);
          if (window.navigator.msSaveOrOpenBlob) {
            // console.log(2)
            navigator.msSaveBlob(blob, fileName);
          } else {
            // console.log(3)
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            //释放内存
            window.URL.revokeObjectURL(link.href);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //不合格
    unfit(tab) {
      this.$http
        .put(
          `/business-core/position/${this.positionID}/resumes/${tab.id}/unfit`
        )
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.$router.go(-1);
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //录用
    offer(tab) {
      this.$http
        .put(
          `/business-core/position/${this.positionId}/resumes/${this.resumeId}/offer`
        )
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.$router.go(-1);
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //通知面试/笔试
    info(tab) {
      this.$http
        .put(
          `/business-core/position/${this.positionId}/resumes/${this.resumeId}/info`
        )
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.$router.go(-1);
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //确认入职
    employed(tab) {
      this.$http
        .put(
          `/business-core/position/${this.positionId}/resumes/${this.resumeId}/employed`
        )
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.$router.go(-1);
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //返回
    back() {
      this.$router.go(-1); //返回上一层
    },
    resumeDetail() {
      this.$http
        .get(`/business-core/resumes/${this.resumeId}`)
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.resumeDeta = response;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    resumeDetails() {
      this.$http
        .get(`/business-core/platformTalentPool/databases/${this.resumeIds}`)
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.resumeDeta = response;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    resumeDetailes() {
      this.$http
        .get(`/business-core/CorporateTalentPool/databases/${this.resumeIdes}`)
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.resumeDeta = response;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.positionId = this.$route.query.positionId;
    this.resumeId = this.$route.query.resumeId;
    this.resumeIds = this.$route.query.resumeIds;
    this.resumeIdes = this.$route.query.resumeIdes;
    this.processedState = this.$route.query.processedState;
    if (this.resumeId) {
      this.resumeDetail();
      this.arrResume.push(this.resumeId)
    } else if (this.resumeIds) {
      this.resumeDetails();
      this.arrResume.push(this.resumeIds)
    } else {
      this.resumeDetailes();
      this.arrResume.push(this.resumeIdes)
    }
  },
  filters: {
    level(level) {
      var a;
      switch (level) {
        case "NORMAL":
          a = "一般";
          break;
        case "GOOD":
          a = "良好";
          break;
        case "PROFICIENT":
          a = "熟练";
          break;
        case "MASTER":
          a = "精通";
          break;
      }
      return a;
    }
  }
};
</script>
<style lang="stylus" scoped>
.resume-navs {
  width: 100%;
  height: 50px;
  background: #FAFAFA;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 50px;
  margin: -80px 0 0 0;

  div {
    margin: 0 0 0 20px;
    color: #1890FF;
  }
}

.resume-nav {
  width: 100%;
  height: 50px;
  background: #FAFAFA;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 50px;
  margin: 20px 0 0 0;

  div {
    margin: 0 0 0 20px;
    color: #1890FF;
  }
}

.resume-seconds {
  width: 100%;
  height: auto;
  background: #ffffff;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);
}

.resume {
  display: flex;
  flex-direction: row;

  .infor {
    margin: 22px 0 0 20px;
  }

  .infor div {
    padding: 8px 0 0 0;
    font-size: 18px;
    color: #6C6C6C;
  }

  .infor div:nth-child(2) span {
    padding: 0 0 0 10px;
  }

  .infor div:nth-child(3) span {
    padding: 0 0 0 10px;
  }

  .block {
    margin: 25px 0 0 25px;
  }
}

.line {
  width: 98%;
  border: 0.5px solid #e5e5e5;
  margin: 20px 0 0 1%;
}

.jotension {
  font-size: 15px;
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;

  .jotension-content {
    margin: 20px 0 0 35px;
    display: flex;
    flex-direction: row;
  }

  .jotension-content div:nth-child(1) {
    font-size: 16px;
    width: 600px;
    color: #5A5A5A;
  }

  .jotension-content div:nth-child(2) {
    font-size: 16px;
    width: 300px;
    color: #5A5A5A;
  }
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin: 25px 0 0 35px;
  color: #373737;
}

.train-content {
  margin: 20px 0 0 35px;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  color: #373737;
}

.train-content div:nth-child(1) {
  width: 150px;
  font-size: 16px;
  color: #373737;
}

.train-content div:nth-child(2) {
  margin: 0 0 0 0;
  width: 150px;
  font-size: 16px;
  color: #373737;
}

.train-content div:nth-child(3) {
  margin: 0 0 0 0;
  font-size: 16px;
  color: #373737;
}

.train-content div:nth-child(4) {
  margin: 0 0 0 100px;
  font-size: 16px;
  color: #373737;
}
</style>