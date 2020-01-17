<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2020-01-05 12:39:40
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-08 16:16:11
 -->
<template>
  <div class="commonNews">
    <BDfrom
      @submitForm="submitForm"
      ref="NewsFrom"
      @resetForm="resetForm"
      :fromConfig="fromConfig"
      :formData="apiData['apiParam']"
    >
      <el-row>
        <el-col :span="8" class="basic-left">
          <el-form-item label="消息标题" class="title" prop="notice_name">
            <el-input type="textarea" v-model.trim="apiData['apiParam'].notice_name"></el-input>
          </el-form-item>
          <el-form-item class="onLine" label="发布时间" prop="publish">
            <el-radio-group v-model.trim="apiData['apiParam'].publish">
              <el-radio :label="1">立即发布</el-radio>
              <el-radio :label="2">定时发布</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="apiData.apiParam.publish === 2"
            class="onLine releaseTime"
            prop="release_time"
          >
            <el-date-picker
              v-model.trim="apiData['apiParam'].release_time"
              type="datetime"
              value-format="timestamp"
              placeholder="请选择发布时间"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="消息内容" prop="content">
            <BD-editor
              ref="editor"
              v-model.trim="apiData['apiParam'].content"
              :initOption="initOption"
              :disabled="disabled"
              @onClick="onClick"
            ></BD-editor>
          </el-form-item>
        </el-col>
      </el-row>
    </BDfrom>
  </div>
</template>

<script>
import BDfrom from "@/components/BD_from/index";
import BDEditor from "@/components/BD_editor/index";
import { validate } from "@/utils/validate";
export default {
  components: { BDfrom, BDEditor },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      // 富文本
      disabled: false, //是否禁用
      //自定义的属性
      initOption: {
        //图片上传的配置 这部分属于自定义的数据官网并没有这部分属性
        uploadImg: {
          baseURL: "http://192.168.100.163/newcpcommon/", //上传的路径
          controller: "upload/formData", //控制器名称
          uploadParams: file => {
            // console.log(file);
            return signatureImgFn(file);
          }, //自定一额外参数
          timeout: 50000, //超时
          headers: { "Content-Type": "application/json; charset=UTF-8" }, //头部信息,
          methods: "post",
          //成功的回调
          success: (res, succ, fail) => {
            let resq = res.data;
            if (resq.res_code == 0) {
              fail(resq.res_msg); //失败的提示信息
            } else {
              succ(resq.data.url); //必须要这一步才能成功选择
            }
          }
        }
      },
      // 表单基础参数
      fromConfig: {
        // 表单验证规则
        rules: {
          notice_name: [
            { required: true, message: "消息标题不能为空！", trigger: "blur" }
          ],
          publish: [
            { required: true, message: "请选择发送时间！", trigger: "blur" }
          ],
          content: [
            { required: true, message: "内容不能为空！", trigger: "blur" }
          ]
          // release_time: [
          //   { required: true, message: "内容不能为空！", trigger: "blur" }
          // ]
        },
        inline: false,
        ref: "NewsFrom",
        width: "100px",
        okBtn: {
          label: "保存",
          type: "danger",
          class: "btnStyle"
        },
        noBtn: { label: "取消", show: true, type: "primary", class: "btnStyle" }
      },
      apiData: {
        apiName: "CreateNotice",
        apiParam: {
          module: "",
          notice_name: "",
          publish: 1,
          release_time: "",
          content: "",
          notice_type_id: 1
        }
      }
    };
  },
  methods: {
    // 确定回调事件
    submitForm(formName) {
      let { apiName, apiParam } = this.apiData;
      let params = Object.assign({}, apiParam);
      params.module = Number(params.module);
      params.release_time = Number(params.release_time) / 1000;
      this.$api[apiName](params)
        .then(res => {
          let text = this.$route.path.includes("addMessage")
            ? "新增成功！"
            : "编辑成功！";
          this.$showMsg(text, 3);
          let activeName = params.module === 1 ? "1" : "2";
          setTimeout(() => {
            this.$router.push({
              path: "/newsCenter/notice",
              query: {
                activeName
              }
            });
          }, 2000);
        })
        .catch(msg => {
          this.$showMsg(msg);
        });
    },
    resetForm(formName) {},
    // 富文本编辑器
    // 鼠标单击的事件
    onClick(e, editor) {},
    // 查询详情
    getNewsDetail(id) {
      this.$api["GetNoticeDetail"]({
        notice_id: id
      })
        .then(res => {
          res.release_time = res.release_time * 1000;
          this.apiData.apiParam = res;
        })
        .catch(msg => {
          this.$showMsg(msg);
        });
    }
  },
  created() {
    if (this.$route.path.includes("addMessage")) {
      this.apiData.apiParam.module = this.$route.query.module;
      this.apiData.apiName = "CreateNotice";
    } else {
      this.apiData.apiParam.notice_id = BigInt(this.$route.params.id);
      this.getNewsDetail(BigInt(this.$route.params.id));
      this.apiData.apiName = "UpdateNotice";
    }
  },
  watch: {
    "apiData.apiParam.publish"(newVal, oldVal) {
      if (newVal === 1) {
        this.apiData.apiParam.release_time = "";
      } else {
        this.fromConfig.rules.release_time = [
          { required: true, message: "时间不能为空！", trigger: "change" }
        ];
      }
    }
  }
};
</script>

<style lang="scss">
.commonNews {
  .el-form {
    & > .el-form-item {
      margin-top: 50px;
      .el-form-item__content {
        text-align: center;
        margin-left: 0 !important;
      }
    }
  }
  .basic-left {
    .title {
      .el-textarea,
      .el-input {
        width: 90%;
      }

      .el-form-item__content .el-textarea__inner {
        border-radius: 10px;
      }
    }
    .onLine {
      display: inline-block;
      &.releaseTime {
        .el-form-item__content {
          margin-left: 20px !important;
        }
      }
    }
  }
}
</style>