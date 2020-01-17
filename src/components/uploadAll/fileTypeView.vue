<!--
 * @Description: 文件类型分类显示
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 18:51:42
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-16 15:17:05
 -->
<template>
  <div id="fileType">
    <div class="downloadBox">
      <slot name='deleteFile'></slot>
      <slot name='percentage'></slot>
      <slot name='reUpload'></slot>
      <img v-if="files.file_type=='jpg'||files.file_type=='jpeg'||files.file_type=='png'"
        :src="files.file_url"
        alt="" />
      <img v-else-if="files.file_type=='doc'||files.file_type=='docx'"
        :src="iconWord"
        alt="" />
      <img v-else-if="files.file_type=='xlsx'||files.file_type=='xls'"
        :src="iconExcel"
        alt="" />
      <img v-else-if="files.file_type=='pdf'"
        :src="iconPdf"
        alt="" />
      <img v-else
        :src="iconOther"
        alt="" />

    </div>
  </div>
</template>

<script>
export default {
  name: "fileType",
  data() {
    return {
      iconWord: require("@/assets/images/fileType/word.png"),
      iconExcel: require("@/assets/images/fileType/Excel.png"),
      iconPdf: require("@/assets/images/fileType/pdf.png"),
      iconOther: require("@/assets/images/fileType/other.png")
    };
  },
  props: {
    files: {
      type: [Object],
      default: null
    }
  },
  methods: {
    uploadFiles(item) {
      this.$uploadFile(item, 1);
    }
  },
  created() {}
};
</script>

<style lang='scss' scoped>
#fileType {
  float: left;
}
.downloadBox {
  width: 58px;
  padding: 4px;
  border: 1px solid gainsboro;
  display: inline-block;
  height: 58px;
  // margin-right: 10px;
  // margin-top: 10px;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  a:hover {
    &::after {
      content: "下载";
      position: absolute;
      line-height: 58px;
      text-align: center;
      color: white;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>