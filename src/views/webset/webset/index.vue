<!--
 * @Description: 网站管理
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-24 19:10:00
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 15:43:15
 -->
<template>
  <div class="websetRecord">
    <div class="BreadcrumbBox">
      <breadcrumb></breadcrumb>
    </div>
    <!-- <div class="serchFrom"> -->
    <!-- //关联表头数据 -->
    <!-- <BDfrom @submitForm="submitForm"
        ref="serchFrom"
        :fromConfig="fromConfig"
        :formData="apiData['apiParam']">
        <el-form-item label
          style="width:166px">
          <el-input v-model.trim="apiData['apiParam'].true_name"
            placeholder="操作人"></el-input>
        </el-form-item>
    </BDfrom>-->
    <!-- </div> -->
    <!-- 搜索结果 -->
    <div class="searchResult">
      <BDtableApi ref="staffTable"
        :tableHead="tableHead"
        :apiData="apiData"></BDtableApi>
    </div>
  </div>
</template>
<script>
import BDtableApi from "@/components/BD_table/api_table";
import BDfrom from "@/components/BD_from/index";
import BDdialog from "@/components/BD_dialog/index";
export default {
  name: "webset",
  components: { BDtableApi, BDfrom, BDdialog },
  data() {
    return {
      loading: false,
      childchecked: true,
      // 表单基础参数
      fromConfig: {
        // 表单验证规则
        inline: true,
        ref: "ruleForm",
        size: "small",
        noBtn: { label: "重 置", show: false }
      },
      tableHead: [
        {
          label: "标题",
          prop: "item_name"
        },
        {
          label: "更新时间",
          formatter: (row, column, cellValue, index) => {
            return <span>{this.$formatTime(row.update_time * 1000)}</span>;
          }
        },
        {
          label: "操作",
          type: "btn",
          width: "150px",
          btns: [{ label: "编辑" }],
          btnClick: (btn, rown, index) => {
            this.$router.push({
              path: "/webset/websetEdit/" + rown.item_name
            });
          }
        }
      ],
      apiData: {
        apiName: "GetWebSiteList",
        showPagingPar: false,
        apiParam: {
          page_no: 1,
          page_size: 10
          // true_name: "",
          // create_time: ""
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
        true_name: "",
        create_time: ""
      };
      this.$refs.staffTable.refresh(2);
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.websetRecord {
  min-height: 735px;
}
</style>
