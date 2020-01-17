<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-24 10:29:31
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-10 17:31:05
 -->
<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-24 10:29:31
 * @LastEditors  : ranli
 * @LastEditTime : 2019-12-24 14:01:13
 -->
<template>
  <div id="messageList">
    <!-- <button @click="fff('messageDetail')">消息详情</button> -->
    <div class="BreadcrumbBox">
      <breadcrumb></breadcrumb>
    </div>
    <el-tabs class="custom-tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="通知消息" name="1">
        <div class="serchFrom">
          <BDfrom
            @submitForm="submitForm"
            ref="serchFrom"
            :fromConfig="fromConfig"
            :formData="apiData['apiParam']"
          >
            <el-form-item label="消息标题">
              <el-input v-model.trim="apiData['apiParam'].notice_name"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="apiData['apiParam'].status" placeholder="请选择">
                <el-option
                  v-for="(item,index) in newsModel.newsType "
                  :key="index"
                  :label="item"
                  :value="index"
                >{{item}}</el-option>
              </el-select>
            </el-form-item>
          </BDfrom>
        </div>
        <el-button @click="addNews(1)" class="btnStyle addNews" type="danger">新增消息</el-button>
        <BDtableApi
          @select="select"
          ref="staffTable1"
          :tableHead="tableHead"
          :tableConfig="tableConfig"
          :batchHandel="batchHandel"
          :apiData="apiData"
        ></BDtableApi>
      </el-tab-pane>
      <el-tab-pane label="系统消息" name="2">
        <div class="serchFrom">
          <BDfrom
            @submitForm="submitForm"
            ref="serchFrom"
            :fromConfig="fromConfig2"
            :formData="apiData2['apiParam']"
          >
            <el-form-item label="消息标题">
              <el-input v-model.trim="apiData2['apiParam'].notice_name"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="apiData2['apiParam'].status" placeholder="请选择">
                <el-option
                  v-for="(item,index) in newsModel.newsType "
                  :key="index"
                  :label="item"
                  :value="index"
                >{{item}}</el-option>
              </el-select>
            </el-form-item>
          </BDfrom>
        </div>
        <el-button @click="addNews(2)" class="btnStyle addNews" type="danger">新增消息</el-button>
        <BDtableApi
          @select="select"
          ref="staffTable2"
          :tableHead="tableHead2"
          :tableConfig="tableConfig2"
          :batchHandel="batchHandel"
          :apiData="apiData2"
        ></BDtableApi>
      </el-tab-pane>
    </el-tabs>

    <!-- 查看消息模态框 -->
    <BDdialog class="message-box" :dialogParam="dialogParam">
      <div class="msgHeader">
        <p class="msgTitle">{{msgData.notice_name}}</p>
        <p class="msgTime">{{msgData.create_time}}</p>
      </div>
      <div v-html="msgData.content" class="content"></div>
    </BDdialog>
  </div>
</template>

<script>
import BDtableApi from "@/components/BD_table/api_table";
import BDfrom from "@/components/BD_from/index";
import BDdialog from "@/components/BD_dialog/index";
import { newsModel } from "@/utils/selectData";
// import logoImg from "../../assets/images/home/message.png";
export default {
  name: "messageList",
  components: { BDtableApi, BDfrom, BDdialog },
  data() {
    return {
      loading: false,
      loading2: false,
      logoImg: "",
      activeName: "1",
      newsModel,
      msgData: {
        notice_name: "",
        create_time: "",
        content: ""
      },
      //第一个表格的数据
      tableHead: [
        {
          label: "选择",
          type: "selection"
        },
        {
          label: "消息标题",
          prop: "notice_name"
        },
        {
          label: "状态",
          prop: "status",
          formatter: (row, column, cellValue, index) => {
            let timestamp = new Date().getTime();
            let text =
              row.release_time * 1000 <= timestamp ? "已发送" : "待发送";
            return (
              <span class={text == "已发送" ? "upShelf" : "downShelf"}>
                {text}
              </span>
            );
          }
        },
        {
          label: "创建时间",
          formatter: (row, column, cellValue, index) => {
            return (
              <span>
                {this.$formatTime(row.create_time * 1000, "yyyy-MM-dd  hh:mm")}
              </span>
            );
          }
        },
        {
          label: "发送时间",
          formatter: (row, column, cellValue, index) => {
            let sendTime =
              row.publish == 1 ? row.create_time : row.release_time;
            return (
              <span>
                {this.$formatTime(sendTime * 1000, "yyyy-MM-dd  hh:mm")}
              </span>
            );
          }
        },
        {
          label: "操作",
          formatter: (row, column, cellValue, index) => {
            let timestamp = new Date().getTime();
            let _this = this;
            let clickBtn1 = function() {
              _this.dialogParam.visible = true;
              _this.getNewsDetail(row.notice_id);
            };
            let clickBtn2 = function() {
              _this.$router.push({
                path: `/newsCenter/editMessage/${row.notice_id}`
              });
            };

            if (row.release_time * 1000 <= timestamp) {
              return (
                <span class="text" onClick={clickBtn1}>
                  查看
                </span>
              );
            } else {
              return (
                <span class="text" onClick={clickBtn2}>
                  编辑
                </span>
              );
            }
          }
        }
      ],
      tableConfig: {
        pagingPar: {
          total: 0,
          layout: "total, sizes, prev, pager, next, jumper",
          currentPage: 1,
          align: "right",
          background: true,
          isShow: true
        },
        tableData: [],
        showSummary: null
      },
      batchHandel: [
        {
          label: "删除",
          type: "info",
          onClick: (item, selectData) => {
            this.deleteNews(selectData);
          }
        }
      ],
      apiData: {
        apiName: "GetNoticeList",
        apiParam: {
          page_no: 1,
          page_size: 10,
          module: 1,
          notice_name: "",
          status: ""
        }
      },
      fromConfig: {
        // 表单验证规则
        inline: true,
        ref: "ruleForm",
        size: "small",
        okBtn: {
          label: "查询",
          type: "danger"
        },
        noBtn: { label: "重置", show: true }
      },

      //第二个表格的数据
      tableHead2: [
        {
          label: "选择",
          type: "selection"
        },
        {
          label: "消息标题",
          prop: "notice_name"
        },
        {
          label: "状态",
          prop: "status",
          formatter: (row, column, cellValue, index) => {
            let timestamp = new Date().getTime();
            let text =
              row.release_time * 1000 <= timestamp ? "已发送" : "待发送";
            return (
              <span class={text == "已发送" ? "upShelf" : "downShelf"}>
                {text}
              </span>
            );
          }
        },
        {
          label: "创建时间",
          formatter: (row, column, cellValue, index) => {
            return <span>{this.$formatTime(row.create_time * 1000)}</span>;
          }
        },
        {
          label: "发送时间",
          formatter: (row, column, cellValue, index) => {
            let sendTime =
              row.publish == 1 ? row.create_time : row.release_time;
            return (
              <span>
                {this.$formatTime(sendTime * 1000, "yyyy-MM-dd  hh:mm")}
              </span>
            );
          }
        },
        {
          label: "操作",
          formatter: (row, column, cellValue, index) => {
            let timestamp = new Date().getTime();
            let _this = this;
            let clickBtn1 = function() {
              _this.dialogParam.visible = true;
              _this.getNewsDetail(row.notice_id);
            };
            let clickBtn2 = function() {
              _this.$router.push({
                path: `/newsCenter/editMessage/${row.notice_id}`
              });
            };

            if (row.release_time * 1000 <= timestamp) {
              return (
                <span class="text" onClick={clickBtn1}>
                  查看
                </span>
              );
            } else {
              return (
                <span class="text" onClick={clickBtn2}>
                  编辑
                </span>
              );
            }
          }
        }
      ],
      tableConfig2: {
        pagingPar: {
          total: 10,
          currentPage: 1,
          pageSize: 10,
          align: "right",
          background: true,
          isShow: true
        },
        tableData: [],
        showSummary: null
      },
      fromConfig2: {
        // 表单验证规则
        inline: true,
        ref: "ruleForm",
        size: "small",
        okBtn: {
          label: "查询",
          type: "danger"
        },
        noBtn: { label: "取消", show: true }
      },
      apiData2: {
        apiName: "GetNoticeList",
        apiParam: {
          page_no: 1,
          page_size: 10,
          module: 2,
          notice_name: "",
          status: ""
        }
      },

      // 弹窗
      dialogParam: {
        title: "查看通知",
        width: "930px",
        visible: false,
        lockScroll: true,
        okBtn: {
          show: false
        },
        noBtn: {
          show: false
        }
      }
    };
  },
  computed: {},
  methods: {
    // 确定回调事件
    submitForm(formName) {
      if (this.activeName == "1") {
        this.$refs.staffTable1.refresh(1);
      } else {
        this.$refs.staffTable2.refresh(1);
      }
    },
    // 多选按钮接收参数
    select(arr) {
      this.$emit("select", arr);
    },
    // 新增消息
    addNews(num) {
      this.$router.push({
        path: "/newsCenter/addMessage",
        query: { module: num }
      });
    },
    getNewsDetail(id) {
      this.$api["GetNoticeDetail"]({
        notice_id: id
      })
        .then(res => {
          res.create_time = this.$formatTime(
            res.create_time * 1000,
            "yyyy-MM-dd  hh:mm"
          );
          this.msgData = res;
        })
        .catch(msg => {});
    },
    handleClick() {
      let activeName = this.activeName;
      this.$router.push({
        path: "/newsCenter/notice",
        query: {
          activeName
        }
      });
    },
    // 删除消息
    deleteNews(data) {
      if (data.length === 0) {
        this.$showMsg("请先选择消息");
        return;
      } else {
        let list = JSON.parse(JSON.stringify(data));
        let arr = list.map((item, index) => {
          return item.notice_id;
        });
        this.$api["DeleteNotice"]({
          notice_ids: arr
        })
          .then(res => {
            this.submitForm();
          })
          .catch(err => {});
      }
    }
  },
  created() {
    let type = this.$route.query.activeName;
    if (type === "2") {
      this.activeName = type;
    }
  }
};
</script>

<style lang='less' >
#messageList {
  padding-left: 8px;
  .addNews {
    margin: 20px 0;
  }
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
  .message-box {
    .msgHeader {
      line-height: 30px;
      text-align: center;
      .msgTitle {
        font-size: 20px;
        color: rgba(51, 51, 51, 1);
      }
      .msgTime {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
      }
    }
    .content {
      padding: 20px 0;
    }
  }
  .text {
    color: #6fa8e9;
  }
  .custom-tabs {
    .el-tabs__item.is-top {
      font-size: 18px !important;
      color: #666;
      line-height: 30px;
      &.is-active {
        font-size: 18px;
        color: #6fa8e9;
        font-weight: bold;
      }
    }
    .el-tabs__nav-wrap::after {
      height: 0;
    }
    .el-tabs__active-bar {
      height: 4px;
      border-radius: 2px;
    }
  }
}
</style>
