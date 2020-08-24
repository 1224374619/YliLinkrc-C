<template>
  <div style="margin:96px 0 0 0;">
    <!-- <el-dialog title="发送面试邀请" :visible.sync="centerDialogVisible" width="40%" center>
      <div
        style=" display: flex;flex-direction: row;font-family: PingFangSC-Medium;color: #5C5C5C 100%;font-size:20px"
      >
        <div style="margin:0 0 0 30px">姓名：zadqqeqw</div>
        <div style="margin:0 0 0 30px">面试岗位：qeeqeqe</div>
      </div>
      <div style="margin:30px 0 0 0">
        <el-form
          :model="ruleFormQuiz"
          :rules="rulesQuiz"
          ref="ruleForm"
          :inline="true"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="面试次数" prop="num">
            <el-select style="width:234px" v-model="ruleFormQuiz.num" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面试时间" prop="time">
            <el-date-picker
              style="width:234px"
              v-model="ruleFormQuiz.time"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="面试地址" prop="city">
            <el-select style="width:580px" v-model="ruleFormQuiz.city" placeholder="请选择">
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span class="span-hover" style="float: right; color: #8492a6; font-size: 13px">删除</span>
                <span
                  class="span-hover"
                  style="float: right; color: #8492a6; font-size: 13px;margin:0 10px 0 0"
                >编辑</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="region">
            <el-input style="width:234px" v-model="ruleFormQuiz.user" placeholder="联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input style="width:234px" v-model="ruleFormQuiz.phone" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱" prop="email">
            <el-input style="width:580px" v-model="ruleFormQuiz.email" placeholder="联系邮箱"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" style="width:580px" v-model="ruleFormQuiz.desc" placeholder></el-input>
          </el-form-item>
          <el-form-item style="margin:0 0 0 40%">
            <el-button plain>取消</el-button>
            <el-button @click="submitForm('ruleForm')" type="primary">发送</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>-->
    <!-- <el-dialog title="修改面试邀请" :visible.sync="centerDialogVisibles" width="40%" center>
      <div
        style=" display: flex;flex-direction: row;font-family: PingFangSC-Medium;color: #5C5C5C 100%;font-size:20px"
      >
        <div style="margin:0 0 0 30px">姓名：zadqqeqw</div>
        <div style="margin:0 0 0 30px">面试岗位：qeeqeqe</div>
      </div>
      <div style="margin:30px 0 0 0">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          :inline="true"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="面试次数" prop="region">
            <el-select style="width:234px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面试时间" required>
            <el-date-picker style="width:234px" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="面试地址" prop="delivery">
            <el-select style="width:580px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span class="span-hover" style="float: right; color: #8492a6; font-size: 13px">删除</span>
                <span
                  class="span-hover"
                  style="float: right; color: #8492a6; font-size: 13px;margin:0 10px 0 0"
                >编辑</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="region">
            <el-input style="width:234px" v-model="user" placeholder="联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" required>
            <el-input style="width:234px" v-model="user" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱" required>
            <el-input style="width:580px" v-model="user" placeholder="联系邮箱"></el-input>
          </el-form-item>
          <el-form-item label="备注" required>
            <el-input type="textarea" style="width:580px" v-model="user" placeholder></el-input>
          </el-form-item>
          <el-form-item style="margin:0 0 0 40%">
            <el-button plain>取消</el-button>
            <el-button @click="submitForm('ruleForm')" type="primary">发送</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>-->
    <div class="resume-nav">
      <div style="width:150px;">{{positionDetail.positionName.substring(0,9)}}</div>
      <div style="margin:0 0 0 20px;width:100%;">{{positionDetail.description.substring(0,60)}}</div>
    </div>
    <div class="resume-seconds">
      <div class="demo-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="求职状态">
            <el-select style="width:200px" v-model="formInline.state" placeholder="请选择求职状态">
              <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item v-if="showForm">
            <span style="color: #FF7152;" @click="checkForm">
              收起
              <i class="el-icon-caret-top"></i>
            </span>
          </el-form-item>
          <el-form-item v-else>
            <span style="color: #FF7152;" @click="checkForm">
              展开
              <i class="el-icon-caret-bottom"></i>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <el-form
        :inline="true"
        :model="form"
        label-width="90px"
        class="demo-form-inline"
        v-if="showForm"
      >
        <el-form-item label="地区">
          <el-cascader
            style="width:200px"
            v-model="form.city"
            :props="props"
            :options="city"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="投递时间">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="简历完整度">
          <el-select style="width:200px" v-model="form.completedPercent" placeholder="请选择简历完整度">
            <el-option
              v-for="item in optionsResume"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display: flex;justify-content: flex-end;">
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="onSubmit" style="background:#FF7152;color:#ffffff">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tab-operations">
        <span @click="uploadFile" style="color:#FF7152;font-size:12px">批量下载简历</span>
      </div>
      <el-tabs
        v-model="activeName"
        type="card"
        v-if="this.action === false"
        @tab-click="handleClicks"
        style="width:98%;margin:0 auto"
      >
        <el-tab-pane label="未处理" name="first">
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="fullName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workAge" label="工作年限" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobSearchStatus" label="求职状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="targetCity" label="所在地区" show-overflow-tooltip></el-table-column>
            <el-table-column label="简历完整度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.completedPercent}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="投递时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.submittedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作" width="220">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeFirst"
            @current-change="handleCurrentChangeFirst"
            :current-page="page.current"
            class="pagination"
            :page-sizes="page.pageSizeOpts"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="录用" name="second">
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="fullName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workAge" label="工作年限" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobSearchStatus" label="求职状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="targetCity" label="所在地区" show-overflow-tooltip></el-table-column>
            <el-table-column label="简历完整度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.completedPercent}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="投递时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.submittedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.operatorTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operatorName" label="操作员" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeThird"
            @current-change="handleCurrentChangeThird"
            :current-page="page2.current"
            class="pagination"
            :page-sizes="page2.pageSizeOpts"
            :page-size="page2.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page2.total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="不合格" name="third">
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="fullName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workAge" label="工作年限" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobSearchStatus" label="求职状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="targetCity" label="所在地区" show-overflow-tooltip></el-table-column>
            <el-table-column label="简历完整度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.completedPercent}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="投递时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.submittedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.operatorTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operatorName" label="操作员" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeFourth"
            @current-change="handleCurrentChangeFourth"
            :current-page="page3.current"
            class="pagination"
            :page-sizes="page3.pageSizeOpts"
            :page-size="page3.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page3.total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="已入职" name="fourth">
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="fullName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workAge" label="工作年限" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobSearchStatus" label="求职状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="targetCity" label="所在地区" show-overflow-tooltip></el-table-column>
            <el-table-column label="简历完整度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.completedPercent}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="投递时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.submittedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeFifth"
            @current-change="handleCurrentChangeFifth"
            :current-page="page4.current"
            class="pagination"
            :page-sizes="page4.pageSizeOpts"
            :page-size="page4.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page4.total"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
      <el-tabs
        v-model="activeName"
        type="card"
        v-else
        @tab-click="handleClick"
        style="width:98%;margin:0 auto"
      >
        <el-tab-pane label="待处理" name="first">
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="fullName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workAge" label="工作年限" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobSearchStatus" label="求职状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="targetCity" label="所在地区" show-overflow-tooltip></el-table-column>
            <el-table-column label="简历完整度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.completedPercent}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="投递时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.submittedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作" width="220">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="info(scope.row)"
                  type="text"
                  size="small"
                >通知面试/笔试</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="unfit(scope.row)"
                  type="text"
                  size="small"
                >不合适</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeFirst"
            @current-change="handleCurrentChangeFirst"
            :current-page="page.current"
            class="pagination"
            :page-sizes="page.pageSizeOpts"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="处理中" name="second">
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="fullName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workAge" label="工作年限" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobSearchStatus" label="求职状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="targetCity" label="所在地区" show-overflow-tooltip></el-table-column>
            <el-table-column label="简历完整度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.completedPercent}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="投递时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.submittedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.operatorTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operatorName" label="操作员" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="offer(scope.row)"
                  type="text"
                  size="small"
                >录用</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="unfit(scope.row)"
                  type="text"
                  size="small"
                >不合适</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeSecond"
            @current-change="handleCurrentChangeSecond"
            :current-page="page1.current"
            class="pagination"
            :page-sizes="page1.pageSizeOpts"
            :page-size="page1.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page1.total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="录用" name="third">
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="fullName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workAge" label="工作年限" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobSearchStatus" label="求职状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="targetCity" label="所在地区" show-overflow-tooltip></el-table-column>
            <el-table-column label="简历完整度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.completedPercent}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="投递时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.submittedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.operatorTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operatorName" label="操作员" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
                <el-button
                  style="color:#FF7152"
                  @click="employed(scope.row)"
                  type="text"
                  size="small"
                >确认入职</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeThird"
            @current-change="handleCurrentChangeThird"
            :current-page="page2.current"
            class="pagination"
            :page-sizes="page2.pageSizeOpts"
            :page-size="page2.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page2.total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="已入职" name="fifth">
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="fullName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workAge" label="工作年限" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobSearchStatus" label="求职状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="targetCity" label="所在地区" show-overflow-tooltip></el-table-column>
            <el-table-column label="简历完整度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.completedPercent}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="投递时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.submittedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeFifth"
            @current-change="handleCurrentChangeFifth"
            :current-page="page4.current"
            class="pagination"
            :page-sizes="page4.pageSizeOpts"
            :page-size="page4.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page4.total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="不合格" name="fourth">
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="fullName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workAge" label="工作年限" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobSearchStatus" label="求职状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="targetCity" label="所在地区" show-overflow-tooltip></el-table-column>
            <el-table-column label="简历完整度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.completedPercent}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="投递时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.submittedTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.operatorTime|formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operatorName" label="操作员" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button
                  style="color:#FF7152"
                  @click="examing(scope.row)"
                  type="text"
                  size="small"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangeFourth"
            @current-change="handleCurrentChangeFourth"
            :current-page="page3.current"
            class="pagination"
            :page-sizes="page3.pageSizeOpts"
            :page-size="page3.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page3.total"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import citys from "../../assets/city.json";
import qs from "qs";
export default {
  name: "home",
  data() {
    return {
      ruleFormQuiz: {
        num: "",
        time: "",
        city: "",
        email: "",
        user: "",
        phone: "",
        desc: ""
      },
      rulesQuiz: {
        num: [{ required: true, message: "请选择面试次数", trigger: "blur" }],
        time: [
          { required: true, message: "请选择面试时间", trigger: "change" }
        ],
        city: [
          { required: true, message: "请选择面试地址", trigger: "change" }
        ],
        email: [
          { required: true, message: "请选择面试邮箱", trigger: "change" }
        ]
      },
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
      page2: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      page3: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      page4: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      action: "",
      centerDialogVisible: false,
      centerDialogVisibles: false,
      positionID: "",
      city: [],
      props: {
        value: "code",
        label: "tag",
        children: "children"
      },
      positionDetail: {},
      params: {},
      formInline: {
        state: ""
      },
      form: {
        city: [],
        time: [],
        completedPercent: ""
      },
      cities: [
        {
          value: "Beijing",
          label: "北京"
        },
        {
          value: "Shanghai",
          label: "上海"
        },
        {
          value: "Nanjing",
          label: "南京"
        },
        {
          value: "Chengdu",
          label: "成都"
        },
        {
          value: "Shenzhen",
          label: "深圳"
        },
        {
          value: "Guangzhou",
          label: "广州"
        }
      ],
      options: [
        {
          label: "离职",
          options: [
            {
              value: "0",
              label: "随时到岗"
            },
            {
              value: "1",
              label: "暂不考虑"
            }
          ]
        },
        {
          label: "在职",
          options: [
            {
              value: "2",
              label: "考虑工作"
            },
            {
              value: "3",
              label: "急寻找工作"
            }
          ]
        }
      ],
      optionsResume: [
        {
          value: "0",
          label: "附件简历"
        },
        {
          value: "1",
          label: "90%以上"
        },
        {
          value: "2",
          label: "80%-90%"
        },
        {
          value: "3",
          label: "60%-70%"
        },
        {
          value: "4",
          label: "50%-60%"
        },
        {
          value: "5",
          label: "50%以下"
        }
      ],
      tableData: [],
      activeName: "first",
      showForm: false,
      startTime: "",
      endTime: "",
      processedState: "",
      multipleSelection: [],
      arrResume: [],
      multipleSelection: []
    };
  },
  methods: {
    //下载简历
    handleSelectionChange(val) {
      this.arrResume = [];
      this.multipleSelection = val;
      this.multipleSelection.forEach((item, index, array) => {
        this.arrResume.push(item.id);
      });
    },
    uploadFile() {
      let params = {
        resumeIds: this.arrResume
      };
      let resumeList = qs.stringify(
        { resumeIds: this.arrResume },
        { arrayFormat: "repeat" }
      );
      this.$local
        .get("/business-core/resumes/dowload?" + resumeList, {
          responseType: "blob"
        })
        .then(res => {
          const disposition = res.headers["content-disposition"];
          let fileName = disposition.substring(
            disposition.indexOf("filename=") + 9,
            disposition.length
          );
          // iso8859-1的字符转换成中文
          fileName = decodeURI(escape(fileName));
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
        .catch(error => {
          console.log(error);
        });
    },
    //不合格
    unfit(tab) {
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      this.$http
        .put(
          `/business-core/position/${this.positionID}/resumes/${tab.id}/unfit`
        )
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.params = {
              city: this.form.city[0] ? this.form.city[0] : null,
              completedPercentMax: completedPercentMax,
              completedPercentMin: completedPercentMin,
              jobSearchStatusCode: Number(this.formInline.state),
              pageNum: 1,
              pageSize: 10,
              processedState: this.processedState,
              province: this.form.city[1] ? this.form.city[1] : null,
              sortBy: null,
              sortOrder: null,
              submittedTimeEnd: this.endTime,
              submittedTimeStart: this.startTime
            };
            this.$http
              .post(
                `/business-core/position/${this.positionID}/resumes/list`,
                this.params
              )
              .then(res => {
                let response = res.data.data.list;
                if (res.data.code == "200") {
                  this.tableData = response;
                  if (this.processedState === "TO_PROCESS") {
                    this.page.total = res.data.data.total;
                  } else if (this.processedState === "PROCESSING") {
                    this.page1.total = res.data.data.total;
                  } else if (this.processedState === "OFFERED") {
                    this.page2.total = res.data.data.total;
                  } else {
                    this.page3.total = res.data.data.total;
                  }
                } else {
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //录用
    offer(tab) {
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      this.$http
        .put(
          `/business-core/position/${this.positionID}/resumes/${tab.id}/offer`
        )
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.params = {
              city: this.form.city[0] ? this.form.city[0] : null,
              completedPercentMax: completedPercentMax,
              completedPercentMin: completedPercentMin,
              jobSearchStatusCode: Number(this.formInline.state),
              pageNum: 1,
              pageSize: 10,
              processedState: this.processedState,
              province: this.form.city[1] ? this.form.city[1] : null,
              sortBy: null,
              sortOrder: null,
              submittedTimeEnd: this.endTime,
              submittedTimeStart: this.startTime
            };
            this.$http
              .post(
                `/business-core/position/${this.positionID}/resumes/list`,
                this.params
              )
              .then(res => {
                let response = res.data.data.list;
                if (res.data.code == "200") {
                  this.tableData = response;
                  if (this.processedState === "TO_PROCESS") {
                    this.page.total = res.data.data.total;
                  } else if (this.processedState === "PROCESSING") {
                    this.page1.total = res.data.data.total;
                  } else if (this.processedState === "OFFERED") {
                    this.page2.total = res.data.data.total;
                  } else {
                    this.page3.total = res.data.data.total;
                  }
                } else {
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //通知面试/笔试
    info(tab) {
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      this.$http
        .put(
          `/business-core/position/${this.positionID}/resumes/${tab.id}/info`
        )
        .then(res => {
          let response = res.data.data;
          // this.processedState = response.processedState;
          if (res.data.code == "200") {
            this.params = {
              city: this.form.city[0] ? this.form.city[0] : null,
              completedPercentMax: completedPercentMax,
              completedPercentMin: completedPercentMin,
              jobSearchStatusCode: Number(this.formInline.state),
              pageNum: 1,
              pageSize: 10,
              processedState: this.processedState,
              province: this.form.city[1] ? this.form.city[1] : null,
              sortBy: null,
              sortOrder: null,
              submittedTimeEnd: this.endTime,
              submittedTimeStart: this.startTime
            };
            this.$http
              .post(
                `/business-core/position/${this.positionID}/resumes/list`,
                this.params
              )
              .then(res => {
                let response = res.data.data.list;
                if (res.data.code == "200") {
                  this.tableData = response;
                  if (this.processedState === "TO_PROCESS") {
                    this.page.total = res.data.data.total;
                  } else if (this.processedState === "PROCESSING") {
                    this.page1.total = res.data.data.total;
                  } else if (this.processedState === "OFFERED") {
                    this.page2.total = res.data.data.total;
                  } else {
                    this.page3.total = res.data.data.total;
                  }
                } else {
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //确认入职
    employed(tab) {
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      this.$http
        .put(
          `/business-core/position/${this.positionID}/resumes/${tab.id}/employed`
        )
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.params = {
              city: this.form.city[0] ? this.form.city[0] : null,
              completedPercentMax: completedPercentMax,
              completedPercentMin: completedPercentMin,
              jobSearchStatusCode: Number(this.formInline.state),
              pageNum: 1,
              pageSize: 10,
              processedState: this.processedState,
              province: this.form.city[1] ? this.form.city[1] : null,
              sortBy: null,
              sortOrder: null,
              submittedTimeEnd: this.endTime,
              submittedTimeStart: this.startTime
            };
            this.$http
              .post(
                `/business-core/position/${this.positionID}/resumes/list`,
                this.params
              )
              .then(res => {
                let response = res.data.data.list;
                if (res.data.code == "200") {
                  this.tableData = response;
                  if (this.processedState === "TO_PROCESS") {
                    this.page.total = res.data.data.total;
                  } else if (this.processedState === "PROCESSING") {
                    this.page1.total = res.data.data.total;
                  } else if (this.processedState === "OFFERED") {
                    this.page2.total = res.data.data.total;
                  } else {
                    this.page3.total = res.data.data.total;
                  }
                } else {
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查看
    examing(tab) {
      console.log(tab);
      this.$router.push({
        path: "/resume/talent/Detail",
        query: {
          resumeId: tab.id,
          positionId: this.positionID,
          processedState: this.processedState
        }
      });
    },
    //通知面试
    quiz() {
      this.centerDialogVisible = true;
    },
    //重置
    resetForm() {
      this.form = {};
    },
    //查询
    onSubmit() {
      console.log(this.form.time);
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }

      let params = {
        city: this.form.city[0] ? this.form.city[0] : null,
        completedPercentMax: completedPercentMax,
        completedPercentMin: completedPercentMin,
        jobSearchStatusCode: Number(this.formInline.state),
        pageNum: 1,
        pageSize: 10,
        processedState: this.processedState,
        province: this.form.city[1] ? this.form.city[1] : null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: this.endTime,
        submittedTimeStart: this.startTime
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            if (this.processedState === "TO_PROCESS") {
              this.page.total = res.data.data.total;
            } else if (this.processedState === "PROCESSING") {
              this.page1.total = res.data.data.total;
            } else if (this.processedState === "OFFERED") {
              this.page2.total = res.data.data.total;
            } else {
              this.page3.total = res.data.data.total;
            }
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //职位详情
    position() {
      this.$http
        .get(`/business-core/positions/${this.positionID}`)
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.positionDetail = response;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //待处理
    process() {
      this.processedState = "TO_PROCESS";
      let params = {
        city: null,
        completedPercentMax: null,
        completedPercentMin: null,
        jobSearchStatusCode: null,
        pageNum: 1,
        pageSize: 10,
        processedState: "TO_PROCESS",
        province: null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: null,
        submittedTimeStart: null
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //tab
    handleClick(tab) {
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      if (tab.paneName === "first") {
        this.processedState = "TO_PROCESS";
        this.params = {
          city: this.form.city[0] ? this.form.city[0] : null,
          completedPercentMax: completedPercentMax,
          completedPercentMin: completedPercentMin,
          jobSearchStatusCode: Number(this.formInline.state),
          pageNum: 1,
          pageSize: 10,
          processedState: this.processedState,
          province: this.form.city[1] ? this.form.city[1] : null,
          sortBy: null,
          sortOrder: null,
          submittedTimeEnd: this.endTime,
          submittedTimeStart: this.startTime
        };
      } else if (tab.paneName === "second") {
        this.processedState = "PROCESSING";
        this.params = {
          city: this.form.city[0] ? this.form.city[0] : null,
          completedPercentMax: completedPercentMax,
          completedPercentMin: completedPercentMin,
          jobSearchStatusCode: Number(this.formInline.state),
          pageNum: 1,
          pageSize: 10,
          processedState: this.processedState,
          province: this.form.city[1] ? this.form.city[1] : null,
          sortBy: null,
          sortOrder: null,
          submittedTimeEnd: this.endTime,
          submittedTimeStart: this.startTime
        };
      } else if (tab.paneName === "third") {
        this.processedState = "OFFERED";
        this.params = {
          city: this.form.city[0] ? this.form.city[0] : null,
          completedPercentMax: completedPercentMax,
          completedPercentMin: completedPercentMin,
          jobSearchStatusCode: Number(this.formInline.state),
          pageNum: 1,
          pageSize: 10,
          processedState: this.processedState,
          province: this.form.city[1] ? this.form.city[1] : null,
          sortBy: null,
          sortOrder: null,
          submittedTimeEnd: this.endTime,
          submittedTimeStart: this.startTime
        };
      } else if (tab.paneName === "fourth") {
        this.processedState = "UNFIT";
        this.params = {
          city: this.form.city[0] ? this.form.city[0] : null,
          completedPercentMax: completedPercentMax,
          completedPercentMin: completedPercentMin,
          jobSearchStatusCode: Number(this.formInline.state),
          pageNum: 1,
          pageSize: 10,
          processedState: this.processedState,
          province: this.form.city[1] ? this.form.city[1] : null,
          sortBy: null,
          sortOrder: null,
          submittedTimeEnd: this.endTime,
          submittedTimeStart: this.startTime
        };
      } else {
        this.processedState = "EMPLOYED";
        this.params = {
          city: this.form.city[0] ? this.form.city[0] : null,
          completedPercentMax: completedPercentMax,
          completedPercentMin: completedPercentMin,
          jobSearchStatusCode: Number(this.formInline.state),
          pageNum: 1,
          pageSize: 10,
          processedState: this.processedState,
          province: this.form.city[1] ? this.form.city[1] : null,
          sortBy: null,
          sortOrder: null,
          submittedTimeEnd: this.endTime,
          submittedTimeStart: this.startTime
        };
      }
      this.$http
        .post(
          `/business-core/position/${this.positionID}/resumes/list`,
          this.params
        )
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            if (this.processedState === "TO_PROCESS") {
              this.page.total = res.data.data.total;
            } else if (this.processedState === "PROCESSING") {
              this.page1.total = res.data.data.total;
            } else if (this.processedState === "OFFERED") {
              this.page2.total = res.data.data.total;
            } else if (this.processedState === "EMPLOYED") {
              this.page4.total = res.data.data.total;
            } else {
              this.page3.total = res.data.data.total;
            }
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //tab 下线
    handleClicks(tab) {
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      if (tab.paneName === "first") {
        this.processedState = "TO_PROCESS";
        this.params = {
          city: this.form.city[0] ? this.form.city[0] : null,
          completedPercentMax: completedPercentMax,
          completedPercentMin: completedPercentMin,
          jobSearchStatusCode: Number(this.formInline.state),
          pageNum: 1,
          pageSize: 10,
          processedState: this.processedState,
          province: this.form.city[1] ? this.form.city[1] : null,
          sortBy: null,
          sortOrder: null,
          submittedTimeEnd: this.endTime,
          submittedTimeStart: this.startTime
        };
      } else if (tab.paneName === "second") {
        this.processedState = "OFFERED";
        this.params = {
          city: this.form.city[0] ? this.form.city[0] : null,
          completedPercentMax: completedPercentMax,
          completedPercentMin: completedPercentMin,
          jobSearchStatusCode: Number(this.formInline.state),
          pageNum: 1,
          pageSize: 10,
          processedState: this.processedState,
          province: this.form.city[1] ? this.form.city[1] : null,
          sortBy: null,
          sortOrder: null,
          submittedTimeEnd: this.endTime,
          submittedTimeStart: this.startTime
        };
      } else if (tab.paneName === "third") {
        this.processedState = "UNFIT";
        this.params = {
          city: this.form.city[0] ? this.form.city[0] : null,
          completedPercentMax: completedPercentMax,
          completedPercentMin: completedPercentMin,
          jobSearchStatusCode: Number(this.formInline.state),
          pageNum: 1,
          pageSize: 10,
          processedState: this.processedState,
          province: this.form.city[1] ? this.form.city[1] : null,
          sortBy: null,
          sortOrder: null,
          submittedTimeEnd: this.endTime,
          submittedTimeStart: this.startTime
        };
      } else {
        this.processedState = "EMPLOYED";
        this.params = {
          city: this.form.city[0] ? this.form.city[0] : null,
          completedPercentMax: completedPercentMax,
          completedPercentMin: completedPercentMin,
          jobSearchStatusCode: Number(this.formInline.state),
          pageNum: 1,
          pageSize: 10,
          processedState: this.processedState,
          province: this.form.city[1] ? this.form.city[1] : null,
          sortBy: null,
          sortOrder: null,
          submittedTimeEnd: this.endTime,
          submittedTimeStart: this.startTime
        };
      }
      this.$http
        .post(
          `/business-core/position/${this.positionID}/resumes/list`,
          this.params
        )
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            if (this.processedState === "TO_PROCESS") {
              this.page.total = res.data.data.total;
            } else if (this.processedState === "OFFERED") {
              this.page2.total = res.data.data.total;
            } else if (this.processedState === "EMPLOYED") {
              this.page4.total = res.data.data.total;
            } else {
              this.page3.total = res.data.data.total;
            }
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    checkForm() {
      this.showForm = !this.showForm;
    },
    //未处理分页
    handleSizeChangeFirst(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      let params = {
        city: this.form.city[0] ? this.form.city[0] : null,
        completedPercentMax: completedPercentMax,
        completedPercentMin: completedPercentMin,
        jobSearchStatusCode: Number(this.formInline.state),
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        processedState: "TO_PROCESS",
        province: this.form.city[1] ? this.form.city[1] : null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: this.endTime,
        submittedTimeStart: this.startTime
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChangeFirst(val) {
      this.page.current = val;
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      let params = {
        city: this.form.city[0] ? this.form.city[0] : null,
        completedPercentMax: completedPercentMax,
        completedPercentMin: completedPercentMin,
        jobSearchStatusCode: Number(this.formInline.state),
        pageNum: this.page.current,
        pageSize: 10,
        processedState: "TO_PROCESS",
        province: this.form.city[1] ? this.form.city[1] : null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: this.endTime,
        submittedTimeStart: this.startTime
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //处理中分页
    handleSizeChangeSecond(val) {
      this.page1.pageSize = val;
      this.page1.current = 1;
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      let params = {
        city: this.form.city[0] ? this.form.city[0] : null,
        completedPercentMax: completedPercentMax,
        completedPercentMin: completedPercentMin,
        jobSearchStatusCode: Number(this.formInline.state),
        pageNum: this.page1.current,
        pageSize: this.page1.pageSize,
        processedState: "PROCESSING",
        province: this.form.city[1] ? this.form.city[1] : null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: this.endTime,
        submittedTimeStart: this.startTime
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page1.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChangeSecond(val) {
      this.page1.current = val;
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      let params = {
        city: this.form.city[0] ? this.form.city[0] : null,
        completedPercentMax: completedPercentMax,
        completedPercentMin: completedPercentMin,
        jobSearchStatusCode: Number(this.formInline.state),
        pageNum: this.page1.current,
        pageSize: 10,
        processedState: "PROCESSING",
        province: this.form.city[1] ? this.form.city[1] : null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: this.endTime,
        submittedTimeStart: this.startTime
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page1.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //录用分页
    handleSizeChangeThird(val) {
      this.page2.pageSize = val;
      this.page2.current = 1;
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      let params = {
        city: this.form.city[0] ? this.form.city[0] : null,
        completedPercentMax: completedPercentMax,
        completedPercentMin: completedPercentMin,
        jobSearchStatusCode: Number(this.formInline.state),
        pageNum: this.page2.current,
        pageSize: this.page2.pageSize,
        processedState: "OFFERED",
        province: this.form.city[1] ? this.form.city[1] : null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: this.endTime,
        submittedTimeStart: this.startTime
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChangeThird(val) {
      this.page2.current = val;
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      let params = {
        city: this.form.city[0] ? this.form.city[0] : null,
        completedPercentMax: completedPercentMax,
        completedPercentMin: completedPercentMin,
        jobSearchStatusCode: Number(this.formInline.state),
        pageNum: this.page2.current,
        pageSize: 10,
        processedState: "OFFERED",
        province: this.form.city[1] ? this.form.city[1] : null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: this.endTime,
        submittedTimeStart: this.startTime
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //不合格分页
    handleSizeChangeFourth(val) {
      this.page3.pageSize = val;
      this.page3.current = 1;
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      let params = {
        city: this.form.city[0] ? this.form.city[0] : null,
        completedPercentMax: completedPercentMax,
        completedPercentMin: completedPercentMin,
        jobSearchStatusCode: Number(this.formInline.state),
        pageNum: this.page3.current,
        pageSize: this.page3.pageSize,
        processedState: "UNFIT",
        province: this.form.city[1] ? this.form.city[1] : null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: this.endTime,
        submittedTimeStart: this.startTime
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page1.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChangeFourth(val) {
      this.page3.current = val;
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      let params = {
        city: this.form.city[0] ? this.form.city[0] : null,
        completedPercentMax: completedPercentMax,
        completedPercentMin: completedPercentMin,
        jobSearchStatusCode: Number(this.formInline.state),
        pageNum: this.page3.current,
        pageSize: 10,
        processedState: "UNFIT",
        province: this.form.city[1] ? this.form.city[1] : null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: this.endTime,
        submittedTimeStart: this.startTime
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page1.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //已入职分页
    handleSizeChangeFifth(val) {
      this.Fifth.pageSize = val;
      this.page4.current = 1;
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      let params = {
        city: this.form.city[0] ? this.form.city[0] : null,
        completedPercentMax: completedPercentMax,
        completedPercentMin: completedPercentMin,
        jobSearchStatusCode: Number(this.formInline.state),
        pageNum: this.page3.current,
        pageSize: this.page3.pageSize,
        processedState: "UNFIT",
        province: this.form.city[1] ? this.form.city[1] : null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: this.endTime,
        submittedTimeStart: this.startTime
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page4.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChangeFifth(val) {
      this.page4.current = val;
      let completedPercentMax;
      let completedPercentMin;
      switch (this.form.completedPercent) {
        case "1":
          completedPercentMin = 90;
          completedPercentMax = null;
          break;
        case "2":
          completedPercentMin = 80;
          completedPercentMax = 90;
          break;
        case "3":
          completedPercentMin = 70;
          completedPercentMax = 80;
          break;
        case "4":
          completedPercentMin = 60;
          completedPercentMax = 70;
          break;
        case "5":
          completedPercentMin = 50;
          completedPercentMax = 60;
          break;
        case "6":
          completedPercentMin = null;
          completedPercentMax = 50;
          break;
        default:
          completedPercentMin = null;
          completedPercentMax = null;
          break;
      }
      if (this.form.time.length !== 0) {
        this.startTime = this.form.time[0].getTime();
        this.endTime = this.form.time[1].getTime();
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      let params = {
        city: this.form.city[0] ? this.form.city[0] : null,
        completedPercentMax: completedPercentMax,
        completedPercentMin: completedPercentMin,
        jobSearchStatusCode: Number(this.formInline.state),
        pageNum: this.page3.current,
        pageSize: 10,
        processedState: "UNFIT",
        province: this.form.city[1] ? this.form.city[1] : null,
        sortBy: null,
        sortOrder: null,
        submittedTimeEnd: this.endTime,
        submittedTimeStart: this.startTime
      };
      this.$http
        .post(`/business-core/position/${this.positionID}/resumes/list`, params)
        .then(res => {
          let response = res.data.data.list;
          if (res.data.code == "200") {
            this.tableData = response;
            this.page4.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.city = citys.data;
    this.positionID = this.$route.query.positionId;
    this.action = this.$route.query.action;
    console.log(this.action);
    this.position();
    this.process();
  },
  filters: {
    level(level) {
      var a;
      switch (level) {
        case "EMPLOYED":
          a = "已入职";
          break;
        default:
          a = "未入职";
          break;
      }
      return a;
    }
  }
};
</script>


<style lang="stylus" scoped>
.resume-nav {
  width: 100%;
  height: 50px;
  background: #FAFAFA;
  display: flex;
  flex-direction: row;
  line-height: 50px;
  margin: -80px 0 0 0;

  div:nth-child(1) {
    margin: 0 0 0 20px;
    font-size: 16px;
    color: #1890FF;
  }

  div:nth-child(2) {
    margin: 0 160px 0 0;
    color: #373737;
    font-size: 14px;
  }
}

.left-second {
  width: 100%;
  height: 80px;
  background: #ffffff;
  text-align: center;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);

  ul {
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;
    padding: 0;
  }

  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 10px 0 0 0;

    span:first-child {
      line-height: 27px;
      color: #666;
      font-size: 14px;
    }

    span:last-child {
      line-height: 33px;
      font-size: 24px !important;
      color: #a3292e;
    }
  }
}

.resume-second {
  width: 100%;
  height: 80px;
  background: #ffffff;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);
  text-align: center;

  ul {
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;
    padding: 0;
  }

  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 10px 0 0 0;

    span:first-child {
      line-height: 27px;
      color: #666;
      font-size: 14px;
    }

    span:last-child {
      line-height: 33px;
      font-size: 24px !important;
      color: #a3292e;
    }
  }
}

.resume-seconds {
  width: 100%;
  height: auto;
  background: #ffffff;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);

  .tab-operations {
    position: absolute;
    z-index:999;
    margin: 7px 0 0 840px;
    font-family: PingFangSC-Regular;
  }

  .demo-form {
    display: flex;
    flex-direction: row;
  }

  .line {
    margin: 0 0 0 10px;
  }
}

.demo-form-inline {
  margin: 20px 20px 0 20px;
}
</style>
