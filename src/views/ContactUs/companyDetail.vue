<template>
  <div>
    <div class="companyDetail">
      <span style="font-family: PingFangSC-Regular;
color: #333333;font-size:16px;">公司简介：</span>
      <div
        style="width:760px;border:0px solid red;height:50px;height:120px;overflow:hidden;font-size:16px;font-family: PingFangSC-Regular;
color: #111111;"
      >{{companyDetail}}</div>
    </div>
    <div class="companyDetail">
      <span style="font-family: PingFangSC-Regular;
color: #333333;font-size:16px;">发展现状：</span>
      <div
        style="width:760px;border:0px solid red;height:50px;height:120px;overflow:hidden;font-size:16px;font-family: PingFangSC-Regular;
color: #111111;"
      >{{companyDetail}}</div>
    </div>
    <div class="companyDetail">
      <span style="font-family: PingFangSC-Regular;
color: #333333;font-size:16px;">公司风采：</span>
      <div class="imgs">
          <img src="../../assets/images/3.png" />
          <img src="../../assets/images/3.png" />
          <img src="../../assets/images/3.png" />
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyDetail:
        "阿里巴巴网创立于1999年，总部设在中国上海，员工超过30000人，目前公司已在北京、广州、深圳、成都、杭州、南京、厦门、重庆、青岛、武汉、三亚、南通等95个境内城市，新加坡、首尔、香港等22个境外城市设立分支机构，在中国南通、苏格兰爱丁堡设立服务联络中心。2010年，携程旅行网战略投资台湾易游网和香港永安旅游，实现两岸三地的互通。2014年，投资途风旅行网，将触角延伸及北美洲。"
    };
  }
};
</script>

<style lang="stylus" scoped>
.companyDetail {
  margin: 40px 0 0 70px;
  display: flex;
  flex-direction: row;
  .imgs img {
      padding: 0 0 0 20px;
      width:246px;
      height:auto
  }
}
</style>