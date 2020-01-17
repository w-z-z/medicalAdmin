<template>
  <div :class="className">
    <div class="uploadBox">
      <el-upload class="upload-demo"
        list-type="picture-card"
        :limit="maxLength"
        :action="upload_qiniu_url"
        :on-success="handleAvatarSuccess"
        :on-error="handleError"
        :before-upload="beforeAvatarUpload"
        :data="qiniuData"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :file-list="files">
        <i class="el-icon-plus"></i>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%"
          :src="imageUrl"
          alt />
      </el-dialog>
    </div>
    <div class="tips">
      <p>支持图片格式 .jpg .jpeg .png .bmp</p>
      <p>支持最多上传10张图片，每张图片大小3MB内</p>
    </div>
  </div>
</template>

<script>
import * as qiniu from "qiniu-js";
export default {
  props: {
    fileArr: {
      type: Array
    },
    files: {
      type: Array
    },
    className: {
      type: String
    },
    maxLength: {
      type: Number
    }
  },
  data() {
    return {
      qiniuData: {
        key: "",
        token: "",
        fname: ""
      },
      // 七牛云上传储存区域的上传域名（华东、华北、华南、北美、东南亚）
      upload_qiniu_url: "http://upload-z2.qiniup.com/",
      // 七牛云返回储存图片的子域名
      upload_qiniu_addr: process.env.VUE_APP_UPLOAD_URL,
      imageUrl: "",
      dialogVisible: false,
      thumbnail: "imageView2/2/h/1080"
    };
  },
  created() {
    this.getQiniuToken();
  },
  methods: {
    getQiniuToken() {
      this.$api["GetQiNiuUploadToken"]()
        .then(res => {
          this.qiniuData.token = res;
        })
        .catch(msg => {
          this.$showMsg("资源获取失败");
        });
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isBMP = file.type === "image/bmp";
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isPNG && !isJPEG && !isJPG && !isBMP) {
        this.$message.error("上传图片只能是 jpg、png、jpeg、bmp 格式!");
        return false;
      }
      if (!isLt3M) {
        this.$message.error("上传图片大小不能超过3MB!");
        return false;
      }
      const fileName = file.name;
      const postfix = fileName.substring(
        fileName.lastIndexOf("."),
        fileName.length
      );
      this.qiniuData.key =
        new Date().getTime() + Math.ceil(Math.random() * 100) + postfix;
      this.qiniuData.fname = fileName;
    },
    // 上传成功
    handleAvatarSuccess(res, file, fileList) {
      this.$emit("getVal", fileList);
    },
    handleError(res) {
      this.$message({
        message: "上传失败",
        duration: 2000,
        type: "warning"
      });
    },
    handleRemove(file, fileList) {
      this.$emit("getVal", fileList);
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传${this.maxLength}张图片`);
    }
  }
};
</script>

<style lang="less" scode>
</style>