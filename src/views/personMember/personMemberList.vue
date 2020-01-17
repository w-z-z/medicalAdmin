<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-24 09:05:51
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 18:04:30
 -->
<template>
  <div id="memberList">
    <div class="BreadcrumbBox">
      <breadcrumb></breadcrumb>
    </div>
    <div class="head-btn">
      <el-button @click="changevisible(1)"
        class="btnStyle"
        type="danger">新增个人会员</el-button>
      <!-- <el-button class="btnStyle" type="danger">导入Excel</el-button> -->
    </div>
    <div class="serchFrom">
      <!-- 搜索表单 -->
      <BDfrom @submitForm="submitForm"
        ref="serchFrom"
        :fromConfig="fromConfig"
        @resetForm="resetForm"
        :formData="apiData['apiParam']">
        <el-form-item label="会员姓名">
          <el-input v-model.trim="apiData['apiParam'].true_name"
            placeholder></el-input>
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input v-model.trim="apiData['apiParam'].mobile"
            placeholder></el-input>
        </el-form-item>
      </BDfrom>
    </div>
    <!-- 搜索结果 -->
    <div class="searchResult">
      <BDtableApi ref="staffTable"
        :tableHead="tableHead"
        :batchHandel="batchHandel"
        :apiData="apiData"></BDtableApi>
    </div>
    <BDdialog :dialogParam="dialogParam">
      <div style="padding:0 80px">
        <BDfrom @submitForm="changeUser"
          :fromConfig="accountFrom"
          ref="accountFrom"
          :formData="accountInfo">
          <el-form-item label="会员姓名"
            prop="true_name">
            <el-input maxlength="20"
              v-model.trim="accountInfo.true_name"
              placeholder="会员姓名"></el-input>
          </el-form-item>
          <el-form-item prop="mobile"
            label="登录账号">
            <el-input :disabled="accountInfoType==2"
              maxlength="11"
              v-model.trim="accountInfo.mobile"
              placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password"
            v-if="accountInfoType == 1"
            label="初始密码">
            <el-input :disabled="accountInfoType==2"
              v-model.trim="accountInfo.password"
              placeholder="初始密码"></el-input>
          </el-form-item>
          <el-form-item prop="account_status"
            label="账号状态">
            <el-select v-model.trim="accountInfo.account_status"
              placeholder="账号状态">
              <el-option v-for="(item,index) in personMember.accountStatus"
                :key="index"
                :label="item"
                :value="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="account_attr"
            label="账号属性">
            <el-select placeholder="账号属性"
              v-model.trim="accountInfo.account_attr">
              <el-option v-for="(item,index) in personMember.accountAttr"
                :key="index"
                :label="item"
                :value="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="channel"
            label="会员来源">
            <el-select placeholder="会员来源"
              v-model.trim="accountInfo.channel">
              <el-option v-for="(item,index) in personMember.accountfrom"
                :key="index"
                :label="item"
                :value="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注"
            prop="remarks">
            <el-input type="textarea"
              v-model.trim="accountInfo.remarks"></el-input>
          </el-form-item>
        </BDfrom>
      </div>
    </BDdialog>
  </div>
</template>

<script>
import BDtableApi from "@/components/BD_table/api_table";
import BDfrom from "@/components/BD_from/index";
import BDdialog from "@/components/BD_dialog/index";
import { personMember } from "@/utils/selectData";
import { validate } from "@/utils/validate";
export default {
  name: "home",
  components: {
    BDtableApi,
    BDfrom,
    BDdialog
  },
  data() {
    let that = this;
    return {
      isClick: true,
      batchHandel: [
        {
          label: "启用",
          type: "warning",
          onClick: (item, selectData) => {
            this.changeUserStatus(selectData, 1);
          }
        },
        {
          label: "禁用",
          type: "info",
          onClick: (item, selectData) => {
            this.changeUserStatus(selectData, 2);
          }
        }
      ],
      accountInfo: {
        account_attr: "",
        account_status: "",
        channel: "",
        mobile: "",
        password: "",
        remarks: "",
        true_name: ""
      },
      accountInfoType: "1",
      accountFrom: {
        // 表单验证规则
        ref: "accountFrom",
        coustomClass: "submitInfoFrom",
        labelPosition: "top",
        okBtn: {
          label: "确定新增",
          type: "danger",
          class: "btnStyle"
        },
        noBtn: { label: "重 置", show: false },
        rules: {}
      },
      // 编辑个人会员
      dialogParam: {
        beforeClose: done => {
          this.$refs.accountFrom.resetForm();
          done();
        },
        title: "新增个人会员",
        width: "594px",
        visible: false,
        lockScroll: true,
        // destroyOnClose: true,
        okBtn: {
          show: false
        },
        noBtn: {
          show: false
        }
      },
      loading: false,
      childchecked: true,
      // 表单基础参数
      fromConfig: {
        // 表单验证规则
        inline: true,
        ref: "ruleForm",
        size: "small",
        okBtn: {
          label: "查询",
          type: "danger"
        },
        noBtn: { label: "重 置", show: true }
      },
      tableHead: [
        {
          type: "selection",
          width: "60px",
          selectable: (row, index) => {
            return true;
          }
        },
        {
          label: "会员姓名",
          prop: "true_name"
        },
        {
          label: "登录账号",
          prop: "mobile"
        },
        {
          label: "账号状态",
          sortBy: "account_status",
          sortable: true,
          formatter: (row, column, cellValue, index) => {
            return (
              <span
                class={row.account_status == 2 ? "closeStatus" : "openStatus"}
              >
                {personMember.accountStatus[row.account_status]}
              </span>
            );
          }
        },
        {
          label: "账号属性",
          sortBy: "account_attr",
          sortable: true,
          formatter: (row, column, cellValue, index) => {
            return <span> {personMember.accountAttr[row.account_attr]} </span>;
          }
        },
        {
          label: "健康档案(份)",
          prop: "record_num"
        },
        {
          label: "知情同意书(份)",
          prop: "consent_num"
        },
        {
          label: "检测项目(份)",
          prop: "check_num"
        },
        {
          label: "样本登记(次)",
          prop: "sample_num"
        },
        {
          label: "渠道来源",
          sortBy: "channel",
          sortable: true,
          formatter: (row, column, cellValue, index) => {
            return <span> {personMember.accountfrom[row.channel]} </span>;
          }
        },
        {
          label: "备注",
          prop: "remarks",
          className: "remark"
        },
        {
          label: "操作",
          type: "btn",
          width: "110px",
          btns: [{ label: "编辑" }, { label: "列表" }],
          btnClick: (btn, rown, index) => {
            if (btn.label == "编辑") {
              let obj = Object.assign({}, rown);
              this.changevisible(2, obj);
            } else {
              // this.$store.commit("", "1");
              this.$store.commit("ACTIVE_USERDETAIL", rown);
              this.$router.push({
                name: "healthReport"
              });
            }
          }
        }
      ],
      personMember,
      apiData: {
        apiName: "GetPersonUserList",
        isShow: false,
        apiParam: {
          true_name: "",
          page_no: 1,
          page_size: 10,
          mobile: ""
        }
      }
    };
  },
  watch: {
    accountInfoType(value) {
      if (value == 1) {
        this.dialogParam.title = "新增个人会员";
        this.accountFrom.okBtn.label = "确定新增";
        this.accountFrom.rules = {
          true_name: "",
          true_name: [
            validate.verifyRequired("请输入姓名"),
            { validator: validate.verifyChinsesName, trigger: "submit" }
          ],
          mobile: [
            validate.verifyRequired("请输入手机号"),
            { validator: validate.verifyPhone, trigger: "submit" }
          ],
          password: [
            { required: true, message: "请填写密码", trigger: "submit" },
            { validator: validate.verifyPwd, trigger: "submit" }
          ],
          account_status: [
            { required: true, message: "账号状态", trigger: "submit" }
          ],
          account_attr: [
            { required: true, message: "账号属性", trigger: "submit" }
          ],
          channel: [{ required: true, message: "渠道来源", trigger: "submit" }]
        };
      } else {
        this.dialogParam.title = "编辑个人会员";
        this.accountFrom.okBtn.label = "确定编辑";
        this.accountFrom.rules = {
          true_name: "",
          true_name: [
            validate.verifyRequired("请输入姓名"),
            { validator: validate.verifyChinsesName, trigger: "submit" }
          ],
          account_status: [
            { required: true, message: "账号状态", trigger: "submit" }
          ],
          account_attr: [
            { required: true, message: "账号属性", trigger: "submit" }
          ],
          channel: [{ required: true, message: "渠道来源", trigger: "submit" }]
        };
      }
    }
  },
  methods: {
    // 确定回调事件
    submitForm(formName) {
      this.$refs.staffTable.refresh(1);
    },
    //提交表单
    changeUser(formName) {
      let apiUrl =
        this.accountInfoType == 1 ? "CreatePersonUser" : "UpdatePersonUser";
      let obj = Object.assign({}, this.accountInfo);
      obj.account_attr = Number(obj.account_attr);
      obj.account_status = Number(obj.account_status);
      obj.channel = Number(obj.channel);
      if (this.isClick) {
        this.isClick = false;
        this.$api[apiUrl](obj)
          .then(res => {
            this.$showMsg("操作成功!", 3);
            this.$refs.staffTable.refresh(1);
            this.clearAll();
            this.isClick = true;
          })
          .catch(err => {
            this.$showMsg(err);
            this.isClick = true;
          });
      }
    },
    //清除样式
    clearAll() {
      this.$refs.accountFrom.resetForm();
      this.dialogParam.visible = false;
    },
    //批量改变状态
    changeUserStatus(array, type) {
      let checkData = array.map(item => item.person_user_id);
      if (checkData.length == 0) {
        return false;
      }
      let params = {
        account_status: type,
        person_user_ids: checkData
      };
      this.$api["UpdateAccountStatus"](params)
        .then(res => {
          this.$showMsg("操作成功!", 3);
          this.$refs.staffTable.refresh(1);
        })
        .catch(err => {
          this.$showMsg(err);
        });
    },
    //更改弹窗
    changevisible(type, obj) {
      this.accountInfoType = type;
      if (type == 1) {
        this.accountInfo = {
          account_attr: "",
          account_status: "",
          channel: "",
          mobile: "",
          password: "",
          remarks: "",
          true_name: ""
        };
      } else {
        obj.account_attr = obj.account_attr.toString();
        obj.account_status = obj.account_status.toString();
        obj.channel = obj.channel.toString();
        this.accountInfo = obj;
      }
      this.dialogParam.visible = true;
    },
    resetForm(formName) {
      this.apiData.apiParam = {
        page_no: 1,
        page_size: 10,
        // person_user_id: this.getActiveUser.person_user_id,
        true_name: "",
        mobile: ""
      };
      this.$refs.staffTable.refresh(1);
    }
  },
  created() {}
};
</script>

<style lang='less'>
#memberList {
  .remark {
    .cell {
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
    }
  }
  td {
    padding: 8px 0;
  }
}
</style>