<template>
  <div class="container">
    <div style="width:260px;margin: 0 auto;">
      <img src="../assets/images/error.png" />
    </div>
    <div class="aside">
      <div>
        <i class="el-icon-warning"></i>
      </div>
      <div class="text-nav">
        <span>
          由于您的公司信息未通过审核，请在企业中心提交正确信息重新进行审核。如您有疑义，
          <span style="color:#ff783b" @click="contact">请联系我们。</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    contact() {
      this.$router.push({
        path: "/contactus/contact" 
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
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
    width: 32%;
    display: flex;
    flex-direction: row;
    margin: 30px auto 300px;

    .el-icon-warning {
      color: #ff783b;
      font-size: 60px;
    }

    .text-nav {
      line-height: 30px;
      margin: 0 0 0 15px;
      font-family: PingFangSC-Medium;
      color: #111111 100%;
      font-size: 22px;
    }
  }
}
</style>