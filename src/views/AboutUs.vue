<template>
  <div class="inforchange">
      <el-dialog
          title=""
          :visible.sync="dialog"
          style="width:950px;margin:0 auto;"
          >
          <div style="display:flex;flex-direction:row;">
              <img style="height:18px;" :src="require('../assets/images/222.png')"/>
              <span style="font-size:14px;line-height:20px;margin:0 0 0 10px">提交成功。非常感谢您的建议，我们将尽快处理并给予您反馈。</span>
          </div>
          <div slot="footer" class="dialog-footer" style="margin-top:-30px">
              <el-button type="primary"  style="margin:0 0 0 0" @click="nextOne">确 定</el-button>
          </div>
          <div style="height:30px"></div>
      </el-dialog>
      <div class="tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="公司介绍" name="first">
            <div class="tab-cards">
              <img style='width:537px;margin:10px 0 0 0' src='../assets/images/zz.png'>
              <div style="width:649px;text-align:left;text-indent:32px;word-wrap:break-word;margin:0 0 0 62px">
                <h2>上海银领网络科技有限公司</h2>
                <p style="line-height:30px">上海银领网络科技有限公司致力于开发“银领人才”（现代高技能人才）招聘的专业网站。在5G时代到来之际，银领人才网依托互联网PC+移动端以及AI人工智能和大数据打造全新的，属于5G时代的专业招聘网站，为“既动手又动脑”的银领人才求职提供多维度、精准化的招聘服务，为中国智能制造、制造业强国提供高技能人才的支撑。</p>
                <p style="line-height:30px;text-indent:32px">我们坚持以技术为先导、以人力资源服务为载体、以三方共赢为目的的指导方针，为企业引进专业技术人才，力争在招聘服务行业开创全方位技术人才培养、招聘服务的新篇章、为国家技术工匠的招聘与储备提供便利条件。强化服务意识，提供一流的、最完善的服务。</p>
                <p style="line-height:30px;text-indent:32px">我们拥有人性化、制度化、规范化、流程化、标准化的先进管理。</p>
                <p style="line-height:30px;text-indent:32px">我们拥有众多素质高、技术好、业务强的人才和员工队伍。</p>
                <p style="line-height:30px;text-indent:32px">我们拥有自主品牌的产品和自主产品的研发队伍。</p>
                <p style="line-height:30px;text-indent:32px">我们有让银领人才真正实现“一技在手、工作我有。”的坚定目标！</p>
                
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane class="card" label="联系我们" name="second">
            <div class="cards">
              <div class="content">
                <span><img style='width:39px' src='../assets/images/company.png'></span>
                <span>公司名称</span>
                <span>上海银领网络科技有限公司</span>
              </div>
            </div>
            <div class="cards">
              <div class="content">
                <span><img style='width:39px' src='../assets/images/di.png'></span>
                <span>公司地址</span>
                <span style="width:200px;margin:25px">上海市静安区大众东朔空间1206</span>
              </div>
            </div>
            <div class="cards">
              <div class="content">
                <span><img style='width:39px' src='../assets/images/you.png'></span>
                <span>邮政编码</span>
                <span>200436</span>
              </div>
            </div>
            <div class="cards">
              <div class="content">
                <span><img style='width:39px' src='../assets/images/dian.png'></span>
                <span>联系电话</span>
                <span>021 56057115</span>
              </div>
            </div>
            <div class="cards">
              <div class="content">
                <span><img style='width:39px' src='../assets/images/xin.png'></span>
                <span>电子邮箱</span>
                <span>Nicole.yin@yinlinkrc.com</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs> 
      </div>
  </div>
  
</template>

<script>
import { swiper,swiperSlide} from 'vue-awesome-swiper'
export default {
  name: 'aboutus',
  
  data() {
    return {
      activeName: 'first',
      active:'',
      textarea:'',
      dialog:false,
      id:this.$route.params.id,
      swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          autoplay: {
                disableOnInteraction: false,
              },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
    }
  },
  methods: {
      next() {
        this.dialog = true
      },
      nextOne() {
        if(this.$store.state.token == null) {
          this.$router.push({ path: "/login" });
        }else{
          this.textarea = ''
          this.dialog = false
        }
      },
      handleActive(index) {
        this.active = index
      },
      showinforchangeback() {
          this.inforchangeLeft = false,
          this.inforchangeBack = true
      }
  },
  created() {
    if(this.id === 'false'){
      this.active = 2
    }else{
      this.active = 1
    }
  }
}
</script>

<style lang="stylus">
  .inforchange
    width 1440px
    display flex
    cursor default
    flex-direction row
    margin 96px auto 0 
    background #ffffff
    height 920px
    overflow-x hidden
    .tab 
      margin 56px 0 0 96px
      .tab-cards
        display flex
        flex-direction row
      .el-tabs__item.is-active 
        color #327cf3
      .el-tabs__item
        font-size 22px
        font-weight 800
        color #373737
      .el-tabs__active-bar  
        background-color #327cf3
      .el-tabs__content 
      .el-tab-pane
        margin 20px 0 0 0
      .card 
        display flex 
        flex-direction row
        margin 0 0 40px 0
        .cards
          width 248px
          height 300px
          border 1px solid #DEDEDE 
          margin 30px 0 0 0
          .content
            display flex 
            flex-direction column 
          .content span:nth-child(1)
            margin 84px 0 0 0  
          .content span:nth-child(2)
            margin 20px 0 0 0  
            font-size 16px 
            font-weight bold
          .content span:nth-child(3)
            margin 20px 0 0 0  
            font-size 16px 
            font-weight bold   
    .inforchange-left
      margin 90px 0 0 0
      .left
        width 180px
        height 122px
        background white
        display flex
        flex-direction column
        font-family PingFangSC-Semibold
        color #1d366e 
        font-size 16px
        font-weight 550
        .left-line
          width 180px
          border 0.5px solid #f0f0f0
          margin 8px 0 0 0
        .password
          margin 32px 0 0 0
          color #1d366e 
          text-decoration none
        .phone
          margin 8px 0 0 0
          color #1d366e 
          text-decoration none
        .active
          color #617dcb
    .inforchange-right
      background white
      margin 90px 0 0 36px
      height 900px
    .inforchange-right div:nth-child(1)
      margin 32px 49px 0 49px
      text-align left  
      font-size 18px
      color #617dcb  
    .inforchange-right div:nth-child(2)
      width 690px
      text-align left 
      font-size 13px
      color #61687c
      margin 0 49px 0 49px
    .inforchange-right div:nth-child(3)
      width 690px
      height 160px
      margin 35px 49px 0 49px
      
      font-size 13.5px
      color #61687c
      line-height 160px
    .aboutus-right
      background white
      margin 90px 0 0 36px
      height 725px
    .aboutus-right div:nth-child(1)
      margin 32px 49px 0 49px
      text-align left  
      color #617dcb  
    .aboutus-right div:nth-child(2)
      display flex
      flex-direction column
      width 690px
      text-align left 
      font-size 13px
      color #455379
      margin 20px 49px 0 49px
    .aboutus-vontent span
      padding 15px 0 0 0  
    .aboutus-right div:nth-child(3)
      width 690px
      color #61687c
    .aboutus-right div:nth-child(4)
      width 690px
      color #61687c   
      
</style>
<style lang="stylus">
  .el-input:hover  
    border-color #7d8dcd 
  .el-tabs__nav-scroll 
    height 50px
  .el-tabs__active-bar
    bottom -10px  
  .el-tabs__active-bar
    border-radius 1px 
</style>


