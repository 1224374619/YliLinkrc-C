<template>
  <div class="from">
    <div style="margin:8px 20px 5px 30px;">{{fromData.skill}}</div>
    <div style="margin:8px 0 5px 0">|</div>
    <div style="margin:8px 20px 5px 30px;">{{fromData.level|level}}</div>
    <div style="margin:8px 0 5px 0">|</div>
    <div style="margin:8px 20px 5px 30px;">
      {{fromData.skill}}证书
      <el-image
       @click="click"
        style="height:15px"
        :src="require('../../assets/images/090.png')"
        :preview-src-list="srcList"
      ></el-image>
    </div>
  </div>
</template>

<script>
import {skilladdurl} from "../../apis/account";
const timeUtil = require('../../timeUtil.js');
export default {
  name: "progect_from",
  props: ["fromData",'todo'],
  data() {
    return {
      srcList: []
    };
  },
  filters:{
    level(level) {
      var a;
      switch (level) {
        case "NORMAL":
          a = "一般";
          break;
        case "GOOD":
          a = "良好";
          break;
        case "PROFICIENT":
          a = "熟练";
          break;
        case "MASTER":
          a = "精通";
          break;
      }
      return a;
    }
  },
  created() {
    //如果后台有个人之前填的数据，需要先把数据格式化后复制给子组件，可以进行修改操作
    this.ruleForm = Object.assign({}, this.fromData);
  },
  methods: {
    click() {
      this.srcList = [];
      skilladdurl(this.todo,this.fromData.id)
        .then(res => {
          if (res.data.code == 201) {
            this.srcList.push(res.data.data.accessUrl);
          } 
        })
        .catch(error => {
              
            });
    },
    onSubmit() {
      //如果每次保存都要存后台，就在这里写发送时间，如果需要整体保存，就在父组件整体操作
      const flag = {
        index: this.index,
        data: this.ruleForm
      };
      this.$emit("setFromList", flag);
    },
  },
  computed() {
      
  }
};
</script>

<style lang="stylus" scoped>
  .from
     display flex
     flex-direction row
     font-size 16px
     color #373737
     text-align left
     margin 0 0 0 -15px
</style>