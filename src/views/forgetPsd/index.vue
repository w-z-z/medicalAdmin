<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2019-12-30 16:25:22
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-14 16:17:58
 -->
<template>
  <div id="forget">
    <div class="forgetHead">
      <img src="../../assets/images/login/logo.png" alt />
    </div>
    <div class="forget-box">
      <h1>安全验证</h1>
      <el-tabs v-model="activeName">
        <el-tab-pane disabled label="01/填写手机号码" name="1">
          <el-form
            class="mr0auto forget-form"
            :rules="mobileRules"
            hide-required-asterisk
            ref="form1"
            label-position="top"
            label-width="80px"
            :model="mobile"
          >
            <el-form-item label="手机号码" prop="mobile">
              <el-input placeholder="请输入手机号码" maxlength="11" clearable v-model="mobile.mobile"></el-input>
            </el-form-item>

            <el-form-item class="btn">
              <el-button size="medium" type="primary" @click="nextStep(2)">下一步</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane disabled label="02/验证信息" name="2">
          <el-form
            class="mr0auto forget-form"
            hide-required-asterisk
            :rules="codeRules"
            label-position="top"
            label-width="80px"
            ref="code"
            :model="code"
          >
            <el-form-item label="验证码" prop="code">
              <el-input placeholder="请输入短信验证码" maxlength="6" v-model="code.code"></el-input>
              <!-- <a class="get-code" v-show="!timeShow" @click="sendcode">获取验证码</a>
              <a class="get-code countdown" v-show="timeShow">{{ time }} 秒</a>-->
              <countDown
                :className="'get-code'"
                :downClass="'countdown'"
                :countParams="countParams"
              ></countDown>
            </el-form-item>
            <el-form-item class="btn">
              <el-button size="medium" type="primary" @click="nextStep(3)">下一步</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane disabled label="03/重置密码" name="3">
          <el-form
            class="mr0auto forget-form"
            label-position="top"
            hide-required-asterisk
            label-width="80px"
            :rules="pwdRules"
            ref="pwdForm"
            :model="pwdForm"
          >
            <el-form-item label="新密码" prop="password">
              <el-input
                placeholder="请输入新密码"
                @click.native="changeEye(0,$event)"
                :suffix-icon="isOpen ? 'iconfont icon-faxian-yanjing' : 'iconfont icon-guanbi-yanjing'"
                :type="isOpen ? 'text' : 'password'"
                v-model="pwdForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item label="重复新密码" prop="confirmPwd">
              <el-input
                placeholder="请重复输入新密码"
                @click.native="changeEye(1,$event)"
                :suffix-icon="isOpen1 ? 'iconfont icon-faxian-yanjing' : 'iconfont icon-guanbi-yanjing'"
                :type="isOpen1 ? 'text' : 'password'"
                v-model="pwdForm.confirmPwd"
              ></el-input>
            </el-form-item>
            <el-form-item class="btn resetBtn">
              <el-button size="medium" type="primary" @click="resetSubmit('pwdForm')">确定重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Mfooter></Mfooter>
  </div>
</template>
<script>
import Mfooter from "@/layout/model/Mfooter.vue";
import { validate } from "@/utils/validate";
import countDown from "../login/countDown/countDown.vue";
export default {
  name: "forgetPsd",
  components: {
    Mfooter,
    countDown
  },

  data() {
    var checkPwd = (rule, value, callback) => {
      if (value !== this.pwdForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var newPwd = (rule, value, callback) => {
      if (this.pwdForm.confirmPwd !== "") {
        this.$refs.pwdForm.validateField("confirmPwd"); // 再次触发某个“字段”的验证
      }
      callback();
    };
    return {
      activeName: "1",
      isOpen: false,
      isOpen1: false,
      countParams: {
        api: "SendForgetCode",
        params: {
          mobile: ""
        }
      },
      mobile: {
        mobile: ""
      },
      code: {
        code: ""
      },
      pwdForm: {
        password: "",
        confirmPwd: ""
      },
      mobileRules: {
        mobile: [
          validate.verifyRequired("手机不能为空！"),
          { validator: validate.verifyPhone, trigger: "change" }
        ]
      },
      codeRules: {
        code: [validate.verifyRequired("短信验证码不能为空！")]
      },
      pwdRules: {
        password: [
          validate.verifyRequired("请输入新密码！"),
          { validator: validate.verifyPwd, trigger: "change" },
          { validator: newPwd, trigger: "blur" }
        ],
        confirmPwd: [
          validate.verifyRequired("请再次输入新密码！"),
          { validator: checkPwd, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    changeEye(num, e) {
      if (e.target.className.includes("yanjing")) {
        if (num === 0) {
          this.isOpen = !this.isOpen;
        } else {
          this.isOpen1 = !this.isOpen1;
        }
      }
    },
    // 下一步
    nextStep(num) {
      if (num == 2) {
        this.$refs.form1.validate(valid => {
          if (valid) {
            // 验证手机号是否注册
            this.$api["CheckMobileRegistered"]({ mobile: this.mobile.mobile })
              .then(res => {
                this.activeName = `${num}`;
              })
              .catch(msg => {
                this.$showMsg(msg);
              });
          } else {
            return false;
          }
        });
      } else {
        this.$refs.code.validate(valid => {
          if (valid) {
            this.$api["CheckForgetCode"]({
              mobile: this.mobile.mobile,
              code: this.code.code
            })
              .then(res => {
                this.mobile.sms_id = res.sms_id;
                this.activeName = `${num}`;
              })
              .catch(msg => {
                this.$showMsg(msg);
              });
          } else {
            return false;
          }
        });
      }
    },
    // 重置密码
    resetSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { password, confirmPwd } = this.pwdForm;
          let forgetForm = {
            ...this.mobile,
            confirm_password: password,
            new_password: confirmPwd
          };
          this.$api["ResetPassword"](forgetForm)
            .then(res => {
              this.$showMsg("已重置，请重新登录", 3);
              setTimeout(() => {
                this.$router.push("/login");
              }, 2000);
            })
            .catch(msg => {
              this.$showMsg(msg);
            });
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    "mobile.mobile"(newVal, oldVal) {
      this.countParams.params.mobile = newVal;
    }
  }
};
</script>
<style lang="scss">
#forget {
  height: 100%;
  .forgetHead {
    padding: 50px 0 0 50px;
  }
  .forget-box {
    width: 690px;
    padding: 0 50px;
    box-shadow: 0px 5px 27px 0px rgba(111, 168, 233, 0.18);
    border-radius: 25px;
    margin: 162px auto;
    h1 {
      font-weight: bold;
      font-size: 22px;
      padding: 45px 0;
      text-align: center;
    }
    .el-tabs {
      .el-tabs__nav-wrap::after {
        height: 0;
      }
      .el-tabs__nav {
        width: 100%;
        .el-tabs__active-bar {
          height: 4px;
          background: #9bb9f7;
        }
        .el-tabs__item {
          color: #9bb9f7;
          font-size: 18px;
          color: #666;
          &#tab-2 {
            padding: 0 112px;
          }
          &.is-active {
            color: #9bb9f7;
            font-weight: bold;
          }
        }
      }
      .el-form {
        width: 390px;
        margin: 20px auto;
        .el-input__inner {
          height: 50px;
          line-height: 50px;
          border-radius: 25px;
          text-indent: 10px;

          &::placeholder {
            text-indent: 10px;
          }
        }
        .el-form-item__label {
          padding: 0;
          text-indent: 20px;
        }
        .btn {
          margin: 110px 0 40px;
          .el-form-item__content {
            text-align: center;
            .el-button {
              border-radius: 20px;
            }
          }
        }
        .resetBtn {
          margin-top: 50px;
        }
        .get-code {
          position: absolute;
          height: 20px;
          width: 121px;
          line-height: 20px;
          padding: 0 20px;
          font-size: 16px;
          color: rgba(76, 155, 223, 1);
          right: 7px;
          top: 15px;
          text-align: center;
          border-left: 1px solid #dcdfe6;
          user-select: none;
          cursor: pointer;
        }
        .countdown {
          color: #999 !important;
        }
        .el-input__suffix {
          right: 16px;
          top: 2px;
          .el-input__icon {
            font-size: 18px;
          }
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
      }
    }
  }
}
</style>
