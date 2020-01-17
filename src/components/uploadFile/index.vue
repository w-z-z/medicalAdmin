<!--
 * @Description: 文件上传模块
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-21 22:35:28
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-07 17:09:30
 -->
<template>
  <div class="uploadImg">
    <div class="fileTitle">
      <uploadView @uploadSuccess='uploadSuccess'
        v-model='allData'>
        <div v-loading='allData.percentShow'>
          <el-button type="info">选择文件</el-button>
        </div>
      </uploadView>
      <div class="fileBox">
        <ul class="fileItem"
          v-for="(item,index) in fileList"
          :key="index">
          <li>{{item.fileName}}
            <i class="el-icon-delete"
              @click="deleteFile(index)"></i>
          </li>
        </ul>
      </div>
    </div>
    <el-progress :percentage="allData.percentage"
      class="progress"
      status="success"
      v-show="allData.percentShow"></el-progress>
    <!-- <div class="upload">
      <el-button element-loading-text="拼命上传中"
        v-loading.fullscreen.lock="percentShow"
        @click="uploadQiniu"
        type="primary"
        size="small">上传</el-button>
    </div> -->
  </div>
</template>
<script>
import * as qiniu from "qiniu-js";
import uploadView from "@/components/uploadFile/uploadView";

export default {
  name: "upload-img",
  data() {
    return {
      percentShow: false,
      percentage: 0,
      fileList: [],
      //所有的数据
      allData: {
        //文件类型
        accpetType: ["pdf", "docx", "dox", "jpg", "jpeg", "png", "bmp"],
        fileList: {
          file_name: "",
          file_type: "",
          file_url: ""
        },
        fileSize: "500", //以kb为单位
        // 上传的进度
        percentage: 0,
        //是否显示上传蒙版
        percentShow: false
      }
    };
  },
  props: ["files"],
  watch: {
    fileList(cc) {
      let data = [...cc];
      this.files = data;
    }
  },
  // model: {
  //   prop: "files",
  //   event: "getAllFiles"
  // },
  created() {},
  components: {
    uploadView
  },
  watch: {
    fileList(value) {
      this.$emit("getFiles", value);
    }
  },
  methods: {
    uploadSuccess(file) {
      this.fileList.push(file);
    },
    //删除文件
    deleteFile(index) {
      this.fileList.splice(index, 1);
    },
    clearFile() {
      // 清楚所有数组
      this.fileList = [];
    }
  }
};
</script>

<style lang="less" >
.uploadImg {
  background-color: #eeeeee;
  padding: 10px;
  .upload {
    margin: 15px 0;
  }

  .fileTitle {
    .sub {
      padding: 2px 10px;
      font-size: 12px;
      display: inline-block;
      text-align: center;
      margin-left: 5px;
      cursor: pointer;
      border: 1px solid #ccc;
    }
  }
  .fileBox {
    padding: 10px 0;
    margin-bottom: 10px;
    min-height: 120px;
    max-height: 300px;
    line-height: 23px;
    overflow: auto;
  }
  ul li {
    list-style: none;
    .el-icon-delete {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>

