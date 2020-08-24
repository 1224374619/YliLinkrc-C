<template>
  <div class="container">
    <el-dialog title :visible.sync="centerDialogVisible" :show-close="false" width="25%" center>
      <div style="text-align:center">
        <div class="loading">
          <i style="font-size:60px;color: #fabb14;" class="el-icon-warning"></i>
        </div>
        <div class="loading-text">企业审核</div>
        <div class="loading-texts">新增第一个岗位后即可开启岗位管理页</div>
        <div style="text-align:center">
          <el-button
            style="width:200px;height:40px;line-height:0px;margin:35px 0 0 0"
            type="primary"
            @click="centerDialogVisible = false"
          >新增岗位</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- <el-dialog title :visible.sync="centerDialogVisibles" :show-close="false" width="25%" center>
      <div style="text-align:center">
        <div class="loading">
          <i style="font-size:60px;color: #fabb14;" class="el-icon-warning"></i>
        </div>
        <div class="loading-text">企业审核</div>
        <div class="loading-texts">已上线岗位信息将无法被应聘者查看
待企业审核通过后即可被查看</div>
        <div style="text-align:center">
          <el-button
            style="width:200px;height:40px;line-height:0px;margin:35px 0 0 0"
            type="primary"
            @click="centerDialogVisibles = false"
          >确定</el-button>
        </div>
      </div>
    </el-dialog>-->
    <!-- <el-dialog title :visible.sync="centerDialogVisibles" :show-close="false" width="25%" center>
      <div style="text-align:center">
        <div class="loading">
          <i style="font-size:60px;color: #fabb14;" class="el-icon-warning"></i>
        </div>
        <div class="loading-texts">
          对不起，您的企业信息正在审核中，
          暂时不能发布岗位，待审核通过后恢复。
          待企业审核通过后即可被查看
        </div>
        <div style="text-align:center">
          <el-button
            style="width:100px;height:40px;line-height:0px;margin:35px 0 0 0"
            plain
            @click="centerDialogVisibles = false"
          >取消</el-button>
          <el-button
            style="width:100px;height:40px;line-height:0px;margin:35px 0 0 20px"
            type="primary"
            @click="centerDialogVisibles = false"
          >确定</el-button>
        </div>
      </div>
    </el-dialog>-->
    <!-- <el-dialog title :visible.sync="centerDialogVisibles" :show-close="false" width="25%" center>
      <div style="text-align:center">
        <div class="loading">
          <i style="font-size:60px;color: #ff503b;" class="el-icon-error"></i>
        </div>
        <div class="loading-text">审核不通过</div>
        <div class="loading-texts">纳税人识别号错误，请重新填写信息</div>
        <div style="text-align:center">
          <el-button
            style="width:200px;height:40px;line-height:0px;margin:35px 0 0 0"
            type="primary"
            @click="centerDialogVisibles = false"
          >返回修改</el-button>
        </div>
      </div>
    </el-dialog> -->
    <el-dialog title :visible.sync="centerDialogVisibles" :show-close="false" style="margin:200px 0 0 0" width="25%" center>
      <div style="text-align:center">
        <div class="loading">
          <i style="font-size:60px;color: #33c33b;" class="el-icon-success"></i>
        </div>
        <div class="loading-text">注册成功</div>
        <div class="loading-texts">企业审核将于1～3个工作日完成</div>
      </div>
    </el-dialog>
    <div style="width:260px;margin: 0 auto;">
      <img src="../assets/images/zhong.png" />
    </div>
    <div class="aside">
      <div>
        <i class="el-icon-warning"></i>
      </div>
      <div class="text-nav">
        <span>企业审核中，填写正确，完整信息将有助于加快审核进程。</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      centerDialogVisibles: true
    };
  }
};
</script>
<style lang="stylus" scoped>
.loading-text {
  font-family: PingFangSC-Medium;
  color: #111111 100%;
  font-size: 24px;
  margin: 10px 0 0 0;
}

.loading-texts {
  font-family: PingFangSC-Regular;
  color: #999999 100%;
  font-size: 18px;
  width: 80%;
  margin: 10px auto 50px;
}

.container {
  margin: 96px 0 0 0;
  width: 100%;

  img {
    width: 260px;
    height: 260px;
    margin: 180px 0 0 0;
  }

  .aside {
    height: 60px;
    width: 50%;
    display: flex;
    flex-direction: row;
    margin: 30px auto 300px;

    .el-icon-warning {
      color: #fabb14;
      font-size: 60px;
      margin: 0 0 0 150px;
    }

    .text-nav {
      line-height: 60px;
      margin: 0 0 0 15px;
      font-family: PingFangSC-Medium;
      color: #111111 100%;
      font-size: 22px;
    }
  }
}
</style>