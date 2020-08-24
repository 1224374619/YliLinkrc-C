<template>
<div class="NewsDetail">
  <h2>消息中心</h2>
  <div class="NewsTab" v-if="ShowNewsTab">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未读消息" name="first">
        <div class="AllButton"><el-button style="width:150px;margin:0 20px 0 0" @click="allRead" type="primary">全部标为已读</el-button></div>
        <div>
           <el-table
            :data="tableData"
            @row-click="openDetails"
            style="width:100%;text-align:center">
            <el-table-column
              prop="title"
              label="消息标题"
              width="540">
            </el-table-column>·
            <el-table-column
              prop="releaseTime"
              label="接受时间">
              <template slot-scope="scope">{{ scope.row.releaseTime | formatDate}}</template>
            </el-table-column>
           </el-table>
        </div>
        <div style="margin:20px 0 20px 0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="page.pageSizeOpts"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已读消息" name="second">
        <div>
           <el-table
            :data="tableData"
            @row-click="openDetails"
            style="width:100%;text-align:center">
            <el-table-column
              prop="title"
              label="消息标题"
              width="540">
            </el-table-column>·
            <el-table-column
              prop="releaseTime"
              label="接受时间">
              <template slot-scope="scope">{{ scope.row.releaseTime | formatDate}}</template>
            </el-table-column>
           </el-table>
        </div>
        <div style="margin:20px 0 20px 0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="page.pageSizeOpts"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div class="DetailNews" v-if="ShowDetailNews">
    <div>
      <span>消息标题：</span>
      <span>{{news}}</span>
    </div>
    <div class="Newstextarea">
      <span>消息内容：</span>
      <span>
        <el-input
          readonly
          type="textarea"
          style="width:400px"
          placeholder="请输入内容"
          v-model="textarea2">
        </el-input>
      </span>
    </div>
    <el-button style="margin:0 0 20px 385px" @click="Back()" type="primary">返回</el-button>
  </div>
</div>
</template>

<script>
import {
  
} from "apis/account";
export default {
  name: "NewsDetail",
  props: [""],
  data() {
    return {
       page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10,20,30]
            },
      activeName: 'first',
      currentPage4: 4,
      news:'',
      textarea2:'',
      ShowDetailNews:false,
      ShowNewsTab:true,
      tableData: [{
        title:'',
        releaseTime:''
      }]
    };
  },
  methods: {
    handleClick(tab, event) {
      let tabValue =  tab.name
      if(tabValue === 'first') {
        this.$http.get('/message',{params:{isRead:false}}).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list
            this.page.total = res.data.data.total
          }
        }).catch(error =>{
          this.$message({
                message:error.response.data.message,
                type: 'error'
              })
        });
      }else {
        this.$http.get('/message',{params:{isRead:true}}).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list
            this.page.total = res.data.data.total
          }
        }).catch(error =>{
          this.$message({
                message:error.response.data.message,
                type: 'error'
              })
        });
      }
      },
    handleSizeChange() {
      },
    handleCurrentChange() {
    },
    //全部标记已读
    allRead() {
      this.$http.put('/message/read').then(res => {
        this.Message()
        }).catch(error =>{
          this.$message({
                message:error.response.data.message,
                type: 'error'
              })
        });
    },
    //未读
    Message() {
      this.$http.get('/message',{params:{isRead:false}}).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list
            this.page.total = res.data.data.total
          }
        }).catch(error =>{
          this.$message({
                message:error.response.data.message,
                type: 'error'
              })
        });
    },
    openDetails(row,column,event) {
      console.log(row,column,event)
      this.$http.get(`/message/${row.id}`).then(res => {
          if (res.data.code == 200) {
            let NewContent = res.data.data
            this.news = NewContent.title
            this.textarea2 = NewContent.content
            this.ShowDetailNews = true
            this.ShowNewsTab = false
          }
        }).catch(error =>{
          this.$message({
                message:error.response.data.message,
                type: 'error'
              })
        });
    },
    
    //返回
    Back() {
      this.ShowDetailNews = false
      this.ShowNewsTab = true
    }
  },
  created() {
    this.Message()
  }
};
</script>
<style lang="stylus">
.NewsDetail
  width 1440px
  border 1px solid white
  margin 90px 0 0 0
  background white
  h2
    text-align left
    margin 40px 0 0 96px 
  .NewsTab
    margin 26px 96px 0 96px
    .el-tabs__item
      font-size 22px
    .el-tabs__item:hover
      color #373737
    .el-tabs__active-bar  
      background-color #327cf3
    .el-tabs__item.is-active 
      color #327cf3 
    .el-tabs__content 
    .el-tab-pane
      margin 20px 0 0 0 
    .AllButton
      float right
      margin 0 0 20px 0
  .DetailNews
    text-align left
    margin 40px 0 0 96px
    font-size 16px
    color #373737
    .Newstextarea  
      display flex
      flex-direction row
      margin 20px 0 20px 0
      .el-textarea__inner
        font-size 16px 
</style>
<style lang="stylus"> 
.el-tabs__item 
  font-weight 600
.el-table th>.cell
  text-align center
  color red  
  font-size 20px
  color #373737
.el-table .cell
  text-align center
  font-size 16px
  color #373737  
</style>
