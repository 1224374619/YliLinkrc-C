<template>
  <div class="reset-result-container">
    <!-- <customized-nav class="nav" :ctlHideMenus="true" /> -->
    <div class="body">
      <div class="form">
        <img :src="require('../assets/images/mima.png')" />
        <p class="pOne">密码重置成功</p>
        <p class="pTwo">请重新登录</p>
        <el-button class="btn" type="primary" @click="gotoLoginUI">重新登录</el-button>
      </div>
    </div>
    <!-- <customized-footer :showSimple="true" /> -->
  </div>
</template>

<script>
// import CustomizedFooter from 'components/customized-footer.vue';
// import CustomizedNav from 'components/customized-nav.vue';

export default {
  name: 'reset-result',
  components: {
    // CustomizedFooter,
    // CustomizedNav,
  },
  data() {
    return {
     
    }
  },
  methods: {
    gotoLoginUI() {
      this.$router.push({ path: 'login' });
    },
  }
}
</script>

<style lang="stylus" scoped>
  .reset-result-container
    height 100%
    display flex
    flex-direction column
    .nav
      position relative
    .body
      display flex
      align-items center
      justify-content center
      flex 1
      position relative
      background #327cf3
      .form
        background-color white
        border-radius 5px
        display flex
        flex-direction column
        align-items center
        width 350px
        height 473px
        img
          margin 75px 0 0 0
        .pOne
          color #2C2C2C  
          font-size 20px
          font-family PingFangSC-Medium
        .pTwo
          color #565656
          font-size 14px
          font-family PingFangSC-Regular
          margin -10px 0 0 0   
        .btn
          width 270px
          height 43px
          margin 60px 0 0 0
        
</style>
