<template>
  <div class="enterprise-info-container">
    <el-dialog title :visible.sync="centerDialogVisible" :show-close="false" width="23%" center>
      <div style="text-align:center">
        <div class="loading">
          <i style="font-size:60px;color:#faad14;" class="el-icon-warning"></i>
        </div>
        <div class="loading-text">是否保存修改？</div>
        <div style="text-align:center">
          <el-button
            style="height:40px;line-height:0px;margin:35px 0 0 0"
            plain
            @click="centerDialogVisible = false"
          >取消</el-button>
          <el-button
            style="height:40px;line-height:0px;margin:35px 0 0 30px"
            type="primary"
            @click="centerDialogVisible = false"
          >保存</el-button>
        </div>
      </div>
    </el-dialog>
    <div class="body">
      <div class="head">
        <p>企业信息完整度</p>
        <el-progress
          :text-inside="true"
          :stroke-width="15"
          percentage="0"
        ></el-progress>
      </div>
      <div class="form">
        <p class="header">
          <span class="title">基本信息</span>
          <el-button
            class="edit-btn main"
            @click="editEnterpriseRegisterInfo"
            v-if="enterpriseInfoEditMode"
          >编辑</el-button>
        </p>
        <div class="display" v-if="enterpriseInfoEditMode">
          <ul>
            <li>
              <span>企业名称：</span>
              <span class="spanSecond">{{companyInfo.fullName}}</span>
            </li>
            <li>
              <span>企业简称：</span>
              <span class="spanSecond">{{companyInfo.shortName}}</span>
            </li>
            <li>
              <span>企业规模：</span>
              <span class="spanSecond">{{companyInfo.size}}</span>
            </li>
            <li>
              <span>企业性质：</span>
              <span class="spanSecond">{{companyInfo.nature}}</span>
            </li>
            <li>
              <span>所属行业：</span>
              <span class="spanSecond">{{companyInfo.industrySecondary}}</span>
            </li>
            <li>
              <span>企业地点：</span>
              <span class="spanSecond">{{companyInfo.address.district}}</span>
            </li>
            <li>
              <span>企业介绍：</span>
              <span class="spanSecond">{{companyInfo.description}}</span>
            </li>
            <li>
              <span>企业 LOGO：</span>
              <span>
                <img class="logo" v-if="companyInfo.logoUrl" />
              </span>
            </li>
          </ul>
        </div>
        <el-form
          class="form-container"
          ref="companyInfo"
          :rules="companyInfoFormRules"
          :model="companyInfo"
          label-width="140px"
          v-else
        >
          <el-form-item label="企业名称">
            <span>{{ companyInfo.fullName }}</span>
          </el-form-item>
          <el-form-item label="企业简称" prop="shortName">
            <el-input style="width:240px" v-model="companyInfo.shortName" placeholder="请输入企业简称"></el-input>
          </el-form-item>
          <el-form-item label="企业规模" prop="size">
            <el-select style="width:240px" v-model="companyInfo.size" placeholder="请选择">
              <el-option
                v-for="item in this.optionList.companySize"
                :key="item.code"
                :label="item.tag"
                :value="item.tag"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业性质" prop="nature">
            <el-select style="width:240px" v-model="companyInfo.nature" placeholder="请选择企业性质">
              <el-option
                v-for="item in optionsNature"
                :key="item.code"
                :label="item.tag"
                :value="item.tag"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属行业" prop="industry">
            <el-cascader
              style="width:240px"
              :props="props"
              :options="industryList"
              v-model="companyInfo.industry"
              placeholder="请选择所属行业"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="企业地址" prop="city">
            <el-cascader
              v-model="companyInfo.city"
              style="width:240px"
              :props="props"
              :options="cityList"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="企业地址" prop="detail">
            <el-input
              type="textarea"
              style="width:500px;margin:20px 0 0 0"
              :rows="4"
              v-model="companyInfo.detail"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="具体地点">
            <el-input
              style="margin-right: 10px;width:240px"
              placeholder="请输入公司所在经度"
              v-model="companyInfo.address.latitude"
            ></el-input>
            <el-input
              placeholder="请输入公司所在纬度"
              style="width:240px"
              v-model="companyInfo.address.longitude"
            ></el-input>
          </el-form-item>-->
          <el-form-item label="企业介绍" prop="description">
            <el-input
              style="width:500px"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="companyInfo.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业 LOGO" prop="file">
            <el-upload
              class="avatar-upload"
              :action="uploadUrl"
              :data="uploadData"
              :headers="myHeaders"
              style="margin-left:0px"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else style="border:1px solid #dcdfe6;margin:0 200px 0 0" class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip">支持图片格式：png、jpg、jpeg，最大不超过 3M。</div>
              <div class="el-upload__tip">为了尽快通过审核，请上传真实合法且清晰的执照图片。</div>
            </el-upload>
            <!-- <img
              ref="preview-logo"
              class="logo"
              :src="companyInfo.logoUrl"
              v-if="companyInfo.logoUrl"
            />
            <el-button size="small" type="primary">点击更新</el-button>
            <div class="el-upload__tip">支持图片格式：png、jpg、jpeg，最大不超过 3M。</div>
            <div class="el-upload__tip">为了尽快通过审核，请上传真实合法且清晰的执照图片。</div>
            <input class="image-input" ref="input" type="file" accept="image/*" />
            <el-dialog
              title="裁切图片"
              :visible.sync="lOGOUploadModalVisible"
              :close-on-click-modal="false"
              :close-on-press-escape="false"
              width="30%"
            >
              <vue-cropper ref="cropper" :src="imgSrc" :aspectRatio="1"></vue-cropper>
              <span slot="footer" class="dialog-footer">
                <el-button>重新选择</el-button>
                <el-button type="primary" @click="cropImage">确定</el-button>
              </span>
            </el-dialog>-->
          </el-form-item>
          <div class="operations">
            <el-button type="primary" class="main" @click="updateCompany">保存</el-button>
            <el-button @click="clearAndReload">取消</el-button>
          </div>
        </el-form>
        <span class="line"></span>
        <p class="header">
          <span class="title">企业审核信息</span>
          <el-button
            class="edit-btn main"
            @click="editEnterpriseInfo"
            v-if="enterpriseRegisterInfoEditMode"
          >编辑</el-button>
        </p>
        <div class="display" v-if="enterpriseRegisterInfoEditMode">
          <ul>
            <li>
              <span>企业名称：</span>
              <span class="spanSecond">{{ 1 }}</span>
            </li>
            <li>
              <span>企业注册地：</span>
              <span class="spanSecond">{{ 2 }}</span>
            </li>
            <li>
              <span>统一社会信用代码：</span>
              <span class="spanSecond">{{ 3 }}</span>
            </li>
            <li>
              <span>企业类别：</span>
              <span class="spanSecond">13</span>
            </li>
            <li>
              <span>证件原件照片：</span>
              <!-- <span><img :src="companyInfo.audit.licenseUrl.accessUrl" /></span> -->
            </li>
          </ul>
        </div>
        <el-form
          class="form-container"
          ref="form"
          :rules="auditInfoFormRules"
          :model="companyInfo.audit"
          label-width="140px"
          v-else
        >
          <el-form-item label="企业名称" prop="companyName">
            <el-input
              style="width:240px"
              v-model="companyInfo.audit.companyName"
              placeholder="企业名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业注册地" prop="registeredAddress">
            <el-input
              style="width:240px"
              v-model="companyInfo.audit.registeredAddress"
              placeholder="请输入企业注册地（省份、城市）"
            ></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码" prop="uniformSocialCreditCode">
            <el-input
              style="width:240px"
              maxlength="18"
              v-model="companyInfo.audit.uniformSocialCreditCode"
              placeholder="请输入与企业证件材料一致的代码"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业类别" prop="enterpriseForm">
            <el-cascader
              style="width:240px"
              :options="enterpriseTypes"
              v-model="companyInfo.audit.enterpriseForm"
              placeholder="请选择企业类型"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="上传证件原件照片" prop="file">
            <el-upload
              class="upload"
              :action="uploadCompanyFile"
              :file-list="auditTempFile"
              :on-success="dealWithUploadLicense"
              :with-credentials="true"
              :limit="1"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div class="el-upload__tip" slot="tip">支持图片格式：png、jpg、jpeg、gif，最大不超过 3M。</div>
              <div
                class="el-upload__tip"
                slot="tip"
              >提示：确保企业名称与提交审核公司一致；如为复印件、黑白扫描件，需加盖企业公章；不可使用屏幕截图或翻拍照片提交审核；上传图片不可有与银领人才网无关的标注或水印；不可使用电子版营业执照提交审核；所上传证照照片，信息需清晰完整；</div>
              <div class="el-upload__tip warning" slot="tip">企业营业执照仅用审核，不会向第三方透露，请放心上传！</div>
            </el-upload>
          </el-form-item>
          <div class="operations">
            <el-button type="primary" class="main" @click="onSubmitAuditInfo">保存</el-button>
            <el-button @click="clearAndReload">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
let token = Cookies.get("token");
import Cookies from "js-cookie";
import industry from "../../assets/industry.json";
import city from "../../assets/city.json";
import option from "../../assets/option.json";
export default {
  name: "home",
  data() {
    return {
      myHeaders: { "Auth-Token": token },
      uploadData: {
        label: "company-logo"
      },
      lOGOUploadModalVisible: false,
      centerDialogVisible: false,
      enterpriseInfoEditMode: true,
      enterpriseRegisterInfoEditMode: true,
      props: {
        value: "tag",
        label: "tag",
        children: "children"
      },
      imgSrc: "",
      cityList: [],
      industryList: [],
      optionList: [],
      companyInfo: {
        completedPercent: 0,
        detail: "",
        fullName: "",
        industry: [],
        nature: "",
        shortName: "",
        size: "",
        addressId: "",
        logoUrl: "",
        city: [],
        description: "",
        audit: {
          companyName: "",
          enterpriseForm: "",
          licenseUrl: {
            accessUrl: ""
          },
          registeredAddress: "",
          uniformSocialCreditCode: ""
        }
      },
      optionsNature: [
        {
          code: 0,
          tag: "国有企业"
        },
        {
          code: 1,
          tag: "民营企业"
        },
        {
          code: 2,
          tag: "合资企业"
        },
        {
          code: 3,
          tag: "外资企业"
        },
        {
          code: 4,
          tag: "事业单位"
        }
      ],
      companyInfoFormRules: {
        size: [{ required: true, message: "请选择企业规模", trigger: "blur" }],
        nature: [
          { required: true, message: "请选择企业性质", trigger: "blur" }
        ],
        industry: [
          { required: true, message: "请选择所属行业", trigger: "blur" }
        ],
        "address.province": [
          { required: true, message: "请选择企业地址", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入企业介绍", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //获取公司简讯
    brief() {
      this.$http
        .get("/business-core/companyes/brief")
        .then(res => {
          if (res.data.code == "200") {
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取公司详情
    companyDetail() {
      this.$http
        .get("/business-core/companyes")
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.companyInfo = response;
            this.companyInfo.industry = [
              response.industryFirst,
              response.industrySecondary
            ];
            this.companyInfo.city = [
              response.address.province,
              response.address.city,
              response.address.district
            ];
            this.companyInfo.detail = response.address.detail;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //更新公司
    updateCompany() {
      let params = {
        addressId: 130206,
        cert: null,
        companyAddressBody: {
          city: this.companyInfo.city[1],
          detail: this.companyInfo.detail,
          district: this.companyInfo.city[2],
          province: this.companyInfo.city[0]
        },
        companyId: 155,
        description: this.companyInfo.detail,
        fullName: this.companyInfo.fullName,
        industryCode: null,
        industryFirst: this.companyInfo.industry[0],
        industrySecondary: this.companyInfo.industry[1],
        logo: null,
        nature: this.companyInfo.nature,
        natureCode: null,
        shortName: this.companyInfo.shortName,
        size: this.companyInfo.size,
        sizeCode: null
      };
      this.$http
        .put("/business-core/companyes", params)
        .then(res => {
          let response = res.data.data;
          if (res.data.code == "200") {
            this.enterpriseInfoEditMode = true;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    editEnterpriseRegisterInfo() {
      console.log("1313");
      this.enterpriseInfoEditMode = false;
      // if (this.enterpriseInfoEditMode) {
      //   this.$notify({
      //     title: "警告",
      //     message: "请先保存企业基本信息！",
      //     type: "warning"
      //   });
      // } else {
      //   this.enterpriseInfoEditMode = false;
      // }
    },
    editEnterpriseInfo() {
      this.enterpriseRegisterInfoEditMode = false;
      // if (this.enterpriseRegisterInfoEditMode) {
      //   this.$notify({
      //     title: "警告",
      //     message: "请先保存企业审核信息！",
      //     type: "warning"
      //   });
      // } else {
      //   this.enterpriseRegisterInfoEditMode = false;
      // }
    }
  },
  computed: {
    uploadUrl() {
      return '/file-service/files/upload';
    }
  },
  created() {
    this.cityList = city.data;
    this.industryList = industry.data;
    this.optionList = option.data;
    this.brief();
    this.companyDetail();
  }
};
</script>
<style lang="stylus" scoped>
.loading-text {
  font-family: PingFangSC-Medium;
  color: #111111;
  font-size: 20px;
  margin: 20px 0 0 0;
}

.enterprise-info-container {
  display: flex;
  flex-direction: column;
  margin-top: 0px;

  .nav {
    position: relative;
    flex: 0 0 70px;
  }

  .body {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    position: relative;
    background-color: white;
    margin: auto;

    .inline-top-item {
      margin-bottom: 10px;
    }

    .head {
      width: 240px;
      text-align: left;
      font-size: 14px;
      margin: 20px 0 20px 15px;
    }

    .form {
      padding: 10px;

      .form-container {
        .operations {
          text-align: right;
        }

        .image-input {
          display: none;
        }
      }

      .display {
        ul {
          list-style: none;
          text-align: left;
          font-size: 16px;
          padding: 0;

          li {
            margin: 40px 0;
            display: flex;

            span:first-child {
              flex: 0 0 150px;
              text-align: right;
            }

            .spanSecond {
              font-size: 14px;
              margin: 3px 0 0 0;
            }
          }
        }
      }

      img {
        max-height: 100px;
        margin-right: 20px;
        vertical-align: bottom;
      }

      .line {
        width: 100%;
        height: 1px;
        display: inline-block;
        background: lightgrey;
        margin: 20px 0;
      }

      button.full {
        width: 100%;
      }

      p {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;

        &.header {
          justify-content: space-between;
          margin: 10px 0 30px 5px;
          font-weight: bold;

          .title {
            display: inline-block;
            vertical-align: middle;
            margin-right: 3px;
            line-height: 38px;
          }
        }

        span {
          font-size: 22px;
        }
      }
    }
  }
}
</style>