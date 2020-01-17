<!--
 * @Description: 上传组件的按钮
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 18:51:42
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-17 14:26:38
 -->
<template>
  <div id="uploadView">
    <div class="uploadViewBox"
      :class='renderUploadFileConfig.customClass'>
      <div v-if="renderUploadFileConfig.type==2"
        class="moreUpload">
        <fileType :files='item'
          v-for="(item,index) in chooseFiles"
          :key='index'>
          <span slot="deleteFile"
            @click.stop="deleteFile(index)"
            class="deleteFile"><i class="el-icon-circle-close"></i></span>
          <span v-if="!item.uploadStatus"
            slot="reUpload"
            @click.stop="reUpload(item,index,2)"
            class="reUpload"><i class="el-icon-refresh-left"></i></span>
          <div slot="percentage"
            v-if="item.percentage>0&&item.percentage<100"
            class="percentage">
            <div :style="`width:${item.percentage}%`"
              class="percentBar">
            </div>
          </div>
        </fileType>
      </div>
      <div @click.stop="uploadFile"
        class="uploadBtn">
        <div class="hasFile"
          v-if="renderUploadFileConfig.type==1&&chooseFiles.length>0">
          <fileType :files='chooseFiles[0]'>
            <span v-if="!chooseFiles[0].uploadStatus"
              slot="reUpload"
              @click.stop="reUpload(hooseFiles[0],index,2)"
              class="reUpload"><i class="el-icon-refresh-left"></i></span>
            <div slot="percentage"
              v-if="chooseFiles[0].percentage>0&&chooseFiles[0].percentage<100"
              class="percentage">
              <div :style="`width:${chooseFiles[0].percentage}%`"
                class="percentBar">
              </div>
            </div>
          </fileType>
        </div>
        <div v-else
          class="hasNoFile">
          <div>
            <i class="el-icon-upload"></i>
            <!-- <p>点击上传</p> -->
          </div>
        </div>
        <div v-if="renderUploadFileConfig.type==1&&percentage>0"
          class="percentage">
          <div :style="`width:${percentage}%`"
            class="percentBar">
          </div>
        </div>
      </div>
    </div>
    <input type="file"
      ref="inputfile"
      :multiple='renderUploadFileConfig.multiple&&renderUploadFileConfig.type==2'
      @change="fileChangeHandle"
      style="display: none;" />
  </div>
</template>

<script>
import { uploadFileConfig } from "./class";
import {
  UploadFiles,
  hanelChooseFiles,
  initUploadConfig,
  deleteFile
} from "./qiniuyunUpload";
import fileType from "./fileTypeView";
export default {
  name: "uploadView",
  methods: {},
  data() {
    return {
      percentage: 0,
      chooseFiles: [] //已经选择的文件//包含成功的和不成功的
    };
  },
  props: ["fileData", "config"],
  model: {
    prop: "fileData",
    event: "updateFileData"
  },
  created() {
    this.getToken();
  },
  watch: {
    chooseFiles: {
      handler: value => {
        console.log("选择的数据更新");
        console.log(value);
      },
      deep: true
    }
  },
  methods: {
    //获取七牛云token
    getToken() {
      this.$api["GetQiNiuUploadToken"]()
        .then(res => {
          this.renderUploadFileConfig.token = res;
          this.fileData.map(item => {
            let obj = {
              file_type: item.file_type,
              file_url: item.file_url,
              uploadStatus: true //是否上传的标志着
            };
            this.chooseFiles.push(obj);
          });
          initUploadConfig(this.renderUploadFileConfig, this.chooseFiles);
        })
        .catch(msg => {
          console.log(msg);
          this.$showMsg("上传凭证获取失败");
        });
    },
    //展开选择文件面板
    uploadFile() {
      const node = this.$refs.inputfile;
      node.click();
    },
    //选择文件事件
    fileChangeHandle() {
      hanelChooseFiles(this.$refs.inputfile.files)
        .then(obj => {
          this.chooseFiles = obj.allFiles;
          //自动上传
          if (this.renderUploadFileConfig.autoUpload) {
            this.reUpload(obj.fileInfo, obj.index, 1);
          }
        })
        .catch(err => {
          this.$showMsg(err);
          console.log(err);
        });
    },
    //删除文件
    deleteFile(index) {
      deleteFile(index);
    },
    reUpload(item, index, type) {
      //重传
      UploadFiles(item, index, type)
        .then(res => {
          this.$emit("updateFileData", res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    toUploadFile() {
      // 点击上传
      return new Promise((r, j) => {
        UploadFiles()
          .then(res => {
            this.$emit("updateFileData", res);
            r(res);
          })
          .catch(err => {
            j(err);
            console.log(err);
          });
      });
    }
  },
  components: {
    fileType
  },
  computed: {
    //计算出配置
    renderUploadFileConfig() {
      if (this.config) {
        return new uploadFileConfig(this.config);
      } else {
        return new uploadFileConfig();
      }
    }
  }
};
</script>

<style scoped lang='scss'>
#uploadView {
  .uploadViewBox {
    overflow: hidden;
  }
  .uploadBtn {
    border: 1px dashed #c0ccda;
    float: left;
    position: relative;
    // margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    box-sizing: border-box;
    text-align: center;
    width: 58px;
    height: 58px;
    cursor: pointer;
    vertical-align: middle;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      color: #666666;
      padding: 5px;
      i {
        font-size: 20px;
      }
    }
    .hasFile {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .moreUpload {
    float: left;
    // position: relative;
    overflow: hidden;
    > div {
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .deleteFile {
      position: absolute;
      right: -4px;
      top: -4px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 50%;
      width: 16px;
      text-align: center;
      z-index: 3;
      height: 16px;
      background-color: white;
      vertical-align: bottom;
    }
    .deleteFile:hover {
      color: #6fa8e9;
    }
  }
  .percentage {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    justify-content: flex-start;
    align-items: center;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.3);
    .percentBar {
      height: 5px;
      background-color: white;
      border-radius: 2px;
      margin-top: 20px;
    }
  }
  .reUpload {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    color: white;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>