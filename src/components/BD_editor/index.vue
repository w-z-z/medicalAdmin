<!--
 * @Author: lc
 * @Date: 2019-09-24 14:25:18
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-15 10:40:48
 * @Description: 富文本组件
 -->
<template>
  <div>
    <!-- <Editor v-model="myValue"
      :init="newOption"
      :disabled="disabled"
       @onClick="onClick" //自定义事件
     >
    </Editor> -->
    <Editor v-model="myValue"
      :init="newOption"
      :disabled="disabled">
    </Editor>
  </div>
</template>
<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import * as qiniu from "qiniu-js";
import "tinymce/themes/silver";
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import axios from "axios";
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/link"; // 链接
import "tinymce/plugins/preview"; //  预览
import "tinymce/plugins/hr"; // 分割线
import "tinymce/plugins/pagebreak"; // 分页符
import "tinymce/plugins/quickbars"; //
export default {
  name: "BD-editor",
  components: { Editor },
  props: {},
  data() {
    return {
      myValue: this.value,
      //默认的配置
      option: {
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        height: 500,
        plugins: "lists preview image media table wordcount link hr pagebreak ",
        toolbar:
          "undo redo | formatselect  fontselect  |fontsizeselect| bold italic subscript superscript forecolor backcolor underline strikethrough  link  blockquote  emoticons hr pagebreak    | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image  table | removeformat preview ",
        branding: false,
        menubar: false,
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        //上传图片回调
        images_upload_handler: (blobInfo, succ, fail) => {
          // console.log(blobInfo);
          this.singleFileUpLoad(blobInfo, succ, fail);
          // //验签方法
          // let {
          //   uploadParams,
          //   timeout,
          //   baseURL,
          //   headers,
          //   methods,
          //   success,
          //   controller
          // } = this.option.uploadImg;
          // //拼接参数
          // let obj = uploadParams([
          //   {
          //     label: "img_file",
          //     value: blobInfo.blob()
          //   }
          // ]);
          // // 创建实例时设置配置的默认值
          // const Service = axios.create({
          //   timeout: timeout,
          //   baseURL: baseURL,
          //   headers: headers
          // });
          // Service[methods](controller, obj)
          //   .then(res => {
          //     success(res, succ, fail);
          //   })
          //   .catch(err => {
          //     fail("上传失败");
          //   });
        }
      }
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    initOption: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    // onClick(e) {
    //   this.$emit("onClick", e, tinymce);
    // },
    clear() {
      this.myValue = "";
    },
    singleFileUpLoad(item, succ, fail) {
      let { type, size, name } = item.blob();
      const upLoadName = new Date().getTime() + Math.ceil(Math.random() * 100);
      const postfix = name.substring(name.lastIndexOf("."), name.length);
      const token = this.token;
      const putExtra = {
        fname: name,
        params: {},
        mimeType: [type]
      };
      const config = {
        useCdnDomain: true
      };
      const observable = qiniu.upload(
        item.blob(),
        upLoadName + postfix,
        token,
        putExtra,
        config
      );
      observable.subscribe(
        function(res) {},
        function(error) {
          fail("上传失败");
        },
        function(res) {
          succ(process.env.VUE_APP_UPLOAD_URL + res.key);
        }
      );
    }
  },
  computed: {
    newOption() {
      return Object.assign(this.option, this.initOption);
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  },
  created() {
    this.$api["GetQiNiuUploadToken"]()
      .then(res => {
        this.token = res;
      })
      .catch(msg => {
        this.$showMsg("资源获取失败");
        // this.$showMsg(msg);
      });
  }
};
</script>

<style scoped>
.paging-panel {
  padding: 20px 0;
}
</style>
