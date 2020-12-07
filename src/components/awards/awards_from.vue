<template>
  <div class="from">
    <div style="display:flex;flex-direction:row">
        <div class="fromfirst">
            <div class="fromfirst-one"><span>{{fromData.award}}</span><span style="margin:0 20px 0 20px">|</span></div>
            <div class="fromfirst-one">{{fromData.award}}证书
      <el-image
        @click="click"
        style="height:15px"
        :src="require('../../assets/images/090.png')"
        :preview-src-list="srcList"
      ></el-image></div>
        </div>
        <div class="fromsecond">
            <div class="fromfirst-two"><span>{{fromData.acquiredTime | formatDateOne}}</span></div>
        </div>
    </div>
  </div>
</template>

<script>
import {awardskeepurl} from "../../apis/account";
export default {
  name: "progect_from",
  props: ["fromData", "todo"],
  data() {
    return {
      resumesId: "",
      srcList: []
    };
  },
  created() {
    //如果后台有个人之前填的数据，需要先把数据格式化后复制给子组件，可以进行修改操作
    this.ruleForm = Object.assign({}, this.fromData);
  },
  methods: {
    click() {
      this.srcList = [];
      awardskeepurl(this.todo, this.fromData.id)
        .then(res => {
          if (res.data.code == 201) {
            this.srcList.push(res.data.data.tempUrl);
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.from
    display flex
    flex-direction column
    font-size 15px
    color #1d366e
    text-align left
    margin 0 0 10px -20px
    .fromfirst 
      margin 0 0 0 37px
      width 450px
      color #373737
      display flex
      font-size 16px
      flex-direction row
      .fromfirst-one
        margin 10px 0 0 0 
    .fromsecond 
      margin 0 0 0 20px
      .fromfirst-two
        margin 10px 0 0 -16px 
        color #666666
        font-size 16px 
</style>