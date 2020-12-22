<template>
  <Scroll ref="scroll">
    <div class="resumes">
      <div class="content">
        <el-dialog title width="30%" :visible.sync="dialogDrag" style="border-radius:5px;">
          <div style="font-size:18px;">简历附件上传功能正在准备中<br>敬请期待</div>
          <div style="margin:25px 0 0 0">
            <el-button @click="dialogDrag = false" type="primary">知道了</el-button>
          </div>
          <!-- <div>
            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              style="margin:0 0 20px 0"
              drag
              :data="uploadfile"
              :headers="myHeaders"
              :show-file-list="false"
              :on-success="handleVideoSuccess"
            >
              <div>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                  <div class="el-upload__tip" slot="tip">支持DOC、DOCX、PDF、JPG、PNG格式，文件大小需小于10M。</div>
                </div>
              </div>
            </el-upload>
            <div class="dialogResume" v-if="videoFlag == true">
              <div>
                <i class="el-icon-paperclip"></i>
                <span style="margin:0 0 0 5px">123</span>
              </div>
              <div>
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div> -->
        </el-dialog>
        <el-dialog
          title
          :visible.sync="dialogSuccess"
          style="width:700px;margin-left:25%;margin-top:5%;border-radius:5px"
        >
          <div style="display:flex;flex-direction:column;" v-if="this.dialogsetDefault">
            <div>
              <img :src="require('../assets/images/succ.png')" />
            </div>
            <div style="font-family: PingFangSC-Medium;color: #2C2C2C;font-size:20px">设置成功</div>
            <div
              style="font-family: PingFangSC-Regular;color: #565656;font-size:14px;margin:10px 0 70px 0"
            >成功设置为默认投递简历～</div>
            <div>
              <el-button
                @click="dialogSuccess = false"
                style="width:270px;height:40px;margin:0 0 40px 0"
                type="primary"
              >确定</el-button>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;" v-else>
            <div>
              <img :src="require('../assets/images/sz.png')" />
            </div>
            <div style="font-family: PingFangSC-Medium;color: #2C2C2C;font-size:20px">上传成功</div>
            <div
              style="font-family: PingFangSC-Regular;color: #565656;font-size:14px;margin:10px 0 70px 0"
            >成功上传附件简历~</div>
            <div>
              <el-button
                @click="dialogSuccess = false"
                style="width:270px;height:40px;margin:0 0 40px 0"
                type="primary"
              >确定</el-button>
            </div>
          </div>
        </el-dialog>
        <el-dialog
          class="deleteDialog"
          title
          :visible.sync="dialogResume"
          style="width:900px;margin-left:25%;margin-top:10%;border-radius:5px"
        >
          <div style="display:flex;flex-direction:row;margin-left:30px">
            <span
              v-if="this.isDefault"
              style="font-size:20px;line-height:20px;margin:15px 0 0 0;color:#373737"
            >确定删除？删除后默认投递简历将会改变</span>
            <span
              v-else
              style="font-size:20px;line-height:20px;margin:15px 0 0 130px;color:#373737"
            >确定删除？</span>
          </div>
          <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:60px">
            <el-button style="margin:0 100px 0 0" @click="dialogResume = false" plain>取 消</el-button>
            <el-button type="primary" style="margin:0 0 0 0" @click="keepDelete()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 教育经历删除确认 -->
        <el-dialog
          class="deleteDialog"
          title
          :visible.sync="dialogedu"
          style="width:900px;margin-left:25%;margin-top:10%;border-radius:5px"
        >
          <div style="display:flex;flex-direction:row;margin-left:90px">
            <span
              style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
            >删除后不能恢复，请确定删除？</span>
          </div>
          <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
            <el-button style="margin:0 100px 0 0" @click="dialogedu = false" plain>取 消</el-button>
            <el-button type="primary" style="margin:0 0 0 0" @click="deletedu()">确 定</el-button>
          </div>
          <!-- <div style="height:93px"></div> -->
        </el-dialog>
        <!-- 工作经历删除确认 -->
        <el-dialog
          class="deleteDialog"
          title
          :visible.sync="dialogwork"
          style="width:900px;margin-left:25%;margin-top:10%;border-radius:5px"
        >
          <div style="display:flex;flex-direction:row;margin-left:90px">
            <span
              style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
            >删除后不能恢复，请确定删除？</span>
          </div>
          <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
            <el-button style="margin:0 100px 0 0" @click="dialogwork = false" plain>取 消</el-button>
            <el-button type="primary" style="margin:0 0 0 0" @click="deletework()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 项目经历删除确认 -->
        <el-dialog
          class="deleteDialog"
          title
          :visible.sync="dialogproject"
          style="width:900px;margin-left:25%;margin-top:10%;border-radius:5px"
        >
          <div style="display:flex;flex-direction:row;margin-left:90px">
            <span
              style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
            >删除后不能恢复，请确定删除？</span>
          </div>
          <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
            <el-button style="margin:0 100px 0 0" @click="dialogproject = false" plain>取 消</el-button>
            <el-button type="primary" style="margin:0 0 0 0" @click="deleteproject()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 培训经历删除确认 -->
        <el-dialog
          class="deleteDialog"
          title
          :visible.sync="dialogtrain"
          style="width:900px;margin-left:25%;margin-top:10%;border-radius:5px"
        >
          <div style="display:flex;flex-direction:row;margin-left:90px">
            <span
              style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
            >删除后不能恢复，请确定删除？</span>
          </div>
          <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
            <el-button style="margin:0 100px 0 0" @click="dialogtrain = false" plain>取 消</el-button>
            <el-button type="primary" style="margin:0 0 0 0" @click="deletetrain()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 语言能力删除确认 -->
        <el-dialog
          class="deleteDialog"
          title
          :visible.sync="dialoglanguage"
          style="width:900px;margin-left:25%;margin-top:10%;border-radius:5px"
        >
          <div style="display:flex;flex-direction:row;margin-left:90px">
            <span
              style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
            >删除后不能恢复，请确定删除？</span>
          </div>
          <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
            <el-button style="margin:0 100px 0 0" @click="dialoglanguage = false" plain>取 消</el-button>
            <el-button type="primary" style="margin:0 0 0 0" @click="deletelanguage()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 专业技能删除确认 -->
        <el-dialog
          class="deleteDialog"
          title
          :visible.sync="dialogskill"
          style="width:900px;margin-left:25%;margin-top:10%;border-radius:5px"
        >
          <div style="display:flex;flex-direction:row;margin-left:90px">
            <span
              style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
            >删除后不能恢复，请确定删除？</span>
          </div>
          <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
            <el-button style="margin:0 100px 0 0" @click="dialogskill = false" plain>取 消</el-button>
            <el-button type="primary" style="margin:0 0 0 0" @click="deleteskill()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 职称等级删除确认 -->
        <el-dialog
          class="deleteDialog"
          title
          :visible.sync="dialogprofess"
          style="width:900px;margin-left:25%;margin-top:10%;border-radius:5px"
        >
          <div style="display:flex;flex-direction:row;margin-left:90px">
            <span
              style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
            >删除后不能恢复，请确定删除？</span>
          </div>
          <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
            <el-button style="margin:0 100px 0 0" @click="dialogprofess = false" plain>取 消</el-button>
            <el-button type="primary" style="margin:0 0 0 0" @click="deleteprofession()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 荣誉奖项删除确认 -->
        <el-dialog
          class="deleteDialog"
          title
          :visible.sync="dialogaward"
          style="width:900px;margin-left:25%;margin-top:10%;border-radius:10px"
        >
          <div style="display:flex;flex-direction:row;margin-left:90px">
            <span
              style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
            >删除后不能恢复，请确定删除？</span>
          </div>
          <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
            <el-button style="margin:0 100px 0 0" @click="dialogaward = false" plain>取 消</el-button>
            <el-button type="primary" style="margin:0 0 0 0" @click="deleteawards()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 基本信息编辑 -->
        <el-dialog
          title="基本信息编辑"
          style="width:1250px;margin-left:15%;overflow:hidden;"
          :visible.sync="informationouterVisible"
        >
          <el-dialog
            class="sureDialog"
            style="width:900px;margin-left:24%;margin-top:10%;border-radius:10px"
            :visible.sync="informationinnerVisible"
            append-to-body
          >
            <div style="display:flex;flex-direction:row;margin-left:90px">
              <span
                style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
              >离开修改内容将不会保存的噢</span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
              <el-button
                style="margin:0 100px 0 0"
                @click="informationinnerVisible = false"
                plain
              >取 消</el-button>
              <el-button
                style="margin:0 0 0 0"
                type="primary"
                @click="informationouterVisible = false,informationinnerVisible = false"
              >确定</el-button>
            </div>
          </el-dialog>
          <div style="height:470px;overflow-y:scroll;overflow-x:hidden">
            <el-form
              :model="formInformation"
              class="demo-form-inline"
              label-width="120px"
              :rules="personalrules"
              ref="formInformation"
            >
              <el-form-item label="头像">
                <el-upload
                  :action="uploadUrlOne"
                  :show-file-list="false"
                  :data="uploadData"
                  :headers="myHeaders"
                  :on-success="handleAvatarSuccessOne"
                  :on-error="handleAvatarError"
                >
                  <img
                    style="margin:-10px 0 0 -190px"
                    v-if="imageUrlTwo"
                    :src="imageUrlTwo"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div
                    style="margin:-20px 0 0 -5px;width:120px"
                    class="el-upload__tip"
                    slot="tip"
                  >只能上传jpg/png文件</div>
                  <div
                    style="margin:-20px 0 0 -5px;width:120px"
                    class="el-upload__tip"
                    slot="tip"
                  >且不超过2Mb</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formInformation.name"
                  placeholder="请输入姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别" style="margin:0 0 0 0;width:500px;" prop="sex">
                <el-radio
                  style="width:112px;height:40px;margin:0 0 0 -145px"
                  v-model="formInformation.sex"
                  border
                  label="0"
                >男性</el-radio>
                <el-radio
                  style="width:112px;height:40px;margin:0 0 0 20px"
                  v-model="formInformation.sex"
                  border
                  label="1"
                >女性</el-radio>
              </el-form-item>
              <br />
              <el-form-item label="是否应届" style="margin:0 0 0 0;width:500px;" prop="graduate">
                <el-radio
                  style="width:112px;height:40px;margin:0 0 0 -145px"
                  v-model="formInformation.graduate"
                  border
                  label="0"
                >是</el-radio>
                <el-radio
                  style="width:112px;height:40px;margin:0 0 0 20px"
                  v-model="formInformation.graduate"
                  border
                  label="1"
                >否</el-radio>
              </el-form-item>
              <br />
              <el-form-item label="起始工作时间" prop="workAge">
                <el-date-picker
                  v-model="formInformation.workAge"
                  type="year"
                  style="width:300px;height:36px;margin-left:-100px"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="海外工作年限" prop="overseasAge" class="selsct">
                <el-select
                  style="width:300px;height:36px;margin-left:-100px"
                  :disabled="this.formInformation.graduate === '0'?true:false"
                  v-model="formInformation.overseasAge"
                  placeholder
                >
                  <el-option label="无工作年限" value="0"></el-option>
                  <el-option label="1年" value="1"></el-option>
                  <el-option label="2年" value="2"></el-option>
                  <el-option label="3年" value="3"></el-option>
                  <el-option label="4年" value="4"></el-option>
                  <el-option label="5年" value="5"></el-option>
                  <el-option label="6年" value="6"></el-option>
                  <el-option label="7年" value="7"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所在城市" prop="city" class="suozai">
                <el-cascader
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formInformation.city"
                  :options="options"
                  :props="propss"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="最高学历" prop="educationLevel">
                <el-select
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formInformation.educationLevel"
                  placeholder
                >
                  <el-option label="初中及以下" value="0"></el-option>
                  <el-option label="职中" value="1"></el-option>
                  <el-option label="高中" value="2"></el-option>
                  <el-option label="大专" value="3"></el-option>
                  <el-option label="本科" value="4"></el-option>
                  <el-option label="硕士" value="5"></el-option>
                  <el-option label="博士" value="6"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生日" prop="birthday">
                <el-date-picker
                  v-model="formInformation.birthday"
                  type="date"
                  :picker-options="pickerOptions"
                  style="width:300px;height:36px;margin-left:-100px"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formInformation.email"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="phone">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formInformation.phone"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="政治面貌" prop="politicCountenance">
                <el-select
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formInformation.politicCountenance"
                  placeholder="请选择政治面貌"
                >
                  <el-option label="群众" value="0"></el-option>
                  <el-option label="团员" value="1"></el-option>
                  <el-option label="民主党派" value="2"></el-option>
                  <el-option label="预备党员" value="3"></el-option>
                  <el-option label="中共党员" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="margin:-20px 0 20px 0">
            <el-button style="margin:0 20px 0 0" @click="informationinnerVisible = true" plain>取 消</el-button>
            <el-button
              style="margin:0 35px 0 0"
              type="primary"
              @click="informationkeep('formInformation')"
            >保存</el-button>
          </div>
        </el-dialog>
        <!-- 求职意向编辑 -->
        <el-dialog
          title="求职意向编辑"
          :close-on-click-modal="false"
          style="width:1250px;margin-left:15%"
          :visible.sync="jobintensionouterVisible"
        >
          <el-dialog
            class="sureDialog"
            style="width:900px;margin-left:24%;margin-top:10%;border-radius:10px"
            :visible.sync="jobintensioninnerVisible"
            append-to-body
          >
            <div style="display:flex;flex-direction:row;margin-left:90px">
              <span
                style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
              >离开修改内容将不会保存的噢</span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
              <el-button
                style="margin:0 100px 0 0"
                @click="jobintensioninnerVisible = false"
                plain
              >取 消</el-button>
              <el-button
                style="margin:0 0 0 0"
                type="primary"
                @click="jobintensionouterVisible = false,jobintensioninnerVisible = false"
              >确定</el-button>
            </div>
          </el-dialog>
          <div>
            <el-form
              :model="formJobintension"
              class="demo-form-inline"
              label-width="100px"
              :rules="jobintensionrules"
              ref="formJobintension"
            >
              <el-form-item label="职位类型" prop="postType">
                <el-cascader
                  style="width:300px;height:36px;margin-left:-100px"
                  :options="positionCatalogList"
                  :props="propsTwo"
                  v-model="formJobintension.postType"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="工作城市" prop="city">
                <el-cascader
                  style="width:300px;height:36px;margin-left:-100px"
                  :options="options"
                  :props="props"
                  v-model="formJobintension.city"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="企业行业" prop="trad">
                <el-cascader
                  style="width:300px;height:36px;margin-left:-100px"
                  :options="industryList"
                  :props="propsOne"
                  v-model="formJobintension.trad"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="薪资范围" prop="scope">
                <el-select
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formJobintension.scope"
                  placeholder
                >
                  <el-option
                    v-for="(list,index) in monthPayList"
                    :key="index"
                    :label="list.tag"
                    :value="list.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="求职状态" prop="status">
                <el-select
                  id="name"
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formJobintension.status"
                  placeholder
                  @change="Jobstate()"
                >
                  <el-option
                    v-for="(list,index) in jobSearchList"
                    :key="index"
                    :label="list.tag"
                    :value="list.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作类型" prop="jobType">
                <el-select
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formJobintension.jobType"
                  placeholder
                >
                  <el-option
                    v-for="(list,index) in workStateList"
                    :key="index"
                    :label="list.tag"
                    :value="list.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- :disabled="this.formJobintension.status === '离职-延时到岗'?false:true" -->
              <el-form-item label="到岗时间" class="block">
                <el-date-picker
                  :disabled="this.formJobintension.status === 1||this.formJobintension.status === '离职-延时到岗'?false:true"
                  v-model="formJobintension.reportTime"
                  :picker-options="pickerOptionsOne"
                  style="width:300px;height:36px;margin-left:-100px"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="margin:-20px 0 20px 0">
            <el-button style="margin:0 20px 0 0" @click="jobintensioninnerVisible = true" plain>取 消</el-button>
            <el-button
              style="margin:0 55px 0 0"
              type="primary"
              @click="jobintensionkeep('formJobintension')"
            >保存</el-button>
          </div>
        </el-dialog>
        <!-- 工作经历编辑 -->
        <el-dialog
          title="工作经历编辑"
          :close-on-click-modal="false"
          style="width:1250px;margin-left:15%"
          :visible.sync="workouterVisible"
        >
          <el-dialog
            class="sureDialog"
            style="width:900px;margin-left:24%;margin-top:10%;border-radius:10px"
            :visible.sync="workinnerVisible"
            append-to-body
          >
            <div style="display:flex;flex-direction:row;margin-left:90px">
              <span
                style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
              >离开修改内容将不会保存的噢</span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
              <el-button style="margin:0 100px 0 0" @click="workinnerVisible = false" plain>取 消</el-button>
              <el-button
                style="margin:0 0 0 0"
                type="primary"
                @click="workouterVisible = false,workinnerVisible = false"
              >确定</el-button>
            </div>
          </el-dialog>
          <div>
            <el-form
              :model="formWork"
              class="demo-form-inline"
              label-width="100px"
              :rules="workrules"
              ref="formWork"
            >
              <el-form-item label="公司名称" prop="companyName">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formWork.companyName"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="职位名称" prop="postName">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formWork.postName"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="税前月薪(k)">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formWork.monthPay"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="工作时间" class="block" prop="workTime">
                <el-date-picker
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formWork.workTime"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="工作描述" prop="jobDescription">
                <el-input
                  type="textarea"
                  v-model="formWork.jobDescription"
                  style="width:300px;margin-left:-100px"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="margin:-20px 0 20px 0">
            <el-button style="margin:0 20px 0 0" @click="workinnerVisible = true" plain>取 消</el-button>
            <el-button style="margin:0 55px 0 0" type="primary" @click="workkeep('formWork')">保存</el-button>
          </div>
        </el-dialog>
        <!-- 教育经历编辑 -->
        <el-dialog
          title="教育经历编辑"
          :close-on-click-modal="false"
          style="width:1250px;margin-left:15%"
          :visible.sync="educationouterVisible"
        >
          <div>
            <el-form
              :model="formEducation"
              class="demo-form-inline"
              label-width="100px"
              :rules="edurules"
              ref="formEducation"
            >
              <el-form-item label="学校名称" prop="educationName">
                <el-input
                  v-model="formEducation.educationName"
                  style="width:300px;height:36px;margin-left:-100px"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="在校时间" class="block" prop="educationTime">
                <el-date-picker
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formEducation.educationTime"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="专业" prop="educationSpecialty">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  placeholder
                  v-model="formEducation.educationSpecialty"
                ></el-input>
              </el-form-item>
              <el-form-item label="学历" prop="educationDegree">
                <el-select
                  style="width:300px;height:36px;margin-left:-100px"
                  placeholder
                  v-model="formEducation.educationDegree"
                >
                  <el-option label="初中及以下" value="0"></el-option>
                  <el-option label="职中" value="1"></el-option>
                  <el-option label="高中" value="2"></el-option>
                  <el-option label="大专" value="3"></el-option>
                  <el-option label="本科" value="4"></el-option>
                  <el-option label="硕士" value="5"></el-option>
                  <el-option label="博士" value="6"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="margin:-20px 0 20px 0">
            <el-button style="margin:0 20px 0 0" @click="educationinnerVisible = true" plain>取 消</el-button>
            <el-button
              style="margin:0 55px 0 0"
              type="primary"
              @click="educationkeep('formEducation')"
            >保存</el-button>
          </div>
          <el-dialog
            class="sureDialog"
            style="width:900px;margin-left:24%;margin-top:10%;border-radius:10px"
            :visible.sync="educationinnerVisible"
            append-to-body
          >
            <div style="display:flex;flex-direction:row;margin-left:90px">
              <span
                style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
              >离开修改内容将不会保存的噢</span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
              <el-button style="margin:0 100px 0 0" @click="educationinnerVisible = false" plain>取 消</el-button>
              <el-button
                style="margin:0 0 0 0"
                type="primary"
                @click="educationouterVisible = false,educationinnerVisible = false"
              >确定</el-button>
            </div>
          </el-dialog>
        </el-dialog>
        <!-- 项目经历编辑 -->
        <el-dialog
          title="项目经历编辑"
          :close-on-click-modal="false"
          style="width:1250px;margin-left:15%"
          :visible.sync="progectouterVisible"
        >
          <div>
            <el-form
              :model="formProject"
              class="demo-form-inline"
              label-width="100px"
              :rules="progectrules"
              ref="formProject"
            >
              <el-form-item label="项目名称" prop="itemName">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formProject.itemName"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="公司名称" prop="companyName">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formProject.companyName"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="项目时间" class="block" prop="schoolTime">
                <el-date-picker
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formProject.schoolTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="个人职责" prop="duty">
                <el-input
                  type="textarea"
                  v-model="formProject.duty"
                  maxlength="1600"
                  show-word-limit
                  style="width:300px;margin-left:-100px"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目介绍" prop="project">
                <el-input
                  type="textarea"
                  maxlength="1600"
                  show-word-limit
                  v-model="formProject.project"
                  style="width:300px;margin-left:-100px"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="margin:-20px 0 20px 0">
            <el-button style="margin:0 20px 0 0" @click="progectinnerVisible = true" plain>取 消</el-button>
            <el-button
              style="margin:0 55px 0 0"
              type="primary"
              @click="progectkeep('formProject')"
            >保存</el-button>
          </div>
          <el-dialog
            class="sureDialog"
            style="width:900px;margin-left:24%;margin-top:10%;border-radius:10px"
            :visible.sync="progectinnerVisible"
            append-to-body
          >
            <div style="display:flex;flex-direction:row;margin-left:90px">
              <span
                style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
              >离开修改内容将不会保存的噢</span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
              <el-button style="margin:0 100px 0 0" @click="progectinnerVisible = false" plain>取 消</el-button>
              <el-button
                style="margin:0 0 0 0"
                type="primary"
                @click="progectouterVisible = false,progectinnerVisible = false"
              >确定</el-button>
            </div>
          </el-dialog>
        </el-dialog>
        <!-- 培训经历编辑 -->
        <el-dialog
          title="培训经历编辑"
          :close-on-click-modal="false"
          style="width:1250px;margin-left:15%"
          :visible.sync="trainingouterVisible"
        >
          <div>
            <el-form
              :model="formtraining"
              class="demo-form-inline"
              label-width="100px"
              :rules="trainrules"
              ref="formtraining"
            >
              <el-form-item label="培训课程" prop="trainCourse">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formtraining.trainCourse"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="培训机构" prop="trainCours">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formtraining.trainCours"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="培训时间" class="block" prop="trainTime">
                <el-date-picker
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formtraining.trainTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="margin:-20px 0 20px 0">
            <el-button style="margin:0 20px 0 0" @click="traininginnerVisible = true" plain>取 消</el-button>
            <el-button
              style="margin:0 55px 0 0"
              type="primary"
              @click="trainingkeep('formtraining')"
            >保存</el-button>
          </div>
          <el-dialog
            class="sureDialog"
            style="width:900px;margin-left:24%;margin-top:10%;border-radius:10px"
            :visible.sync="traininginnerVisible"
            append-to-body
          >
            <div style="display:flex;flex-direction:row;margin-left:90px">
              <span
                style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
              >离开修改内容将不会保存的噢</span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
              <el-button style="margin:0 100px 0 0" @click="traininginnerVisible = false" plain>取 消</el-button>
              <el-button
                style="margin:0 0 0 0"
                type="primary"
                @click="trainingouterVisible = false,traininginnerVisible = false"
              >确定</el-button>
            </div>
          </el-dialog>
        </el-dialog>
        <!-- 语言能力编辑 -->
        <el-dialog
          title="语言能力编辑"
          :close-on-click-modal="false"
          style="width:1250px;margin-left:15%"
          :visible.sync="languageouterVisible"
        >
          <div>
            <el-form
              :model="formlanguage"
              class="demo-form-inline"
              label-width="100px"
              :rules="languagerules"
              ref="formlanguage"
            >
              <el-form-item label="语种" prop="languages">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formlanguage.languages"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="听力能力" prop="listenAbility">
                <el-select
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formlanguage.listenAbility"
                  placeholder
                >
                  <el-option label="一般" value="0"></el-option>
                  <el-option label="良好" value="1"></el-option>
                  <el-option label="熟练" value="2"></el-option>
                  <el-option label="精通" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="读写能力" prop="readAbility">
                <el-select
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formlanguage.readAbility"
                  placeholder
                >
                  <el-option label="一般" value="0"></el-option>
                  <el-option label="良好" value="1"></el-option>
                  <el-option label="熟练" value="2"></el-option>
                  <el-option label="精通" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="margin:-20px 0 20px 0">
            <el-button style="margin:0 20px 0 0" @click="languageinnerVisible = true" plain>取 消</el-button>
            <el-button
              style="margin:0 55px 0 0"
              type="primary"
              @click="languagekeep('formlanguage')"
            >保存</el-button>
          </div>
          <el-dialog
            class="sureDialog"
            style="width:900px;margin-left:24%;margin-top:10%;border-radius:10px"
            :visible.sync="languageinnerVisible"
            append-to-body
          >
            <div style="display:flex;flex-direction:row;margin-left:90px">
              <span
                style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
              >离开修改内容将不会保存的噢</span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
              <el-button style="margin:0 100px 0 0" @click="languageinnerVisible = false" plain>取 消</el-button>
              <el-button
                style="margin:0 0 0 0"
                type="primary"
                @click="languageouterVisible = false,languageinnerVisible = false"
              >确定</el-button>
            </div>
          </el-dialog>
        </el-dialog>
        <!-- 职称等级 -->
        <el-dialog
          title="职称等级编辑"
          :close-on-click-modal="false"
          style="width:1250px;margin-left:15%"
          :visible.sync="professionouterVisible"
        >
          <div>
            <el-form
              :model="formProfession"
              class="demo-form-inline"
              label-width="120px"
              :rules="professionalrules"
              ref="formProfession"
            >
              <el-form-item label="职称等级名称" prop="qual">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formProfession.qual"
                  placeholder
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="margin:-20px 0 20px 0">
            <el-button style="margin:0 20px 0 0" @click="professioninnerVisible = true" plain>取 消</el-button>
            <el-button
              style="margin:0 55px 0 0"
              type="primary"
              @click="professionkeep('formProfession')"
            >保存</el-button>
          </div>
          <el-dialog
            class="sureDialog"
            style="width:900px;margin-left:24%;margin-top:10%;border-radius:10px"
            :visible.sync="professioninnerVisible"
            append-to-body
          >
            <div style="display:flex;flex-direction:row;margin-left:90px">
              <span
                style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
              >离开修改内容将不会保存的噢</span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
              <el-button
                style="margin:0 100px 0 0"
                @click="professioninnerVisible = false"
                plain
              >取 消</el-button>
              <el-button
                style="margin:0 0 0 0"
                type="primary"
                @click="professionouterVisible = false,professioninnerVisible = false"
              >确定</el-button>
            </div>
          </el-dialog>
        </el-dialog>
        <!-- 专业技能 -->
        <el-dialog
          title="专业技能编辑"
          :close-on-click-modal="false"
          style="width:1250px;margin-left:15%"
          :visible.sync="personalskillouterVisible"
        >
          <div>
            <el-form
              :model="formPersonalskill"
              class="demo-form-inline"
              label-width="100px"
              :rules="skillrules"
              ref="formPersonalskill"
            >
              <el-form-item label="技能名称" prop="technicalName">
                <el-input
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formPersonalskill.technicalName"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="掌握程度" prop="level">
                <el-select
                  style="width:300px;height:36px;margin-left:-100px"
                  v-model="formPersonalskill.level"
                  placeholder
                >
                  <el-option label="一般" value="0"></el-option>
                  <el-option label="良好" value="1"></el-option>
                  <el-option label="熟练" value="2"></el-option>
                  <el-option label="精通" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="margin:-20px 0 20px 0">
            <el-button style="margin:0 20px 0 0" @click="personalskillinnerVisible = true" plain>取 消</el-button>
            <el-button
              style="margin:0 55px 0 0"
              type="primary"
              @click="skillkeep('formPersonalskill')"
            >保存</el-button>
          </div>
          <el-dialog
            class="sureDialog"
            style="width:900px;margin-left:24%;margin-top:10%;border-radius:10px"
            :visible.sync="personalskillinnerVisible"
            append-to-body
          >
            <div style="display:flex;flex-direction:row;margin-left:90px">
              <span
                style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
              >离开修改内容将不会保存的噢</span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
              <el-button
                style="margin:0 100px 0 0"
                @click="personalskillinnerVisible = false"
                plain
              >取 消</el-button>
              <el-button
                style="margin:0 0 0 0"
                type="primary"
                @click="personalskillouterVisible = false,personalskillinnerVisible = false"
              >确定</el-button>
            </div>
          </el-dialog>
        </el-dialog>
        <!-- 荣誉奖项 -->
        <el-dialog
          title="荣誉奖项编辑"
          :close-on-click-modal="false"
          style="width:1250px;margin-left:15%"
          :visible.sync="awardsouterVisible"
        >
          <div>
            <el-form
              :model="formAwards"
              class="demo-form-inline"
              label-width="100px"
              :rules="awardsrules"
              ref="formAwards"
            >
              <el-form-item label="奖项名称" prop="prizeAward">
                <el-input
                  style="width:300px;height:36px;margin-left:-120px"
                  v-model="formAwards.prizeAward"
                  placeholder
                ></el-input>
              </el-form-item>
              <el-form-item label="获奖时间" prop="prizeTime">
                <el-date-picker
                  style="width:300px;height:36px;margin-left:-120px"
                  v-model="formAwards.prizeTime"
                  type="month"
                  placeholder="选择月"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="获奖证书">
                <el-upload
                  class="avatar-upload"
                  style="margin-right:315px"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleAvatarError"
                >
                  <img v-if="imageUrlOne" :src="imageUrlOne" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div
                    style="margin:-20px 0 0 0;width:120px"
                    class="el-upload__tip"
                    slot="tip"
                  >只能上传jpg/png文件</div>
                  <div
                    style="margin:-20px 0 0 0;width:120px"
                    class="el-upload__tip"
                    slot="tip"
                  >且不超过2Mb</div>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="margin:-20px 0 20px 0">
            <el-button style="margin:0 20px 0 0" @click="awardsinnerVisible = true" plain>取 消</el-button>
            <el-button style="margin:0 55px 0 0" type="primary" @click="awardskeep('formAwards')">保存</el-button>
          </div>
          <el-dialog
            class="sureDialog"
            style="width:900px;margin-left:24%;margin-top:10%;border-radius:10px"
            :visible.sync="awardsinnerVisible"
            append-to-body
          >
            <div style="display:flex;flex-direction:row;margin-left:90px">
              <span
                style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
              >离开修改内容将不会保存的噢</span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
              <el-button style="margin:0 100px 0 0" @click="awardsinnerVisible = false" plain>取 消</el-button>
              <el-button
                style="margin:0 0 0 0"
                type="primary"
                @click="awardsouterVisible = false,awardsinnerVisible = false"
              >确定</el-button>
            </div>
          </el-dialog>
        </el-dialog>
        <!-- 自我评价 -->
        <el-dialog
          title="自我评价编辑"
          :close-on-click-modal="false"
          style="width:1250px;margin-left:15%"
          :visible.sync="selfappraisalouterVisible"
        >
          <div>
            <el-form
              :model="formSelfappraisal"
              class="demo-form-inline"
              label-width="100px"
              :rules="selfappraisalrules"
              ref="formSelfappraisal"
            >
              <el-form-item label="自我评价" prop="personalDescription">
                <el-input
                  type="textarea"
                  v-model="formSelfappraisal.personalDescription"
                  style="width:400px;margin-right:50px"
                  maxlength="300"
                  show-word-limit
                  placeholder="资料完善程度高，被选中的几率越大呦"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="margin:-20px 0 20px 0">
            <el-button style="margin:0 20px 0 0" @click="selfappraisalinnerVisible = true" plain>取 消</el-button>
            <el-button
              style="margin:0 55px 0 0"
              type="primary"
              @click="selfappraisalkeep('formSelfappraisal')"
            >保存</el-button>
          </div>
          <el-dialog
            class="sureDialog"
            style="width:900px;margin-left:21%;margin-top:10%;border-radius:10px"
            :visible.sync="selfappraisalinnerVisible"
            append-to-body
          >
            <div style="display:flex;flex-direction:row;margin-left:90px">
              <span
                style="font-size:20px;line-height:20px;margin:15px 0 0 -10px;color:#373737"
              >离开修改内容将不会保存的噢</span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:-70px;margin-right:50px">
              <el-button
                style="margin:0 100px 0 0"
                @click="selfappraisalinnerVisible = false"
                plain
              >取 消</el-button>
              <el-button
                style="margin:0 0 0 0"
                type="primary"
                @click="selfappraisalouterVisible = false,selfappraisalinnerVisible = false"
              >确定</el-button>
            </div>
          </el-dialog>
        </el-dialog>
        <!-- 添加个人信息 -->
        <div class="personalinformation" v-if="isshowpersonalinformation">
          <div style="margin:20px 0 0 96px;">
            <img style="margin:30px 0 -30px 0" v-if="imageUrl" :src="imageUrl" class="avatar" />
            <img
              style="margin:30px 0 -30px 0"
              class="avatar"
              v-else
              :src="require('../assets/images/mo.png')"
            />
          </div>
          <div class="main-content" style="margin:140px 0 0 0;">
            <div class="main-content-second" @click="ispersonalinformation">
              <img :src="require('../assets/images/jia.png')" />
              <span style="cursor:pointer;line-height:10px">添加个人信息</span>
            </div>
          </div>
          <!-- <div class="img-add" @click="ispersonalinformation"><img :src="require('../assets/images/jia.png')"/><span
          class="add">添加个人信息</span></div>-->
        </div>
        <div class="showdemo" v-if="showDemo">
          <Basic-Info :fromData="this.resumesId" @BasicEmit="BasicEmit(arguments)" />
        </div>
        <ul
          ref="personalinformation"
          v-if="showPersonalinformation"
          style="margin:0 30px 10px 0"
          @mouseover="over(11)"
          @mouseleave="leave(11)"
        >
          <li class="li-a">
            <div style="width:700px;margin:0 0 0 -30px">
              <Personalinformation-From
                :fromData="resumeIdList"
                :todo="avatarUrl"
                @editsinformation="editsinformation(arguments)"
              />
            </div>
            <div style="margin:50px 0 0 170px;height:12px;font-size:15px;cursor:pointer;;">
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 0;display:flex;flex-direction:row;width:100px;"
                @click="showjpersonalList()"
              >
                <i class="el-icon-edit"></i>编辑
              </span>
            </div>
          </li>
        </ul>
        <!-- <div ref="personalinformation" @mouseover="over(11)" v-if="showPersonalinformation" @mouseleave="leave(11)">
          <div>
            <Personalinformation-From  :fromData="resumeIdList" @editsinformation='editsinformation(arguments)'/>
            <span class="actions-span">
                <img style="margin-right:9px;height:12px" :src="require('../assets/images/ziwo.png')"/><span
                    style="margin-right:3px" @click="showjobintensionList()">编辑</span>
            </span>
          </div>BasicinfoEmit
        </div>-->
        <div class="content-line"></div>
        <!-- 求职意向 -->
        <div ref="jobintension" class="main-content" style="margin:0 0 -15px 0">
          <div class="main-content-first">
            <span style="margin:18px 0 0 0;float:left;width:3px;height:15px;background:#02B9B8;"></span>
            <span>求职意向</span>
          </div>
          <div class="main-content-second" v-if="joint" @click="jobintension">
            <img :src="require('../assets/images/jia.png')" />
            <span style="cursor:pointer">添加</span>
          </div>
        </div>
        <ul
          v-if="showjobintension"
          style="margin:-15px 0 10px 52px"
          @mouseover="over(10)"
          @mouseleave="leave(10)"
        >
          <li class="ul-a">
            <span class="actions-span" style="margin:8px 20px 0 0;cursor:pointer">
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 0;display:flex;flex-direction:row;"
                @click="showjobintensionList()"
              >
                <i class="el-icon-edit"></i>编辑
              </span>
            </span>
            <div style="width:879px;margin:0 0 5px 0">
              <from :fromData="targeIdList"></from>
            </div>
          </li>
        </ul>
        <div
          @mouseover="over(10)"
          @mouseleave="leave(10)"
          class="showJob"
          v-if="showJob"
          style="margin:20px 0 0 0"
        >
          <job-intension
            @jobintensionEmit="jobintensionEmit(arguments)"
            :JobintenDegree="this.resumesId"
          />
        </div>
        <div class="content-line"></div>
        <!-- 教育经历 -->
        <div ref="educational" class="main-content" style="margin:0 0 5px 0">
          <div class="main-content-first">
            <span style="margin:18px 0 0 0;float:left;width:3px;height:15px;background:#02B9B8;"></span>
            <span>教育经历</span>
          </div>
          <div class="main-content-second" @click="education">
            <img :src="require('../assets/images/jia.png')" />
            <span style="cursor:pointer">添加</span>
          </div>
        </div>
        <ul
          v-if="showeducational"
          style="margin:-15px 0 10px 55px"
          @mouseover="over(9)"
          @mouseleave="leave(9)"
        >
          <li v-for="(list,index) in listeducational" :key="index" class="ul-a">
            <span
              class="actions-span"
              style="margin:10px 16px 0 0;cursor:pointer;display:flex;flex-direction:row"
            >
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 0;display:flex;flex-direction:row;"
                @click="showedudialog(list)"
              >
                <i class="el-icon-delete"></i>删除
              </span>
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 24px;display:flex;flex-direction:row;"
                @click="showeducationalList(list,index)"
              >
                <i class="el-icon-edit"></i>编辑
              </span>
            </span>
            <div style="width:879px;margin:0 0 5px 0">
              <educationexperience-From :fromData="list"></educationexperience-From>
            </div>
          </li>
        </ul>
        <div class="showeducation" v-if="showeducation">
          <Education-Experience
            @sendiptVal="sendiptVal(arguments)"
            :educationDegree="this.resumesId"
          />
        </div>
        <div class="content-line"></div>
        <!-- 工作经历 -->
        <div ref="work" class="main-content">
          <div class="main-content-first">
            <span style="margin:18px 0 0 0;float:left;width:3px;height:15px;background:#02B9B8;"></span>
            <span>工作经历</span>
          </div>
          <div class="main-content-second" @click="work">
            <img :src="require('../assets/images/jia.png')" />
            <span style="cursor:pointer">添加</span>
          </div>
        </div>
        <ul
          v-if="showworkperience"
          style="margin:-15px 0 10px 52px"
          @mouseover="over(8)"
          @mouseleave="leave(8)"
        >
          <li v-for="(list,index) in listwork" :key="index" class="ul-a">
            <span
              class="actions-span"
              style="margin:8px 16px 0 0;cursor:pointer;display:flex;flex-direction:row"
            >
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 0;display:flex;flex-direction:row;"
                @click="showworkdialog(list)"
              >
                <i class="el-icon-delete"></i>删除
              </span>
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 24px;display:flex;flex-direction:row;"
                @click="showworkperienceList(list)"
              >
                <i class="el-icon-edit"></i>编辑
              </span>
            </span>
            <div style="width:879px;margin:0 0 5px 0">
              <work-from :from-data="list"></work-from>
            </div>
          </li>
        </ul>
        <div v-if="showwork">
          <work-experience @workEmit="workEmit(arguments)" :workDegree="this.resumesId" />
        </div>
        <div class="content-line"></div>
        <!-- 项目经历 -->
        <div ref="progect" class="main-content">
          <div class="main-content-first">
            <span style="margin:18px 0 0 0;float:left;width:3px;height:15px;background:#02B9B8;"></span>
            <span>项目经历</span>
          </div>
          <div class="main-content-second" @click="project">
            <img :src="require('../assets/images/jia.png')" />
            <span style="cursor:pointer">添加</span>
          </div>
        </div>
        <ul
          v-if="showprogectperience"
          style="margin:-15px 0 10px 52px"
          @mouseover="over(7)"
          @mouseleave="leave(7)"
        >
          <li v-for="(list,index) in listprogectperience" :key="index" class="ul-a">
            <span
              class="actions-span"
              style="margin:8px 16px 0 0;cursor:pointer;display:flex;flex-direction:row;"
            >
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 0;display:flex;flex-direction:row;"
                @click="showprojectdialog(list)"
              >
                <i class="el-icon-delete"></i>删除
              </span>
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 24px;display:flex;flex-direction:row;"
                @click="showprogectperienceList(list)"
              >
                <i class="el-icon-edit"></i>编辑
              </span>
            </span>
            <div style="width:879px;margin:0 0 5px 0">
              <progect-from :from-data="list"></progect-from>
            </div>
          </li>
        </ul>
        <div v-if="showproject">
          <project-experience
            @progectEmit="progectEmit(arguments)"
            :projectDegree="this.resumesId"
          />
        </div>
        <div class="content-line"></div>
        <!-- 培训经历 -->
        <div ref="training" class="main-content">
          <div class="main-content-first">
            <span style="margin:18px 0 0 0;float:left;width:3px;height:15px;background:#02B9B8;"></span>
            <span>培训经历</span>
          </div>
          <div class="main-content-second" @click="training">
            <img :src="require('../assets/images/jia.png')" />
            <span style="cursor:pointer">添加</span>
          </div>
        </div>
        <ul
          v-if="showtrain"
          style="margin:-15px 0 10px 52px"
          @mouseover="over(6)"
          @mouseleave="leave(6)"
        >
          <li v-for="(list,index) in listtrain" :key="index" class="ul-a">
            <span
              class="actions-span"
              style="margin:10px 16px 0 0;cursor:pointer;display:flex;flex-direction:row;"
            >
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 0;display:flex;flex-direction:row;"
                @click="showtraindialog(list)"
              >
                <i class="el-icon-delete"></i>删除
              </span>
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 24px;display:flex;flex-direction:row;"
                @click="showtrainList(list)"
              >
                <i class="el-icon-edit"></i>编辑
              </span>
            </span>
            <div style="width:879px;margin:0 0 5px 0">
              <training-from :from-data="list"></training-from>
            </div>
          </li>
        </ul>
        <div v-if="showtraining">
          <training-experience @trainEmit="trainEmit(arguments)" :trainDegree="this.resumesId" />
        </div>
        <div class="content-line"></div>
        <!-- 语言能力 -->
        <div ref="language" class="main-content">
          <div class="main-content-first">
            <span style="margin:18px 0 0 0;float:left;width:3px;height:15px;background:#02B9B8;"></span>
            <span>语言能力</span>
          </div>
          <div class="main-content-second" @click="language">
            <img :src="require('../assets/images/jia.png')" />
            <span style="cursor:pointer">添加</span>
          </div>
        </div>
        <ul
          v-if="showlanguages"
          style="margin:-15px 0 10px 52px"
          @mouseover="over(5)"
          @mouseleave="leave(5)"
        >
          <li v-for="(list,index) in listlanguages" :key="index" class="ul-a">
            <span
              class="actions-span"
              style="margin:10px 16px 0 0;cursor:pointer;display:flex;flex-direction:row;"
            >
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 0;display:flex;flex-direction:row;"
                @click="showlanguagedialog(list)"
              >
                <i class="el-icon-delete"></i>删除
              </span>
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 24px;display:flex;flex-direction:row;"
                @click="showlanguagesList(list)"
              >
                <i class="el-icon-edit"></i>编辑
              </span>
            </span>
            <div style="width:879px;margin:0 0 5px 0">
              <language-from :from-data="list"></language-from>
            </div>
          </li>
        </ul>
        <div v-if="showlanguage">
          <language-experience
            @languageEmit="languageEmit(arguments)"
            :languageDegree="this.resumesId"
          />
        </div>
        <div class="content-line"></div>
        <!-- 职称等级 -->
        <div ref="professional" class="main-content">
          <div class="main-content-first">
            <span style="margin:18px 0 0 0;float:left;width:3px;height:15px;background:#02B9B8;"></span>
            <span>职称等级</span>
          </div>
          <div class="main-content-second" @click="professional()">
            <img :src="require('../assets/images/jia.png')" />
            <span style="cursor:pointer">添加</span>
          </div>
        </div>
        <ul
          v-if="showprofessionals"
          style="margin:-15px 0 10px 52px"
          @mouseover="over(4)"
          @mouseleave="leave(4)"
        >
          <li v-for="(list,index) in listprofessional" :key="index" class="ul-a">
            <span
              class="actions-span"
              style="margin:10px 16px 0 0;cursor:pointer;display:flex;flex-direction:row;"
            >
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 0;display:flex;flex-direction:row;"
                @click="showprofessionaldialog(list)"
              >
                <i class="el-icon-delete"></i>删除
              </span>
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 24px;display:flex;flex-direction:row;"
                @click="showprofessionalList(list)"
              >
                <i class="el-icon-edit"></i>编辑
              </span>
            </span>
            <div style="width:879px;margin:0 0 5px 0">
              <professional-from :from-data="list"></professional-from>
            </div>
          </li>
        </ul>
        <div v-if="showprofessional">
          <professional-experience
            @professionalEmit="professionalEmit(arguments)"
            :professionalDegree="this.resumesId"
          />
        </div>
        <div class="content-line"></div>
        <!-- 专业技术 -->
        <div ref="personal_skill" class="main-content">
          <div class="main-content-first">
            <span style="margin:18px 0 0 0;float:left;width:3px;height:15px;background:#02B9B8;"></span>
            <span>专业技能</span>
          </div>
          <div class="main-content-second" @click="personal_skill()">
            <img :src="require('../assets/images/jia.png')" />
            <span style="cursor:pointer">添加</span>
          </div>
        </div>
        <ul
          v-if="showpersonalskills"
          style="margin:-15px 0 10px 52px"
          @mouseover="over(3)"
          @mouseleave="leave(3)"
        >
          <li v-for="(list,index) in listpersonalskill" :key="index" class="ul-a">
            <span
              class="actions-span"
              style="margin:10px 16px 0 0;cursor:pointer;display:flex;flex-direction:row;"
            >
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 0;display:flex;flex-direction:row;"
                @click="showskilldialog(list)"
              >
                <i class="el-icon-delete"></i>删除
              </span>
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 24px;display:flex;flex-direction:row;"
                @click="editskill(list)"
              >
                <i class="el-icon-edit"></i>编辑
              </span>
            </span>
            <div style="width:879px;margin:0 0 5px 0">
              <personalskill-from :from-data="list" :todo="resumesId"></personalskill-from>
            </div>
          </li>
        </ul>
        <div v-if="showpersonalskill">
          <personal-skill @skillEmit="skillEmit(arguments)" :professionalDegree="this.resumesId" />
        </div>
        <div class="content-line"></div>
        <div ref="awards" class="main-content">
          <div class="main-content-first">
            <span style="margin:18px 0 0 0;float:left;width:3px;height:15px;background:#02B9B8;"></span>
            <span>荣誉奖项</span>
          </div>
          <div class="main-content-second" @click="awards">
            <img :src="require('../assets/images/jia.png')" />
            <span style="cursor:pointer">添加</span>
          </div>
        </div>
        <ul
          v-if="showaward"
          style="margin:-15px 0 10px 52px"
          @mouseover="over(2)"
          @mouseleave="leave(2)"
        >
          <li v-for="(list,index) in listaward" :key="index" class="ul-a">
            <span
              class="actions-span"
              style="margin:10px 16px 0 0;cursor:pointer;display:flex;flex-direction:row;"
            >
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 0;display:flex;flex-direction:row;"
                @click="showawardsdialog(list)"
              >
                <i class="el-icon-delete"></i>删除
              </span>
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 24px;display:flex;flex-direction:row;"
                @click="showawardList(list)"
              >
                <i class="el-icon-edit"></i>编辑
              </span>
            </span>
            <div style="width:879px;margin:0 0 5px 0">
              <awards-from :from-data="list" :todo="resumesId"></awards-from>
            </div>
          </li>
        </ul>
        <div v-if="showawards">
          <Aw-Ards @awardsemit="awardsemit(arguments)" :professionalDegree="this.resumesId" />
        </div>
        <div class="content-line"></div>
        <div ref="self-appraisal" class="main-content">
          <div class="main-content-first">
            <span style="margin:18px 0 0 0;float:left;width:3px;height:15px;background:#02B9B8;"></span>
            <span>自我评价</span>
          </div>
          <div class="main-content-second" v-if="selfjoint" @click="selfappraisal">
            <img :src="require('../assets/images/jia.png')" />
            <span style="cursor:pointer">添加</span>
          </div>
        </div>
        <ul
          v-if="showpersonappraisal"
          style="margin:-15px 0 60px 52px"
          @mouseover="over(1)"
          @mouseleave="leave(1)"
        >
          <li class="ul-a">
            <span
              class="actions-span"
              style="margin:10px 16px 0 0;cursor:pointer;display:flex;flex-direction:row;"
            >
              <span
                style="font-size:16px;color:#02B9B8;margin:0 0 0 24px;display:flex;flex-direction:row;"
                @click="showselfappraisalList(list)"
              >
                <i class="el-icon-edit"></i>编辑
              </span>
            </span>
            <div style="width:879px;margin:0 0 5px 0">
              <selfappraisal-from :from-data="listpersonappraisal"></selfappraisal-from>
            </div>
          </li>
        </ul>
        <div v-if="showselfappraisal">
          <self-appraisal
            @selfappraisalemit="selfappraisalemit(arguments)"
            :professionalDegree="this.resumesId"
          />
        </div>
      </div>

      <div class="aside-body">
        <div class="aside">
          <div class="aside-nav" style='margin:0 0 70px 0'>
            <div class="aside-foot">
              <div class="aside-foot-second">
                <div
                  style="display: flex;flex-direction: row;justify-content: space-between;line-height:30px;width:270px;margin:0 0 20px 0"
                >
                  <div class="aside-foot-first">附件简历（Beta）</div>
                  <el-button
                    style="font-family: PingFangSC-Regular;color: #02B9B8;font-size:12px;width:25px"
                    type="text"
                    @click="addfile"
                  >添加</el-button>
                </div>
                <div v-for="(item,index) in fileList" :key="index">
                  <div class="onResume">
                    <div>
                      <i class="el-icon-paperclip"></i>
                      <span style="margin:0 0 0 5px">{{item.resumeName}}</span>
                    </div>
                    <div>
                      <el-dropdown>
                        <span class="el-dropdown-link">
                          <i class="el-icon-more-outline"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item @click.native="setDefault(item)">设为默认投递简历</el-dropdown-item>
                          <el-dropdown-item>下载</el-dropdown-item>
                          <el-dropdown-item @click.native="deleteFile(item)">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <div class="resumeLine"></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <Affix :offset="20">
          <div class="aside">
            <div class="aside-nav">
            <div class="aside-nav-first">在线简历</div>
            <div class="aside-nav-second">
              <span>完整度</span>
              <span>
                <el-progress
                  :percentage="this.compPercent"
                  class="progess"
                  style="width:200px;padding:0 0 0 7px;height:9px"
                ></el-progress>
              </span>
            </div>
            <div style="color:#f17130;font-size: 12px;margin: 10px 0 0 40px;">完整度超过66%可投递简历~</div>
            <div class="aside-nav-third">最后更新：{{this.updatedTime|formatDateTwo}}</div>
          </div>
            <div class="aside-tabulation">
              <div class="tabulation">
                <a @click="testRef('personalinformation')">
                  <img :src="require('../assets/images/ji.png')" />
                  <span :style="active" class="tabulation-language">基本信息</span>
                </a>
              </div>
              <div class="tabulation">
                <a @click="testRef('jobintension')">
                  <img :src="require('../assets/images/qiuzhi.png')" />
                  <span :style="activejobintension" class="tabulation-language">求职意向</span>
                </a>
              </div>
              <div class="tabulation">
                <a @click="testRef('educational')">
                  <img class="tabulation-img" :src="require('../assets/images/edu.png')" />
                  <span :style="activeeducation" class="tabulation-language">教育经历</span>
                </a>
              </div>
              <div class="tabulation">
                <a @click="testRef('work')">
                  <img :src="require('../assets/images/work.png')" />
                  <span :style="activework" class="tabulation-language">工作经历</span>
                </a>
              </div>
              <div class="tabulation">
                <a @click="testRef('progect')">
                  <img :src="require('../assets/images/language.png')" />
                  <span :style="activeproject" class="tabulation-language">项目经历</span>
                </a>
              </div>
              <div class="tabulation">
                <a @click="testRef('training')">
                  <img :src="require('../assets/images/train.png')" />
                  <span :style="activetraining" class="tabulation-language">培训经历</span>
                </a>
              </div>
              <div class="tabulation">
                <a @click="testRef('language')">
                  <img :src="require('../assets/images/language.png')" />
                  <span :style="activelanguage" class="tabulation-language">语言能力</span>
                </a>
              </div>
              <div class="tabulation">
                <a @click="testRef('professional')">
                  <img :src="require('../assets/images/zhicheng.png')" />
                  <span :style="activeOne" class="tabulation-language">职称等级</span>
                </a>
              </div>
              <div class="tabulation">
                <a @click="testRef('personal_skill')">
                  <img :src="require('../assets/images/zhuanye.png')" />
                  <span :style="activeprofessional" class="tabulation-language">专业技能</span>
                </a>
              </div>
              <div class="tabulation">
                <a @click="testRef('awards')">
                  <img :src="require('../assets/images/rong.png')" />
                  <span :style="activeawards" class="tabulation-language">荣誉奖项</span>
                </a>
              </div>
              <div class="tabulation">
                <a @click="testRef('self-appraisal')">
                  <img :src="require('../assets/images/ziwo.png')" />
                  <span :style="activeselfAppraisal" class="tabulation-language">自我介绍</span>
                </a>
              </div>
            </div>
          </div>
        </Affix>
      </div>
    </div>
  </Scroll>
</template>

<script>
let token = Cookies.get("token");
const timeUtil = require("../timeUtil.js");
import Cookies from "js-cookie";
// import aliyun from "../aliyun.js";
// import PersonalinformationFrom from 'components/personalinformation_from.vue'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import datacenterBus from "../apis/datacenterBus.js";
import BasicInfo from "components/personalnformation/BasicInfo.vue";
import JobIntension from "components/jobintension/Jobintension.vue";
import EducationExperience from "components/education/education.vue";
import WorkExperience from "components/work/work.vue";
import ProjectExperience from "components/project/project.vue";
import TrainingExperience from "components/train/training.vue";
import LanguageExperience from "components/language/language.vue";
import ProfessionalExperience from "components/professional/professional.vue";
import PersonalSkill from "components/skill/personal_skill.vue";
import AwArds from "components/awards/awards.vue";
import SelfAppraisal from "components/appraisal/self-appraisal.vue";

import PersonalinformationFrom from "components/personalnformation/personalinformation_from.vue";
import From from "components/jobintension/jobintension_from.vue";
import EducationexperienceFrom from "components/education/education_from.vue";
import WorkFrom from "components/work/work_from.vue";
import ProgectFrom from "components/project/progect_from.vue";
import TrainingFrom from "components/train/training_from.vue";
import LanguageFrom from "components/language/language_from.vue";
import ProfessionalFrom from "components/professional/professional_from.vue";
import PersonalskillFrom from "components/skill/personal_skill_from.vue";
import AwardsFrom from "components/awards/awards_from.vue";
import SelfappraisalFrom from "components/appraisal/selfappraisal_from.vue";
import Affix from "components/affix.vue";

import industrys from "../assets/industry.json";
import citys from "../assets/city.json";
import options from "../assets/option.json";
import positionCatalog from "../assets/positionCatalog.json";

import {
  jobintensionkeep,
  informationkeep,
  selfappraisalkeep,
  awardskeep,
  awardskeepurl,
  skillkeep,
  languagekeep,
  professionkeep,
  trainingkeep,
  workkeeped,
  educationkeep,
  resumeId,
  brief,
  deleteskill,
  deleteprofession,
  deleteawards,
  deletework,
  deletedu,
  deletetrain,
  deletelanguage,
  deleteproject,
  // city,
  // industry,
  // allpositionCatalog,
  // option,
  progectkeep
} from "apis/account";
export default {
  name: "Resumes",
  components: {
    // PersonalinformationFrom,
    BasicInfo,
    JobIntension,
    EducationExperience,
    WorkExperience,
    ProjectExperience,
    TrainingExperience,
    LanguageExperience,
    ProfessionalExperience,
    PersonalSkill,
    AwArds,
    SelfAppraisal,
    PersonalinformationFrom,
    From,
    EducationexperienceFrom,
    WorkFrom,
    ProfessionalFrom,
    ProgectFrom,
    TrainingFrom,
    LanguageFrom,
    PersonalskillFrom,
    AwardsFrom,
    SelfappraisalFrom,
    Affix
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (
        value >
        this.$moment(new Date().getFullYear()) -
          this.$moment(this.formInformation.workAge).format("YYYY")
      ) {
        callback(new Error("海外工作时间不能大于工作时间"));
      } else {
        callback();
      }
    };
    return {
      aaaa: false,
      fileList: [],
      videoFlag: false,
      videoUploadPercent: 0,
      uploadData: {
        label: "resume-avatar"
      },
      uploadfile: {
        label: "resume-file"
      },
      myHeaders: { "Auth-Token": Cookies.get("token") },
      monthPayList: [],
      optionList: [],
      isshowJob: false,
      joint: true,
      selfjoint: true,
      perId: "",
      isDefault: "",
      imageUrlTwo: "",
      fileOne: "",
      imageUrl: "",
      updatedTime: "",
      workStateList: [],
      jobSearchList: [],
      industryList: [],
      positionCatalogList: [],
      options: [],
      propsOne: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() >
            new Date().setFullYear(new Date().getFullYear() - 16)
          );
        }
      },
      pickerOptionsOne: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      propsTwo: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      props: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      propss: {
        value: "code",
        label: "tag",
        children: "children"
      },
      targeIdList: "",
      resumesId: "",
      awardsId: "",
      languageId: "",
      trainId: "",
      progectId: "",
      qualId: "",
      avatarUrl: "",
      workId: "",
      educationId: "",
      resumeIdList: "",
      targetList: "",
      dialogedu: false,
      dialogResume: false,
      dialogSuccess: false,
      dialogsetDefault: false,
      dialogDrag: false,
      dialogwork: false,
      dialogproject: false,
      dialogtrain: false,
      dialoglanguage: false,
      dialogskill: false,
      dialogaward: false,
      dialogprofess: false,
      personalinformation: false,
      showPersonalinformation: true,
      showDemo: false,
      showJob: false,
      showadd: true,
      showeducation: "",
      showwork: false,
      showproject: false,
      showtraining: false,
      showlanguage: false,
      showprofessional: false,
      showpersonalskill: false,
      showawards: false,
      showselfappraisal: false,

      showjobintension: false,
      showeducational: true,
      showworkperience: true,
      showprogectperience: true,
      showtrain: true,
      showlanguages: true,
      showprofessionals: true,
      showpersonalskills: true,
      showaward: true,
      showpersonappraisal: true,
      file: "",
      imageUrlOne: "",
      defaultId: "",
      languageouterVisible: false,
      languageinnerVisible: false,
      professionouterVisible: false,
      professioninnerVisible: false,
      educationouterVisible: false,
      educationinnerVisible: false,
      informationouterVisible: false,
      informationinnerVisible: false,
      jobintensionouterVisible: false,
      jobintensioninnerVisible: false,
      workouterVisible: false,
      workinnerVisible: false,
      progectouterVisible: false,
      progectinnerVisible: false,
      traininginnerVisible: false,
      trainingouterVisible: false,
      personalskillouterVisible: false,
      personalskillinnerVisible: false,
      awardsouterVisible: false,
      awardsinnerVisible: false,
      selfappraisalinnerVisible: false,
      selfappraisalouterVisible: false,
      listjobintension: [],
      listeducational: [],
      listwork: [],
      listprogectperience: [],
      listtrain: [],
      listlanguages: [],
      listprofessional: [],
      listpersonalskill: [],
      listaward: [],
      listpersonappraisal: "",
      compPercent: 0,
      formEducation: {
        educationDegree: "",
        educationName: "",
        educationTime: [],
        educationSpecialty: ""
      },
      formInformation: {
        name: "",
        state: "",
        sex: "",
        workAge: "",
        city: [],
        educationLevel: "",
        birthday: "",
        email: "",
        phone: "",
        politicCountenance: "",
        dutyTime: "",
        overseasAge: "",
        graduate: ""
      },
      formJobintension: {
        postType: [],
        trad: [],
        city: [],
        scope: "",
        status: "",
        jobType: "",
        reportTime: ""
      },
      formWork: {
        jobDescription: "",
        companyName: "",
        postName: "",
        monthPay: "",
        branch: "",
        trade: "",
        workTime: []
      },
      formProject: {
        itemName: "",
        companyName: "",
        schoolTime: [],
        duty: "",
        project: ""
      },
      formtraining: {
        trainCourse: "",
        trainTime: [],
        trainCours: ""
      },
      formlanguage: {
        languages: "",
        listenAbility: "",
        readAbility: ""
      },
      formProfession: {
        qual: ""
      },
      formPersonalskill: {
        technicalName: "",
        level: ""
      },
      formAwards: {
        prizeAward: "",
        prizeTime: ""
      },
      formSelfappraisal: {
        personalDescription: ""
      },
      activejobintension: "",
      active: "",
      activeeducation: "",
      activework: "",
      activeproject: "",
      activetraining: "",
      activelanguage: "",
      activeprofessional: "",
      activeawards: "",
      activeselfAppraisal: "",
      activeOne: "",
      edurules: {
        educationName: [
          { required: true, message: "请输入学校名称", trigger: "blur" },
          { min: 0, max: 12, message: "长度在 0 到 12 个字", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        educationTime: [
          { required: true, message: "请选择在校时间", trigger: "blur" }
        ],
        educationSpecialty: [
          {
            required: true,
            message: "请填写专业",
            trigger: "change"
          },
          { min: 0, max: 12, message: "长度在 0 到 12 个字", trigger: "blur" }
        ],
        educationDegree: [
          { required: true, message: "请选择学历", trigger: "change" }
        ]
      },
      workrules: {
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 0, max: 36, message: "仅限36个字", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        postName: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
          { min: 0, max: 10, message: "仅限10个字", trigger: "blur" }
        ],
        workTime: [
          { required: true, message: "请选择在职时间", trigger: "blur" }
        ],
        monthPay: [
          { min: 0, max: 5, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ],
        jobDescription: [
          {
            min: 0,
            max: 800,
            message: "仅限800个字",
            trigger: "blur"
          },
          { required: true, message: "请填写工作描述", trigger: "change" }
        ]
      },
      progectrules: {
        itemName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 0, max: 36, message: "长度在 0 到 36 个字", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 0, max: 36, message: "长度在 0 到 36 个字", trigger: "blur" }
        ],
        schoolTime: [
          { required: true, message: "请选择项目时间", trigger: "blur" }
        ],
        record: [{ required: true, message: "请选择学历", trigger: "blur" }],
        duty: [
          { required: true, message: "请填写个人职责", trigger: "change" },
          {
            min: 0,
            max: 800,
            message: "长度在 0 到 800 个字",
            trigger: "blur"
          }
        ],
        project: [
          {
            min: 0,
            max: 800,
            message: "长度在 0 到 800 个字",
            trigger: "blur"
          },
          { required: true, message: "请填写项目介绍", trigger: "change" }
        ]
      },
      trainrules: {
        trainCourse: [
          { required: true, message: "请输入培训课程", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 0 到 20 个字", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        trainCours: [
          { required: true, message: "请输入培训机构", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 0 到 20 个字", trigger: "blur" }
        ],
        trainTime: []
      },
      languagerules: {
        languages: [
          { required: true, message: "请输入语种", trigger: "blur" },
          { min: 0, max: 10, message: "长度在 0 到 10 个字", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        listenAbility: [
          { required: true, message: "请选择听力能力", trigger: "blur" }
        ],
        readAbility: [
          { required: true, message: "请选择读写能力", trigger: "blur" }
        ]
      },
      professionalrules: {
        qual: [
          { required: true, message: "请输入职称等级名称", trigger: "blur" },
          { min: 0, max: 10, message: "长度在 0 到 10 个字", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ]
      },
      skillrules: {
        technicalName: [
          { required: true, message: "请输入技能名称", trigger: "blur" },
          { min: 0, max: 10, message: "长度在 0 到 10 个字", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        level: [{ required: true, message: "请选择掌握程度", trigger: "blur" }]
      },
      awardsrules: {
        prizeAward: [
          { required: true, message: "请输入奖项名称", trigger: "blur" },
          { min: 0, max: 10, message: "长度在 0 到 10 个字", trigger: "blur" }
          // { pattern:/^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/, message: '姓名仅支持中文汉字与英文字母', trigger: 'blur' },
        ],
        prizeTime: [
          { required: true, message: "请选择获奖时间", trigger: "blur" }
        ]
      },
      selfappraisalrules: {
        personalDescription: [
          { required: true, message: "请填写个人介绍", trigger: "blur" },
          {
            min: 0,
            max: 300,
            message: "长度在 0 到 300 个字",
            trigger: "blur"
          }
        ]
      },
      personalrules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 0,
            max: 10,
            message: "长度在 0 到 10 个字",
            trigger: "blur"
          },
          {
            pattern: /^[a-zA-Z\u4e00-\u9fa5\s]{0,24}$/,
            message: "姓名仅支持中文汉字与英文字母",
            trigger: "blur"
          }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        graduate: [
          { required: true, message: "请选择是否应届", trigger: "change" }
        ],
        birthday: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        educationLevel: [
          { required: true, message: "请选择学历", trigger: "change" }
        ],
        overseasAge: [{ validator: validatePass2, trigger: "change" }],
        workAge: [
          { required: true, message: "请选择工作年限", trigger: "change" }
        ],
        politicCountenance: [
          { required: true, message: "请选择政治面貌", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请填写手机号", trigger: "change" },
          {
            pattern: /^[1][3578][0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: ["change", "blur"]
          }
        ],
        email: [
          { required: true, message: "请填写邮箱", trigger: "change" },
          {
            pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+(com|cn|net|com.cn|com.tw|com.hk)$/,
            message: "邮箱格式错误",
            trigger: ["change", "blur"]
          }
        ]
      },
      jobintensionrules: {
        postType: [
          { required: true, message: "请输入职位类型", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择求职状态", trigger: "change" }
        ],
        reportTime: [
          { required: true, message: "请选择到岗时间", trigger: "change" }
        ],
        trad: [
          { required: true, message: "请选择企业行业", trigger: "change" }
        ],
        scope: [
          { required: true, message: "请选择薪资范围", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        jobType: [
          { required: true, message: "请选择工作类型", trigger: "change" }
        ]
      }
    };
  },
  //   watch: {
  //   //使用这个可以监听data中指定数据的变化,然后触发watch中对应的function的处理
  //   'formJobintension.status': function(val) {
  //     if (this.formJobintension.status == '离职-延时到岗') {
  //       this.boole = false
  //     }else{
  //       this.boole = true
  //     }
  //   },
  // },
  methods: {
    //设置附件简历
    setDefault(res) {
      this.$http
        .put(`/consumer-core/resume/setDefault/${res.id}`)
        .then(res => {
          this.dialogSuccess = true;
          this.dialogsetDefault = true;
          this.allfile();
        })
        .catch(error => {});
    },
    //删除附件简历
    deleteFile(res) {
      if (res.isDefault) {
        this.isDefault = true;
        this.dialogResume = true;
      } else {
        this.isDefault = false;
        this.dialogResume = true;
      }
      this.defaultId = res.id;
    },
    //确认删除附件简历
    keepDelete() {
      this.$http
        .delete(`/consumer-core/resume/${this.defaultId}/file`)
        .then(res => {
          this.dialogResume = false;
          this.allfile();
        })
        .catch(error => {});
    },
    //获取所有附件简历
    allfile() {
      this.$http
        .get("/consumer-core/resume/file/list")
        .then(res => {
          this.fileList = res.data.data;
        })
        .catch(error => {});
    },
    //上传附件简历
    handleVideoSuccess(res, file) {
      let label = "resume-file";
      let params = {
        accessUrl: res.data.fileAccessVo.accessUrl,
        expireTime: res.data.fileAccessVo.expireTime,
        ext: res.data.fileAccessVo.ext,
        size: res.data.fileAccessVo.size,
        fileName: res.data.fileAccessVo.fileName
      };
      var arr = JSON.stringify(params);
      let Logistics = this.$router.resolve(
        "/preview?obj=" + encodeURIComponent(arr)
      );

      window.open(Logistics.href, "_blank");
      this.dialogDrag = false;
    },
    //添加附件
    addfile() {
      this.dialogDrag = true;
    },
    // uploadVideoProcess(event, file, fileList) {
    //   this.videoFlag = true;
    //   console.log(event);
    //   this.startTimer = setInterval(() => {
    //     this.videoUploadPercent++;
    //     if (this.videoUploadPercent >= file.percentage) {
    //       clearInterval(this.startTimer);
    //       this.videoFlag = false;
    //     }
    //   }, 100);
    // },
    handleExceed(files, fileList) {
      this.$notify.info({
        title: "消息",
        message: "这是一条错误的提示消息"
      });
    },
    handleChange(response, file, fileList) {
      console.log(file);
    },
    //求职意向保存
    jobintensionkeep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          switch (this.formJobintension.scope) {
            case 0:
              this.salaryMin = 0;
              this.salaryMax = 1;
              break;
            case 1:
              this.salaryMin = 1;
              this.salaryMax = 2;
              break;
            case 2:
              this.salaryMin = 2;
              this.salaryMax = 4;
              break;
            case 3:
              this.salaryMin = 4;
              this.salaryMax = 6;
              break;
            case 4:
              this.salaryMin = 6;
              this.salaryMax = 8;
              break;
            case 5:
              this.salaryMin = 8;
              this.salaryMax = 10;
              break;
            case 6:
              this.salaryMin = 10;
              this.salaryMax = 15;
              break;
            case 7:
              this.salaryMin = 15;
              this.salaryMax = 25;
              break;
            case 8:
              this.salaryMin = 25;
              this.salaryMax = 35;
              break;
            case 9:
              this.salaryMin = 35;
              this.salaryMax = null;
              break;
          }

          if (this.formJobintension.status == "离职-延时到岗") {
            this.formJobintension.status = 1;
          } else if (this.formJobintension.status == "离职-随时到岗") {
            this.formJobintension.status = 0;
            this.formJobintension.reportTime = "";
          } else if (this.formJobintension.status == "在职-考虑机会") {
            this.formJobintension.status = 2;
            this.formJobintension.reportTime = "";
          } else if (this.formJobintension.jobType == "在职-暂不考虑") {
            this.formJobintension.status = 3;
            this.formJobintension.reportTime = "";
          }
          if (this.formJobintension.jobType == "全职") {
            this.formJobintension.jobType = 0;
          } else if (this.formJobintension.jobType == "兼职") {
            this.formJobintension.jobType = 1;
          } else if (this.formJobintension.jobType == "实习") {
            this.formJobintension.languages = 2;
          }
          var til = new Date(this.formJobintension.reportTime).getTime();
          let params = {
            arriveTime: til,
            cities: [
              {
                city: this.formJobintension.city[1],
                district: this.formJobintension.city[2],
                province: this.formJobintension.city[0]
              }
            ],
            industries: [
              {
                first: this.formJobintension.trad[0],
                secondary: this.formJobintension.trad[1]
              }
            ],
            jobSearchStatus: timeUtil.jobSearchStatus(
              parseInt(this.formJobintension.status)
            ),
            jobSearchStatusCode: this.formJobintension.status,
            jobType: timeUtil.jobType(parseInt(this.formJobintension.jobType)),
            jobTypeCode: this.formJobintension.jobType,
            positionCatalogs: [
              {
                first: this.formJobintension.postType[0],
                secondary: this.formJobintension.postType[1],
                third: this.formJobintension.postType[2]
              }
            ],
            salaryMin: this.salaryMin,
            salaryMax: this.salaryMax
          };
          jobintensionkeep(this.resumesId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.jobintensionouterVisible = false;
                this.brief();
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    //个人信息
    informationkeep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formInformation.politicCountenance == "群众") {
            this.formInformation.politicCountenance = 0;
          } else if (this.formInformation.politicCountenance == "团员") {
            this.formInformation.politicCountenance = 1;
          } else if (this.formInformation.politicCountenance == "民主党派") {
            this.formInformation.politicCountenance = 1;
          } else if (this.formInformation.politicCountenance == "预备党员") {
            this.formInformation.politicCountenance = 3;
          } else if (this.formInformation.politicCountenance == "中共党员") {
            this.formInformation.politicCountenance = 4;
          }
          if (this.formInformation.educationLevel === "初中及以下") {
            this.formInformation.educationLevel = 0;
          } else if (this.formInformation.educationLevel === "职中") {
            this.formInformation.educationLevel = 1;
          } else if (this.formInformation.educationLevel === "高中") {
            this.formInformation.educationLevel = 2;
          } else if (this.formInformation.educationLevel === "大专") {
            this.formInformation.educationLevel = 3;
          } else if (this.formInformation.educationLevel === "本科") {
            this.formInformation.educationLevel = 4;
          } else if (this.formInformation.educationLevel === "硕士") {
            this.formInformation.educationLevel = 5;
          } else if (this.formInformation.educationLevel === "博士") {
            this.formInformation.educationLevel = 6;
          }
          // if(this.formInformation.graduate == '0') {
          //     this.formInformation.graduate = true
          // }else if(this.formInformation.graduate == '1') {
          //     this.formInformation.graduate = false
          // }
          let til = new Date(this.formInformation.workAge).getTime();
          let till = new Date(this.formInformation.birthday).getTime();
          let CodeToTag = timeUtil.CodeToTag(
            [
              this.formInformation.city[0],
              this.formInformation.city[1],
              this.formInformation.city[2]
            ],
            this.options
          );
          let params = {
            province: CodeToTag[0],
            provinceCode: this.formInformation.city[0],
            city: CodeToTag[1],
            cityCode: this.formInformation.city[1],
            district: CodeToTag[2],
            districtCode: this.formInformation.city[2],
            politicalStatus: timeUtil.politicalStatus(
              parseInt(this.formInformation.politicCountenance)
            ),
            politicalStatusCode: this.formInformation.politicCountenance,

            avatar: this.fileOne ? this.fileOne : null,
            overseasAge: Number(this.formInformation.overseasAge),
            workYear: til,
            birthday: till,
            fullName: this.formInformation.name,
            sex: timeUtil.sex(parseInt(this.formInformation.sex)),
            sexCode: this.formInformation.sex,
            degree: timeUtil.qualifications(
              parseInt(this.formInformation.educationLevel)
            ),
            degreeCode: this.formInformation.educationLevel,
            email: this.formInformation.email,
            phone: this.formInformation.phone,
            isGraduate: this.formInformation.graduate === "0" ? true : false
          };
          informationkeep(this.resumesId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.informationouterVisible = false;
                // window.location.reload();

                this.resumeId();
                this.$store.commit(
                  "GET_USERNAME",
                  res.data.data.updatedModule.fullName
                );
              }
            })
            .catch(error => {});
        }
      });
    },
    //自我介绍
    selfappraisalkeep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            content: this.formSelfappraisal.personalDescription
          };
          selfappraisalkeep(this.resumesId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.selfappraisalouterVisible = false;
                this.resumeId();
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrlOne = URL.createObjectURL(file.raw);
      this.file = res.data;
    },
    handleAvatarError(err, file, fileList) {
      this.$notify.info({
        title: "消息",
        message: "图片上传失败，请重新上传"
      });
    },
    handleAvatarSuccessOne(res, file) {
      this.imageUrlTwo = URL.createObjectURL(file.raw);
      this.fileOne = res.data;
    },
    //荣誉奖项保存
    awardskeep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let till = new Date(this.formAwards.prizeTime).getTime();
          let params = {
            award: this.formAwards.prizeAward,
            acquiredTime: till,
            file: this.file == "" ? null : this.file
          };
          awardskeep(this.resumesId, this.awardsId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.awardsouterVisible = false;
                this.resumeId();
                this.perId = res.data.data.updatedModule.id;
                awardskeepurl(this.resumesId, this.perId);
                // .then(res => {
                //     }).catch( => {});
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    //专业技能
    skillkeep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // if (this.formPersonalskill.level == "一般") {
          //   this.formPersonalskill.level = 0;
          // } else if (this.formPersonalskill.level == "良好") {
          //   this.formPersonalskill.level = 1;
          // } else if (this.formPersonalskill.level == "熟练") {
          //   this.formPersonalskill.level = 2;
          // } else if (this.formPersonalskill.level == "精通") {
          //   this.formPersonalskill.level = 3;
          // }
          let params = {
            level: timeUtil.levels(parseInt(this.formPersonalskill.level)),
            skill: this.formPersonalskill.technicalName
          };
          skillkeep(this.resumesId, this.skillId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.personalskillouterVisible = false;
                this.resumeId();
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    //语言能力
    languagekeep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            language: this.formlanguage.languages,
            listenAndSpeak: timeUtil.levels(
              parseInt(this.formlanguage.listenAbility)
            ),
            readAndWrite: timeUtil.levels(
              parseInt(this.formlanguage.readAbility)
            )
          };
          languagekeep(this.resumesId, this.languageId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.languageouterVisible = false;
                this.resumeId();
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    //职称等级
    professionkeep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            qual: this.formProfession.qual
          };
          professionkeep(this.resumesId, this.qualId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.professionouterVisible = false;
                this.resumeId();
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    //培训经历保存
    trainingkeep(formName) {
      this.$refs[formName].validate(valid => {
        let til = new Date(this.formtraining.trainTime[0]).getTime();
        let till = new Date(this.formtraining.trainTime[1]).getTime();
        let ti = this.$moment(till).format("YYYY-MM");
        let end = this.$moment(new Date().getTime()).format("YYYY-MM");
        if (ti === end) {
          var eduTime = null;
        } else {
          eduTime = till;
        }
        if (valid) {
          let params = {
            lesson: this.formtraining.trainCourse,
            institution: this.formtraining.trainCours,
            beginTime: til,
            endTime: eduTime
          };
          trainingkeep(this.resumesId, this.trainId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.trainingouterVisible = false;
                this.resumeId();
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    //项目经历保存
    progectkeep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let til = new Date(this.formProject.schoolTime[0]).getTime();
          let till = new Date(this.formProject.schoolTime[1]).getTime();
          let ti = this.$moment(till).format("YYYY-MM");
          let end = this.$moment(new Date().getTime()).format("YYYY-MM");
          if (ti === end) {
            var eduTime = null;
          } else {
            eduTime = till;
          }
          let params = {
            duty: this.formProject.duty,
            endTime: eduTime,
            beginTime: til,
            company: this.formProject.companyName,
            description: this.formProject.project,
            project: this.formProject.itemName
          };
          progectkeep(this.resumesId, this.progectId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.progectouterVisible = false;
                this.resumeId();
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    //工作保存
    workkeep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let til = new Date(this.formWork.workTime[0]).getTime();
          let till = new Date(this.formWork.workTime[1]).getTime();
          let ti = this.$moment(till).format("YYYY-MM");
          let end = this.$moment(new Date().getTime()).format("YYYY-MM");
          if (ti === end) {
            var eduTime = null;
          } else {
            eduTime = till;
          }
          let params = {
            beginTime: til,
            endTime: eduTime,
            company: this.formWork.companyName,
            description: this.formWork.jobDescription,
            position: this.formWork.postName,
            salaryBeforeTax: this.formWork.monthPay
          };
          workkeeped(this.resumesId, this.workId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.workouterVisible = false;
                this.resumeId();
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    //教育保存
    educationkeep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formEducation.educationDegree == "高中") {
            this.formEducation.educationDegree = 2;
          } else if (this.formEducation.educationDegree == "初中及以下") {
            this.formEducation.educationDegree = 0;
          } else if (this.formEducation.educationDegree == "职中") {
            this.formEducation.educationDegree = 1;
          } else if (this.formEducation.educationDegree == "大专") {
            this.formEducation.educationDegree = 3;
          } else if (this.formEducation.educationDegree == "本科") {
            this.formEducation.educationDegree = 4;
          } else if (this.formEducation.educationDegree == "硕士") {
            this.formEducation.educationDegree = 5;
          } else if (this.formEducation.educationDegree == "博士") {
            this.formEducation.educationDegree = 6;
          }
          let til = new Date(this.formEducation.educationTime[0]).getTime();
          let till = new Date(this.formEducation.educationTime[1]).getTime();
          let ti = this.$moment(till).format("YYYY-MM");
          let end = this.$moment(new Date().getTime()).format("YYYY-MM");
          if (ti === end) {
            var eduTime = null;
          } else {
            eduTime = till;
          }
          let params = {
            beginTime: til,
            endTime: eduTime,
            degree: timeUtil.qualifications(
              parseInt(this.formEducation.educationDegree)
            ),
            degreeCode: parseInt(this.formEducation.educationDegree),
            major: this.formEducation.educationSpecialty,
            school: this.formEducation.educationName,
            isUnified: false
          };
          educationkeep(this.resumesId, this.educationId, params)
            .then(res => {
              if (res.data.code == 200) {
                this.educationouterVisible = false;
                this.resumeId();
              }
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    //获取简历详情
    resumeId() {
      resumeId(this.resumesId).then(res => {
        if (res.data.code == 200) {
          this.$store.state.avatarUrl = res.data.data.base.avatarUrl;
          this.resumeIdList = res.data.data.base;
          this.targeIdList = res.data.data.target;
          this.avatarUrl = res.data.data.base.avatarUrl;
          this.listjobintension = res.data.data.target;
          this.listeducational = res.data.data.eduXps;
          this.listwork = res.data.data.workXps;
          this.listprogectperience = res.data.data.projects;
          this.listtrain = res.data.data.trainings;
          this.listlanguages = res.data.data.languages;
          this.listpersonalskill = res.data.data.skills;
          this.listprofessional = res.data.data.qualifications;
          this.listaward = res.data.data.awards;
          this.listpersonappraisal = res.data.data.evaluation;
          this.compPercent = res.data.data.completedPercent;
          this.updatedTime = res.data.data.updatedTime;

          if (this.listpersonappraisal == null) {
            this.selfjoint = true;
            this.showpersonappraisal = false;
          } else {
            this.selfjoint = false;
            this.showpersonappraisal = true;
          }

          if (this.listjobintension.jobSearchStatus == 1) {
            this.listjobintension.jobSearchStatus = "离职-延时到岗";
          } else if (this.listjobintension.jobSearchStatus == 0) {
            this.listjobintension.jobSearchStatus = "离职-随时到岗";
          } else if (this.listjobintension.jobSearchStatus == 2) {
            this.listjobintension.jobSearchStatus = "在职-考虑机会";
          } else if (this.listjobintension.jobSearchStatus == 3) {
            this.listjobintension.jobSearchStatus = "在职-暂不到岗";
          }

          if (this.listjobintension.jobType == 3) {
            this.listjobintension.jobType = "实习";
          } else if (this.listjobintension.jobType == 0) {
            this.listjobintension.jobType = "全职";
          } else if (this.listjobintension.jobType == 1) {
            this.listjobintension.jobType = "兼职";
          }

          if (this.resumeIdList.politicalStatus == 2) {
            this.resumeIdList.politicalStatus = "民主党派";
          } else if (this.resumeIdList.politicalStatus == 0) {
            this.resumeIdList.politicalStatus = "群众";
          } else if (this.resumeIdList.politicalStatus == 1) {
            this.resumeIdList.politicalStatus = "团员";
          } else if (this.resumeIdList.politicalStatus == 3) {
            this.resumeIdList.politicalStatus = "预备党员";
          } else if (this.resumeIdList.politicalStatus == 4) {
            this.resumeIdList.politicalStatus = "中共党员";
          }
        }
      });
    },
    //获取简历简讯
    brief() {
      this.$http
        .get("/consumer-core/resume/brief")
        .then(res => {
          if (res.data.code == 200) {
            this.resumesId = res.data.data.defaultResumeId;
            this.resumeId();
            if (res.data.data.base === null) {
              (this.showPersonalinformation = false),
                (this.isshowpersonalinformation = true),
                (this.personalinformation = true);
            } else {
              (this.showPersonalinformation = true),
                (this.isshowpersonalinformation = false),
                (this.personalinformation = false);
            }

            if (res.data.data.target == null) {
              (this.joint = true), (this.showjobintension = false);
            } else {
              (this.joint = false), (this.showjobintension = true);
            }
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$notify.info({
              title: "消息",
              message: "页面丢失，请重新加载"
            });
          } else if (error.response.status === 403) {
            this.$notify.info({
              title: "消息",
              message: "登陆超时，请重新登录"
            });
          } else {
            this.$notify.info({
              title: "消息",
              message: error.response.data.message
            });
            this.$router.push({ path: "/login" });
            this.personalinformation = true;
            this.showjobintension = false;
          }
        });
    },
    // //上传附件简历
    // upload() {
    //    this.file = false
    //    this.$http.post(`/resume/${this.resumesId}/file`).then(res => {
    //     if (res.data.code == 200) {
    //       console.log(res);
    //     }
    //   });
    // },
    //专业技能删除
    deleteskill() {
      deleteskill(this.resumesId, this.skillId)
        .then(res => {
          if (res.data.code == 204) {
            this.dialogskill = false;
            this.resumeId();
          }
        })
        .catch(error => {});
    },
    //职称等级删除
    deleteprofession() {
      deleteprofession(this.resumesId, this.qualId)
        .then(res => {
          if (res.data.code == 204) {
            this.dialogprofess = false;
            this.resumeId();
          }
        })
        .catch(error => {});
    },
    //工作经历删除
    deletework() {
      deletework(this.resumesId, this.workId)
        .then(res => {
          if (res.data.code == 204) {
            this.dialogwork = false;
            this.resumeId();
          }
        })
        .catch(error => {});
    },
    //荣誉奖项删除
    deleteawards() {
      deleteawards(this.resumesId, this.awardsId)
        .then(res => {
          if (res.data.code == 204) {
            this.dialogaward = false;
            this.resumeId();
          }
        })
        .catch(error => {});
    },
    //教育经历删除
    deletedu() {
      deletedu(this.resumesId, this.educationId)
        .then(res => {
          if (res.data.code == 204) {
            this.dialogedu = false;
            this.resumeId();
          }
        })
        .catch(error => {});
    },
    //培训经历删除
    deletetrain() {
      deletetrain(this.resumesId, this.trainId)
        .then(res => {
          if (res.data.code == 204) {
            this.dialogtrain = false;
            this.resumeId();
          }
        })
        .catch(error => {});
    },
    //语言能力删除
    deletelanguage() {
      deletelanguage(this.resumesId, this.languageId)
        .then(res => {
          if (res.data.code == 204) {
            this.dialoglanguage = false;
            this.resumeId();
          }
        })
        .catch(error => {});
    },
    //项目经历删除
    deleteproject() {
      deleteproject(this.resumesId, this.progectId)
        .then(res => {
          if (res.data.code == 204) {
            this.dialogproject = false;
            this.resumeId();
          }
        })
        .catch(error => {});
    },
    //自我评价
    selfappraisalemit(c) {
      this.showpersonappraisal = c[1];
      this.showselfappraisal = c[0];
      this.resumeId();
    },
    //荣誉奖项（$emit）
    awardsEmit(c) {
      this.showpersonalskills = c[1];
      this.showpersonalskill = c[0];
      this.resumeId();
    },
    //专业技能（$emit）
    skillEmit(c) {
      this.showpersonalskills = c[1];
      this.showpersonalskill = c[0];
      this.resumeId();
      this.resumeId();
    },
    //职称等级（$emit）
    professionalEmit(c) {
      this.showprofessional = c[0];
      this.showprofessionals = c[1];
      this.resumeId();
    },
    //语言能力（$emit）
    languageEmit(c) {
      this.showlanguage = c[0];
      this.showlanguages = c[1];
      this.resumeId();
    },
    //培训经历（$emit）
    trainEmit(c) {
      this.showtraining = c[0];
      this.showtrain = c[1];
      this.resumeId();
    },
    //项目经历（$emit）
    progectEmit(c) {
      this.showproject = c[0];
      this.showprogectperience = c[1];
      this.resumeId();
    },
    //教育经历（$emit）
    sendiptVal(c) {
      this.showeducation = c[0];
      this.showeducational = c[1];
      this.resumeId();
    },
    //工作经历
    workEmit(c) {
      (this.showwork = c[0]), (this.showworkperience = c[1]);
      this.resumeId();
    },
    BasicEmit(c) {
      (this.showDemo = c[0]), (this.showPersonalinformation = c[1]);
      this.brief();
    },
    //求职意向（$emit）
    jobintensionEmit(c) {
      (this.showJob = c[0]), (this.showjobintension = c[1]);
      this.showadd = c[1];
      this.brief();
    },
    //荣誉奖项（$emit）
    awardsemit(c) {
      this.showawards = c[0];
      this.showaward = c[1];
      this.resumeId();
    },
    //自我介绍
    showselfappraisalList() {
      this.selfappraisalouterVisible = true;
      this.formSelfappraisal.personalDescription = this.listpersonappraisal.content;
    },
    //荣誉奖项
    showawardList(list) {
      this.awardsId = list.id;
      this.formAwards.prizeAward = list.award;
      this.formAwards.prizeTime = this.$moment(
        new Date(list.acquiredTime).getTime()
      ).format("YYYY-MM");
      awardskeepurl(this.resumesId, this.awardsId)
        .then(res => {
          if (res.data.code == 201) {
            this.imageUrlOne = res.data.data.tempUrl;
          }
        })
        .catch(error => {});
      this.awardsouterVisible = true;
    },
    //专业技能编辑
    editskill(list) {
      this.personalskillouterVisible = true;
      this.skillId = list.id;
      console.log(this.skillId);
      this.formPersonalskill.technicalName = list.skill;
      this.formPersonalskill.level = timeUtil.level(list.level);
    },
    //语言能力
    showlanguagesList(list) {
      this.languageouterVisible = true;
      this.formlanguage.languages = list.language;
      (this.formlanguage.listenAbility = timeUtil.level(list.listenAndSpeak)),
        (this.formlanguage.readAbility = timeUtil.level(list.readAndWrite)),
        (this.languageId = list.id);
    },
    //培训经历
    showtrainList(list) {
      this.trainingouterVisible = true;
      this.trainId = list.id;
      this.formtraining.trainCourse = list.lesson;
      this.formtraining.trainCours = list.institution;
      // if (list.endTime == null) {
      //   var date = new Date();
      //   var dataOne = new Date(list.endTime).getTime();
      //   var end = this.$moment(date.getTime()).format("YYYY-MM");
      // } else {
      //   end = this.$moment(dataOne).format("YYYY-MM");
      // }
      this.formtraining.trainTime = [
        this.$moment(list.beginTime).format("YYYY-MM-DD"),
        this.$moment(list.endTime).format("YYYY-MM-DD")
      ];
    },
    //项目经历编辑
    showprogectperienceList(list) {
      this.progectouterVisible = true;
      this.progectId = list.id;
      this.formProject.itemName = list.project;
      this.formProject.companyName = list.company;
      this.formProject.duty = list.duty;
      this.formProject.project = list.description;
      if (list.endTime == null) {
        var end = this.$moment(new Date().getTime()).format("YYYY-MM");
      } else {
        end = this.$moment(new Date(list.endTime).getTime()).format("YYYY-MM");
      }
      this.formProject.schoolTime = [
        this.$moment(new Date(list.beginTime)).format("YYYY-MM"),
        end
      ];
    },
    showprofessionalList(list) {
      this.qualId = list.id;
      this.formProfession.qual = list.qual;
      this.professionouterVisible = true;
    },
    //工作经历编辑
    showworkperienceList(list) {
      this.workouterVisible = true;
      this.workId = list.id;
      this.formWork.companyName = list.company;
      this.formWork.postName = list.position;
      this.formWork.jobDescription = list.description;
      this.formWork.monthPay = list.salaryBeforeTax;
      if (list.endTime == null) {
        var end = this.$moment(new Date().getTime()).format("YYYY-MM");
      } else {
        end = this.$moment(new Date(list.endTime).getTime()).format("YYYY-MM");
      }
      this.formWork.workTime = [
        this.$moment(list.beginTime).format("YYYY-MM"),
        end
      ];
    },
    //教育经历编辑
    showeducationalList(list) {
      this.educationId = list.id;
      this.educationouterVisible = true;
      this.formEducation.educationSpecialty = list.major;
      this.formEducation.educationName = list.school;
      this.formEducation.educationDegree = list.degree;
      if (list.endTime == null) {
        var date = new Date();
        var dataOne = new Date(list.endTime).getTime();
        var end = this.$moment(date.getTime()).format("YYYY-MM");
      } else {
        end = this.$moment(dataOne).format("YYYY-MM");
      }
      this.formEducation.educationTime = [
        this.$moment(list.beginTime).format("YYYY-MM"),
        end
      ];
    },
    //求职意向
    showjobintensionList() {
      this.jobintensionouterVisible = true;
      if (this.listjobintension.jobSearchStatusCode == 1) {
        this.formJobintension.reportTime = this.$moment(
          this.listjobintension.arriveTime
        ).format("YYYY-MM-DD");
      }
      this.formJobintension.status = this.listjobintension.jobSearchStatusCode;
      this.formJobintension.jobType = this.listjobintension.jobTypeCode;
      // if (this.listjobintension.jobTypeCode == 3) {
      //   this.listjobintension.jobType = "实习";
      // } else if (this.listjobintension.jobTypeCode == 0) {
      //   this.listjobintension.jobType = "全职";
      // } else if (this.listjobintension.jobTypeCode == 1) {
      //   this.listjobintension.jobType = "兼职";
      // }

      if (this.listjobintension.salaryMax == 1) {
        this.formJobintension.scope = "1K以下";
      } else if (this.listjobintension.salaryMax == 2) {
        this.formJobintension.scope = "1K-2K";
      } else if (this.listjobintension.salaryMax == 4) {
        this.formJobintension.scope = "2K-4K";
      } else if (this.listjobintension.salaryMax == 6) {
        this.formJobintension.scope = "4K-6K";
      } else if (this.listjobintension.salaryMax == 8) {
        this.formJobintension.scope = "6K-8K";
      } else if (this.listjobintension.salaryMax == 10) {
        this.formJobintension.scope = "8K-10K";
      } else if (this.listjobintension.salaryMax == 15) {
        this.formJobintension.scope = "10K-15K";
      } else if (this.listjobintension.salaryMax == 25) {
        this.formJobintension.scope = "15K-25K";
      } else if (this.listjobintension.salaryMax == 35) {
        this.formJobintension.scope = "25K-35K";
      } else if (this.listjobintension.salaryMax == null) {
        this.formJobintension.scope = "35K以上";
      }

      this.formJobintension.city = [
        this.listjobintension.cities[0].province,
        this.listjobintension.cities[0].city,
        this.listjobintension.cities[0].district
      ];
      this.formJobintension.trad = [
        this.listjobintension.industries[0].first,
        this.listjobintension.industries[0].secondary
      ];
      this.formJobintension.postType = [
        this.listjobintension.positionCatalogs[0].first,
        this.listjobintension.positionCatalogs[0].secondary,
        this.listjobintension.positionCatalogs[0].third
      ];
    },
    //个人信息编辑
    showjpersonalList() {
      this.informationouterVisible = true;
      this.imageUrlTwo = this.avatarUrl;
      this.formInformation.name = this.resumeIdList.fullName;
      if (this.resumeIdList.sexCode === 0) {
        this.formInformation.sex = "0";
      } else {
        this.formInformation.sex = "1";
      }
      // this.formInformation.politicCountenance = this.resumeIdList.politicalStatus;
      if (this.resumeIdList.isGraduate == true) {
        this.formInformation.graduate = "0";
      } else if (this.resumeIdList.isGraduate == false) {
        this.formInformation.graduate = "1";
      }
      this.formInformation.overseasAge = this.resumeIdList.overseasAge;
      if (this.resumeIdList.degreeCode == 2) {
        this.formInformation.educationLevel = "高中";
      } else if (this.resumeIdList.degreeCode == 0) {
        this.formInformation.educationLevel = "初中及以下";
      } else if (this.resumeIdList.degreeCode == 1) {
        this.formInformation.educationLevel = "职中";
      } else if (this.resumeIdList.degreeCode == 3) {
        this.formInformation.educationLevel = "大专";
      } else if (this.resumeIdList.degreeCode == 4) {
        this.formInformation.educationLevel = "本科";
      } else if (this.resumeIdList.degreeCode == 5) {
        this.formInformation.educationLevel = "硕士";
      } else if (this.resumeIdList.degreeCode == 6) {
        this.formInformation.educationLevel = "博士";
      }
      if (this.resumeIdList.politicalStatusCode == 2) {
        this.formInformation.politicCountenance = "民主党派";
      } else if (this.resumeIdList.politicalStatusCode == 0) {
        this.formInformation.politicCountenance = "群众";
      } else if (this.resumeIdList.politicalStatusCode == 1) {
        this.formInformation.politicCountenance = "团员";
      } else if (this.resumeIdList.politicalStatusCode == 3) {
        this.formInformation.politicCountenance = "预备党员";
      } else if (this.resumeIdList.politicalStatusCode == 4) {
        this.formInformation.politicCountenance = "中共党员";
      }
      if (this.resumeIdList.overseasAge == 0) {
        this.formInformation.overseasAge = "";
      }
      var birth = this.resumeIdList.birthday;
      this.woekTime = this.resumeIdList.birthday;
      this.formInformation.birthday = this.$moment(birth).format("YYYY-MM-DD");
      var work = this.resumeIdList.workYear;
      this.bir = this.resumeIdList.birthday;
      this.formInformation.workAge = this.$moment(work).format("YYYY-MM-DD");
      this.formInformation.email = this.resumeIdList.email;
      this.formInformation.phone = this.resumeIdList.phone;
      this.formInformation.city = [
        this.resumeIdList.provinceCode,
        this.resumeIdList.cityCode,
        this.resumeIdList.districtCode
      ];
    },
    testRef(ref) {
      if (ref) {
        const y = this.$refs[ref].offsetTop - 100;
        document.querySelector("#app").scrollTo({ top: y, behavior: "smooth" });
      } else {
        const y = this.$refs[ref].offsetTop - 600;
        document.querySelector("#app").scrollTo({ top: y, behavior: "smooth" });
      }
    },
    showedudialog(list) {
      this.educationId = list.id;
      this.dialogedu = true;
    },
    showworkdialog(list) {
      this.workId = list.id;
      this.dialogwork = true;
    },
    showprojectdialog(list) {
      this.progectId = list.id;
      this.dialogproject = true;
    },
    showtraindialog(list) {
      this.trainId = list.id;
      this.dialogtrain = true;
    },
    showlanguagedialog(list) {
      this.languageId = list.id;
      this.dialoglanguage = true;
    },
    showskilldialog(list) {
      this.skillId = list.id;
      this.dialogskill = true;
    },
    showawardsdialog(list) {
      this.awardsId = list.id;
      this.dialogaward = true;
    },
    showprofessionaldialog(list) {
      this.qualId = list.id;
      this.dialogprofess = true;
    },
    ispersonalinformation() {
      this.isshowpersonalinformation = false;
      // this.personalinformation = false;
      this.showDemo = true;
    },
    jobintension() {
      this.showadd = false;
      this.showJob = true;
      this.showjobintension = false;
    },
    education() {
      this.showeducation = false;
      setTimeout((this.showeducation = true), 5000);

      this.showeducational = false;
    },
    work() {
      this.showwork = true;
      this.showworkperience = false;
    },
    project() {
      this.showproject = true;
      this.showprogectperience = false;
    },
    training() {
      this.showtraining = true;
      this.showtrain = false;
    },
    language() {
      this.showlanguage = true;
      this.showlanguages = false;
    },
    professional() {
      this.showprofessional = true;
      this.showprofessionals = false;
    },
    personal_skill() {
      this.showpersonalskill = true;
      this.showpersonalskills = false;
    },
    awards() {
      this.showawards = true;
      this.showaward = false;
    },
    selfappraisal() {
      this.showselfappraisal = true;
      this.showpersonappraisal = false;
    },
    over(index) {
      if (index == 1) {
        this.activeselfAppraisal =
          "font-weight:bold;line-height:61px;font-size:16px;color:black";
      }
      if (index == 2) {
        this.activeawards =
          "font-weight:bold;line-height:61px;font-size:16px;color:black";
      }
      if (index == 3) {
        this.activeprofessional =
          "font-weight:bold;line-height:61px;font-size:16px;color:black";
      }
      if (index == 4) {
        this.activeOne =
          "font-weight:bold;line-height:61px;font-size:16px;color:black";
      }
      if (index == 5) {
        this.activelanguage =
          "font-weight:bold;line-height:61px;font-size:16px;color:black";
      }
      if (index == 6) {
        this.activetraining =
          "font-weight:bold;line-height:61px;font-size:16px;color:black";
      }
      if (index == 7) {
        this.activeproject =
          "font-weight:bold;line-height:61px;font-size:16px;color:black";
      }
      if (index == 8) {
        this.activework =
          "font-weight:bold;line-height:61px;font-size:16px;color:black";
      }
      if (index == 9) {
        this.activeeducation =
          "font-weight:bold;line-height:61px;font-size:16px;color:black";
      }
      if (index == 10) {
        this.activejobintension =
          "font-weight:bold;line-height:61px;font-size:16px;color:black";
      }
      if (index == 11) {
        this.active =
          "font-weight:bold;line-height:61px;font-size:16px;color:black";
      }
    },
    leave(index) {
      if (index == 1) {
        this.activeselfAppraisal = "";
      }
      if (index == 2) {
        this.activeawards = "";
      }
      if (index == 3) {
        this.activeprofessional = "";
      }
      if (index == 4) {
        this.activeOne = "";
      }
      if (index == 5) {
        this.activelanguage = "";
      }
      if (index == 6) {
        this.activetraining = "";
      }
      if (index == 7) {
        this.activeproject = "";
      }
      if (index == 8) {
        this.activework = "";
      }
      if (index == 9) {
        this.activeeducation = "";
      }
      if (index == 10) {
        this.activejobintension = "";
      }
      if (index == 11) {
        this.active = "";
      }
    },
    //获取简单选项信息
    option() {
      this.monthPayList = this.optionList.salaryRange;
      this.workStateList = this.optionList.jobType;
      this.jobSearchList = this.optionList.jobSearchStatus;
    }
  },
  created() {
    let token = Cookies.get("token");
    this.industryList = industrys.data;
    this.options = citys.data;
    this.optionList = options.data;
    this.positionCatalogList = positionCatalog.data;
    if (token) {
      this.brief();
      this.allfile();
      // this.allposition(),
      // this.allpositionCatalog(),
    }
    this.option();
    datacenterBus.$on("myFun", () => {
      //这里最好用箭头函数，不然this指向有问题
      this.informationouterVisible = false;
    });
  },
  computed: {
    uploadUrl() {
      // const {VUE_APP_SECRET,VUE_APP_DEV_MODE} = process.env
      return "/api/v3/file-service/files/upload";
    },
    uploadUrlOne() {
      // const {VUE_APP_SECRET,VUE_APP_DEV_MODE} = process.env
      return "/api/v3/file-service/files/upload";
    }
  },
  filters: {
    level(level) {
      const map = ["初中及以下", "职中", "大专", "本科", "硕士", "博士"];
      return map[level];
    },
    industry(industry) {
      if (industry == 1) {
        const map = [
          "",
          "酒店/餐饮",
          "旅游/度假",
          "医疗/护理/美容/保健/卫生服务"
        ];
        return map[industry];
      }
      if (industry == 2) {
        const map = [
          "",
          "计算机软件",
          "网络游戏",
          "IT服务(系统/数据/维护)",
          "计算机硬件",
          "互联网/电子商务",
          "电子技术/半导体/集成电路",
          "通信、电信运营/增值服务",
          "通信/电信/网络设备"
        ];
        return map[industry];
      }
      if (industry == 3) {
        const map = [
          "",
          "保险",
          "银行",
          "信托/担保/拍卖/典当",
          "基金/证券/期货/投资"
        ];
        return map[industry];
      }
      if (industry == 4) {
        const map = [
          "",
          "零售/批发",
          "贸易/进出口",
          "快速消费品（食品/饮料/烟酒/日化）",
          "耐用消耗品",
          "租赁服务"
        ];
        return map[industry];
      }
      if (industry == 5) {
        const map = [
          "",
          "文体教育|工艺美术",
          "教育/培训/院校",
          "礼品/玩具/工艺美术/收藏品/奢侈品"
        ];
        return map[industry];
      }
      if (industry == 6) {
        const map = [
          "",
          "办公用品及设备",
          "航空/航天研究与制造",
          "医疗设备/器械",
          "加工制造（原料加工/模具）",
          "医药/生物工程",
          "大型设备/机电设备/重工业",
          "印刷/包装/造纸",
          "汽车/摩托车",
          "仪器仪表及工业自动化"
        ];
        return map[industry];
      }
      if (industry == 7) {
        const map = [
          "",
          "房地产/建筑/建材/工程",
          "物业管理/商业中心",
          "家居/室内设计/装饰装潢"
        ];
        return map[industry];
      }
      if (industry == 8) {
        const map = [
          "",
          "专业服务/咨询(财会/法律/人力资源等)",
          "广告/会展/公关",
          "中介服务",
          "外包服务",
          "检验/检测/认证"
        ];
        return map[industry];
      }
      if (industry == 9) {
        const map = ["", "娱乐/体育/休闲", "媒体/出版/影视/文化传媒"];
        return map[industry];
      }
      if (industry == 10) {
        const map = ["", "跨领域经营", "农/林/牧/渔", "其他"];
        return map[industry];
      }
      if (industry == 11) {
        const map = ["", "交通/运输", "物流/仓储"];
        return map[industry];
      }
      if (industry == 12) {
        const map = [
          "",
          "环保",
          "石油/石化/化工",
          "能源/矿产/采掘/冶炼",
          "电气/电力/水利"
        ];
        return map[industry];
      }
      if (industry == 13) {
        const map = ["", "学术/科研", "政府/公共事业/非盈利机构"];
        return map[industry];
      }
    }
  }
};
</script>

<style lang="stylus">
.web-office-iframe {
  width: 300px;
}

.resumes {
  width: 1440px;
  margin: 96px auto 0;
  display: flex;
  background: #FFFFFF;
  flex-direction: row;
  cursor: default;

  .content {
    width: 1010px;
    background: #FFFFFF;
    margin: 0 0 0 0;

    .deleteDialog {
      .el-dialog__body {
        height: 110px;
      }

      .el-button.is-plain:hover {
        color: #02B9B8;
        border-color: #02B9B8;
      }
    }

    .personalinformation {
      width: 1010px;
      display: flex;
      flex-direction: row;
      font-size: 14px;
      justify-content: space-between;

      .img-add img {
        width: 20px;
        margin: 111px 0 0 407px;
      }

      .img-add span {
        margin: 0 0 0 10px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        color: #02B9B8;
      }
    }

    .personalinformation div:nth-child(2) {
      margin: 0 75px 15px 0;
    }

    .content-line {
      width: 854px;
      border: 0.5px solid #eeeeee;
      margin: 15px 44px 0 96px;
    }

    ul {
      width: 854px;
    }

    ul li {
      list-style: none;
    }

    .li-a {
      display: flex;
      flex-direction: row;
    }

    .ul-a {
      border: 1px solid white;
      margin: 10px 0 0 0;

      .actions-span {
        float: right;
        font-size: 15px;
        color: #1d366e;
        opacity: 0;
      }

      &:hover {
        background: #f7f7f7;

        .actions-span {
          opacity: 1;
        }
      }
    }

    .actions-span span:hover {
      color: #7d8dcb;
    }

    .actions-span span:active {
      color: #617dcb;
    }

    .main-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 0 0 0;

      .main-content-first {
        line-height: 50px;
        margin: 0 0 0 96px;
      }

      .main-content-first span {
        font-size: 18px;
        font-family: PingFangSC-Regular;
        color: #373737;
        margin: 0 0 0 10px;
      }

      .main-content-first img {
        height: 16px;
        vertical-align: middle;
        margin: 0 0 4px 0;
      }

      .main-content-second {
        color: #1d366e;
        line-height: 50px;
        margin: 0 84px 0 0;
      }

      .main-content-second span {
        font-family: PingFangSC-Regular;
        color: #02B9B8;
        font-size: 14px;
        margin: 0 0 0 5px;
      }

      .main-content-second img {
        height: 21px;
        vertical-align: middle;
        margin: 0 0 2px 10px;
      }
    }
  }

  .aside-body {
    .aside {
      background: #FFFFFF;
      margin-top: 0px;

      .aside-nav {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin: 0 0 0 0;
        width: 336px;
        height: auto;
        background: #FAFAFA;

        .aside-nav-first {
          font-family: PingFangSC-Regular;
          color: #373737;
          font-size: 16px;
          font-weight: bold;
          margin: 20px 0 0 40px;
        }

        .aside-nav-second {
          display: flex;
          flex-direction: row;
          font-family: PingFangSC-Regular;
          color: #373737;
          font-size: 14px;
          margin: 10px 0 0 40px;
        }

        .aside-nav-third {
          font-family: PingFangSC-Regular;
          color: #8C8C8C;
          font-size: 12px;
          margin: 10px 0 20px 40px;
        }
      }

      .aside-tabulation {
        display: flex;
        flex-direction: column;
        margin: 15px 0 0 0;
        width: 336px;
        height: 490px;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 5px;

        .aside-line {
          width: 160px;
          border: 0.5px solid #eeeeee;
          margin: 0 27px 0 32px;
        }

        .tabulation {
          line-height: 42px;
          font-size: 14px;
          text-align: left;
          cursor: pointer;
        }

        .tabulation:hover {
          background: #fafafa;
        }

        .tabulation a {
          text-decoration: none;
          color: #455379;
          margin: 0 0 0 63px;

          .tabulation-language {
            margin: 0 0 0 23px;
            font-family: PingFangSC-Regular;
            color: #5B5B5B;
            font-size: 14px;
          }

          .tabulation-language:hover {
            color: #02B9B8;
          }

          .tabulation-language:active {
            color: #617dcb;
          }
        }

        .tabulation img {
          height: 20px;
          vertical-align: middle;
          margin: 0 0 4px 0;
        }
      }
    }

    .aside-foot {
      background: #FAFAFA;
      /* margin 0 0 0 790px */
      text-align: left;
      /* position fixed */
      width: 336px;
      padding-top: 11px;
      margin: 0 0 -60px 0;

      .aside-foot-first {
        font-family: PingFangSC-Regular;
        color: #373737;
        font-size: 16px;
        margin-left: 0px;
      }

      .aside-foot-second {
        font-famil: PingFangSC-Regular;
        color: #909090;
        font-size: 12px;
        margin: 5px 30px 0 30px;

        .onResume {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .resumeLine {
          width: 100%;
          border: 0.5px solid #e9e9e9;
          margin: 10px 0 10px 0;
        }
      }
    }
  }
}
</style>
<style lang="stylus">
.el-radio__input.is-checked .el-radio__inner {
  border-color: #02B9B8;
  background: #02B9B8;
}

.el-radio.is-bordered.is-checked {
  border-color: #02B9B8;
}

.el-radio__input.is-checked+.el-radio__label {
  color: #373737;
  font-size: 16px;
}

.el-radio__label {
  color: #373737;
  font-size: 16px;
}

.el-input__inner:focus {
  border-color: #CCCCCC;
}

.el-textarea__inner:focus {
  border-color: #CCCCCC;
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: #CCCCCC;
}

.el-select .el-input__inner:hover {
  border-color: #CCCCCC;
}

.el-cascader .el-input.is-focus .el-input__inner {
  border-color: #CCCCCC;
}

.el-cascader-node__label {
  color: #373737;
}

.el-cascader .el-input .el-input__inner:focus {
  border-color: #CCCCCC;
}

.el-date-table td.today span {
  color: #02B9B8;
}

.el-date-table td.current:not(.disabled) span {
  background-color: #02B9B8;
}

.el-icon-arrow-up:before {
  content: '\e78f';
}

.el-icon-arrow-down:before {
  content: '\e790';
}

.el-select .el-input .el-select__caret {
  color: #C0C4CC;
  font-size: 14px;
  transition: transform 0.3s;
  transform: rotateZ(180deg);
  cursor: pointer;
  margin: 0 5px 0 0;
  text-align: center;
  width: 15px;
}

.suozai {
  .el-input__icon {
    width: 25px;
    text-align: center;
  }
}

.dialog-footer {
  .el-button.is-plain:hover {
    color: #02B9B8;
    border-color: #02B9B8;
  }
}

.sureDialog {
  .el-dialog__body {
    height: 110px;
  }

  .el-button.is-plain:hover {
    color: #02B9B8;
    border-color: #02B9B8;
  }
}

.el-textarea__inner {
  height: 100px;
}

.el-button {
  width: 94px;
  height: 34px;
  vertical-align: middle;
  padding: 0px;
}

.el-progress-bar__inner {
  background-color: #02B9B8;
}

.el-dialog {
  border-radius: 5px;
}

.keep:hover {
  border-color: #7d8dcd;
}

.el-cascader__inner:hover {
  border-color: #7d8dcd;
}

.el-button--primary:hover {
  background: #02B9B8;
}

.el-button.is-plain {
  color: #02B9B8;
  background: white;
}

.avatar-upload .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-right: 15px;
}

.avatar-upload .el-upload:hover {
  border-color: #02B9B8;
}

.avatar-upload-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.el-icon-edit {
  color: #02B9B8;
  font-size: 16px;
  margin: 3px 5px 0 0;
}

.el-icon-delete {
  color: #02B9B8;
  font-size: 16px;
  margin: 3px 5px 0 0;
}
</style>

