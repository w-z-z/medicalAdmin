<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 18:51:42
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 20:20:36
 -->
<template>
  <div id="fileType">
    <div v-for="(item ,index) in  files"
      :key='index'
      class="downloadBox">
      <a :href='item.file_url'
        :download='`${new Date().getTime()}.${item.file_type}`'>
        <img v-if="item.file_type=='jpg'||item.file_type=='jpeg'||item.file_type=='png'"
          :src="item.file_url"
          alt="" />
        <img v-else-if="item.file_type=='doc'||item.file_type=='docx'"
          :src="iconWord"
          alt="" />
        <img v-else-if="item.file_type=='xlsx'||item.file_type=='xls'"
          :src="iconExcel"
          alt="" />
        <img v-else-if="item.file_type=='pdf'"
          :src="iconPdf"
          alt="" />
        <img v-else
          :src="iconOther"
          alt="" />
      </a>
      <!-- <a @click="uploadFiles(item)">
        <img v-if="item.file_type=='jpg'||item.file_type=='jpeg'||item.file_type=='png'"
          :src="item.file_url"
          alt="" />
        <img v-else-if="item.file_type=='doc'||item.file_type=='docx'"
          :src="iconWord"
          alt="" />
        <img v-else-if="item.file_type=='xlsx'||item.file_type=='xls'"
          :src="iconExcel"
          alt="" />
        <img v-else-if="item.file_type=='pdf'"
          :src="iconPdf"
          alt="" />
        <img v-else
          :src="iconOther"
          alt="" />
      </a> -->
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
      type: [Array],
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
.downloadBox {
  width: 58px;
  padding: 4px;
  border: 1px solid gainsboro;
  display: inline-block;
  height: 58px;
  margin-right: 10px;
  margin-top: 10px;
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