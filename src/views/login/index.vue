<template>
  <div id="login">
    <div class="bg">
      <el-footer>
        <p>&copy; 四川精准医疗科技有限责任公司</p>
      </el-footer>
    </div>
    <div class="login">
      <div class="login-box">
        <div class="logo">
          <img src="../../assets/images/login/login_top.png" alt />
        </div>
        <h1>健康管理大数据平台</h1>
        <el-form class="loginForm" ref="passwordFrom" :rules="rules" :model="passwordFrom">
          <el-form-item prop="mobile">
            <el-input placeholder="手机号码" maxlength="11" clearable v-model="passwordFrom.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              @click.native="changeEye"
              :suffix-icon="isOpen ? 'iconfont icon-faxian-yanjing' : 'iconfont icon-guanbi-yanjing'"
              :type="isOpen ? 'text' : 'password'"
              maxlength="30"
              placeholder="登录密码"
              v-model="passwordFrom.password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input placeholder="请输入短信验证码" maxlength="6" v-model="passwordFrom.code"></el-input>
            <countDown :className="'get-code'" :downClass="'countdown'" :countParams="countParams"></countDown>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="logSubmit('passwordFrom')">登 录</el-button>
          </el-form-item>
        </el-form>

        <p class="login-foot" @click="$router.push({name:'forgetPsd'})">忘记密码?</p>
      </div>
    </div>
  </div>
</template>
<script>
import { validate } from "@/utils/validate";
import countDown from "./countDown/countDown.vue";
export default {
  name: "home",
  data() {
    return {
      activeName: "1",
      isOpen: false,
      active: "0",
      loginWay: "pwd",
      countParams: {
        api: "SendLoginCode",
        params: {
          mobile: ""
        }
      },
      // 密码
      passwordFrom: {
        mobile: "",
        password: "",
        code: ""
      },
      rules: {
        mobile: [
          validate.verifyRequired("手机不能为空！"),
          { validator: validate.verifyPhone, trigger: "submit" }
        ],
        password: [
          validate.verifyRequired("密码不能为空！"),
          { validator: validate.verifyPwd, trigger: "submit" }
        ],
        code: [validate.verifyRequired("短信验证码不能为空！")]
      }
    };
  },
  components: {
    countDown
  },
  methods: {
    changeEye(e) {
      if (e.target.className.includes("yanjing")) {
        this.isOpen = !this.isOpen;
      }
    },
    // 提交登录
    logSubmit(formName) {
      let loading;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let interfaceName = "personLogin";
          let params = this.passwordFrom;
          loading = this.$loading({
            lock: false,
            text: "正在登录...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.$api["login"](params)
            .then(res => {
              let _userInfo = {
                token: res.token,
                personInfo: res
              };
              //存储store
              this.$store.dispatch("changeUserInfo", _userInfo).then(res => {
                // console.log("保存数据");
                // loading.close();
                // console.log(this.$store.state.user.userInfo.token);
                // this.$store.dispatch("userRouterType", true);
                setTimeout(() => {
                  this.$router.push({ name: "home" });
                  loading.close();
                }, 1200);
              });
            })
            .catch(msg => {
              loading.close();
              this.$showMsg(msg);
            });
        } else {
          return false;
        }
      });
    }
  },
  computed: {},
  watch: {
    "passwordFrom.mobile"(newVal, oldVal) {
      this.countParams.params.mobile = newVal;
    }
  }
};
</script>
<style lang="less">
#login {
  .bg {
    background: url("../../assets/images/login/bg_img.png") center center
      no-repeat;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
  .login {
    width: 1190px;
    height: 545px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url("../../assets/images/login/log_bg.png") no-repeat;
    .login-box {
      width: 430px;
      height: 495px;
      text-align: center;
      float: right;
      margin-right: 25px;
      margin-top: 20px;
      padding: 0 50px;
      .logo {
        padding: 30px 0 20px;
      }
      h1 {
        font-size: 24px;
        font-weight: bold;
        color: #8fb1f6;
        padding-bottom: 30px;
      }
      .loginForm {
        .el-form-item {
          margin-bottom: 32px;
          .el-input__inner {
            border-radius: 25px;
            height: 40px;
            text-indent: 10px;
            &::placeholder {
              text-indent: 10px;
            }
          }
          .el-input__suffix {
            right: 16px;
            top: 0px;
            .el-input__icon {
              font-size: 18px;
            }
          }
          .get-code {
            position: absolute;
            height: 20px;
            width: 121px;
            line-height: 20px;
            padding: 0 20px;
            color: rgba(76, 155, 223, 1);
            right: 7px;
            top: 11px;
            text-align: center;
            border-left: 1px solid #dcdfe6;
            user-select: none;
            cursor: pointer;
          }
          .countdown {
            color: #999 !important;
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
          .el-button {
            border-radius: 20px;
          }
        }
      }

      .login-foot {
        color: #999;
        text-align: right;
      }
    }
  }

  .el-footer {
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    color: #999999;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>
