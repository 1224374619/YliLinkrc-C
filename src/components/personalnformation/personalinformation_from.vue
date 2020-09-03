<template>
  <div class="personalinformation">
    <div class="information">
      <div>
        <img
          v-if="todo"
          style="width:80px;height:80px;border-radius:47px;margin:30px 0 78px 66px"
          :src='todo'
        />
        <img
          v-else
          style="width:80px;height:80px;border-radius:47px;margin:30px 0 78px 66px"
          :src="require('../../assets/images/mo.png')"
        />
      </div>
      <div class="informationright">
        <div class="information-first">
          <span>{{fromData.fullName}}</span>
          <span v-if="fromData.sexCode === 0">
            <img style="width:20px" :src="require('../../assets/images/nn.svg')" />
          </span>
          <span v-else>
            <img style="width:20px" :src="require('../../assets/images/n.svg')" />
          </span>
        </div>
        <div class="information-second" style="margin:20px 0 0 25px;color:#6C6C6C;font-size:18px">
          <span>现居{{fromData.district}}</span>
          <span style="margin-left:30px">|</span>
          <span style="margin-left:30px">{{fromData.age}}岁({{fromData.birthday | formatDateOne}})</span>
          <span style="margin-left:30px">|</span>
          <span style="margin-left:30px">{{fromData.politicalStatus}}</span>
          <div style="margin-top:8px">
            <span style="margin-left:15px;margin-top:10px">{{fromData.degree}}</span>
            <span style="margin-left:30px">|</span>
            <span style="margin-left:30px" v-if="fromData.workAge === 0">无工作经验</span>
            <span style="margin-left:30px" v-else>{{fromData.workAge}}年工作经验</span>
            <span style="margin-left:10px" v-if="fromData.overseasAge !== 0 &&  fromData.overseasAge !== '' ">({{fromData.overseasAge}}年海外工作经验)</span>
            <span v-else></span>
          </div>
        </div>
        <div class="information-third" style="font-size:18px;color:#6C6C6C;margin:10px 0 10px 0">
          <span>
            <i style="font-size:17px" class="el-icon-mobile-phone"></i>
            <span style="margin:0 0 0 13px;line-height:24px">{{fromData.phone}}</span>
          </span>
          <span>|</span>
          <span style="margin:0 0 0 43px">
            <i style="font-size:17px" class="el-icon-message"></i>
            <span style="margin:0 0 0 13px;">{{fromData.email}}</span>
          </span>
        </div>
      </div>
      <!-- <div style="margin:35px 0 0 0;">
              <span class="actions-span">
                  <img style="margin-right:9px;height:12px" :src="require('../assets/images/ziwo.png')"/><span @click="editsinformation" style="margin-right:3px">编辑</span> 
              </span>
      </div>-->
    </div>
  </div>
</template>
<script>
// import Moment from "moment";
import citys from '../../assets/city.json'
export default {
  name: "personalinformation_from",
  props:['fromData','todo'],
  data() {
    return {
     avatarUrl:'',
     citysal:[]
    };
  },
  filters: {
    level(level) {
      const map = ["群众", "团员", "民主党派", "预备党员", "中共党员"];
      return map[level];
    },
    levelOne(levelOne) {
      const map = ["初中及以下", "高中", "职中", "大专", "本科",'硕士','博士'];
      return map[levelOne];
    },
    levelTwo(levelTwo) {
      if(levelTwo === true) {
        return levelTwo = "应届"
      }else{
        return levelTwo = "非应届"
      }
    }
  },
  methods: {
    // brief() {
    //   this.$http
    //     .get("/resume/brief")
    //     .then(res => {
    //       if (res.data.code == 200) {

    //         this.avatarUrl = res.data.data.avatarUrl;
    //       }
    //     })
    //     // .catch(error => {
    //     // });
    // },
     //城市
      // citise() {
      //   this.$http.get("/constant/district").then(res => {
      //     if (res.data.code == 200) {
      //       this.citysal = res.data.data;
      //     }
      //   });
      // },
  },
  created() {
    this.citysal = citys.data;
    // this.brief()
  }
};
</script>
<style lang="stylus" scoped>
  .personalinformation
    .information
      display flex
      flex-direction row
      background white
      .informationright
        display flex
        flex-direction column
        margin  30px 0 10px 20px
        text-align left
        .information-first span:nth-child(1)
          float left
          color #373737
          font-size 24px
          font-weight bold
          margin 25px 0 0 15px
        .information-first span:nth-child(2)
          float left
          margin 32px 0 0 5px 
        .information-second span:nth-child(1)
          line-height 34px 
          margin 0 0 0 15px
        .information-second span:nth-child(2)
          margin 0 0 0 10px 
        .information-second span:nth-child(3)
          margin 0 0 0 10px
        .information-second span:nth-child(4)
          margin 0 0 0 10px
        .information-second span:nth-child(5)
          margin 0 0 0 10px
        .information-third span:nth-child(1)
          margin 0 0 0 43px
        .information-third span:nth-child(2)
          margin 0 0 0 43px            
    .information div:nth-child(1) 
      margin 31px 0 0 25px
    .information div:nth-child(3)   
      .actions-span
        color #1d366e
        font-size 14px
      .actions-span span:hover
        color #7d8dcd
      .actions-span span:active
        color #617dcb 
      
          
</style>
