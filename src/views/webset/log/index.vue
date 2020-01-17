<!--
 * @Description: 网站管理
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-24 19:10:00
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-02 16:58:10
 -->
<template>
  <div class="websetRecord">
    <div class="serchFrom">
      <!-- //关联表头数据 -->
      <BDfrom @submitForm="submitForm"
        ref="serchFrom"
        :fromConfig="fromConfig"
        :formData="apiData['apiParam']">
        <el-form-item label
          style="width:166px">
          <el-input v-model.trim="apiData['apiParam'].true_name"
            placeholder="操作人"></el-input>
        </el-form-item>
      </BDfrom>
    </div>
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
  name: "log",
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
          label: "操作人",
          prop: "true_name"
        },
        {
          label: "事件内容",
          prop: "true_name"
        },
        {
          label: "事件时间",
          formatter: (row, column, cellValue, index) => {
            return <span>{this.$formatTime(row.create_time * 1000)}</span>;
          }
        }
      ],
      apiData: {
        apiName: "GetPersonUserList",
        isShow: false,
        apiParam: {
          page_no: 1,
          page_size: 10,
          true_name: ""
        }
      }
    };
  },
  computed: {},
  methods: {
    // 确定回调事件
    submitForm(formName) {
      this.$refs.staffTable.refresh(1);
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
</style>
