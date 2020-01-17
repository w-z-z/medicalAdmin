<!--
 * @Description: 文件上传模块
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-21 22:35:28
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-15 11:47:20
 -->
<template>
  <div v-loading="allData.percentShow"
    class="uploadImg_Box"
    :class="customClass">
    <div class="fileTitle">
      <uploadView @uploadSuccess="uploadSuccess"
        v-model="allData">
        <div class="uploadImgUrl">
          <div class="uploadShadow">
            <i class="el-icon-plus"></i>
          </div>
          <img v-if="allData.fileList.file_type=='png'||allData.fileList.file_type=='jpg'||allData.fileList.file_type=='jpeg'||allData.fileList.file_type=='bmp'"
            :src="allData.fileList.file_url"
            alt />
          <img v-else-if="allData.fileList.file_type=='doc'||allData.fileList.file_type=='docx'"
            :src="iconWord"
            alt />
          <img v-else-if="allData.fileList.file_type=='xls'||allData.fileList.file_type=='xlsx'"
            :src="iconExcel"
            alt />
          <img v-else-if="allData.fileList.file_type=='pdf'"
            :src="iconPdf"
            alt />
        </div>
      </uploadView>
    </div>
  </div>
</template>
<script>
import uploadView from "@/components/uploadFile/uploadView";
export default {
  name: "upload-img",
  data() {
    return {
      iconWord: require("@/assets/images/fileType/word.png"),
      iconExcel: require("@/assets/images/fileType/Excel.png"),
      iconPdf: require("@/assets/images/fileType/pdf.png"),
      iconOther: require("@/assets/images/fileType/other.png"),
      //所有的数据
      allData: {
        //文件类型
        fileList: {
          file_name: "",
          file_type: "",
          file_url: ""
        },
        accpetType: [],
        fileSize: "20480", //以kb为单位
        //当前是否成功
        // isSucc: true,
        // 上传的进度
        percentage: 0,
        //是否显示上传蒙版
        percentShow: false
      },
      currentFile: {
        file_name: "",
        file_type: "",
        file_url: ""
      }
    };
  },
  props: {
    uploadFile: {
      type: [String, Object],
      default: null
    },
    customClass: {
      type: [String],
      default: ""
    },
    accpetType: {
      type: [Array],
      default: null
    }
  },
  watch: {
    uploadFile(vale) {
      this.allData.fileList = vale;
    }
  },
  components: {
    uploadView
  },
  comments: {},
  created() {
    this.$nextTick(() => {
      this.allData.fileList = this.uploadFile;
      this.allData.accpetType = this.accpetType;
    });
  },
  methods: {
    uploadSuccess(file) {
      this.$emit("getUploadimg", file);
    }
  }
};
</script>

<style lang="less"  scoped>
.uploadImg_Box {
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  border: 1px dashed #c0ccda;
  height: 90px;
  width: 90px;
  div {
    height: 100%;
    width: 100%;
  }
  .uploadImgUrl {
    img {
      height: 100%;
      width: 100%;
    }
  }
  .uploadShadow {
    display: none;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 20px;
    line-height: 90px;
    text-align: center;
    color: white;
  }
}
.uploadImg_Box:hover > {
  .uploadShadow {
    display: block;
  }
}
</style>

