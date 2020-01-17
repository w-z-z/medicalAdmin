<template>
  <div class="mediclTabelClass">
    <BDtable
      :tableHead="tableHead"
      @select="select"
      @sizeChange="sizeChange"
      :tableConfig="tableConfig"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    ></BDtable>
  </div>
</template>

<script>
import BDtable from "./index";
export default {
  name: "BD-table-api",
  components: { BDtable },
  model: {
    prop: "apiData",
    event: "returnBack"
  },
  props: {
    tableHead: {
      type: [Array],
      default: null
    },
    apiData: {
      type: [Object],
      default: null
    },
    batchHandel: {
      type: [Array],
      default: null
    }
  },
  data() {
    return {
      tableConfig: {
        showSummary: false,
        tableData: [],
        pagingPar: {
          total: 0,
          isShow: this.apiData.showPagingPar,
          align: "right"
        },
        batchHandel: this.batchHandel,
        border: true
      },
      loading: false
    };
  },
  computed: {},
  methods: {
    // 多选按钮接收参数
    select(arr) {
      this.$emit("select", arr);
    },
    // 获取接口数据
    getData() {
      this.loading = true;
      let { apiName, apiParam, beforeGetInfo } = this.apiData;
      let newapiParam = {};
      if (beforeGetInfo) {
        apiParam = Object.assign(newapiParam, beforeGetInfo(), apiParam);
      }
      if (apiName && typeof apiParam === "object") {
        this.$api[apiName](apiParam).then(res => {
          this.tableConfig.tableData = res.data;
          this.tableConfig.pagingPar.total = Number(res.total);
          this.loading = false;
        });
      } else {
        console.error("请传入正确的接口参数");
      }
    },
    // 分页改变
    sizeChange(obj) {
      this.apiData.apiParam.page_no = obj.page;
      this.apiData.apiParam.page_size = obj.pageSize;
      this.$emit("returnBack", this.apiData);
      this.getData();
    },
    // 刷新表格
    refresh(type = 1) {
      /**
       * type 1   刷新当前页面
       * type 2   刷新重置到第一页
       */
      if (type == 2) {
        this.tableConfig.pagingPar.currentPage = 1;
        this.apiData.apiParam.page_no = 1;
      }
      this.getData();
    }
  },
  created() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped>
</style>
<style>
.aaaa {
  background: red;
}
</style>