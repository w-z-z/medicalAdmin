<!--
 * @Description: 网站信息编辑
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-31 11:41:40
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-15 10:36:15
 -->
<template>
  <div v-loading="loading"
    class="editInfo">
    <div class="BreadcrumbBox">
      <breadcrumb></breadcrumb>
    </div>
    <div class="title">
      <p>编辑 - {{$route.params.name}}</p>
    </div>
    <div class="info">
      <el-form ref="editForm"
        :model="editForm"
        :rules="editFormRules"
        label-width="80px">
        <el-form-item prop="value">
          <BD-editor ref="editor"
            v-model="editForm.value"
            :initOption="initOption"
            :disabled="disabled"
            @onClick="onClick"></BD-editor>
        </el-form-item>
        <el-form-item class="websetBtn">
          <br />
          <el-button type="danger"
            class="btnStyle"
            @click="onSubmit('editForm')">保存</el-button>
          <el-button type="primary"
            @click="resetForm('editForm')"
            class="btnStyle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import BDEditor from "@/components/BD_editor/index";
import { signatureImgFn } from "@/api/net/http.js";
import { validate } from "@/utils/validate";
export default {
  name: "editInfo",
  data() {
    return {
      loading: false,
      editForm: {
        value: "" //绑定的值
      },
      editFormRules: {
        value: [validate.verifyRequired("内容不能为空！")]
      },
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
      }
    };
  },
  components: { BDEditor },
  methods: {
    // 鼠标单击的事件
    onClick(e, editor) {},
    // 清空内容
    clear() {
      this.$refs.editor.clear();
    },
    getContent() {
      alert(this.value);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editInfo(this.$route.params.name);
        } else {
          return false;
        }
      });
    },
    editInfo(item_name) {
      this.loading = true;
      this.$api["UpdateWebSite"]({
        item_name: item_name,
        content: this.editForm.value
      })
        .then(res => {
          this.$showMsg(res);
          this.loading = false;
          this.$router.push({
            name: "websetIndex"
          });
        })
        .catch(err => {
          this.loading = false;
          this.$showMsg(err);
        });
    },
    getInfo(item_name) {
      this.loading = true;
      this.$api["GetWebSiteDetail"]({
        item_name: item_name
      })
        .then(res => {
          this.editForm.value = res.content;
          this.loading = false;
        })
        .catch(err => {
          this.$showMsg(err);
          this.loading = false;
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.getInfo(this.$route.params.name);
  }
};
</script>
<style lang='less'>
.editInfo {
  .title {
    text-align: center;
    color: #6fa8e9;
    font-size: 16px;
    font-weight: 400;
  }
  .info {
    margin: 30px auto;
    .websetBtn {
      text-align: center;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
