<template>
  <div class="asp">
    <div class="asp-content">
      <div class="asp-form">
        <div class="asp-table">
          <div style="margin:19px 0 0 0">
            <el-form ref="ruleForm" label-width="80px">
              <el-form-item label="职位名称">
                <span class="value">{{ ruleForm.positionName}}</span>
              </el-form-item>
              <el-form-item label="工作性质">
                <span class="value">{{ ruleForm.jobType }}</span>
              </el-form-item>
              <el-form-item label="职位分类">
                <span class="value">{{ ruleForm.positionCatalog}}</span>
              </el-form-item>
              <el-form-item label="月薪范围">
                <span class="value">{{ ruleForm.salaryMin }}-{{ruleForm.salaryMax}}K</span>
              </el-form-item>
              <el-form-item label="最低学历">
                <span class="value">{{ ruleForm.degreeMin }}</span>
              </el-form-item>
              <el-form-item label="工作年限">
                <!-- <span class="value" v-if="form.workAgeMax">{{ 1 }}年</span> -->
                <span class="value">{{ ruleForm.workAgeMin}}-{{ruleForm.workAgeMax}}年</span>
              </el-form-item>
              <el-form-item label="工作地址">
                <span class="value">{{ ruleForm.city }}</span>
              </el-form-item>
              <el-form-item label="职位描述">
                <span class="value">{{ ruleForm.description }}</span>
              </el-form-item>
              <el-form-item label="任职要求">
                <span class="value">{{ ruleForm.requirement }}</span>
              </el-form-item>
              <div class="line"></div>
              <el-form-item label="负责 HR">
                <span class="value">{{ ruleForm.manager }}</span>
              </el-form-item>
              <el-form-item label="投递邮箱">
                <span class="value">{{ ruleForm.email}}</span>
              </el-form-item>
              <el-form-item label="上线时间">
                <span class="value">{{ ruleForm.publishedTime|formatDate }}</span>
              </el-form-item>
              <el-form-item label="下线时间">
                <span class="value">{{ ruleForm.offlineTime|formatDate}}</span>
              </el-form-item>
              <el-form-item class="operations">
                <el-button @click="back">返回</el-button>
                <el-button @click="edit" type="primary" class="main">编辑</el-button>
                <!-- <el-button type="primary" class="main" @click="onSubmit">上线</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        positionName: "",
        jobType: "",
        positionCatalog: [],
        salaryMin: "",
        salaryMax: "",
        degreeMin: "",
        workAgeMin: "",
        workAgeMax: "",
        city: "",
        description: "",
        requirement: "",
        manager: "",
        email: "",
        publishedTime: "",
        offlineTime: ""
      },
      positionID: ""
    };
  },
  methods: {
    //编辑
    edit() {
      console.log('13')
      this.$router.push({
        path: "/position/editPosition",
        query: {
          position: this.positionID
        }
      });
    },
     //返回
    back() {
      this.$router.go(-1); //返回上一层
    },
    //获取职位详情
    positionDetail() {
      this.$http
        .get(`/business-core/positions/${this.positionID}`)
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.ruleForm = response;
            this.ruleForm.positionCatalog = response.catalogThird;
            this.ruleForm.city = response.workAddress.city;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted: function() {},
  updated: function() {},
  created() {
    this.positionID = this.$route.query.position;
    this.positionDetail();
  }
};
</script>
<style>
.value {
  margin-left: 40px;
}

.asp-content {
  width: 100%;
  background: #ffffff;
}
.asp-form {
  width: 98%;
  border: 1px solid #ffffff;
}
.asp-table {
  width: 100%;
  border: 1px solid #ffffff;
  background: #ffffff;
  margin: 10px 0 0 0;
}
</style>