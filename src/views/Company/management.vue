<template>
  <div style="margin:96px 0 0 0;">
    <el-dialog title="新增用户" :visible.sync="DialogVisible" width="30%">
      <div>
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名:" prop="userName">
              <el-input style="width:240px" placeholder="请输入姓名" v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="phone">
              <el-input style="width:240px" placeholder="请输入手机号" v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input style="width:240px" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="角色:" prop="role">
              <span>管理员</span>
            </el-form-item>
          </el-form>
        </div>
        <div style="text-align:center">
          <el-button
            style="height:40px;line-height:0px;margin:20px 0 0 0"
            plain
            @click="DialogVisible = false"
          >取消</el-button>
          <el-button
            style="height:40px;line-height:0px;margin:20px 0 0 30px"
            type="primary"
            @click="addUesrs"
          >确定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="DialogVisibleEdit" width="30%">
      <div>
        <div>
          <el-form
            :model="ruleForms"
            :rules="rule"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名:" prop="realName">
              <el-input style="width:240px" placeholder="请输入姓名" v-model="ruleForms.realName"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="phone">
              <el-input style="width:240px" placeholder="请输入手机号" v-model="ruleForms.phone"></el-input>
            </el-form-item>
            <!-- <el-form-item label="密码:" prop="password">
              <el-input style="width:240px" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
            </el-form-item> -->
            <el-form-item label="角色:" prop="region">
              <span>管理员</span>
            </el-form-item>
          </el-form>
        </div>
        <div style="text-align:center">
          <el-button
            style="height:40px;line-height:0px;margin:20px 0 0 0"
            plain
            @click="DialogVisibleEdit = false"
          >取消</el-button>
          <el-button
            style="height:40px;line-height:0px;margin:20px 0 0 30px"
            type="primary"
            @click="editUesr"
          >确定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="转移管理员权限" :visible.sync="DialogVisiblePower" width="30%">
      <div>
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="选择移交用户:" prop="region">
              <el-select style="width:240px;" v-model="ruleForm.region" placeholder="请选择选择移交用户">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <div>移交前须通过手机号验证管理员身份</div>
            </el-form-item>
            <el-form-item label="验证码:" prop="region" style="margin:-20px 0 0 0">
              <el-input style="width:240px;" placeholder="请输入验证码" v-model="ruleForm.name"></el-input>
              <el-button plain style="margin:0 0 0 20px">{{captchaStatusText}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="text-align:center">
          <el-button
            style="height:40px;line-height:0px;margin:20px 0 0 0"
            plain
            @click="DialogVisiblePower = false"
          >取消</el-button>
          <el-button
            style="height:40px;line-height:0px;margin:20px 0 0 30px"
            type="primary"
            @click="DialogVisiblePower = false"
          >确定</el-button>
        </div>
      </div>
    </el-dialog>
    <div class="resume-nav">
      <div>用户列表</div>
    </div>
    <div class="resume-seconds">
      <div class="demo-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户姓名/手机号">
            <el-input placeholder="请选择" suffix-icon="el-icon-search" v-model="formInline.keyword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin:0 0 0 445px" plain @click="account">查询</el-button>
            <el-button type="primary" @click="addUesr">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 96%;margin:0 auto">
        <el-table-column prop="realName" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="role" label="角色" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="role" label="权限" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="注册时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createdTime|formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              style="color:#FF7152"
              @click="handleClickEdit(scope.row)"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              style="color:#FF7152"
              @click="deleteUser(scope.row)"
              type="text"
              size="small"
            >删除</el-button>
            <!-- <el-button
              style="color:#FF7152"
              @click="handleClickPower(scope.row)"
              type="text"
              size="small"
            >转移管理员权限</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        class="pagination"
        :page-sizes="page.pageSizeOpts"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    // 手机号验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      ruleForm: {
        userName: "",
        phone: "",
        password: ""
      },
      ruleForms: {
        realName: "",
        phone: "",
      },
      formInline: {
        keyword: ""
      },
      page: {
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeOpts: [10, 20, 30]
      },
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      rule: {
        realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      tableData: [],
      DialogVisible: false,
      DialogVisibleEdit: false,
      DialogVisiblePower: false,
      captchaStatusText: "获取验证码",
      frozen: false,
      counter: 60,
      id:''
    };
  },
  methods: {
    //编辑用户
    editUesr(tab) {
      let params = {
        password: null,
        phone: this.ruleForms.phone,
        realName: this.ruleForms.realName,
        role: "ROLE_ADMIN"
      };
      this.$http
        .put(`/business-user/admin/account/${this.id}`, params)
        .then(res => {
          if (res.data.code == "200") {
            this.account()
            this.DialogVisibleEdit = false
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除用户
    deleteUser(tab) {
      this.$http
        .delete(`/business-user/admin/account/${tab.id}`)
        .then(res => {
          if (res.data.code == "204") {
            this.account()
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //新增用户
    addUesrs() {
      let params = {
        password: this.ruleForm.password,
        phone: this.ruleForm.phone,
        realName: this.ruleForm.userName,
        role: "ROLE_ADMIN"
      };
      this.$http
        .post("/business-user/admin/account", params)
        .then(res => {
          if (res.data.code == "201") {
            this.account()
            this.DialogVisible = false
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //用户管理列表
    account() {
      let params = {
        keyword: this.formInline.keyword ? this.formInline.keyword : null,
        pageNum: this.page.current,
        pageSize: this.page.pageSize,
        sortBy: null,
        sortOrder: null
      };
      this.$http
        .get("/business-user/admin/account", { params: params })
        .then(res => {
          if (res.data.code == "200") {
            this.tableData = res.data.data.list;
            this.page.total = res.data.data.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.current = 1;
      this.account();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.account();
    },
    addUesr() {
      this.DialogVisible = true;
    },
    handleClickEdit(tab) {
      this.DialogVisibleEdit = true;
      this.ruleForms.realName = tab.realName
      this.ruleForms.phone = tab.phone
      this.id = tab.id
    },
    getCaptcha() {
      let that = this;
      const captchaLabel = "获取验证码";
      const countNumber = 60;
      this.setData({
        frozen: true
      });
      if (this.data.getInput) {
        wx.request({
          url: app.config.socketHost + "/account/phone/vcode", // 拼接接口地址(前面为公共部分)
          method: "post",
          data: {
            phone: that.data.getInput
          },
          header: {
            "content-type": "application/json"
          },
          success(res) {
            if (res.data.code === 400) {
              $Toast({
                content: res.data.message,
                type: "warning"
              });
            } else {
              const handler = setInterval(() => {
                that.setData({
                  captchaStatusText: `${captchaLabel}(${--that.data.counter}s)`
                });
                // this.data.captchaStatusText = `${captchaLabel}(${--this.data.counter}s)`;
                if (that.data.counter === 0) {
                  clearInterval(handler);
                  that.setData({
                    counter: countNumber,
                    captchaStatusText: captchaLabel,
                    frozen: false
                  });
                }
              }, 1000);
            }
          }
        });
      } else {
        $Toast({
          content: "请输入正确的手机号",
          type: "warning"
        });
      }
    },
    handleClickPower() {
      this.DialogVisiblePower = true;
    }
  },
  created() {
    this.account();
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
  justify-content: space-between;
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

.resume-seconds {
  width: 100%;
  height: auto;
  background: #ffffff;
  border: 1px solid rgba(244, 244, 244, 1);
  box-shadow: 0px 2px 10px 0px rgba(245, 245, 245, 1);

  .tab-operations {
    position: absolute;
    margin: 7px 0 0 260px;
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
