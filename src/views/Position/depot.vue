<template>
  <div style="margin:96px 0 0 0;">
    <div class="resume-navs">
      <div>简历看板</div>
    </div>
    <div class="left-second">
      <ul>
        <li>
          <span>已上线</span>
          <span style="color:#FF7152;font-size:24px">{{positionList.onlineNum}}</span>
        </li>
        <li>
          <span>待上线</span>
          <span style="color:#FF7152;font-size:24px">{{positionList.editingNum}}</span>
        </li>
        <li>
          <span>审核中</span>
          <span style="color:#FF7152;font-size:24px">{{positionList.auditingNum}}</span>
        </li>
        <li>
          <span>审核未通过</span>
          <span style="color:#FF7152;font-size:24px">{{positionList.auditFailedNum}}</span>
        </li>
        <li>
          <span>已下线</span>
          <span style="color:#FF7152;font-size:24px">{{positionList.offlineNum}}</span>
        </li>
      </ul>
    </div>
    <div class="resume-nav">
      <div>职位列表</div>
    </div>
    <div class="resume-seconds">
      <div class="demo-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="招聘职位">
            <el-input
              placeholder="请选择日期"
              suffix-icon="el-icon-search"
              v-model="formInline.positionName"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="showForm">
            <span style="color: #FF7152;" @click="checkForm">
              收起
              <i class="el-icon-caret-top"></i>
            </span>
          </el-form-item>
          <el-form-item v-else>
            <span style="color: #FF7152;" @click="checkForm">
              展开
              <i class="el-icon-caret-bottom"></i>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <el-form
        :inline="true"
        :model="form"
        label-width="90px"
        class="demo-form-inline"
        v-if="showForm"
      >
        <el-form-item label="地区">
          <el-cascader style="width:200px" v-model="form.city" :props="props" :options="city"></el-cascader>
        </el-form-item>
        <el-form-item label="负责HR">
          <el-select v-model="form.HR" placeholder="请选择责HR">
            <el-option
              v-for="item in HRlist"
              :key="item.realName"
              :label="item.realName"
              :value="item.realName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上线时间">
          <el-date-picker
            v-model="form.onlineTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="下线时间">
          <el-date-picker
            v-model="form.offlineTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item style="display: flex;justify-content: flex-end;">
          <el-button @click="back">重置</el-button>
          <el-button @click="onSubmit" style="background:#FF7152;color:#ffffff">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:98%;margin:0 auto">
        <el-table-column prop="positionName" label="职位名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="jobType" label="职位性质" show-overflow-tooltip></el-table-column>
        <el-table-column prop="city" label="地区" show-overflow-tooltip></el-table-column>
        <el-table-column label="删除时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.recyclCountdownTime|formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="managerName" label="负责HR" show-overflow-tooltip></el-table-column>
        <el-table-column prop="recyclCountdown" label="剩余天数" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button style="color:#FF7152" @click="examing(scope.row)" type="text" size="small">查看</el-button>
            <!-- <el-button
              style="color:#FF7152"
              @click="edit(scope.row)"
              type="text"
              size="small"
            >编辑</el-button> -->
            <el-button style="color:#FF7152" @click="onlines(scope.row)" type="text" size="small">恢复</el-button>
            <el-button
              style="color:#FF7152"
              @click="deletes(scope.row)"
              type="text"
              size="small"
            >永久删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        class="pagination"
        :page-sizes="page.pageSizeOpts"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import citys from "../../assets/city.json";
import { Notification } from "element-ui";
export default {
  name: "home",
  data() {
    return {
      city: [],
      form: {
        city: [],
        onlineTime: [],
        offlineTime: [],
        HR: ""
      },
      props: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      formInline: {
        positionName: ""
      },
      positionList: {
        auditFailedNums: "",
        auditingNums: "",
        editingNums: "",
        offlineNums: "",
        onlineNums: ""
      },
      form: {
        city: [],
        onlineTime: [],
        offlineTime: [],
        HR: ""
      },
      options: [
        {
          label: "热门城市",
          options: [
            {
              value: "Shanghai",
              label: "上海"
            },
            {
              value: "Beijing",
              label: "北京"
            }
          ]
        },
        {
          label: "热门城市",
          options: [
            {
              value: "Shanghai",
              label: "上海"
            },
            {
              value: "Beijing",
              label: "北京"
            }
          ]
        }
      ],
      offlineStartTime: "",
      offlineEndTime: "",
      onlineStartTime: "",
      onlineEndTime: "",
      tableData: [],
      activeName: "first",
      showForm: true,
      HRlist: []
    };
  },
  methods: {
    //查看
    examing(tab) {
      this.$router.push({
        path: "/position/positionDetail",
        query: {
          position: tab.id
        }
      });
    },
    //获取公司HR
    ListHR() {
      this.$http
        .get("/business-core/companyAccounts/listHr")
        .then(res => {
          if (res.data.code == "200") {
            this.HRlist = res.data.data;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //列表
    platform() {
      if (this.form.offlineTime.length !== 0) {
        this.offlineStartTime = this.form.offlineTime[0].getTime();
        this.offlineEndTime = this.form.offlineTime[1].getTime();
      } else {
        this.offlineStartTime = null;
        this.offlineEndTime = null;
      }

      if (this.form.onlineTime.length !== 0) {
        this.onlineStartTime = this.form.onlineTime[0].getTime();
        this.onlineEndTime = this.form.onlineTime[1].getTime();
      } else {
        this.onlineStartTime = null;
        this.onlineEndTime = null;
      }
      let params = {
        address: this.form.city[0]
          ? {
              city: this.form.city[1],
              district: this.form.city[2],
              province: this.form.city[0]
            }
          : {
              city: null,
              district: null,
              province: null
            },
        managerName: this.form.HR ? this.form.HR : null,
        offlineTimeMax: this.offlineEndTime,
        offlineTimeMin: this.offlineStartTime,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionName: this.formInline.positionName
          ? this.formInline.positionName
          : null,
        publishedTimeMax: this.onlineEndTime,
        publishedTimeMin: this.onlineStartTime,
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post("/business-core/trash/positions/list", params)
        .then(res => {
          let responses = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = responses;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //重置
    back() {
      this.formInline = {
        positionName: ""
      };
      this.form = {
        city: [],
        onlineTime: [],
        offlineTime: [],
        HR: ""
      };
    },
    //查询
    onSubmit() {
      this.platform();
    },
    //编辑
    edit(tab) {
      this.$router.push({
        path: "/position/editPosition",
        query: {
          position: tab.id
        }
      });
    },
    //上线
    onlines(tab) {
      this.$http
        .put(`/business-core/trash/positions/${tab.id}/revert`)
        .then(res => {
          if (res.data.code == "200") {
            this.platform();
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除
    deletes(tab) {
      this.$http
        .delete(`/business-core/trash/positions/${tab.id}`)
        .then(res => {
          if (res.data.code == "200") {
            this.platform();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //职位看板
    positionBoard() {
      this.$http
        .get("/business-core/dashboard/position")
        .then(res => {
          let responses = res.data.data;
          if (res.data.code == "200") {
            this.positionList = responses;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      this.platform();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.platform();
    },
    checkForm() {
      this.showForm = !this.showForm;
    }
  },
  created() {
    this.city = citys.data;
    this.positionBoard();
    this.platform();
    this.ListHR();
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

  div:nth-child(1) {
    margin: 0 0 0 20px;
    font-size: 16px;
    color: #1890FF;
  }

  div:nth-child(2) {
    margin: 0 160px 0 0;
    color: #373737;
    font-size: 14px;
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

  div:nth-child(1) {
    margin: 0 0 0 20px;
    font-size: 16px;
    color: #1890FF;
  }

  div:nth-child(2) {
    margin: 0 160px 0 0;
    color: #373737;
    font-size: 14px;
  }
}

.left-second {
  width: 100%;
  height: 80px;
  background: #ffffff;
  text-align: center;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);

  ul {
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;
    padding: 0;
  }

  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 10px 0 0 0;

    span:first-child {
      line-height: 27px;
      color: #666;
      font-size: 14px;
    }

    span:last-child {
      line-height: 33px;
      font-size: 24px !important;
      color: #a3292e;
    }
  }
}

.resume-second {
  width: 100%;
  height: 80px;
  background: #ffffff;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);
  text-align: center;

  ul {
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;
    padding: 0;
  }

  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 10px 0 0 0;

    span:first-child {
      line-height: 27px;
      color: #666;
      font-size: 14px;
    }

    span:last-child {
      line-height: 33px;
      font-size: 24px !important;
      color: #a3292e;
    }
  }
}

.resume-seconds {
  width: 100%;
  height: auto;
  background: #ffffff;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);

  .tab-operations {
    position: absolute;
    margin: 7px 0 0 470px;
  }

  .demo-form {
    display: flex;
    flex-direction: row;
  }

  .line {
    margin: 0 0 0 10px;
  }
}

.demo-form-inline {
  margin: 20px 20px 0 20px;
}
</style>
