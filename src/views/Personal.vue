<template>
  <div class="personal">
    <el-dialog
      title
      :visible.sync="dialogSuccess"
      :show-close="false"
      style="width:700px;margin-left:25%;margin-top:5%;border-radius:5px"
    >
      <!-- <div style="display:flex;flex-direction:column;">
            <div>
              <img :src="require('../assets/images/pjs.png')"
          />
            </div>
            <div style="font-family: PingFangSC-Medium;color: #2C2C2C;font-size:20px">评价失败</div>
            <div style="font-family: PingFangSC-Regular;color: #565656;font-size:14px;margin:10px 0 70px 0">请稍后有重试~</div>
            <div><el-button style="width:270px;height:40px;margin:0 0 40px 0" type="primary">确定</el-button></div>
      </div>-->
      <!-- <div style="display:flex;flex-direction:column;">
        <div>
          <img :src="require('../assets/images/pjs.png')" />
        </div>
        <div style="font-family: PingFangSC-Medium;color: #2C2C2C;font-size:20px">抱歉，您已失去评价资格！</div>
        <div
          style="font-family: PingFangSC-Regular;color: #565656;font-size:14px;margin:10px 0 70px 0"
        >已失去评价资格～</div>
        <div>
          <el-button style="width:270px;height:40px;margin:0 0 40px 0" type="primary">确定</el-button>
        </div>
      </div>-->
      <div style="display:flex;flex-direction:column;">
        <div>
          <img :src="require('../assets/images/pj.png')" />
        </div>
        <div style="font-family: PingFangSC-Medium;color: #2C2C2C;font-size:20px">评价成功</div>
        <div
          style="font-family: PingFangSC-Regular;color: #565656;font-size:14px;margin:10px 0 70px 0"
        >感谢你的点评~</div>
        <div>
          <el-button
            style="width:270px;height:40px;margin:0 0 40px 0"
            @click="dialogSuccess = false"
            type="primary"
          >返回</el-button>
        </div>
      </div>
    </el-dialog>
    <div v-if="detailEvaltion">
      <div class="personal-left" v-if="appraise">
        <el-dialog title="面试邀请" style="text-align:left" :visible.sync="dialogVisible" width="30%">
          <div class="title">{{jobSeekers.jobSeekersName}}先生/女士 您好！</div>
          <div class="title">恭喜您获得面试邀请，现邀请您参加面试，面试信息如下：</div>
          <div class="content" style="margin:20px 0 0 0">
            面试公司：
            <span>{{jobSeekers.companyName}}</span>
          </div>
          <div class="content">
            面试时间：
            <span>{{jobSeekers.interviewTime|formatDateTwo}}</span>
          </div>
          <div class="content">
            面试职位：
            <span>{{jobSeekers.positionName}} {{jobSeekers.positionSalary}}</span>
          </div>
          <div class="content">
            面试地点：
            <span>{{jobSeekers.interviewAddress.detail}}</span>
          </div>
          <div class="content">
            联系人：
            <span>{{jobSeekers.contactName}}</span>
          </div>
          <div class="content">
            联系电话：
            <span>{{jobSeekers.contactPhone}}</span>
          </div>
          <div class="content">
            备注：
            <span>{{jobSeekers.interviewRemark}}</span>
          </div>
          <div class="aside">
            如有疑问或建议，可发送邮件至
            <el-tooltip placement="top" effect="light">
              <div slot="content">{{this.linktitle}}</div>
              <span
                class="tabs-read"
                :data-clipboard-text="this.textlink"
                @click="copy"
              >service@yinlinkrc.com</span>
            </el-tooltip>
          </div>
          <div class="foot">请您最晚于面试前2小时确认是否参加面试</div>
          <div
            style="margin:30px 0 0 180px"
            v-if="this.interviewStates === 'TO_CANCEL_THE_INTERVIEW'"
          >
            <el-button plain disabled>已取消</el-button>
          </div>
          <div style="margin:30px 0 0 150px" v-else>
            <el-button
              :disabled="this.interviewStates === 'TO_BE_ACCEPTED'?false:true"
              @click="refuse()"
              plain
            >拒绝</el-button>
            <el-button
              :disabled="this.interviewStates === 'TO_BE_ACCEPTED'?false:true"
              type="primary"
              @click="accept()"
            >接受</el-button>
          </div>
        </el-dialog>

        <el-dialog title style="text-align:left" :visible.sync="dialogVisibleoffer" width="30%">
          <div class="offer-title">选择面试取消原因</div>
          <div class="offer-radio">
            <el-radio v-model="radioReason" label="面试时间变更">面试时间变更</el-radio>
            <el-radio style="margin:0 0 0 30px" v-model="radioReason" label="已经接到offer">已经接到offer</el-radio>
          </div>
          <div class="offer-radio">
            <el-radio v-model="radioReason" label="面试爽约">面试爽约</el-radio>
            <el-radio style="margin:0 0 0 62px" v-model="radioReason" label="其他原因">其他原因</el-radio>
          </div>
          <div style="margin:30px 0 0 150px">
            <el-button plain @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="reasonKeep()">确认</el-button>
          </div>
        </el-dialog>

        <el-dialog title style="text-align:left" :visible.sync="dialoOffer" width="50%">
          <div style="width:100%;">
            <div style="margin:0 40px" v-html="this.detailOfferlist.content"></div>
            <div class="annex" v-if="this.detailOfferlist.attachment !== null">
              <span>附件</span>
              <a>{{this.detailOfferlist.attachment.fileName}}</a>
              <span
                @click="uploadfile(detailOfferlist.id)"
                style="margin:0 40px 0 10px;color:#ff6600;cursor:pointer"
              >下载</span>
            </div>
          </div>
          <span
            slot="footer"
            class="dialog-footer"
            v-if="this.detailOfferlist.offerStatus === 'TO_BE_ACCEPTED'"
          >
            <el-button plain @click="refuseOffer">残忍拒绝</el-button>
            <el-button style="margin:0 0 0 100px" type="primary" @click="reqKeep()">确认接受</el-button>
          </span>
          <span slot="footer" class="dialog-footer" v-else>
            <el-button plain @click="OfferBack">返回</el-button>
            <el-button
              style="margin:0 0 0 100px"
              type="info"
              disabled
            >{{this.detailOfferlist.offerStatus|levels}}</el-button>
            <!-- <el-button  type="primary" @click="reqKeep()">确认接受</el-button> -->
          </span>
        </el-dialog>

        <el-dialog title style="text-align:left" :visible.sync="dialoRefuse" width="25%">
          <div class="dialoRefuse">
            <div class="refuseReason">请输入Offer拒绝原因</div>
            <el-input
              type="textarea"
              :rows="5"
              maxlength="100"
              show-word-limit
              placeholder="请输入内容"
              v-model="OfferReason"
            ></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button plain @click="dialoRefuse = false">取 消</el-button>
            <el-button style="margin:0 0 0 100px" type="primary" @click="refuseKeepOffer()">确 认</el-button>
          </span>
        </el-dialog>

        <el-dialog title style="text-align:left" :visible.sync="dialogVisibleoutoffer" width="30%">
          <div style="text-align:center" class="offer-titles">已超出可取消面试时间</div>
          <span slot="footer" class="dialog-footer">
            <el-button
              style="margin:0 0 0 100px"
              type="primary"
              @click="dialogVisibleoutoffer = false"
            >确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title style="text-align:left" :visible.sync="dialogReceiveOffer" width="30%">
          <div style="text-align:center" class="lose-titles">恭喜您接收Offer！</div>
          <div style="text-align:center" class="lose-content">
            祝您前程似锦，一帆风顺，如果查看Offer详情信息请在
            <span style="color:#02B9B8">投递记录-已录用</span> 里面查看
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogReceiveOffer = false">知道了</el-button>
          </span>
        </el-dialog>

        <el-dialog title style="text-align:left" :visible.sync="dialogReseOffer" width="30%">
          <div style="text-align:center" class="lose-titles">您已拒绝接收Offer！</div>
          <div style="text-align:center" class="lose-content">
            如果查看Offer详情信息请在
            <span style="color:#02B9B8">投递记录-已录用</span> 里面查看
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogReseOffer = false">知道了</el-button>
          </span>
        </el-dialog>

        <el-dialog title style="text-align:left" :visible.sync="dialogVisibleloseoffer" width="30%">
          <div style="text-align:center" class="lose-titles">我们已将您的答复反馈给面试官！感谢您的使用</div>
          <div style="margin:45px 0 35px 200px">
            <el-button type="primary" @click="dialogVisible = false">知道了</el-button>
          </div>
        </el-dialog>
        <el-tabs v-model="activeName" class="personal-tabs" v-if="showTabs">
          <el-tab-pane
            :label="`投递记录（${throwNum = this.page1.total}）`"
            name="first"
            class="personal-first"
          >
            <div style="margin:0 60px 40px 0">
              <el-button
                style="margin:0 0 0 0"
                :class="this.index== 'TO_PROCESS' ? 'tabs-buttons' : 'tabs-button'"
                type="text"
                @click="Tabstatus(1)"
              >待查看</el-button>
              <el-button
                :class="this.index== 'PROCESSING' ? 'tabs-buttons' : 'tabs-button'"
                type="text"
                @click="Tabstatus(2)"
              >已查看</el-button>
              <el-dropdown>
                <el-button
                  :class="this.index== 'INTERVIEW' ? 'tabs-buttons' : 'tabs-button'"
                  @click="Tabstatus(3)"
                  type="text"
                >面试</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    @click.native="interviewstatus(1)"
                    :class="this.interviewStates== null ? 'dropdown-buttons' : 'dropdown-button'"
                  >全部</el-dropdown-item>
                  <el-dropdown-item
                    @click.native="interviewstatus(2)"
                    :class="this.interviewStates== 'TO_BE_ACCEPTED' ? 'dropdown-buttons' : 'dropdown-button'"
                  >待接收</el-dropdown-item>
                  <el-dropdown-item
                    @click.native="interviewstatus(3)"
                    :class="this.interviewStates== 'REFUSED' ? 'dropdown-buttons' : 'dropdown-button'"
                  >已拒绝</el-dropdown-item>
                  <el-dropdown-item
                    @click.native="interviewstatus(4)"
                    :class="this.interviewStates== 'TO_BE_INTERVIEWED' ? 'dropdown-buttons' : 'dropdown-button'"
                  >待面试</el-dropdown-item>
                  <el-dropdown-item
                    @click.native="interviewstatus(5)"
                    :class="this.interviewStates== 'COMPLETED' ? 'dropdown-buttons' : 'dropdown-button'"
                  >已完成</el-dropdown-item>
                  <el-dropdown-item
                    @click.native="interviewstatus(6)"
                    :class="this.interviewStates== 'TO_CANCEL_THE_INTERVIEW' ? 'dropdown-buttons' : 'dropdown-button'"
                  >取消面试</el-dropdown-item>
                  <el-dropdown-item
                    @click.native="interviewstatus(7)"
                    :class="this.interviewStates== 'HAS_BEEN_EFFECTIVE' ? 'dropdown-buttons' : 'dropdown-button'"
                  >已失效</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button
                :class="this.index== 'OFFERED' ? 'tabs-buttons' : 'tabs-button'"
                type="text"
                @click="Tabstatus(4)"
              >已录用</el-button>
              <el-button
                :class="this.index== 'UNFIT' ? 'tabs-buttons' : 'tabs-button'"
                type="text"
                @click="Tabstatus(5)"
              >不合格</el-button>
            </div>
            <div
              style="width:854px;cursor:pointer"
              class="hover"
              v-for="(list,index) in submittedList"
              :key="index"
            >
              <div class="tabs-first" @click="descVnf(list.id)">
                <span v-if="list.positionName.length > 8">
                  <el-tooltip placement="bottom" effect="light">
                    <div slot="content">{{list.positionName}}</div>
                    <span style="margin:0 0 0 0">{{list.positionName.slice(0, 8)+'...'}}</span>
                  </el-tooltip>
                </span>
                <span v-else>{{list.positionName}}</span>
                <span v-if="list.salaryMin === 35">{{list.salaryMin}}k以上</span>
                <span v-else>{{list.salaryMin}}-{{list.salaryMax}}k</span>
              </div>
              <div class="tabs-second">
                <span v-if="list.company.companyName.length > 8">
                  <el-tooltip placement="bottom" effect="light">
                    <div slot="content">{{list.company.companyName}}</div>
                    <span style="margin:0 0 0 0">{{list.company.companyName.slice(0, 8)+'...'}}</span>
                  </el-tooltip>
                </span>
                <span v-else>{{list.company.companyName}}</span>
                <span
                  v-if="list.workAgeMax == null"
                >{{list.workAddress.city}} | 10年以上 | {{list.degreeMin}}</span>
                <span
                  v-else-if="list.workAgeMin == 0"
                >{{list.workAddress.city}} | 无工作经验 | {{list.degreeMin}}</span>
                <span
                  v-else
                >{{list.workAddress.city}} | {{list.workAgeMin}}-{{list.workAgeMax}}年 | {{list.degreeMin}}</span>
                <span class="publishedTimes" v-if="list.processedState === 'INTERVIEW'">
                  {{list.updateTime|formatDateMjz}}
                  <span
                    style="font-family: PingFangSC-Regular;
                            color: #02B9B8;
                            margin-left:5px"
                  >面试</span>
                </span>
                <span class="publishedTimes" v-else-if="list.processedState === 'OFFERED'">{{list.updateTime|formatDateMjz}}<span
                    style="font-family: PingFangSC-Regular;
                            color: #02B9B8;
                            margin-left:5px"
                  >已录用</span></span>
                <span class="publishedTimes" v-else>{{list.updateTime|formatDate}}</span>
                <div class="operatedButton" v-if="list.processedState === 'INTERVIEW'">
                  <div v-if="list.interviewState === 'COMPLETED'">
                    <button v-if="list.evaluationId === 0" @click="laterM(list)" class="button">去评价</button>
                    <button v-else @click="exist(list)" class="button">去查看</button>
                  </div>

                  <div
                    v-else-if="list.interviewState === 'TO_BE_INTERVIEWED'"
                    style="margin:0 -35px 0 -113px"
                  >
                    <button
                      @click="abolish(list)"
                      style="margin-right:20px;background:white;border:1px solid #02B9B8;color:#02B9B8"
                      class="button"
                      plain
                    >取消面试</button>
                    <button class="button" @click="lookinterview(list)">查看面试</button>
                  </div>
                  <button v-else class="button" @click="lookinterview(list)">查看面试</button>
                </div>

                <div class="operatedButton" v-else-if="list.processedState === 'OFFERED'">
                  <div v-if="list.interviewState === 'COMPLETED'">
                    <button v-if="list.evaluationId === 0" @click="laterM(list)" class="button">去评价</button>
                    <button v-else @click="exist(list)" class="button">去查看</button>
                  </div>
                  <div v-else>
                    <div v-if="list.offerId === undefined">
                      <span class="publishedTime">{{list.updateTime|formatDate}}</span>
                    </div>
                    <div v-else>
                      <span
                        v-if="list.offerId === 0"
                        class="publishedTime"
                      >{{list.updateTime|formatDate}}</span>
                      <button v-else @click="examOffer(list)" class="button">查看Offer</button>
                    </div>
                  </div>
                </div>

                <div class="operatedButton" v-else-if="list.processedState === 'EMPLOYED'">
                  <div v-if="list.offerId === undefined">
                    <div v-if="list.interviewState === 'COMPLETED'">
                      <button
                        v-if="list.evaluationId === 0"
                        @click="laterM(list)"
                        class="button"
                      >去评价</button>
                      <button v-else @click="exist(list)" class="button">去查看</button>
                    </div>
                    <span v-else class="publishedTime">{{list.updateTime|formatDate}}</span>
                  </div>
                  <div v-else>
                    <span
                      v-if="list.offerId === 0"
                      class="publishedTime"
                    >{{list.updateTime|formatDate}}</span>
                    <button v-else @click="examOffer(list)" class="button">查看Offer</button>
                  </div>
                </div>

                <div class="operatedButton" v-else>
                  <span class="publishedTime">{{list.updateTime|formatDate}}</span>
                </div>
              </div>
              <div class="tabs-line"></div>
            </div>
            <div class="tabs-pagination">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="page1.current"
                :page-sizes="page1.pageSizeOpts"
                :page-size="page1.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page1.total"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="`我的收藏（${collectNum = this.page.total}）`" name="second">
            <div
              style="width:854px;cursor:pointer"
              class="hover"
              v-for="(list,index) in favoriteList"
              :key="index"
            >
              <div class="tabs-first" @click="nextjoblist(list.id)">
                <span v-if="list.positionName.length > 10">
                  <el-tooltip placement="bottom" effect="light">
                    <div slot="content">{{list.positionName}}</div>
                    <span style="margin:0 0 0 0">{{list.positionName.slice(0, 10)+'...'}}</span>
                  </el-tooltip>
                </span>
                <span v-else>{{list.positionName}}</span>
                <span v-if="list.salaryMin === 35">{{list.salaryMin}}k以上</span>
                <span v-else>{{list.salaryMin}}-{{list.salaryMax}}k</span>
              </div>
              <div class="collect-second">
                <span
                  @click="nextjoblist(list.id)"
                  class="collect-company"
                  v-if="list.company.companyName.length > 10"
                >
                  <el-tooltip placement="bottom" effect="light">
                    <div slot="content">{{list.company.companyName}}</div>
                    <span style="margin:0 0 0 0">{{list.company.companyName.slice(0, 8)+'...'}}</span>
                  </el-tooltip>
                </span>
                <span
                  @click="nextjoblist(list.id)"
                  class="collect-company"
                  v-else
                >{{list.company.companyName}}</span>
                <div style="width:500px">
                  <span
                    @click="nextjoblist(list.id)"
                    class="collect-city"
                    v-if="list.workAgeMax == null"
                  >{{list.workAddress.city}} | 10年以上 | {{list.degreeMin}}</span>
                  <span
                    @click="nextjoblist(list.id)"
                    class="collect-city"
                    v-else-if="list.workAgeMin == 0"
                  >{{list.workAddress.city}} | 无工作经验 | {{list.degreeMin}}</span>
                  <span
                    @click="nextjoblist(list.id)"
                    class="collect-city"
                    v-else
                  >{{list.workAddress.city}} | {{list.workAgeMin}}-{{list.workAgeMax}}年 | {{list.degreeMin}}</span>
                </div>

                <span class="collect-button" v-if="list.isSubmitted">
                  <el-button style="color:#02B9B8" type="text">已投递</el-button>
                </span>
                <span class="collect-button">
                  <el-button type="primary" @click="iscancel(list.id)">取消收藏</el-button>
                </span>
              </div>
              <div class="collect-line"></div>
            </div>
            <div class="collect-pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.current"
                :page-sizes="page.pageSizeOpts"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div style="font-size:15px;line-height:500px" v-if="isshowTabs">你还没有任何投递记录呦~~</div>
      </div>
      <div class="personal-left" v-else>
        <div class="personal-footer">
          <div class="personal-footers">
            <span>面试标签</span>
            <el-checkbox-group v-model="userList" size="medium" @change="groupChange">
              <el-checkbox-button label="THE_BENEFITS_PACKAGE_IS_FANTASTIC">福利待遇特别棒</el-checkbox-button>
              <el-checkbox-button label="THE_INTERVIEWER_IS_DANIEL">面试官是大牛</el-checkbox-button>
              <el-checkbox-button label="THE_ENVIRONMENT_IS_VERY_GOOD">环境非常nice</el-checkbox-button>
              <el-checkbox-button label="THE_INTERVIEWER_IS_VERY_KIND">面试官很和善</el-checkbox-button>
              <el-checkbox-button
                label="INTERVIEW_EFFICIENCY_IS_VERY_HIGH"
                style="margin:0 20px 0 0"
              >面试效率很高</el-checkbox-button>
              <el-checkbox-button label="THE_SALARY_DOES_NOT_MATCH_THE_LABEL">薪资跟标注不符</el-checkbox-button>
              <el-checkbox-button label="THE_INTERVIEWER_IS_TOO_DEMANDING">面试官太苛刻</el-checkbox-button>
              <el-checkbox-button label="THE_ENVIRONMENT_IS_SO_SO">环境一般般</el-checkbox-button>
              <el-checkbox-button label="THE_INTERVIEWER_IS_VERY_SERIOUS">面试官态度严肃</el-checkbox-button>
              <el-checkbox-button
                label="WHEN_THE_SEAS_RUN_DRY_AND_THE_ROCKS_CRUMBLE"
                style="margin:0 20px 0 0"
              >等到海枯石烂</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div class="personal-select">
          <div class="personal-selects">
            <span>面试体验</span>
            <el-rate style="margin:0 0 0 10px" show-text v-model="value2" :colors="colors"></el-rate>
          </div>
        </div>
        <div class="personal-footer">
          <div class="personal-footers" style="margin:0 0 0 0">
            <span>面试评价（选填）</span>
            <el-input
              type="textarea"
              style="width:824px"
              maxlength="300"
              show-word-limit
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请描述你的面试过程，例如：面试流程如何？面试氛围如何？最好是给其他用户一些建议…"
              v-model="textarea2"
            ></el-input>
          </div>
          <div style="margin:20px 0 0 600px">
            <el-checkbox v-model="checked">匿名评价</el-checkbox>
          </div>
        </div>
        <div class="personal-button">
          <div class="personal-buttons">
            <el-button class="button" plain @click="appraise = true">稍后评价</el-button>
            <el-button class="button" @click="evaluation" type="primary">提交评价</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="personal-left" v-else>
      <div class="personals-nav">{{evaltionDetail.positionName}} 面试</div>
      <div class="personals-aside">
        <div>
          <span>面试体验：</span>
          <span>{{evaltionDetail.interviewExperience}}.0</span>分
          <span
            style="margin:0 0 0 490px;font-family: PingFangSC-Regular;color: #8F8F8F;font-size:16px"
          >提交时间：{{evaltionDetail.createdTime|formatDateOne}}</span>
        </div>
      </div>
      <div class="personals-select">
        <div>
          <span>面试体验：</span>
          <span style="margin:0 0 0 -20px">
            <el-radio-group
              v-model="radio1"
              size="medium"
              v-for="(list,index) in evaltionDetail.evaluationInterviewLabelBodes"
              :key="index"
            >
              <el-radio-button style="padding:0 0 0 20px;" :label="list.interviewLabel|level"></el-radio-button>
            </el-radio-group>
          </span>
        </div>
      </div>
      <div class="personal-footer">
        <div class="personal-footers">
          <span>面试评价</span>
          <div
            style="width:674px;font-family: PingFangSC-Regular;color: #737373;font-size:16px;text-align:left;margin:30px 0 0 0"
          >{{this.textarea}}</div>
          <el-button style="margin:30px auto" @click="detailEvaltion = true">返回</el-button>
        </div>
      </div>
    </div>
    <div class="personal-right">
      <div class="right-nav">
        <span class="span-hover" @click="edit">编辑</span>
        <!-- <img
          v-if="this.avatarUrl == ''"
          :src="require('../assets/images/156.png')"
          style="border-radius:53px;margin:-20px auto;width:82px;"
        />-->
        <img
          :src="this.avatarUrl"
          style="border-radius:40px;margin:-20px auto;width:82px;height:82px"
        />
        <span class="span-name" v-if="showInfor">
          {{fullName}}
          <img v-if="this.sex === '0'" :src="require('../assets/images/nn.svg')" />
          <img v-else :src="require('../assets/images/n.svg')" />
        </span>
        <div v-if="showInfor" class="infor">
          <span class="span-city">现居{{city}} | {{workAge}}年工作经验 | {{age}}岁</span>
          <span class="span-type">求职状态：{{jobSearchStatus}}</span>
        </div>
        <div v-if="showWarn" style="font-size:14px;padding:40px 0 20px 0">个人信息未填写完整，快快来补充吧</div>
      </div>
      <div class="right-footer">
        <div class="footer-nav">
          <span>推荐职位</span>
          <span style="cursor:pointer" @click="next">查看更多 》</span>
        </div>
        <div
          v-if="Tjposition"
          v-for="(list,index) in positionList.slice(0, 6)"
          :key="index"
          @click="nextjoblist(list.id)"
          style="padding:0 0 5px 0"
        >
          <div class="footer-article">
            <span v-if="list.positionName.length > 10">
              <el-tooltip placement="bottom" effect="light">
                <div slot="content">{{list.positionName}}</div>
                <span style="margin:0 0 0 0">{{list.positionName.slice(0, 10)+'...'}}</span>
              </el-tooltip>
            </span>
            <span v-else>{{list.positionName}}</span>
            <span v-if="list.salaryMin === 35">{{list.salaryMin}}k以上</span>
            <span v-else>{{list.salaryMin}}-{{list.salaryMax}}k</span>
          </div>
          <div class="footer-foot">
            <span>{{list.company.companyName}}</span>

            <span>{{$CodeToTag.CodeToTag([list.workAddress.province,list.workAddress.county],citysal)[0]+$CodeToTag.CodeToTag([list.workAddress.province,list.workAddress.county],citysal)[1]}}</span>
          </div>
          <div class="footer-line"></div>
        </div>
        <div
          v-if="QSposition"
          style="color:#373737;font-size:16px;height:300px;margin:60px 0 0 0"
        >缺少推荐职位</div>
      </div>
    </div>
  </div>
</template>

<script>
import { submitted, brief, favorite, isfavorite, searched } from "apis/account";
import citys from "../assets/city.json";
import Cookies from "js-cookie";
import Clipboard from "clipboard";
export default {
  name: "personal",
  components: {},
  data() {
    return {
      detailOffer: ``,
      checked: true,
      dialoRefuse: false,
      dialogReseOffer: false,
      dialogReceiveOffer: false,
      dialoOffer: false,
      detailEvaltion: true,
      evaltionDetail: {},
      radioReason: "",
      textarea2: "",
      OfferReason: "",
      interviewStates: null,
      params: {},
      interviewparams: {},
      linktitle: "复制链接",
      textlink: "service@163.com",
      dialogVisible: false,
      dialogVisibleoffer: false,
      dialogVisibleoutoffer: false,
      dialogVisibleloseoffer: false,
      index: "TO_PROCESS",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      dialogError: false,
      dialogSuccess: false,
      textarea: "",
      value2: null,
      radio1: "",
      appraise: true,
      userList: [],
      radio: "",
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      page1: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      Tjposition: false,
      QSposition: true,
      avatarUrl: "",
      defaultResumeId: "",
      throwNum: "",
      collectNum: "",
      activeName: "first",
      activeNames: "1",
      showInfor: true,
      showWarn: true,
      showWarnone: false,
      showTabs: true,
      isshowTabs: false,
      submittedList: [],
      favoriteList: [],
      positionList: [],
      fullName: "",
      city: "",
      citysal: [],
      workAge: "",
      age: "",
      state: "",
      workState: "",
      jobSearchStatus: "",
      county: "",
      sex: "",
      degreeMin: "",
      industry: "",
      isGraduate: "",
      jobType: "",
      keyword: "",
      pageNum: 0,
      pageSize: 10,
      province: "",
      publishedInterval: "",
      salaryMax: "",
      salaryMin: "",
      size: "",
      workAgeMax: "",
      workAgeMin: "",
      jobSeekers: {
        interviewAddress: {}
      },
      interviewId: "",
      positionId: "",
      interviewLabel: [
        {
          interviewLabel: "",
          customizeInterviewTag: ""
        }
      ],
      detailOfferlist: {
        attachment: {}
      },
      offerlist: {}
    };
  },
  methods: {
    //下载
    uploadfile(res) {
      this.$http
        .get(`/consumer-core/offer/download/${res}`, {
          responseType: "blob"
        })
        .then(res => {
          console.log(res.headers);
          this.dialogVisible = false;
          const disposition = res.headers["content-disposition"];
          console.log(disposition);
          let fileName = disposition.substring(
            disposition.indexOf("filename=") + 9,
            disposition.length
          );
          // iso8859-1的字符转换成中文
          fileName = decodeURI(escape(fileName));
          console.log(fileName);
          // 去掉双引号
          fileName = fileName.replace(/\"/g, "");
          const content = res.data;
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          console.log(blob);
          if (window.navigator.msSaveOrOpenBlob) {
            // console.log(2)
            navigator.msSaveBlob(blob, fileName);
          } else {
            // console.log(3)
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            //释放内存
            window.URL.revokeObjectURL(link.href);
          }
        })
        .catch(error => {});
    },
    //offer 详情返回
    OfferBack() {
      this.dialoOffer = false;
    },
    //残忍拒绝
    refuseOffer() {
      this.dialoRefuse = true;
    },
    //职位详情
    descVnf(id) {
      this.$router.push({
        path: "/station",
        query: {
          id: id
        }
      });
    },
    refuseKeepOffer() {
      let params = {
        offerLetterId: this.offerlist.offerId,
        positionId: this.offerlist.id,
        resumeId: this.offerlist.resumeId,
        reason: this.OfferReason
      };
      this.$http
        .put(`/consumer-core/offer/refuse`, params)
        .then(res => {
          this.dialogReseOffer = true;
          this.dialoRefuse = false;
          this.dialoOffer = false;
        })
        .catch(error => {});
    },
    //确认接受
    reqKeep() {
      let params = {
        offerLetterId: this.offerlist.offerId,
        positionId: this.offerlist.id,
        resumeId: this.offerlist.resumeId
      };
      this.$http
        .put(`/consumer-core/offer/accept`, params)
        .then(res => {
          this.dialogReceiveOffer = true;
          this.dialoOffer = false;
        })
        .catch(error => {});
    },
    //查看offer
    examOffer(res) {
      this.offerlist = res;
      let params = {
        offerLetterId: res.offerId,
        positionId: res.id,
        resumeId: res.resumeId
      };
      this.dialoOffer = true;
      this.$http
        .post(`/consumer-core/offer/details`, params)
        .then(res => {
          this.detailOfferlist = res.data.data;
        })
        .catch(error => {});
    },
    //去评价
    exist(res) {
      this.positionId = res.id;
      this.interviewId = res.interviewId;
      this.detailEvaltion = false;
      this.$http
        .get(`/consumer-core/interview/evaluation/${this.interviewId}`)
        .then(res => {
          this.evaltionDetail = res.data.data;
          this.textarea = res.data.data.content;
        })
        .catch(error => {});
    },
    groupChange() {
      if (this.userList.length > 3) {
        this.userList.shift();
      }
    },
    //稍后评论
    laterM(res) {
      this.interviewId = res.interviewId;
      this.appraise = false;
    },
    evaluation() {
      this.userList.forEach((item, index, array) => {
        this.interviewLabel[index] = {
          interviewLabel: array[index],
          customizeInterviewTag: null
        };
      });
      let params = {
        content: this.textarea2,
        evaluationInterviewLabelBodes: this.interviewLabel,
        interviewExperience: this.value2,
        isAnonymous: this.checked,
        parentId: 0,
        positionId: this.positionId
      };
      this.$http
        .put(`/consumer-core/interview/evaluation/${this.interviewId}`, params)
        .then(res => {
          this.dialogSuccess = true;
          this.appraise = true;
          this.userList = [];
          this.value2 = "";
          this.textarea2 = "";
          this.interviewstatus(1);
        })

        .catch(error => {});
    },
    //取消面试
    abolish(res) {
      this.interviewId = res.interviewId;
      this.dialogVisibleoffer = true;
    },
    reasonKeep() {
      let params = {
        reason: this.radioReason
      };
      this.$http
        .put(`/consumer-core/interview/cancel/${this.interviewId}`, params)
        .then(res => {
          this.dialogVisibleoffer = false;
          submitted(this.interviewparams).then(res => {
            if (res.data.code == 200) {
              this.submittedList = res.data.data.list;
              this.page1.total = res.data.data.total;
            }
          });
        })
        .catch(error => {});
    },
    //拒绝面试
    refuse() {
      this.$http
        .put(`/consumer-core/interview/refused/${this.interviewId}`)
        .then(res => {
          this.dialogVisible = false;
          this.dialogVisibleloseoffer = true;
          submitted(this.interviewparams).then(res => {
            if (res.data.code == 200) {
              this.submittedList = res.data.data.list;
              this.page1.total = res.data.data.total;
            }
          });
        })
        .catch(error => {});
    },
    //接受面试
    accept() {
      this.$http
        .put(`/consumer-core/interview/accept/${this.interviewId}`)
        .then(res => {
          this.dialogVisible = false;
          this.interviewparams = {
            resumeProcessedState: "INTERVIEW",
            interviewState: null
          };
          submitted(this.interviewparams).then(res => {
            if (res.data.code == "200") {
              this.submittedList = res.data.data.list;
              this.page1.total = res.data.data.total;
            }
          });
        })
        .catch(error => {});
    },
    //查看面试
    lookinterview(res) {
      this.interviewId = res.interviewId;
      this.interviewStates = res.interviewState;
      this.dialogVisible = true;
      this.$http
        .get(`/consumer-core/interview/${res.interviewId}`)
        .then(res => {
          this.jobSeekers = res.data.data;
        })
        .catch(error => {});
    },
    copy() {
      var clipboard = new Clipboard(".tabs-read");
      clipboard.on("success", e => {
        this.linktitle = "复制成功";
        // 释放内存
        setTimeout(() => {
          this.linktitle = "复制链接";
        }, 3000);
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    Tabstatus(e) {
      this.page1.current = 1
      if (e === 1) {
        this.index = "TO_PROCESS";
        this.params = {
          resumeProcessedState: this.index,
          pageNum: this.page1.current,
          pageSize: this.page1.pageSize,
          interviewState: null,
          sortBy: null,
          sortOrder: null
        };
      } else if (e === 2) {
        this.index = "PROCESSING";
        this.params = {
          resumeProcessedState: this.index,
          pageNum: this.page1.current,
          pageSize: this.page1.pageSize,
          interviewState: null,
          sortBy: null,
          sortOrder: null
        };
      } else if (e === 3) {
        this.index = "INTERVIEW";
        this.params = {
          resumeProcessedState: this.index,
          pageNum: this.page1.current,
          pageSize: this.page1.pageSize,
          interviewState: null,
          sortBy: null,
          sortOrder: null
        };
      } else if (e === 4) {
        this.index = "OFFERED";
        this.params = {
          resumeProcessedState: this.index,
          pageNum: this.page1.current,
          pageSize: this.page1.pageSize,
          interviewState: null,
          sortBy: null,
          sortOrder: null
        };
      } else {
        this.index = "UNFIT";
        this.params = {
          resumeProcessedState: this.index,
          pageNum: this.page1.current,
          pageSize: this.page1.pageSize,
          interviewState: null,
          sortBy: null,
          sortOrder: null
        };
      }
      submitted(this.params).then(res => {
        if (res.data.code == 200) {
          this.submittedList = res.data.data.list;
          this.page1.total = res.data.data.total;
        }
      });
    },
    interviewstatus(e) {
      if (e === 1) {
        this.interviewStates = null;
        this.index = "INTERVIEW";
        this.interviewparams = {
          resumeProcessedState: "INTERVIEW",
          interviewState: this.interviewStates
        };
      } else if (e === 2) {
        this.interviewStates = "TO_BE_ACCEPTED";
        this.index = "INTERVIEW";
        this.interviewparams = {
          resumeProcessedState: "INTERVIEW",
          interviewState: this.interviewStates
        };
      } else if (e === 3) {
        this.interviewStates = "REFUSED";
        this.index = "INTERVIEW";
        this.interviewparams = {
          resumeProcessedState: "INTERVIEW",
          interviewState: this.interviewStates
        };
      } else if (e === 4) {
        this.interviewStates = "TO_BE_INTERVIEWED";
        this.index = "INTERVIEW";
        this.interviewparams = {
          resumeProcessedState: "INTERVIEW",
          interviewState: this.interviewStates
        };
      } else if (e === 5) {
        this.interviewStates = "COMPLETED";
        this.index = "INTERVIEW";
        this.interviewparams = {
          resumeProcessedState: "INTERVIEW",
          interviewState: this.interviewStates
        };
      } else if (e === 6) {
        this.interviewStates = "TO_CANCEL_THE_INTERVIEW";
        this.index = "INTERVIEW";
        this.interviewparams = {
          resumeProcessedState: "INTERVIEW",
          interviewState: this.interviewStates
        };
      } else {
        this.interviewStates = "HAS_BEEN_EFFECTIVE";
        this.index = "INTERVIEW";
        this.interviewparams = {
          resumeProcessedState: "INTERVIEW",
          interviewState: this.interviewStates
        };
      }
      submitted(this.interviewparams).then(res => {
        if (res.data.code == 200) {
          this.submittedList = res.data.data.list;
          this.page1.total = res.data.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize
      };
      favorite(params).then(res => {
        if (res.data.code === '200') {
          this.favoriteList = res.data.data.list;
          this.page.total = res.data.data.total;
        }
      });
    },
    handleCurrentChange(val) {
      this.page.current = val;
      let params = {
        pageNum: this.page.current,
        pageSize: this.page.pageSize
      };
      favorite(params).then(res => {
        if (res.data.code === '200') {
          this.favoriteList = res.data.data.list;
          this.page.total = res.data.data.total;
        }
      });
    },
    handleSizeChange1(val) {
      this.page1.pageSize = val;
      this.page1.current = 1;
      this.params = {
        resumeProcessedState: this.index,
        pageNum: this.page1.current,
        pageSize: this.page1.pageSize,
        interviewState: null,
        sortBy: null,
        sortOrder: null
      };
      submitted(this.params).then(res => {
        if (res.data.code == 200) {
          this.submittedList = res.data.data.list;
          this.page1.total = res.data.data.total;
        }
      });
    },
    handleCurrentChange1(val) {
      this.page1.current = val;
      this.params = {
        resumeProcessedState: this.index,
        pageNum: this.page1.current,
        pageSize: this.page1.pageSize,
        interviewState: null,
        sortBy: null,
        sortOrder: null
      };
      submitted(this.params).then(res => {
        if (res.data.code == 200) {
          this.submittedList = res.data.data.list;
          this.page1.total = res.data.data.total;
        }
      });
    },
    next() {
      this.$router.push({ path: "/joblist" });
    },
    nextjoblist(id) {
      this.$router.push({
        path: "/station",
        query: {
          id: id
        }
      });
    },
    toPerson() {
      this.$router.push({ path: "/inforchange" });
    },
    //编辑个人信息
    edit() {
      // datacenterBus.$emit("myFun",false)   //$emit这个方法会触发一个事件
      if (this.defaultResumeId === 0) {
        this.$router.push({ path: "/gap" });
      } else {
        this.$router.push({ path: "/resume" });
      }
    },
    //获取投递过的岗位
    submitt() {
      let params = {
        resumeProcessedState: "TO_PROCESS",
        pageNum: 1,
        pageSize: 10,
        interviewState: null,
        sortBy: null,
        sortOrder: null
      };
      submitted(params).then(res => {
        if (res.data.code == 200) {
          this.submittedList = res.data.data.list;
          this.page1.total = res.data.data.total;
        }
      });
    },
    //获取简历简讯
    brief() {
      brief().then(res => {
        if (res.data.code === "200") {
          if (res.data.data.base === null) {
            this.showWarn = true;
            this.showInfor = false;
          } else {
            this.showWarn = false;
            this.showInfor = true;
          }
          this.avatarUrl = res.data.data.base.avatarUrl;
          this.defaultResumeId = res.data.data.defaultResumeId;
          this.fullName = res.data.data.base.fullName;
          this.city = res.data.data.base.city;
          this.workAge = res.data.data.base.workAge;
          this.age = res.data.data.base.age;
          this.jobSearchStatus = res.data.data.target.jobSearchStatus;
          if (res.data.data.target.jobSearchStatus === 1) {
            this.jobSearchStatus = "离职-延时到岗";
          } else if (res.data.data.target.jobSearchStatus === 0) {
            this.jobSearchStatus = "离职-随时到岗";
          } else if (res.data.data.target.jobSearchStatus === 2) {
            this.jobSearchStatus = "在职-考虑机会";
          } else if (res.data.data.target.jobSearchStatus === 3) {
            this.jobSearchStatus = "在职-暂不到岗";
          }
          if (res.data.data.target.jobType === 1) {
            this.state = "实习";
          } else if (res.data.data.target.jobType === 2) {
            this.state = "全职";
          } else if (res.data.data.target.jobType === 3) {
            this.state = "兼职";
          }
        }
      });
    },
    //获取收藏的岗位
    favorite() {
      favorite()
        .then(res => {
          if (res.status === 200) {
            this.favoriteList = res.data.data.list;
            this.page.total = res.data.data.total;
          }
        })
        .catch(error => {});
    },
    //取消对岗位的收藏
    iscancel(c) {
      isfavorite(c)
        .then(res => {
          if (res.data.code === "200") {
            this.favorite();
          }
        })
        .catch(error => {});
    },

    //城市
    // citise() {
    //   city().then(res => {
    //     if (res.data.code === 200) {
    //       this.citysal = res.data.data;
    //     }
    //   });
    // },
    //获取推荐岗位
    searched() {
      let params = {
        addresses: null,
        degreeMin: null,
        industries: null,
        industryCodes: null,
        isGraduate: true,
        jobType: null,
        keywords: null,
        natures: null,
        pageNum: 1,
        pageSize: 10,
        positionCatalog: null,
        publishedInterval: null,
        publishedTime: null,
        salaryMax: null,
        salaryMin: null,
        size: null,
        sortBy: null,
        sortOrder: null,
        workAgeMax: null,
        workAgeMin: null
      };
      searched(params)
        .then(res => {
          if (res.data.code === 200) {
            this.positionList = res.data.data.list;
            if (res.data.data.total === 0) {
              this.Tjposition = false;
              this.QSposition = true;
            } else {
              this.Tjposition = true;
              this.QSposition = false;
            }
          }
        })
        .catch(error => {});
    }
  },
  created() {
    let token = Cookies.get("token");
    if (token) {
      this.favorite();
      this.submitt();
      this.brief();
    }
  },
  filters: {
    level(level) {
      var a;
      switch (level) {
        case "THE_BENEFITS_PACKAGE_IS_FANTASTIC":
          a = "福利待遇特别棒";
          break;
        case "THE_INTERVIEWER_IS_DANIEL":
          a = "面试官是大牛";
          break;
        case "THE_ENVIRONMENT_IS_VERY_GOOD":
          a = "环境非常nice";
          break;
        case "THE_INTERVIEWER_IS_VERY_KIND":
          a = "面试官很和善";
          break;
        case "INTERVIEW_EFFICIENCY_IS_VERY_HIGH":
          a = "面试效率很高";
          break;
        case "THE_SALARY_DOES_NOT_MATCH_THE_LABEL":
          a = "薪资跟标注不符";
          break;
        case "THE_INTERVIEWER_IS_TOO_DEMANDING":
          a = "面试官太苛刻";
          break;
        case "THE_ENVIRONMENT_IS_SO_SO":
          a = "环境一般般";
          break;
        case "THE_INTERVIEWER_IS_VERY_SERIOUS":
          a = "面试官很严肃";
          break;
        case "WHEN_THE_SEAS_RUN_DRY_AND_THE_ROCKS_CRUMBLE":
          a = "等到海枯石烂";
          break;
      }
      return a;
    },
    levels(levels) {
      var a;
      switch (levels) {
        case "TO_BE_ACCEPTED":
          a = "待接受";
          break;
        case "ACCEPTED":
          a = "已接受";
          break;
        case "HAS_REFUSED_TO":
          a = "已拒绝";
          break;
      }
      return a;
    }
  }
};
</script>

<style lang="stylus">
.dropdown-button {
  background: #ffffff;
}

.dropdown-buttons {
  background: #e9ebf4;
}

.el-message-box__content {
  font-size: 20px;
  font-family: PingFangSC-Medium;
  color: #2C2C2C;
}

.personal {
  cursor: default;
  display: flex;
  flex-direction: row;
  margin: 90px auto 0;
  width: 1440px;
  background: #ffffff;

  .operatedButton {
    display: none;
    margin: 0 72px 0 0;
  }

  .publishedTime {
    display: inline;
  }

  .publishedTimes {
    display: inline;
  }

  .hover:hover {
    background: #f7f7f7;

    .operatedButton {
      display: inline;

      .button {
        width: 128px;
        height: 43px;
        margin: -15px 0 0 0;
        font-size: 20px;
        color: #ffffff;
        background: #02B9B8;
        border: 0.75px solid rgba(50, 124, 243, 1);
        border-radius: 5px;
      }

      .publishedTime {
        color: #373737;
        font-size: 18px;
        margin: 0 28px 0 0;
        width: 200px;
      }
    }

    .publishedTimes {
      display: none;
    }
  }

  .personal-left {
    width: 1010px;
    background: white;

    .title {
      font-family: PingFangSC-Regular;
      color: #222222;
      font-size: 18px;
    }

    .content {
      font-family: PingFangSC-Regular;
      color: #5A5A5A;
      font-size: 16px;
      margin: 12px 0 0 0;

      span {
        font-family: PingFangSC-Regular;
        color: #373737;
        font-size: 16px;
      }
    }

    .aside {
      font-family: PingFangSC-Regular;
      color: #4C4C4C;
      font-size: 16px;
      margin: 20px 0 0 0;

      span {
        font-family: PingFangSC-Regular;
        color: #02B9B8;
        font-size: 16px;
      }
    }

    .foot {
      font-family: PingFangSC-Medium;
      color: #222222;
      font-size: 16px;
      margin: 12px 0 0 0;

      span {
        font-family: PingFangSC-Regular;
        color: #02B9B8;
        font-size: 16px;
      }
    }

    .offer-title {
      font-family: PingFangSC-Medium;
      color: #222222;
      font-size: 20px;
      margin: 0 0 0 106px;
    }

    .offer-titles {
      font-family: PingFangSC-Medium;
      color: #2C2C2C;
      font-size: 20px;
      text-ailgn: center;
      margin-top: 35px;
    }

    .lose-titles {
      font-family: PingFangSC-Medium;
      color: #2C2C2C;
      font-size: 20px;
      text-ailgn: center;
      margin: 35px 60px 0 60px;
    }

    .lose-content {
      font-family: PingFangSC-Regular;
      color: #5F5F5F;
      font-size: 18px;
      margin: 16px 25px 0;
    }

    .offer-radio {
      font-family: PingFangSC-Regular;
      color: #222222;
      font-size: 18px;
      margin: 24px 0 0 106px;
    }

    .el-dialog__header {
      padding: 15px 20px 15px;
      background: #02B9B8;
      text-align: center;
      font-family: PingFangSC-Medium;
      color: #FFFFFF;
      font-size: 20px;
    }

    .el-icon-close:before {
      content: '\e6db';
      font-size: 30px;
      line-height: 20px;
      color: #ffffff;
    }

    .el-dialog__title {
      line-height: 20px;
      font-size: 20px;
      border: 1px solid #02B9B8;
      font-family: PingFangSC-Medium;
      color: #FFFFFF;
      text-align: center;
    }

    .el-dialog__footer {
      padding: 0px 20px 50px;
      text-align: center;
      box-sizing: border-box;
    }

    .annex {
      font-family: PingFangSC-Regular;
      color: #515151;
      font-size: 18px;
      margin: 0 0 30px 0;
      display: flex;
      justify-content: flex-end;

      span:nth-child(1) {
        margin: 0 10px 0 15px;
      }
    }

    .dialoRefuse {
      margin: 0 15px;

      .refuseReason {
        font-family: PingFangSC-Medium;
        color: #222222;
        font-size: 20px;
        margin: 0 0 20px;
      }
    }

    .personal-first {
      .tabs-button {
        font-family: PingFangSC-Regular;
        color: #888888;
        font-size: 20px;
        margin: 0 0 0 80px;
      }

      .tabs-button:focus {
        color: #02B9B8;
      }

      .tabs-buttons {
        font-family: PingFangSC-Regular;
        color: #02B9B8;
        font-size: 20px;
        margin: 0 0 0 80px;
      }
    }

    .personals-nav {
      margin: 60px 0 0 110px;
      font-size: 20px;
      text-align: left;
      font-family: PingFangSC-Medium;
      color: #373737;
    }

    .personals-aside {
      margin: 40px 0 0 110px;
      text-align: left;

      span:nth-child(2) {
        font-family: PingFangSC-Regular;
        color: #02B9B8;
      }
    }

    .personals-select {
      margin: 25px 0 0 110px;
      display: flex;
      flex-direction: row;
      font-family: PingFangSC-Regular;
      color: #666666;
      font-size: 16px;

      .el-radio-button--medium .el-radio-button__inner {
        padding: 2px 10px;
        font-size: 14px;
        border-radius: 20px;
        height: 20px;
      }

      .el-radio-button__inner {
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
        background: #fff;
        border: 1px solid #dcdfe6;
        font-weight: 500;
        border-left: 1;
        margin: 0 0 0 20px;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        margin: 0;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 20px;
        heigth: 20px;
      }

      .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        color: #272822;
        background-color: #fff;
        border-color: #dee1e6;
        box-shadow: -1px 0 0 0 #02B9B8;
      }
    }

    .personal-select {
      margin: 40px 0 0 108px;

      .personal-selects {
        display: flex;
        flex-direction: row;

        .el-icon-star-off:before {
          content: '\e717';
          font-size: 26px;
          padding: 0 0 0 15px;
        }

        .el-icon-star-on:before {
          content: '\e797';
          font-size: 26px;
          padding: 0 0 0 15px;
        }

        span {
          font-family: PingFangSC-Medium;
          color: #373737;
          font-size: 20px;
        }
      }
    }

    .personal-footer {
      margin: 30px 0 0 108px;

      .personal-footers {
        display: flex;
        flex-direction: column;

        .el-textarea__inner:focus {
          outline: none;
          border-color: #dcdfe6;
        }

        .el-textarea__inner {
          display: block;
          resize: vertical;
          padding: 5px 15px;
          line-height: 1.5;
          box-sizing: border-box;
          width: 100%;
          font-size: inherit;
          color: #606266;
          background: #FAFAFA;
          background-image: none;
          border: 1px solid #FAFAFA;
          border-radius: 4px;
          transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          margin: 20px 0 0 0;
        }

        .el-checkbox-button--medium .el-checkbox-button__inner {
          padding: 10px 20px;
          font-size: 14px;
          border-radius: 20px;
          margin: 20px 0 0 16px;
          width: 152px;
        }

        .el-checkbox-button__inner {
          line-height: 1;
          white-space: nowrap;
          vertical-align: middle;
          background: #fff;
          border: 1px solid #dcdfe6;
          font-weight: 500;
          border-left: 1;
          margin: 0 0 0 20px;
          color: #606266;
          -webkit-appearance: none;
          text-align: center;
          box-sizing: border-box;
          margin: 0;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          padding: 12px 20px;
          font-size: 14px;
          border-radius: 20px;
        }

        .el-checkbox-button.is-checked .el-checkbox-button__inner {
          color: #fff;
          background-color: #02B9B8;
          border-color: #02B9B8;
          box-shadow: -1px 0 0 0 #8cc5ff;
        }

        span {
          font-family: PingFangSC-Medium;
          color: #373737;
          font-size: 20px;
          text-align: left;
        }
      }
    }

    .personal-button {
      font-size: 20px;
      margin: 40px 0 0 0;

      .button {
        width: 200px;
        height: 40px;
      }
    }

    .tab-operations {
      position: absolute;
      z-index: 999;
      font-family: PingFangSC-Regular;

      .el-dropdown-menu {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        padding: 10px 0;
        margin: 5px 0;
        background-color: #fff;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }

    .personal-tabs {
      margin: 56px 0 0 96px;
    }

    .el-tabs__item.is-active {
      color: #02B9B8;
    }

    .el-tabs__item {
      font-size: 22px;
      font-weight: 800;
      color: #373737;
    }

    .el-tabs__active-bar {
      background-color: #02B9B8;
    }

    .el-tabs__content, .el-tab-pane {
      margin: 20px 0 0 0;
    }

    .el-tabs__nav-wrap:after {
      height: 0px;
    }

    .collect-second {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10px 0 15px 0;
    }

    .collect-line {
      width: 100%;
      margin: 8px 0 0 0;
      border: 0.5px solid #f0f0f0;
    }

    .collect-pagination {
      margin: 30px 0 0 0;
      padding: 0 0 20px 0;
    }

    .collect-company {
      font-size: 16px;
      margin: 0 0 0 10px;
      width: 150px;
      text-align: left;
    }

    .collect-city {
      margin: 2px 205px 1px 70px;
      font-size: 16px;
      color: #959595;
    }

    .collect-button {
      margin: -5px 10px 0 0;
      font-size: 16px;
      width: 94px;
      height: 32px;
      display: flex;
      flex-direction: row;

      .button {
        background-color: #02B9B8;
        border: 1px solid #02B9B8;
        margin: -6px 0 0 0;
      }

      .button:focus {
        background-color: #d8d8d8;
        border: 1px solid #d8d8d8;
      }
    }

    .tabs-first {
      display: flex;
      flex-direction: row;
      font-family: PingFangSC-Regular;
      font-size: 20px;
      margin: 16px 0 0 0;
      text-align: left;
    }

    .tabs-first span:nth-child(1) {
      color: #373737;
      margin: 10px 0 0 10px;
      width: 280px;
    }

    .tabs-first span:nth-child(2) {
      color: #C52B2B;
      margin: 10px 0 0 40px;
      width: 120px;
    }

    .tabs-second {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
      margin: 10px 0 0 0;
    }

    .tabs-second span:nth-child(1) {
      font-size: 16px;
      color: #636363;
      margin: 0 0 0 10px;
      width: 150px;
    }

    .tabs-second span:nth-child(2) {
      margin: 2px 0 7px 40px;
      width: 300px;
      color: #959595;
      font-size: 16px;
    }

    .tabs-second span:nth-child(3) {
      text-align: left;
      font-size: 18px;
      width: 200px;
    }

    .tabs-second span:nth-child(4) {
      text-align: left;
      width: 200px;
      color: #373737;
      font-size: 18px;
    }

    .tabs-second p {
      margin: 0 10px 0 0;
      font-size: 14px;
      text-align: right;
      width: 160px;
      color: #909090;

      .time {
        font-size: 14px;
        margin: 0 0 0 20px;
        color: #909090;
      }
    }

    .tabs-line {
      width: 100%;
      margin: 10px 0 0 0;
      border: 0.5px solid #f0f0f0;
    }

    .tabs-pagination {
      margin: 60px 0 60px 0;
      padding: 0 0 20px 0;
      color: #1d366e;
    }
  }

  .personal-right {
    width: 334px;
    margin: 90px 0 0 0;

    .right-nav {
      display: flex;
      flex-direction: column;
      background: #fafafa;
      width: 334px;

      .span-hover {
        font-family: PingFangSC-Regular;
        color: #373737;
        font-size: 16px;
        cursor: pointer;
        margin: 20px 0 0 230px;
        opacity: 0;
      }

      &:hover {
        .span-hover {
          opacity: 1;
        }
      }

      .span-name {
        font-family: PingFangSC-Regular;
        color: #373737;
        font-size: 16px;
        margin: 30px 0 0 20px;
        text-align: center;
      }

      .span-name img {
        width: 15px;
        height: 15px;
        margin: 0 0 0 5px;
        border-radius: 7px;
      }

      .infor {
        display: flex;
        flex-direction: column;

        .span-city {
          font-family: PingFangSC-Regular;
          color: #5C5C5C;
          font-size: 14px;
          margin: 10px 0 0 0;
        }

        .span-type {
          font-family: PingFangSC-Regular;
          color: #373737;
          font-size: 16px;
          margin: 10px 0 20px 0;
        }
      }
    }

    .right-nav img {
      font-family: PingFangSC-Regular;
      color: #909090;
      width: 110px;
      height: 110px;
      margin: 0 0 0 90px;
    }

    .right-footer {
      background: white;
      margin: 20px 0 60px 0;
      border: 1px solid rgba(204, 204, 204, 1);

      .footer-nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 24px 0 0 0;
      }

      .footer-nav span:nth-child(1) {
        font-family: PingFangSC-Semibold;
        color: #373737;
        font-size: 16px;
        margin: 0 0 0 40px;
      }

      .footer-nav span:nth-child(2) {
        font-family: PingFangSC-Semibold;
        color: #373737;
        font-size: 12px;
        margin: 3px 40px 0 0;
      }

      .footer-article {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 15px 0 0 0;
      }

      .footer-article span:nth-child(1) {
        font-family: PingFangSC-Semibold;
        color: #373737;
        font-size: 16px;
        margin: 0 0 0 40px;
      }

      .footer-article span:nth-child(2) {
        font-family: PingFangSC-Semibold;
        color: #C52B2B;
        font-size: 14px;
        margin: 0 40px 0 0;
      }

      .footer-foot {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 5px 0 5px 0;
      }

      .footer-foot span:nth-child(1) {
        font-family: PingFangSC-Semibold;
        font-size: 12px;
        margin: 0 0 0 40px;
      }

      .footer-foot span:nth-child(2) {
        font-family: PingFangSC-Semibold;
        font-size: 12px;
        margin: 0 40px 0 0;
        color: #959595;
      }

      .footer-line {
        width: 334px;
        border: 0.5px solid #f0f0f0;
        margin: 10px 0 0 0;
      }
    }
  }
}
</style>
