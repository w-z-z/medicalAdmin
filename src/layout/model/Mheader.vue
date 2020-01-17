<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2019-12-30 16:25:22
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-10 13:27:19
 -->
<template>
  <div id="header">
    <div class="logo">
      <div class="logoShadow">
        <img src="../../assets/logo.png" alt />
      </div>
    </div>
    <div class="head-right">
      <ul>
        <li @click="goToPage(item.path)" v-for="(item,index) in navArr" :key="index">
          <i class="nav-icon iconfont" :class="item.icon"></i>
        </li>
      </ul>
      <!-- 下拉框 -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar
            :size="40"
            :src="getUserInfo.personInfo&&getUserInfo.personInfo.head_img?  getUserInfo.personInfo.head_img:head_img "
          ></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown" class="logOut">
          <el-dropdown-item icon="iconfont icon-xiugai" command="/passwordModify">修改登录密码</el-dropdown-item>
          <el-dropdown-item icon=" iconfont icon-tuichu" command="/logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码模态框 -->
    <BDdialog :dialogParam="dialogParam">
      <el-form
        class="modify"
        label-position="top"
        label-width="80px"
        hide-required-asterisk
        ref="passwordForm"
        :model="passwordForm"
        :rules="PwdRules"
      >
        <el-form-item label="旧密码" prop="password">
          <el-input
            placeholder="请输入旧密码"
            maxlength="30"
            @click.native="changeEye(1,$event)"
            :suffix-icon="isOpen1 ? 'iconfont icon-faxian-yanjing' : 'iconfont icon-guanbi-yanjing'"
            :type="isOpen1 ? 'text' : 'password'"
            clearable
            v-model="passwordForm.password"
          ></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newPwd">
          <el-input
            placeholder="请输入新密码"
            maxlength="30"
            @click.native="changeEye(2,$event)"
            :suffix-icon="isOpen2 ? 'iconfont icon-faxian-yanjing' : 'iconfont icon-guanbi-yanjing'"
            :type="isOpen2 ? 'text' : 'password'"
            clearable
            v-model="passwordForm.newPwd"
          ></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" prop="confimNewPwd">
          <el-input
            placeholder="重复输入新密码"
            maxlength="30"
            clearable
            @click.native="changeEye(3,$event)"
            :suffix-icon="isOpen3 ? 'iconfont icon-faxian-yanjing' : 'iconfont icon-guanbi-yanjing'"
            :type="isOpen3 ? 'text' : 'password'"
            v-model="passwordForm.confimNewPwd"
          ></el-input>
        </el-form-item>

        <el-form-item class="btn">
          <el-button size="medium" type="danger" @click="save('passwordForm')">保存修改</el-button>
        </el-form-item>
      </el-form>
    </BDdialog>
  </div>
</template>

<script>
import { createRouter } from "../../router/index";
import { log } from "util";
import BDdialog from "@/components/BD_dialog/index";
import { validate } from "@/utils/validate";
import { mapGetters } from "vuex";
export default {
  name: "Mheader",
  components: {
    BDdialog
  },
  data() {
    var checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.passwordForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkCommon = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value === this.passwordForm.password) {
        callback(new Error("新密码与旧密码一致!"));
      } else {
        if (this.passwordForm.confimNewPwd !== "") {
          this.$refs.passwordForm.validateField("confimNewPwd"); // 再次触发某个“字段”的验证
        }
        callback();
      }
    };
    var checkSame = (rule, value, callback) => {
      if (this.passwordForm.newPwd !== "") {
        this.$refs.passwordForm.validateField("newPwd"); // 再次触发某个“字段”的验证
      }
      callback();
    };
    return {
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      staticImg: require("../../assets/images/user/head_img.png"),
      navArr: [
        {
          icon: "icon-wangzhanguanli",
          path: "/webset/websetIndex"
        },
        {
          icon: "icon-tongzhi1",
          path: "/newsCenter/notice"
        }
        // {
        //   icon: "icon-rizhi",
        //   path: "/webset/log"
        // }
      ],
      head_img: require("../../assets/images/index/head_img.png"),
      // 弹窗
      dialogParam: {
        title: "修改登录密码",
        width: "600px",
        visible: false,
        lockScroll: true,
        okBtn: {
          show: false
        },
        noBtn: {
          show: false
        }
      },
      // 密码表单数据
      passwordForm: {
        password: "",
        newPwd: "",
        confimNewPwd: ""
      },
      PwdRules: {
        password: [
          validate.verifyRequired("旧密码不能为空！"),
          { validator: checkSame, trigger: "blur" }
        ],
        newPwd: [
          { validator: validate.verifyPwd, trigger: "change" },
          { validator: checkCommon, trigger: "blur" }
        ],
        confimNewPwd: [{ validator: checkPwd, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"])
  },
  methods: {
    changeEye(num, e) {
      if (e.target.className.includes("yanjing")) {
        if (num === 1) {
          this.isOpen1 = !this.isOpen1;
        } else if (num === 2) {
          this.isOpen2 = !this.isOpen2;
        } else {
          this.isOpen3 = !this.isOpen3;
        }
      }
    },
    goToPage(path) {
      this.$router.push(path);
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改密码
          let { password, newPwd, confimNewPwd } = this.passwordForm;
          let params = {
            old_password: password,
            new_password: newPwd,
            confirm_password: confimNewPwd
          };

          this.$api["UpdatePassword"](params)
            .then(res => {
              this.$showMsg("密码修改成功!请重新登录!", 3);
              setTimeout(() => {
                this.$clearAllUserData.call(this);
              }, 2000);
            })
            .catch(msg => {
              this.$showMsg(msg);
            });
        } else {
          return false;
        }
      });
    },
    handleCommand(command) {
      if (command === "/passwordModify") {
        // 修改密码
        this.dialogParam.visible = true;
      } else {
        // 退出登录
        this.$confirm("确定要退出登录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
          // type: "warning"
        })
          .then(() => {
            this.$api["Logout"]()
              .then(succ => {
                this.$clearAllUserData.call(this);
              })
              .catch(err => {
                this.$showMsg("退出登录失败");
              });
          })
          .catch(() => {});
      }
    }
  },
  created() {},
  mounted() {},
  watch: {
    "dialogParam.visible"(newVal, oldVal) {
      if (newVal === false) {
        this.$refs["passwordForm"].resetFields();
      }
    }
  }
};
</script>

<style  lang='less'>
#header {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  padding-right: 60px;
  display: flex;
  justify-content: space-between;
  .logo {
    position: relative;
    background-color: #6fa8e9;
    width: 96px;
    height: 100%;

    .logoShadow {
      position: absolute;
      top: 0;
      height: 100%;
      padding: 15px 0;
      width: 100%;
      text-align: center;
      left: 0;
      background-color: rgba(255, 255, 255, 0.2);
      cursor: pointer;
      img {
        width: 31px;
      }
    }
  }
  .head-right {
    height: 100%;

    display: flex;
    align-items: center;
    ul {
      border-right: 1px solid #999;
      margin-right: 20px;
      li {
        float: left;
        margin-right: 20px;
        .nav-icon {
          font-size: 32px;
          color: #666666;
          cursor: pointer;
        }
      }
    }
  }

  .modify {
    width: 390px;
    margin: 0 auto;

    .el-input__inner {
      height: 50px;
      border-radius: 25px;
      text-indent: 10px;
    }
    .el-input__suffix {
      right: 16px;
      top: 2px;
      .el-input__icon {
        font-size: 18px;
      }
    }
    .el-form-item__label {
      padding: 0;
      text-indent: 20px;
    }
    .el-form-item__error {
      color: #ff7465;
      text-indent: 20px;
      line-height: 20px;

      &::before {
        content: "";
        height: 16px;
        width: 16px;
        display: inline-block;
        background: url("../../assets/images/login/jinggao.png") center
          no-repeat;
        vertical-align: middle;
        margin-right: 4px;
      }
    }
    .btn {
      text-align: center;
      .el-button {
        border-radius: 20px;
        margin-top: 30px;
      }
    }
  }
}
.logOut {
  box-shadow: 0px 9px 35px 0px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  .el-dropdown-menu__item {
    color: #333;
  }
}
</style>
