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
              placeholder="请填写招聘职位"
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
      <div class="tab-operations">
        <el-checkbox @change="operations">只看自己</el-checkbox>
      </div>
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handleClick"
        style="width:98%;margin:0 auto"
      >
        <el-tab-pane label="已上线" name="first">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="positionName" label="职位名称" show-overflow-tooltip></el-table-column>
            <el-table-column label="下线时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.offlineTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="jobType" label="职位性质" show-overflow-tooltip></el-table-column>
            <el-table-column prop="city" label="地区" show-overflow-tooltip></el-table-column>
            <el-table-column prop="resumeNum" label="投放数量" show-overflow-tooltip></el-table-column>
            <el-table-column prop="managerName" label="负责HR" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="offlines(scope.row)"
                  type="text"
                  size="small"
                >下线</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                >刷新排名</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="待上线" name="second">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="positionName" label="职位名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="publishedTime" label="上线时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.publishedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="jobType" label="职位性质" show-overflow-tooltip></el-table-column>
            <el-table-column prop="city" label="地区" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createdTime" label="保存时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="managerName" label="负责HR" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="操作" width="90">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
                <!-- <el-button
                  style="color:#FF7152"
                  @click="edit(scope.row)"
                  type="text"
                  size="small"
                >编辑</el-button> -->
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
        </el-tab-pane>
        <el-tab-pane label="审核中" name="third">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="positionName" label="职位名称" show-overflow-tooltip></el-table-column>
            <el-table-column label="上线时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.publishedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="jobType" label="职位性质" show-overflow-tooltip></el-table-column>
            <el-table-column prop="city" label="地区" show-overflow-tooltip></el-table-column>
            <el-table-column label="保存时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.createdTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="managerName" label="负责HR" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="操作" width="90">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="deletes(scope.row)"
                  type="text"
                  size="small"
                >删除</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="审核未通过" name="fourth">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="positionName" label="职位名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobType" label="职位性质" show-overflow-tooltip></el-table-column>
            <el-table-column prop="city" label="地区" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createdTime" label="保存时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="managerName" label="负责HR" show-overflow-tooltip></el-table-column>
            <el-table-column prop="comment" label="未通过原因" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="edit(scope.row)"
                  type="text"
                  size="small"
                >编辑</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="onlines(scope.row)"
                  type="text"
                  size="small"
                >上线</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="deletes(scope.row)"
                  type="text"
                  size="small"
                >删除</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="已下线" name="fifth">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="positionName" label="职位名称" show-overflow-tooltip></el-table-column>
            <el-table-column label="上线时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.publishedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="下线时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.offlineTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="jobType" label="职位性质" show-overflow-tooltip></el-table-column>
            <el-table-column prop="city" label="地区" show-overflow-tooltip></el-table-column>
            <el-table-column prop="resumeNum" label="投递数量" show-overflow-tooltip></el-table-column>
            <el-table-column prop="managerName" label="负责HR" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="edit(scope.row)"
                  type="text"
                  size="small"
                >编辑</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="onlines(scope.row)"
                  type="text"
                  size="small"
                >上线</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="deletes(scope.row)"
                  type="text"
                  size="small"
                >删除</el-button>
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import citys from "../../assets/city.json";
export default {
  name: "home",
  data() {
    return {
      city: [],
      params: {},
      processedState: "ONLINE",
      props: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      positionList: {
        auditFailedNums: "",
        auditingNums: "",
        editingNums: "",
        offlineNums: "",
        onlineNums: ""
      },
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      form: {
        city: [],
        onlineTime: [],
        offlineTime: [],
        HR: ""
      },
      boole: false,
      formInline: {
        positionName: ""
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
    //重置
    back() {
      this.form = {
        city: [],
        onlineTime: [],
        offlineTime: [],
        HR: ""
      };
      this.formInline = {};
    },
    //查询
    onSubmit() {
      this.online();
    },
    //是否
    operations(tab) {
      this.boole = tab;
    },
    //查看
    examing(tab) {
      this.$router.push({
        path: "/position/positionDetail",
        query: {
          position: tab.id
        }
      });
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
        .put("/business-core/positions/online", {
          ids: [tab.id]
        })
        .then(res => {
          if (res.data.code == "200") {
            this.online();
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
        .delete(`/business-core/positions/${tab.id}`)
        .then(res => {
          if (res.data.code == "200") {
            this.online();
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //下线
    offlines(tab) {
      this.$http
        .put("/business-core/positions/offline", {
          ids: [tab.id]
        })
        .then(res => {
          if (res.data.code == "200") {
            this.online();
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //已上线
    online() {
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
        managerName: this.form.HR?this.form.HR:null,
        offlineTimeMax: this.offlineEndTime,
        offlineTimeMin: this.offlineStartTime,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionName: this.formInline.positionName
          ? this.formInline.positionName
          : null,
        positionState: this.processedState,
        publishedTimeMax: this.onlineEndTime,
        publishedTimeMin: this.onlineStartTime,
        self: this.boole,
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .post("/business-core/positions/search", params)
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
    //tab
    handleClick(tab) {
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
      if (tab.paneName === "first") {
        this.processedState = "ONLINE";
      } else if (tab.paneName === "second") {
        this.processedState = "WAITING";
      } else if (tab.paneName === "third") {
        this.processedState = "AUDITING";
      } else if (tab.paneName === "fourth") {
        this.processedState = "AUDIT_FAILED";
      } else {
        this.processedState = "OFFLINE";
      }
      (this.page = {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      }),
        (this.params = {
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
          offlineTimeMax: this.offlineEndTime,
          offlineTimeMin: this.offlineStartTime,
          pageNum: this.page.current,
          pageSize: this.page.pageSize,
          positionName: this.formInline.positionName
            ? this.formInline.positionName
            : null,
          positionState: this.processedState,
          publishedTimeMax: this.onlineEndTime,
          publishedTimeMin: this.onlineStartTime,
          self: this.boole,
          sortBy: null,
          sortOrder: null
        });
      this.$http
        .post("/business-core/positions/search", this.params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //已上线分页
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      this.online();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.online();
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
    resumeDetail() {
      this.$router.push({
        path: "/resume/resumelist"
      });
    },
    checkForm() {
      this.showForm = !this.showForm;
    }
  },
  created() {
    this.city = citys.data;
    this.ListHR();
    this.positionBoard();
    this.online();
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
