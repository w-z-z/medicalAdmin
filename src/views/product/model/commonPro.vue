<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 12:29:42
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-15 10:37:23
 -->
<template>
  <div id="productDetail">
    <!-- 基本信息 -->
    <BDfrom @submitForm="submitForm"
      @resetForm="resetForm"
      ref="searchForm"
      :fromConfig="fromConfig"
      :formData="apiData['apiParam']">
      <div class="proSet">
        <div class="basicInfo">
          <h2 class="comTitle">
            <span></span>基本信息
          </h2>
          <el-form-item label="产品名称"
            prop="product_name">
            <el-input v-model.trim="apiData['apiParam'].product_name"
              placeholder></el-input>
          </el-form-item>
          <el-form-item label="产品摘要"
            prop="product_desc">
            <el-input type="textarea"
              v-model.trim="apiData['apiParam'].product_desc"></el-input>
          </el-form-item>
          <el-form-item label="产品类型"
            prop="product_type_id">
            <el-select v-model="apiData['apiParam'].product_type_id"
              placeholder="请选择产品类型">
              <el-option v-for="(item,index) in productModel.productType "
                :key="index"
                :label="item"
                :value="index">{{item}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="橱窗轮播图"
            prop="slide">
            <div class="banner">
              <upload :fileArr="apiData['apiParam'].slide"
                :className="'imgUpload'"
                :files="file"
                :maxLength="10"
                @getVal="getVal"></upload>
            </div>
          </el-form-item>
        </div>

        <div class="detail">
          <h2 class="comTitle">
            <span></span>产品详情
          </h2>
          <el-form-item prop="content">
            <BD-editor ref="editor"
              v-model="apiData['apiParam'].content"
              :initOption="initOption"
              :disabled="disabled"
              @onClick="onClick"></BD-editor>
          </el-form-item>
        </div>

        <div class="otherSet">
          <h2 class="comTitle">
            <span></span>其他设置
          </h2>
          <el-form-item label="上架时间"
            prop="upper_shelf">
            <el-radio-group v-model="apiData['apiParam'].upper_shelf">
              <el-radio :label="1">立即上架</el-radio>
              <el-radio :label="2">暂不上架</el-radio>
              <el-radio :label="3">定时上架</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="apiData.apiParam.upper_shelf === 3"
            prop="upper_shelf_time">
            <el-date-picker v-model="apiData['apiParam'].upper_shelf_time"
              type="datetime"
              value-format="timestamp"
              :picker-options="pickerOptions"
              placeholder="请选择上架时间"></el-date-picker>
          </el-form-item>

          <!--  v-show="apiData.apiParam.upper_shelf === 3" -->
        </div>
      </div>
    </BDfrom>
  </div>
</template>

<script>
import BDfrom from "@/components/BD_from/index";
import { productModel } from "@/utils/selectData";
import BDEditor from "@/components/BD_editor/index";
import { validate } from "@/utils/validate";
import upload from "./upload.vue";
export default {
  components: {
    BDfrom,
    BDEditor,
    upload
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      upload_qiniu_addr: process.env.VUE_APP_UPLOAD_URL,
      productModel,
      file: [],
      apiData: {
        apiName: "",
        apiParam: {
          product_name: "",
          product_desc: "",
          product_type_id: "",
          slide: [],
          content: "",
          thumbnail: "",
          upper_shelf: 1,
          upper_shelf_time: ""
        }
      },
      fromConfig: {
        // 表单验证规则
        rules: {
          product_name: [
            { required: true, message: "产品名称不能为空！", trigger: "blur" }
          ],
          product_desc: [
            { required: true, message: "产品摘要不能为空！", trigger: "blur" }
          ],
          product_type_id: [
            { required: true, message: "产品类型不能为空！", trigger: "blur" }
          ],
          slide: [
            { required: true, message: "轮播图不能为空！", trigger: "blur" }
          ],
          content: [validate.verifyRequired("内容不能为空！")],
          upper_shelf: [validate.verifyRequired("请选择上架时间")]
        },
        inline: false,
        ref: "searchForm",
        labelWidth: "100px",
        okBtn: {
          label: "保存",
          type: "danger",
          class: "btnStyle"
        },
        noBtn: { label: "重置", show: true, type: "primary", class: "btnStyle" }
      },
      // 富文本编辑框

      disabled: false, //是否禁用
      //自定义的属性
      initOption: {
        //图片上传的配置 这部分属于自定义的数据官网并没有这部分属性
        uploadImg: {
          baseURL: "http://192.168.100.163/newcpcommon/", //上传的路径
          controller: "upload/formData", //控制器名称
          uploadParams: file => {
            // console.log(file);
            return file;
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
  methods: {
    // 确定回调事件
    submitForm(formName) {
      this.save();
    },
    resetForm() {},
    // 富文本编辑器
    // 鼠标单击的事件
    onClick(e, editor) {},
    // 保存
    save() {
      let { apiParam, apiName } = this.apiData;
      let params = Object.assign({}, apiParam);
      let arr = params.slide.map((item, index) => {
        let obj = {};
        if (item.response) {
          let fileName = item.name;
          obj.file_type = fileName
            .substring(fileName.lastIndexOf("."), fileName.length)
            .split(".")[1];
          obj.file_url = this.upload_qiniu_addr + item.response.key;
          return obj;
        } else if (item.product_id) {
          return item;
        } else {
          let url = item.url;
          obj.file_type = url
            .substring(url.lastIndexOf("."), url.length)
            .split(".")[1];
          obj.file_url = url;
          return obj;
        }
      });
      params.slide = arr;
      params.thumbnail = arr[0].file_url;
      params.upper_shelf_time = Number(params.upper_shelf_time) / 1000;
      this.$api[apiName](params)
        .then(res => {
          if (apiName === "UpdateProduct") {
            this.$showMsg("编辑产品成功！", 3);
          } else {
            this.$showMsg("新增产品成功！", 3);
          }
          setTimeout(() => {
            this.$router.push({ name: "productList" });
          }, 2000);
          this.$store.dispatch("changeProductList");
        })
        .catch(msg => {
          this.$showMsg(msg);
        });
    },
    getVal(data) {
      this.apiData.apiParam.slide = data;
    },
    // 获取产品详情
    getProInfo(id) {
      this.$api["GetProductDetail"]({ product_id: id })
        .then(res => {
          let params = res;
          params.upper_shelf_time = params.upper_shelf_time * 1000;
          this.apiData.apiParam = params;
          // 处理回填图片
          let arr = params.slide.map((item, index) => {
            let obj = {};
            const fileName = item.file_url
              .substring(item.file_url.lastIndexOf("/"), item.file_url.length)
              .split("/")[1];
            obj.name = fileName;
            obj.url = item.file_url;
            return obj;
          });
          this.file = arr;
        })
        .catch(msg => {
          this.$showMsg(msg);
        });
    }
  },
  created() {
    let pathName = this.$route.name;
    // 编辑产品
    if (pathName === "editProduct") {
      this.getProInfo(this.$route.params.id);
      this.apiData.apiName = "UpdateProduct";
    }
    // 新建产品
    else {
      this.apiData.apiName = "CreateProduct";
    }
  },
  watch: {
    "apiData.apiParam.upper_shelf"(newVal, oldVal) {
      if (newVal === 3) {
        this.fromConfig.rules.upper_shelf_time = [
          { required: true, message: "时间不能为空！", trigger: "change" }
        ];
      } else {
        this.apiData.apiParam.upper_shelf_time = "";
      }
    }
  }
};
</script>

<style lang="scss">
#productDetail {
  background: #fff;
  border-radius: 3px;
  padding: 30px 50px;

  .el-form {
    .proSet {
      display: flex;
      .comTitle {
        font-size: 18px;
        color: #6fa8e9;
        line-height: 30px;
        margin-bottom: 15px;
        span {
          height: 20px;
          width: 6px;
          background: #6fa8e9;
          display: inline-block;
          border-radius: 3px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      .basicInfo {
        width: 30%;
        padding-right: 30px;
        // 图片上传样式
        .banner {
          min-height: 200px;
          .imgUpload {
            width: 100%;
            .uploadBox {
              background: #f5f5f5;
              padding: 20px;
              height: 100%;
              width: 100%;
              min-height: 200px;
              .el-upload--picture-card,
              .el-upload-list__item {
                width: 68px;
                height: 68px;
                line-height: 68px;
                i {
                  font-size: 16px;
                }
                .el-icon-upload-success {
                  position: relative;
                  top: -17px;
                  left: 0px;
                  font-size: 14px;
                }
              }
            }
            .tips {
              font-size: 12px;
              color: #999;
              line-height: 20px;
              margin-top: 20px;
            }
          }
        }
      }
      .detail {
        width: 45%;
        margin-right: 30px;
        .el-form-item__content {
          margin-left: 0 !important;
        }
      }
      .otherSet {
        width: 20%;
        .el-form-item {
          margin-bottom: 0;
        }
        .el-form-item__label {
          width: 100%;
          text-align: left;
          text-indent: 10px;
        }
        .el-form-item__content {
          margin-left: 10px !important;
          position: relative;
          .el-radio-group {
            line-height: 40px;
            label {
              width: 50%;
              margin-right: 0;
            }
          }
        }
      }
    }
    & > .el-form-item:last-child {
      margin-top: 50px;
      .el-form-item__content {
        text-align: center;
        margin-left: 0 !important;
      }
    }
  }
}
</style>
