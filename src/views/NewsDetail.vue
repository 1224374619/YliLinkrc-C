<template>
  <div class="container">
    <div class="nav">
      <span style="margin:0 0 0 20px">消息中心</span>
    </div>
    <div class="aside">
      <div>
        <el-tabs
          v-model="activeName"
          type="card"
          @tab-click="handleClick"
          style="width:96%;margin:20px auto"
        >
          <div v-if="activeName === 'first'" class="tab-operations" @click="allRead">
            <span style="color:#FF7152;font-size:12px">全部已读</span>
            <!-- <el-button style="color:#FF7152;" type="text">全部已读</el-button> -->
          </div>
          <div v-else class="tab-operations"></div>
          <el-tab-pane label="未读消息" name="first">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="title" label="消息列表">
                <template slot-scope="scope">
                  <el-collapse>
                    <el-collapse-item
                      v-if="scope.row.title.length>22"
                      :title="`${scope.row.title.substring(0,22)}`"
                      name="1"
                    >
                      <div>{{scope.row.content}}</div>
                      <!-- <div v-else>{{scope.row.content}}</div> -->
                    </el-collapse-item>
                    <el-collapse-item v-else :title="`${scope.row.title}`" name="1">
                      <div>{{scope.row.content}}</div>
                      <!-- <div v-else>{{scope.row.content}}</div> -->
                    </el-collapse-item>
                  </el-collapse>
                </template>
              </el-table-column>
              <el-table-column prop="releaseTime" label="接收时间">
                <template slot-scope="scope">
                  <span>{{scope.row.releaseTime|formatDate}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.current"
              :page-sizes="page.pageSizeOpts"
              class="pagination"
              :page-size="page.pageSize"
              style="margin:20px 0 0 0"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="已读消息" name="second">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="title" label="消息列表">
                <template slot-scope="scope">
                  <el-collapse>
                    <el-collapse-item :title="`${scope.row.title}`" name="1">
                      <div>{{scope.row.content}}</div>
                    </el-collapse-item>
                  </el-collapse>
                </template>
              </el-table-column>
              <el-table-column prop="releaseTime" label="接收时间">
                <template slot-scope="scope">
                  <span>{{scope.row.releaseTime|formatDate}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.current"
              :page-sizes="page.pageSizeOpts"
              class="pagination"
              style="margin:20px 0 0 0"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            ></el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
      page: {
        total: 0,
        pageSize: 5,
        current: 1,
        pageSizeOpts: [5, 10, 20]
      }
    };
  },
  methods: {
    //全部已读
    allRead() {
      this.$http
        .put("/consumer-notification/message/read")
        .then(res => {
          if (res.data.code == "200") {
            this.notification();
            this.$store.state.value = 0;
          } else {
          }
        })
        .catch(error => {
          
        });
    },
    //跳转
    handleClick(tab) {
      console.log(tab);
      if (tab.paneName === "first") {
        this.activeName = "first";
        this.notification();
      } else {
        this.activeName = "second";
        this.notification();
      }
    },
    //用户通知
    notification() {
      let params = {
        isRead: this.activeName === "first" ? false : true,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .get("/consumer-notification/message", { params: params })
        .then(res => {
          if (res.data.code == "200") {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          
        });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      this.notification();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.notification();
    }
  },
  created() {
    this.notification();
  }
};
</script>

<style lang="stylus" scoped>
.container {
  margin: 0 auto;
  padding: 96px 0 0 0;
  width: 1280px;
  border: 1px solid #ffffff;
  background: #ffffff;
  overflow-y: hidden;

  .nav {
    width: 960px;
    height: 40px;
    margin: 0 auto 0px;
    background: #FAFAFA;
    font-family: PingFangSC-Medium;
    color: #327CF3;
    line-height: 40px;
    font-size: 16px;
    border: 1px solid rgba(244, 244, 244, 1);
    box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);
  }

  .tab-operations {
    margin: 0 0 10px 860px;
    z-index: 100;
  }

  .aside {
    width: 960px;
    height: auto;
    margin: 0 auto;
    background: #ffffff;
    border: 1px solid rgba(244, 244, 244, 1);
    box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);
  }
}
</style>
<style>
.el-tabs__item.is-active {
  color: #409eff;
}
</style>