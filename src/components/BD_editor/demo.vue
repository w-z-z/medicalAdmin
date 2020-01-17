<!--
 * @Author: ranli
 * @Date: 2019-09-25 16:09:18
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-15 10:41:00
 * @Description: Description
 -->
<template>
  <div>
    <BD-editor ref="editor"
      v-model="value"
      :initOption='initOption'
      :disabled="disabled"
      @onClick="onClick"></BD-editor>
    <button @click="clear">清空内容</button>
    <button @click="getContent">获取内容 </button>
    <button @click="disabled = true">禁用</button>
  </div>
</template>
<script>
//引入验签信息
import { signatureImgFn } from "@/api/net/http.js";

// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import BDEditor from "./index";
export default {
  data() {
    return {
      value: "Welcome to Use Tinymce Editor", //绑定的值
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
  components: {
    BDEditor
  },
  methods: {
    // 鼠标单击的事件
    onClick(e, editor) {},
    // 清空内容
    clear() {
      this.$refs.editor.clear();
    },
    getContent() {
      alert(this.value);
    }
  }
};
</script>
