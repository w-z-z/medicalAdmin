<!--
 * @Description: productList
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-24 19:10:00
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-10 17:28:17
 -->
<template>
  <div id="productList">
    <div class="BreadcrumbBox">
      <breadcrumb></breadcrumb>
    </div>
    <el-button @click="addProduct" class="btnStyle" type="danger">新增产品</el-button>
    <div class="serchFrom">
      <!-- //关联表头数据 -->
      <BDfrom
        @submitForm="submitForm"
        @resetForm="resetForm"
        ref="serchFrom"
        :fromConfig="fromConfig"
        :formData="apiData['apiParam']"
      >
        <el-form-item label="产品名称">
          <el-input v-model.trim="apiData['apiParam'].product_name" placeholder="产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品类型">
          <el-select v-model="apiData['apiParam'].product_type_id" placeholder="请选择产品类型">
            <el-option
              v-for="(item,index) in productModel.productType "
              :key="index"
              :label="item"
              :value="index"
            >{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="apiData['apiParam'].upper_shelf" placeholder="请选择产品状态">
            <el-option
              v-for="(item,index) in productModel.productStatus "
              :key="index"
              :label="item"
              :value="index"
            >{{item}}</el-option>
          </el-select>
        </el-form-item>
      </BDfrom>
    </div>
    <!-- 搜索结果 -->
    <div class="searchResult">
      <BDtableApi
        @select="select"
        ref="staffTable"
        :tableHead="tableHead"
        :batchHandel="batchHandel"
        :apiData="apiData"
      ></BDtableApi>
    </div>
  </div>
</template>
<script>
import BDtableApi from "@/components/BD_table/api_table";
import BDfrom from "@/components/BD_from/index";
import BDdialog from "@/components/BD_dialog/index";
import { productModel } from "@/utils/selectData";
export default {
  name: "productList",
  components: { BDtableApi, BDfrom, BDdialog },
  data() {
    let that = this;
    return {
      loading: false,
      productModel,
      childchecked: true,
      // 表单基础参数
      fromConfig: {
        // 表单验证规则
        inline: true,
        ref: "ruleForm",
        size: "small",
        labelWidth: "",
        okBtn: {
          label: "查询",
          type: "danger"
        },
        noBtn: { label: "重 置", show: true }
      },

      // 表格数据
      tableHead: [
        {
          label: "选择",
          type: "selection"
        },
        {
          label: "产品名称",
          prop: "product_name"
        },
        {
          label: "产品类型",
          prop: "product_type_id",
          formatter: (row, column, cellValue, index) => {
            let text = "";
            switch (row.product_type_id) {
              case "1":
                text = "基因产品";
                break;
              case "2":
                text = "体检产品";
                break;
              case "3":
                text = "其他";
                break;
            }
            return { text };
          }
        },
        {
          label: "状态",
          formatter: (row, column, cellValue, index) => {
            if (row.upper_shelf == 1) {
              return <span class="upShelf"> 启用 </span>;
            } else {
              return <span class="downShelf"> 下架 </span>;
            }
          }
        },
        {
          label: "排序",
          formatter: (row, column, cellValue, index) => {
            return (
              <el-input-number
                size="mini"
                v-model={row.sort}
                min={0}
              ></el-input-number>
            );
          }
        },
        {
          label: "推荐",
          formatter: (row, column, cellValue, index) => {
            let isDisabled;
            if (row.upper_shelf === 1) {
              isDisabled = false;
            } else {
              isDisabled = true;
              row.recommend = 2;
            }
            return (
              <el-switch
                on-change={(val, index) => that.isRecommend(val, row)}
                active-value={1}
                inactive-value={2}
                v-model={row.recommend}
                disabled={isDisabled}
              ></el-switch>
            );
          }
        },
        {
          label: "置顶",
          prop: "top",
          formatter: (row, column, cellValue, index) => {
            let isDisabled;
            if (row.upper_shelf === 1) {
              isDisabled = false;
            } else {
              isDisabled = true;
              row.top = 2;
            }
            return (
              <el-switch
                on-change={(val, index) => that.isTop(val, row)}
                active-value={1}
                inactive-value={2}
                v-model={row.top}
                disabled={isDisabled}
              ></el-switch>
            );
          }
        },
        {
          label: "操作",
          type: "btn",
          width: "250px",
          btns: [{ label: "编辑" }, { label: "删除" }],
          btnClick: (btn, rown, index) => {
            if (btn.label === "编辑") {
              this.$router.push({
                path: `/product/editProduct/${rown.product_id}`
              });
            } else {
              let product_ids = [];
              product_ids.push(rown.product_id);
              this.$api["DeleteProduct"]({ product_ids })
                .then(res => {
                  this.$showMsg("删除成功", 3);
                  this.submitForm();
                  this.$store.dispatch("changeProductList");
                })
                .catch(msg => {
                  this.$showMsg(msg);
                });
            }
          }
        }
      ],
      batchHandel: [
        {
          label: "上架",
          type: "warning",
          onClick: (item, selectData) => {
            this.isUpper(selectData, 1);
          }
        },
        {
          label: "下架",
          type: "warning",
          onClick: (item, selectData) => {
            this.isUpper(selectData, 2);
          }
        },
        {
          label: "保存排序",
          type: "warning",
          onClick: (item, selectData) => {
            if (selectData.length === 0) {
              this.$showMsg("请先选择产品！");
              return;
            } else {
              let data = JSON.parse(JSON.stringify(selectData));
              let sort = data.map((item, index) => {
                return {
                  product_id: item.product_id,
                  sort: Number(item.sort)
                };
              });
              this.$api["SortProduct"]({ sort })
                .then(res => {
                  this.$showMsg("已保存排序!", 3);
                  this.submitForm();
                })
                .catch(msg => {
                  this.$showMsg(msg);
                });
            }
          }
        },
        {
          label: "删除",
          type: "info",
          onClick: (item, selectData) => {
            if (selectData.length === 0) {
              this.$showMsg("请先选择产品！");
              return;
            } else {
              let product_ids = selectData.map((item, index) => {
                return item.product_id;
              });
              this.$api["DeleteProduct"]({ product_ids })
                .then(res => {
                  this.$showMsg("删除成功", 3);
                  this.submitForm();
                  this.$store.dispatch("changeProductList");
                })
                .catch(msg => {
                  this.$showMsg(msg);
                });
            }
          }
        }
      ],
      apiData: {
        apiName: "GetProductList",
        apiParam: {
          page_no: 1,
          page_size: 10,
          product_name: "",
          product_type_id: "",
          upper_shelf: ""
        }
      }
    };
  },
  computed: {},
  methods: {
    // 确定回调事件
    submitForm(formName) {
      this.$refs.staffTable.refresh(1);
    },
    // 重置回调事件
    resetForm(formName) {
      this.apiData.apiParam = {
        page_no: 1,
        page_size: 10,
        product_name: "",
        product_type_id: "",
        upper_shelf: ""
      };
      this.$refs.staffTable.refresh(2);
    },
    // 多选按钮接收参数
    select(arr) {
      this.$emit("select", arr);
    },
    // 新增产品
    addProduct() {
      this.$router.push({ name: "addProduct" });
    },
    // 产品上下架
    isUpper(selectData, num) {
      if (selectData.length === 0) {
        this.$showMsg("请先选择产品！");
        return;
      } else {
        let product_ids = selectData.map((item, index) => {
          return item.product_id;
        });
        this.$api["UpperShelfProduct"]({ product_ids, upper_shelf: num })
          .then(res => {
            this.$showMsg("修改成功!", 3);
            this.submitForm();
            this.$store.dispatch("changeProductList");
          })
          .catch(msg => {
            this.$showMsg(msg);
          });
      }
    },
    // 推荐
    isRecommend(val, row) {
      let recommend = val;
      let product_id = row.product_id;
      this.$api["RecommendProduct"]({ recommend, product_id })
        .then(res => {
          this.$showMsg("修改成功!", 3);
          this.submitForm();
          this.$store.dispatch("changeProductList");
        })
        .catch(msg => {
          this.$showMsg(msg);
        });
    },
    // 置顶
    isTop(val, row) {
      let top = val;
      let product_id = row.product_id;
      this.$api["TopProduct"]({ top, product_id })
        .then(res => {
          this.$showMsg("修改成功!", 3);
          this.submitForm();
          this.$store.dispatch("changeProductList");
        })
        .catch(msg => {
          this.$showMsg(msg);
        });
    }
  },
  created() {}
};
</script>
<style lang="scss">
#productList {
  .searchResult {
    .upShelf {
      border: 1px solid rgba(138, 151, 173, 1);
      padding: 0px 5px;
      color: rgba(138, 151, 173, 1);
    }
    .downShelf {
      border: 1px solid rgba(255, 116, 101, 1);
      padding: 0px 5px;
      color: rgba(255, 116, 101, 1);
    }
    .sort {
      width: 66px;
    }
  }
}
</style>
