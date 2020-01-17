<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-24 19:10:00
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-15 15:35:53
 -->
<template>
  <personDetailLayOut>
    <div class="healthRecord">
      <div class="tabelBtn">
        <el-button class="btnStyle"
          type="danger"
          @click="changevisible(1)">新增登记</el-button>
      </div>
      <div class="serchFrom">
        <!-- //关联表头数据 -->
        <BDfrom @submitForm="submitForm"
          ref="serchFrom"
          @resetForm="resetForm"
          :fromConfig="fromConfig"
          :formData="apiData['apiParam']">
          <el-form-item label="检测项目">
            <el-select placeholder="检测项目"
              v-model.trim="apiData['apiParam'].product_id">
              <el-option v-for="(item,index) in getProductList"
                :key="index"
                :label="item"
                :value="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采样日期">
            <el-date-picker v-model="otherParams.time"
              type="datetimerange"
              range-separator="至"
              value-format="timestamp"
              start-placeholder="开始日期"
              end-placeholder="结束日期"></el-date-picker>
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
      <!-- 弹窗--新增/编辑 -->
      <BDdialog :dialogParam="dialogParamAdd">
        <BDfrom @submitForm="changeRecord"
          :fromConfig="recordFromConfig"
          ref="recordFrom"
          :formData="recordFrom">
          <div class="step1">
            <div v-for="(item,index) in stepOne"
              :key="index">
              <div v-if="item.type=='input'||item.type=='textarea'">
                <el-form-item :label="item.label"
                  :prop="item.valueKey">
                  <el-input :type="item.type"
                    :maxlength="item.maxLength"
                    :placeholder="'请输入'+item.label"
                    v-model.trim="recordFrom[item.valueKey]"></el-input>
                </el-form-item>
              </div>
              <!--  :picker-options="pickerDisabled" -->
              <div v-if="item.type=='date'">
                <el-form-item :label="item.label"
                  :prop="item.valueKey">
                  <el-date-picker v-model="recordFrom[item.valueKey]"
                    type="date"
                    value-format="timestamp"
                    :placeholder="'请选择'+item.label"></el-date-picker>
                </el-form-item>
              </div>
              <div v-if="item.type=='select'">
                <el-form-item :label="item.label"
                  :prop="item.valueKey">
                  <el-select v-model="recordFrom[item.valueKey]"
                    :placeholder="'请选择'+item.label">
                    <el-option v-for="(item,index) in item.options"
                      :key="index"
                      :label="item"
                      :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
        </BDfrom>
      </BDdialog>
      <!-- 弹窗--详情 -->
      <BDdialog :dialogParam="dialogParam">
        <div class="recorde">
          <div class="baseInfo">
            <div v-for="(item,index) in currentRecord.base"
              :key="index"
              class="infoItem">
              <div class="infoLabel">{{item.label}}：</div>
              <div class="infoContent">
                <p v-if="item.value">{{item.value}}</p>
                <p v-else
                  style="color:#eeeeee">未填写</p>
              </div>
            </div>
          </div>
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
import { personMember } from "@/utils/selectData.js";
import { validate } from "@/utils/validate";
import { mapGetters } from "vuex";
import personDetailLayOut from "../personDetailLayOut";
export default {
  name: "GeneTestReport",
  components: { BDtableApi, BDfrom, BDdialog, personDetailLayOut },
  data() {
    let that = this;
    return {
      personMember,
      isclick: true,
      loading: false,
      childchecked: true,
      // 表单基础参数
      batchHandel: [
        {
          label: "删除",
          type: "info",
          onClick: (item, selectData) => {
            this.delRecord(selectData);
          }
        }
      ],
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
      tableHead: [
        {
          type: "selection",
          width: "60px",
          selectable: (row, index) => {
            return true;
          }
        },
        {
          label: "检测项目",
          prop: "product_name"
        },

        {
          label: "采样日期",
          formatter: (row, column, cellValue, index) => {
            let time =
              row.check_time === 0
                ? "--"
                : this.$formatTime(row.check_time * 1000);
            return <span>{time}</span>;
          }
        },
        {
          label: "操作",
          type: "btn",
          width: "120px",
          btns: [{ label: "编辑" }, { label: "查看" }],
          btnClick: (btn, rown, index) => {
            if (btn.label == "编辑") {
              this.changevisible(2, rown);
            } else {
              this.changevisible(3, rown);
            }
          }
        }
      ],
      stepOne: [
        {
          label: "检测项目",
          valueKey: "product_id",
          type: "select",
          maxLength: "20",
          options: this.$store.getters.getProductList
        },

        {
          label: "储存到期时间",
          valueKey: "expire_time",
          type: "date",
          maxLength: "20"
        },
        {
          label: "知情同意书编码",
          valueKey: "consent_form_number",
          type: "input",
          maxLength: "50"
        },
        {
          label: "合同编码",
          valueKey: "number",
          type: "input",
          maxLength: "200"
        },

        {
          label: "样本条形码",
          valueKey: "bar_code",
          type: "input",
          maxLength: "100"
        },
        {
          label: "样本类型",
          valueKey: "sample_type",
          type: "select",
          maxLength: "20",
          options: personMember.sampleSource
        },
        {
          label: "年限",
          valueKey: "year",
          type: "input",
          maxLength: "20"
        },
        {
          label: "样本来源",
          valueKey: "sample_sources",
          type: "input",
          maxLength: "200"
        },
        {
          label: "采样日期",
          valueKey: "check_time",
          type: "date",
          maxLength: "20"
        },
        {
          label: "收样日期",
          valueKey: "check_end_time",
          type: "date",
          maxLength: "20"
        },
        {
          label: "储存检测日期",
          valueKey: "preview_time",
          type: "date",
          maxLength: "20"
        },
        {
          label: "储存预检情况",
          valueKey: "preview_situation",
          type: "input",
          maxLength: "200"
        },
        {
          label: "不合格样本处理办法",
          valueKey: "sample_method",
          type: "input",
          maxLength: "20"
        },
        // {
        //   label: "储存",
        //   valueKey: "height",
        //   type: "input",
        //   maxLength: "20"
        // },
        {
          label: "储存预检报告出具情况说明",
          valueKey: "preview_end_situation",
          type: "input",
          maxLength: "200"
        },
        {
          label: "正式储存时间",
          valueKey: "storage_time",
          type: "date",
          maxLength: "11"
        },
        {
          label: "储存合同与储存证书发放情况",
          valueKey: "certificate_situation",
          type: "select",
          maxLength: "20",
          options: personMember.sendStatus
        },
        {
          label: "存储预检报告出具时间",
          valueKey: "preview_end_time",
          type: "date",
          maxLength: "11"
        },
        {
          label: "储存合同及储存证书发放人",
          valueKey: "certificate_people",
          type: "input",
          maxLength: "20"
        },

        {
          label: "快递信息",
          valueKey: "express",
          type: "input",
          maxLength: "20"
        },

        {
          label: "检测报告时间",
          valueKey: "report_time",
          type: "date",
          maxLength: "20"
        },

        {
          label: "报告解读人",
          valueKey: "reader_people",
          type: "input",
          maxLength: "20"
        },
        {
          label: "报告解读时间",
          valueKey: "reader_time",
          type: "date",
          maxLength: "20"
        },
        {
          label: "电子邮箱",
          valueKey: "email",
          type: "input",
          maxLength: "50"
        },
        {
          label: "报告邮寄地址",
          valueKey: "address",
          type: "textarea",
          maxLength: "200"
        }
      ],
      otherParams: {
        time: []
      },
      apiData: {
        apiName: "GetSampleList",
        timeParamsKey: "create_time",
        apiParam: {
          page_no: 1,
          page_size: 10,
          product_id: ""
        },
        //上传之前的事件
        beforeGetInfo: () => {
          let { time } = this.otherParams;
          let check_start_time = Array.isArray(time) ? time[0] / 1000 : "";
          let check_end_time = Array.isArray(time) ? time[0] / 1000 : "";
          return {
            check_start_time,
            check_end_time
          };
        }
      },
      pickerDisabled: {
        disabledDate: time => {
          return time.getTime() > new Date().getTime();
        }
      },
      recordFrom: {
        person_user_id: "",
        address: "",
        bar_code: "",
        certificate_people: "",
        certificate_situation: "",
        check_end_time: "",
        check_time: "",
        consent_form_number: "",
        email: "",
        expire_time: "",
        express: "",
        number: "",
        person_user_id: "",
        preview_end_situation: "",
        preview_end_time: "",
        preview_situation: "",
        preview_time: "",
        product_id: "",
        reader_people: "",
        reader_time: "",
        report_time: "",
        sample_method: "",
        sample_sources: "",
        sample_type: "",
        storage_time: "",
        year: ""
      },
      recordFromConfig: {
        // 表单验证规则
        ref: "recordFrom",
        inline: true,
        labelWidth: "200px",
        coustomClass: "sampleFrom",
        okBtn: {
          label: "确定新增",
          type: "danger",
          class: "btnStyle"
        },
        noBtn: { label: "重 置", show: false },
        rules: {
          bar_code: [
            { required: true, message: "请输入条形码", trigger: "submit" }
          ],
          consent_form_number: [
            { required: true, message: "请输入同意书编号", trigger: "submit" }
          ],
          expire_time: [
            { required: true, message: "请输入到期日期", trigger: "submit" }
          ],
          number: [
            { required: true, message: "请输入合同编号", trigger: "submit" }
          ],
          product_id: [
            { required: true, message: "请选择产品", trigger: "submit" }
          ],
          // year: [{ required: true, message: "请填写年限", trigger: "submit" }],
          email: [{ validator: validate.verifyEmail, trigger: "submit" }]
        }
      },
      recordType: 1,
      dialogParamAdd: {
        title: "新增样本登记",
        top: "2%",
        center: true,
        width: "1000px",
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
      },
      dialogParam: {
        title: "查看样本登记",
        width: "1000px",
        top: "2%",
        center: true,
        visible: false,
        lockScroll: true,
        okBtn: {
          show: false
        },
        noBtn: {
          show: false
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getActiveUser", "getProductList"]),
    currentRecord() {
      let { stepOne, recordFrom } = this;
      let newData = {
        base: []
      };
      stepOne.forEach(element => {
        let obj = {
          label: element.label
        };
        if (element.type == "date") {
          obj.value = recordFrom[element.valueKey]
            ? this.$formatTime(recordFrom[element.valueKey])
            : "";
        } else if (element.type == "select") {
          obj.value = element.options[recordFrom[element.valueKey]];
        } else {
          obj.value = recordFrom[element.valueKey];
        }
        newData.base.push(obj);
      });
      return newData;
    }
  },
  watch: {
    recordType(value) {
      // console.log(this.recordType);
      if (this.recordType == 1) {
        this.dialogParamAdd.title = "新增样本登记";
        this.recordFromConfig.okBtn.label = "确定新增";
      } else {
        this.dialogParamAdd.title = "编辑样本登记";
        this.recordFromConfig.okBtn.label = "保存修改";
      }
    }
  },
  methods: {
    // 确定回调事件
    submitForm(formName) {
      this.$refs.staffTable.refresh(1);
    },
    //确定回调事件
    resetForm(formName) {
      this.apiData.apiParam = {
        page_no: 1,
        page_size: 10,
        person_user_id: this.getActiveUser.person_user_id,
        product_id: ""
      };
      this.otherParams = {
        time: ""
      };
      this.$refs.staffTable.refresh(1);
    },
    delRecord(data) {
      let checkData = data.map(item => item.sample_id);
      if (checkData.length == 0) {
        return false;
      }
      let params = {
        sample_ids: checkData
      };
      this.$api["DeleteSample"](params)
        .then(res => {
          this.$refs.staffTable.refresh(1);
          this.$showMsg("删除成功!", 3);
          this.$store.dispatch("changeTotalData");
        })
        .catch(err => {
          this.$showMsg("获取数据失败!");
        });
    },
    //更改弹窗
    changevisible(type, obj) {
      this.recordType = type;
      if (type == 1) {
        this.recordFrom = {
          person_user_id: "",
          address: "",
          bar_code: "",
          certificate_people: "",
          certificate_situation: "",
          check_end_time: "",
          check_time: "",
          consent_form_number: "",
          email: "",
          expire_time: "",
          express: "",
          number: "",
          person_user_id: "",
          preview_end_situation: "",
          preview_end_time: "",
          preview_situation: "",
          preview_time: "",
          product_id: "",
          reader_people: "",
          reader_time: "",
          report_time: "",
          sample_method: "",
          sample_sources: "",
          sample_type: "",
          storage_time: "",
          year: ""
        };
        this.dialogParamAdd.visible = true;
      } else if (type == 2) {
        this.recordFrom = this.initData(obj);
        this.dialogParamAdd.visible = true;
      } else {
        this.recordFrom = this.initData(obj);
        this.dialogParam.visible = true;
      }
    },
    //转义提交的数据
    transfromData(obj) {
      let FromData = this._.cloneDeep(obj);
      let arr = [
        "expire_time",
        "check_end_time",
        "check_time",
        "preview_end_time",
        "preview_time",
        "reader_time",
        "report_time",
        "storage_time"
      ];
      arr.map(item => {
        if (FromData[item]) {
          FromData[item] = Number(FromData[item] / 1000);
        } else {
          FromData[item] = 0;
        }
      });
      FromData.year = Number(FromData.year);
      return FromData;
    },
    //初始化获取到的数据
    initData(obj) {
      let FromData = this._.cloneDeep(obj);
      let arr = [
        "expire_time",
        "check_end_time",
        "check_time",
        "preview_end_time",
        "preview_time",
        "reader_time",
        "report_time",
        "storage_time"
      ];
      arr.map(item => {
        if (FromData[item]) {
          FromData[item] = FromData[item] * 1000;
        } else {
          FromData[item] = "";
        }
      });
      FromData.year = FromData.year.toString();
      return FromData;
    },
    //编辑/新增
    changeRecord() {
      let apiUrl = this.recordType == 1 ? "CreateSample" : "UpdateSample";
      let New_obj = this.transfromData(this.recordFrom);
      New_obj.person_user_id = this.getActiveUser.person_user_id;
      if (this.isclick) {
        this.isclick = false;
        this.$api[apiUrl](New_obj)
          .then(res => {
            this.$showMsg("操作成功", 3);
            this.isclick = true;
            this.$refs.staffTable.refresh(1);
            this.dialogParamAdd.visible = false;
            this.$store.dispatch("changeTotalData");
          })
          .catch(err => {
            this.$showMsg(err);
            this.isclick = true;
          });
      }
    }
  },
  created() {
    this.apiData.apiParam.person_user_id = this.getActiveUser.person_user_id;
  }
};
</script>
<style lang="scss" scoped>
.step1 {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-auto-rows: 60px;
  align-items: start;
  // grid-row-gap: 20px;
  grid-column-gap: 40px;
}
.recorde {
  padding: 0 30px;
  .recordeTile {
    font-size: 30px;
    text-align: center;
    color: rgba(51, 51, 51, 1);
    margin-top: -10px;
    padding-bottom: 50px;
  }
  .baseInfo {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-auto-rows: 50px;
  }
  .infoItem {
    display: flex;
    .infoLabel {
      width: 150px;
      color: rgba(102, 102, 102, 1);
      padding-right: 10px;
    }
    .infoContent {
      flex: 1;
      color: rgba(51, 51, 51, 1);
      padding-right: 95px;
      p {
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 5px;
      }
      .noData {
        color: #eeeeee;
      }
    }
  }
  .otherInfo {
    .infoLabel {
      width: 60px;
    }
    .infoContent {
      .historyRecode {
        display: inline-block;
        margin-right: 15px;
      }
    }
  }
}
</style>

