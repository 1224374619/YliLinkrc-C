<template>
    <div class="from">
        <div style="display:flex;flex-direction:row">
            <div class="fromfirst" >
                <div class="fromfirst-one"><span>{{fromData.company}}</span></div>
                <div class="fromfirst-ones"><span>{{fromData.position}}</span><span style="margin:0 20px 0 20px">|</span><span>{{fromData.salaryBeforeTax}}K</span></div>
            </div>
            <div class="fromsecond">
                <div class="fromfirst-two"><span>{{fromData.beginTime | formatDateOne}}/{{fromData.endTime | formatDateOne}}</span></div>
            </div>
        </div>
        <div style="margin:20px 0 0 37px;color:#6D6D6D;font-size:16px">
            <span>工作内容：<span>{{fromData.description}}</span></span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'from',
        props:['fromData',''],
        data() {
            return {
                ruleForm: {
                  jobDescription: '22电动车v发射点发射点犯得上犯得上发射点',
                  branch: '技术部',
                  jobTime: '2018/12',
                  trade: 'IT',
                  companyName: '银领',
                  postName: '产品经理',
                },
            };
        },
        created () {
            //如果后台有个人之前填的数据，需要先把数据格式化后复制给子组件，可以进行修改操作
            this.ruleForm = Object.assign({},this.fromData)
        },
        methods: {
            onSubmit () {
                //如果每次保存都要存后台，就在这里写发送时间，如果需要整体保存，就在父组件整体操作
                const flag = {
                    index:this.index,
                    data:this.ruleForm
                }
                this.$emit('setFromList',flag);
            }
        }
    }
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
      width 300px
      font-size 16px
      color #373737
      .fromfirst-one
        margin 10px 0 0 0
        font-size 16px
        color #373737
      .fromfirst-ones
        margin 10px 0 0 0
        font-size 16px
        color #9D9D9D    
    .fromsecond 
      margin 0 0 0 170px
      .fromfirst-two
        margin 10px 0 0 -16px
        font-size 16px
        color #666666   
</style>