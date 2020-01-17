<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-24 19:10:00
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 20:03:14
 -->
<template>
  <personDetailLayOut>
    <div class="healthRecord">
      <div class="tabelBtn">
        <el-button class="btnStyle"
          @click="changevisible(1)"
          type="danger">新增知情同意书</el-button>
      </div>
      <div class="serchFrom">
        <!-- //关联表头数据 -->
        <BDfrom @submitForm="submitForm"
          ref="serchFrom"
          @resetForm="resetForm"
          :fromConfig="fromConfig"
          :formData="apiData['apiParam']">
          <el-form-item label="同意书编号">
            <el-input v-model.trim="apiData['apiParam'].number"
              placeholder="同意书编号"></el-input>
          </el-form-item>
          <el-form-item label="检测项目">
            <el-select placeholder="检测项目"
              v-model.trim="apiData['apiParam'].product_id">
              <el-option v-for="(item,index) in getProductList"
                :key="index"
                :label="item"
                :value="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传状态">
            <el-select placeholder="上传状态"
              v-model="apiData['apiParam'].upload_status">
              <el-option v-for="(item,index) in personMember.uploadStatus"
                :key="index"
                :label="item"
                :value="index"></el-option>
            </el-select>
          </el-form-item>
        </BDfrom>
      </div>

      <!-- 搜索结果 -->
      <div class="searchResult">
        <BDtableApi ref="staffTable"
          :batchHandel="batchHandel"
          :tableHead="tableHead"
          :apiData="apiData"></BDtableApi>
      </div>
      <!-- 弹窗--详情 -->
      <BDdialog :dialogParam="dialogParam">
        <div class="recorde">
          <img :src="fileUrl"
            alt />
        </div>
      </BDdialog>
      <!-- 弹窗--新增/编辑 -->
      <BDdialog :dialogParam="dialogParamAdd">
        <div style="padding:0 80px">
          <BDfrom @submitForm="changeUser"
            :fromConfig="recordFrom"
            ref="recordFrom"
            :formData="recordInfo">
            <el-form-item label="同意书编号"
              prop="number">
              <el-input maxlength="50"
                v-model.trim="recordInfo.number"
                placeholder="同意书编号"></el-input>
            </el-form-item>
            <!-- :picker-options="pickerDisabled" -->
            <el-form-item prop="sign_time"
              label="签订日期">
              <el-date-picker v-model="recordInfo.sign_time"
                type="date"
                value-format="timestamp"
                placeholder="请选择签订日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="检测项目"
              prop="product_id">
              <el-select placeholder="检测项目"
                v-model.trim="recordInfo.product_id">
                <el-option v-for="(item,index) in getProductList"
                  :key="index"
                  :label="item"
                  :value="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="upload_file"
              label="上传同意书">
              <uploadImg :accpetType="accpetType"
                @getUploadimg="getUploadimg"
                :uploadFile="recordInfo.upload_file"
                customClass="uploadFilesInformedConsent"></uploadImg>
              <span>&nbsp; &nbsp; &nbsp; 支持png,jpg,jpeg,bmp格式文档</span>
            </el-form-item>
          </BDfrom>
        </div>
      </BDdialog>
    </div>
  </personDetailLayOut>

</template>
<script>
import BDtableApi from "@/components/BD_table/api_table";
import BDfrom from "@/components/BD_from/index";
import BDdialog from "@/components/BD_dialog/index";
import selectData from "@/utils/selectData.js";
import uploadImg from "@/components/uploadFile/uploadImg";
import personDetailLayOut from "../personDetailLayOut";
import { mapGetters } from "vuex";
import { validate } from "@/utils/validate";
import { personMember } from "@/utils/selectData.js";
export default {
  name: "InformedConsent",
  components: { BDtableApi, BDfrom, BDdialog, uploadImg, personDetailLayOut },
  data() {
    return {
      personMember,
      isclick: true,
      loading: false,
      childchecked: true,
      pickerDisabled: {
        disabledDate: time => {
          return time.getTime() > new Date().getTime();
        }
      },
      accpetType: ["jpg", "png", "jpeg", "bmp"],
      batchHandel: [
        {
          label: "删除",
          type: "info",
          onClick: (item, selectData) => {
            this.delRecord(selectData);
          }
        }
      ],
      recordInfo: {
        number: "",
        product_id: "",
        sign_time: "",
        upload_file: {
          file_url: "",
          file_type: ""
        }
      },
      recordFrom: {
        // 表单验证规则
        ref: "recordFrom",
        labelPosition: "top",
        coustomClass: "submitInfoFrom",
        okBtn: {
          label: "确定新增",
          type: "danger",
          class: "btnStyle"
        },
        noBtn: { label: "重 置", show: false },
        rules: {
          number: [
            { required: true, message: "请输入档案编号", trigger: "submit" }
          ],
          product_id: [
            { required: true, message: "请选择产品", trigger: "submit" }
          ],
          sign_time: [
            { required: true, message: "请选择签订日期", trigger: "submit" }
          ],
          upload_file: [
            { required: true, message: "选择上传文件", trigger: "submit" }
          ]
        }
      },
      fromConfig: {
        // 表单验证规则
        inline: true,
        ref: "ruleForm",
        size: "small",
        okBtn: {
          label: "查 询",
          type: "danger"
        },
        noBtn: { label: "重 置", show: true }
      },
      fileUrl: "",
      tableHead: [
        {
          type: "selection",
          width: "60px",
          selectable: (row, index) => {
            return true;
          }
        },
        {
          label: "同意书编号",
          prop: "number"
        },
        {
          label: "检测项目",
          prop: "product_name"
        },
        {
          label: "签订日期",
          formatter: (row, column, cellValue, index) => {
            return <span>{this.$formatTime(row.sign_time * 1000)}</span>;
          }
        },
        {
          label: "上传状态",
          formatter: (row, column, cellValue, index) => {
            let { upload_time } = row;
            let status = upload_time ? "已上传" : "未上传";
            return <span>{status}</span>;
          }
        },
        {
          label: "上传日期",
          formatter: (row, column, cellValue, index) => {
            let { upload_time } = row;
            let str = upload_time
              ? this.$formatTime(row.upload_time * 1000)
              : "--";
            return <span>{str}</span>;
          }
        },
        {
          label: "操作",
          type: "btn",
          width: "120px",
          btns: [{ label: "编辑" }, { label: "查看" }],
          btnClick: (btn, rown, index) => {
            if (btn.label == "查看") {
              if (rown.upload_status == 2) {
                this.$showMsg("还未上传报告书");
              } else {
                this.fileUrl = rown.upload_file;
                this.dialogParam.visible = true;
              }
            } else {
              this.changevisible(2, rown);
            }
          }
        }
      ],
      apiData: {
        apiName: "GetConsentFormList",
        timeParamsKey: "create_time",
        apiParam: {
          page_no: 1,
          page_size: 10,
          product_id: "",
          number: "",
          sign_time: "",
          upload_status: "",
          person_user_id: ""
        }
      },
      dialogParam: {
        title: "查看知情同意书",
        top: "2%",
        center: true,
        width: "594px",
        visible: false,
        lockScroll: true,
        okBtn: {
          show: false
        },
        noBtn: {
          show: false
        }
      },
      recordType: 1,
      dialogParamAdd: {
        title: "新增知情同意书",
        top: "2%",
        center: true,
        width: "594px",
        visible: false,
        lockScroll: true,
        okBtn: {
          show: false
        },
        noBtn: {
          show: false
        },
        beforeClose: done => {
          this.$refs.recordFrom.resetForm();
          done();
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getActiveUser", "getProductList"])
  },
  watch: {
    recordType(value) {
      if (this.recordType == 1) {
        this.dialogParamAdd.title = "新增知情同意书";
        this.recordFrom.okBtn.label = "确定新增";
      } else {
        this.dialogParamAdd.title = "编辑知情同意书";
        this.recordFrom.okBtn.label = "保存修改";
      }
    }
  },
  methods: {
    //上传文件的回调
    getUploadimg(file) {
      this.recordInfo.upload_file = file;
    },
    //删除
    delRecord(data) {
      let checkData = data.map(item => item.consent_form_id);
      if (checkData.length == 0) {
        return false;
      }
      let params = {
        consent_form_ids: checkData
      };
      this.$api["DeleteConsentForm"](params)
        .then(res => {
          this.$showMsg("删除成功!", 3);
          this.$store.dispatch("changeTotalData");
          this.$refs.staffTable.refresh(1);
        })
        .catch(err => {
          this.$showMsg("获取数据失败!");
        });
    },
    //确定回调事件
    resetForm(formName) {
      this.apiData.apiParam = {
        page_no: 1,
        page_size: 10,
        product_id: "",
        number: "",
        // sign_time: "",
        upload_status: "",
        person_user_id: this.getActiveUser.person_user_id
      };
      this.$refs.staffTable.refresh(1);
    },
    //编辑/新增
    changeUser(formName) {
      let apiUrl =
        this.recordType == 1 ? "CreateConsentForm" : "UpdateConsentForm";
      this.recordInfo.person_user_id = this.apiData.apiParam.person_user_id;
      let New_obj = Object.assign({}, this.recordInfo);
      New_obj.sign_time = New_obj.sign_time / 1000;
      let { file_url, file_type } = New_obj.upload_file;
      New_obj.upload_file = file_url;
      New_obj.file_type = file_type;
      if (this.isclick) {
        this.isclick = false;
        this.$api[apiUrl](New_obj)
          .then(res => {
            this.$showMsg("操作成功");
            this.isclick = true;
            this.$refs.staffTable.refresh(1);
            this.$store.dispatch("changeTotalData");
            this.dialogParamAdd.visible = false;
          })
          .catch(err => {
            this.$showMsg(err);
            this.isclick = true;
          });
      }
    },
    // 确定回调事件
    submitForm(formName) {
      this.$refs.staffTable.refresh(1);
    },
    //更改弹窗
    changevisible(type, obj) {
      this.recordType = type;
      if (type == 1) {
        this.recordInfo = {
          number: "",
          product_id: "",
          // sign_time: "",
          upload_file: {
            file_url: "",
            file_type: ""
          }
        };
      } else {
        let newObj = this._.cloneDeep(obj);
        newObj.sign_time = newObj.sign_time * 1000;
        let files = newObj.upload_file;
        newObj.upload_file = {
          file_url: files,
          file_type: newObj.file_type
        };
        this.recordInfo = newObj;
      }
      this.dialogParamAdd.visible = true;
    }
  },
  created() {
    this.apiData.apiParam.person_user_id = this.getActiveUser.person_user_id;
  }
};
</script>
<style lang="scss" scoped>
.recorde {
  img {
    width: 100%;
  }
}
.uploadFilesInformedConsent {
  border-radius: 0;
}
</style>
