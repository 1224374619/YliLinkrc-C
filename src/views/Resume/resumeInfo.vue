<template>
  <div style="margin:96px 0 0 0;">
    <div class="resume-navs">
      <div>简历看板</div>
    </div>
    <div class="left-second">
      <ul>
        <li>
          <span>本日新增</span>
          <span style="color:#FF7152;font-size:24px">{{incrementDailys}}</span>
        </li>
        <li>
          <span>待处理</span>
          <span style="color:#FF7152;font-size:24px">{{toProcessNums}}</span>
        </li>
      </ul>
    </div>
    <div class="resume-nav">
      <div>简历列表</div>
    </div>
    <div class="resume-seconds">
      <div class="demo-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="职位名称">
            <el-input placeholder="请填写职位名称" suffix-icon="el-icon-search" @blur="search" v-model="formInline.positionName"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="tab-operations">
        <el-checkbox @change="operations">只看自己</el-checkbox>
      </div>
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handleClick"
        style="width:98%;margin:0 auto"
      >
        <el-tab-pane label="已上线职位" name="first">
          <el-table :data="tableData" style="width: 100%" @cell-click="resumeDetails">
            <el-table-column label="职位名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#FF7152">{{scope.row.positionName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="待处理简历" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#FF7152">{{scope.row.toProcessResumeNum}}</span>
              </template>
            </el-table-column>
             <el-table-column label="处理中简历" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#FF7152">{{scope.row.processingResumeNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="录用简历" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#FF7152">{{scope.row.offeredResumeNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="已入职简历" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#FF7152">{{scope.row.employedResumeNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="不合格简历" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#FF7152">{{scope.row.unqualifiedResumeNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="上线时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.onlineTime|formatDate}}</span>
              </template></el-table-column>
            <el-table-column  label="下线时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.offlineTime|formatDate}}</span>
              </template></el-table-column>
            </el-table-column>
            <el-table-column prop="city" label="地区" show-overflow-tooltip></el-table-column>
            <el-table-column prop="managerName" label="负责HR" show-overflow-tooltip></el-table-column>
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
        <el-tab-pane label="已下线职位" name="second" >
          <el-table :data="tableDataOff" style="width: 100%" @row-click="resumeDetail">
            <el-table-column label="职位名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#FF7152">{{scope.row.positionName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="未处理简历" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#FF7152">{{scope.row.toProcessResumeNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="录用简历" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#FF7152">{{scope.row.offeredResumeNum}}</span>
              </template>
            </el-table-column>
             <el-table-column label="已入职简历" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#FF7152">{{scope.row.employedResumeNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="不合格简历" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#FF7152">{{scope.row.unqualifiedResumeNum}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="上线时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.onlineTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="下线时间" show-overflow-tooltip>
               <template slot-scope="scope">
                <span>{{scope.row.offlineTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="city" label="地区" show-overflow-tooltip></el-table-column>
            <el-table-column prop="managerName" label="负责HR" show-overflow-tooltip></el-table-column>
          </el-table>
          <el-pagination
              @size-change="handleSizeChangeOff"
              @current-change="handleCurrentChangeOff"
              :current-page="page1.current"
              :page-sizes="page1.pageSizeOpts"
              class="pagination"
              :page-size="page1.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page1.total"
            ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      page1: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      tableData: [
      ],
      formInline:{
        positionName:''
      },
      tableDataOff:[],
      incrementDailys: "",
      toProcessNums: "",
      activeName: "first",
      boole:false
    };
  },
  methods: {
    //是否
    operations(tab) {
      this.boole = tab
    },
    resumeDetail(row,column,event,cell) {
      let positionId = row.positionId
      this.$router.push({name:'职位详情',query:{positionId:positionId,action:false}})
    },
    resumeDetails(row,column,event,cell) {
      let positionId = row.positionId
      this.$router.push({name:'职位详情',query:{positionId:positionId,action:true}})
    },
    //简历看板
    resumeBoard() {
      this.$http
        .get("/business-core/dashboard/resume")
        .then(res => {
          // let response = res.data.data;
          if (res.data.code == "200") {
            this.incrementDailys = res.data.data.incrementDaily;
            this.toProcessNums = res.data.data.toProcessNum;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //已上线
    resumeOnline() {
       let params = {
        pageNum: 1,
        pageSize: 10,
        positionName: this.formInline.positionName?this.formInline.positionName:null,
        self: this.boole,
        sortBy: null,
        sortOder: null
      };
      this.$http
        .get("/business-core/resume/positions/online",{params:params})
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response
            this.page.total = res.data.data.total
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //已下线
    resumeOffline() {
      let params = {
        pageNum: 1,
        pageSize: 10,
        positionName: this.formInline.positionName?this.formInline.positionName:null,
        self: this.boole,
        sortBy: null,
        sortOder: null
      };
      this.$http
        .get("/business-core/resume/positions/offline",{params:params})
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            console.log(response)
            this.tableDataOff = response
            this.page1.total = res.data.data.total
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //跳转
    handleClick (tab) {
      console.log(tab)
      if (tab.paneName === 'first') {
        this.activeName = 'first'
        this.resumeOnline()
      }else {
        this.activeName = 'second'
        this.resumeOffline()
      }
    },
    //已上线分页
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionName: this.formInline.positionName?this.formInline.positionName:null,
        self: this.boole,
        sortBy: null,
        sortOder: null
      };
      this.$http
        .get("/business-core/resume/positions/online",{params:params})
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response
            this.page.total = res.data.data.total
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChange(val) {
      this.page.current = val;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        positionName: this.formInline.positionName?this.formInline.positionName:null,
        self: false,
        sortBy: null,
        sortOder: null
      };
      this.$http
        .get("/business-core/resume/positions/offline",{params:params})
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableDataOff = response
            this.page.total = res.data.data.total
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //已下线分页
    handleSizeChangeOff(val) {
      this.page1.pageSize = val;
      this.page1.current = 1;
      let params = {
        pageNum: this.page1.current,
        pageSize: this.page1.pageSize,
        positionName: this.formInline.positionName?this.formInline.positionName:null,
        self: this.boole,
        sortBy: null,
        sortOder: null
      };
      this.$http
        .get("/business-core/resume/positions/online",{params:params})
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableDataOff = response
            this.page1.total = res.data.data.total
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChangeOff(val) {
      this.page1.current = val;
      let params = {
        pageNum: this.page1.current,
        pageSize: this.page1.pageSize,
        positionName: this.formInline.positionName?this.formInline.positionName:null,
        self: this.boole,
        sortBy: null,
        sortOder: null
      };
      this.$http
        .get("/business-core/resume/positions/offline",{params:params})
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableDataOff = response
            this.page1.total = res.data.data.total
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //搜索
    search() {
      if (this.activeName === 'first') {
        this.resumeOnline()
      }else {
        this.resumeOffline()
      }
    }
  },
  created() {
    this.resumeBoard()
    this.resumeOnline()
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
    margin: 7px 0 0 260px;
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
