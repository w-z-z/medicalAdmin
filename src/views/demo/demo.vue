<!--
 * @Description: 自己定义组件展示
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 18:51:42
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-17 14:40:50
 -->
<template>
  <div id="demo">
    <uploadFile ref='uploadFile'
      v-model='fileData'
      :config="uploadFileConfig">
    </uploadFile>
    <!-- 自定义的外部点击上传事件 -->
    <el-button v-loading='loading'
      @click='uploadFiles'>
      上传文件
    </el-button>
    <div>
      <h2>输入框</h2>
      <div style="width:300px;">
        <Antinput v-model="currentValue"
          v-bind="inputProps"></Antinput>
      </div>
    </div>
  </div>
</template>

<script>
import uploadFile from "@/components/uploadAll/uploadView";
import Antinput from "@/components/Antinput";
export default {
  name: "Appdemo",
  methods: {},
  data() {
    return {
      inputProps: {
        type: "tel"
      },
      currentValue: "15",
      loading: false,
      uploadFileConfig: {
        type: 2, //类型
        autoUpload: false, //是否自动上传
        maxLength: 2, //多选时的属性
        multiple: true, //多选的属性生效
        uploadUrl: process.env.uplVUE_APP_UPLOAD_URLoadUrl //七牛云的文件域名
        // token: "", ///七牛云上传的凭证
        // //选择文件的回调
        // chooseFiles: (files, done) => {
        //   console.log("选择文件的回调");
        //   console.log(files);
        //   done(files); //成功添加必须这样调用 不调用会阻止添加
        // },
        // // //上传前回调
        // beforUpload: files => {
        //   console.log("上传前的回调");
        //   console.log(files);
        // },
        // //上传成功的回调
        // uploadSuss: (files, resove, reject) => {
        //   console.log("上传成功的回调");
        //   console.log(files);
        // }
      },
      //初始化数据
      fileData: [
        {
          file_type: "png",
          file_url: "http://file.pms.sc.cn/1578632117391.png"
        }
      ] //接受的文件的数组
    };
  },
  created() {},
  components: {
    uploadFile,
    Antinput
  },
  watch: {
    fileData(value) {
      console.log("更新值");
      console.log(value);
    }
  },
  methods: {
    //外部点击上传
    uploadFiles() {
      if (this.loading) {
        return false;
      }
      this.loading = true;
      this.$refs["uploadFile"]
        .toUploadFile()
        .then(res => {
          //上传完成
          console.log(res);
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
</style>