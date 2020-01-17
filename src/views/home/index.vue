<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-30 15:36:35
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-15 14:36:21
 -->
<template>
  <div v-loading="loading" id="homeCenter">
    <div v-loading="loading" class="left-box">
      <div class="total">
        <div
          v-for="(item,index) in totalData "
          :key="index"
          class="item"
          :style="`box-shadow:${item.shadow};background-image:${item.backImg}`"
        >
          <div>
            <i :class="item.icon"></i>
            <p>{{item.name}}</p>
          </div>
          <p>{{item.data}}</p>
          <span class="bgImg"></span>
        </div>
      </div>
      <div class="sampleData">
        <div class="data">
          <div class="sample" v-for="(item,index) in sampleData" :key="index">
            <p>{{ item.data }}</p>
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="rightTotal">
          <div id="main" style="width:500px;height:100%;margin:0 auto;"></div>
        </div>
      </div>
    </div>
    <!-- <div class="right-box">
      <el-card class="box-card">
        <h1>
          待办
          <span>({{total}})</span>
        </h1>
        <div class="willDo">
          <div
            v-for="(item,index) in HandleThings"
            :key="index"
            class="itemThing"
          >{{$formatTime(item.create_time * 1000) + '-' + item.product_name + '-' + item.true_name }}</div>
        </div>
      </el-card>
    </div>-->
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "homeCenter",
  components: {},
  data() {
    return {
      loading: false,
      totalData: [
        {
          icon: "iconfont icon-huiyuantongji",
          name: "会员统计",
          data: 0,
          backImg:
            "linear-gradient(159deg,rgba(255, 101, 128, 1),rgba(254, 164, 173, 1))",
          shadow: "0px 6px 25px 0px RGBA(254, 164, 172, 1)"
        },
        {
          icon: "iconfont icon-APPtubiao- ",
          name: "健康档案",
          data: 0,
          backImg:
            "linear-gradient(159deg,rgba(104,122,255,1),rgba(147,190,255,1))",
          shadow: "0px 6px 25px 0px RGBA(109, 130, 255, 1)"
        },
        {
          icon: "iconfont icon-alitubiaoxiangmu",
          name: "体检报告",
          data: 0,
          backImg:
            "linear-gradient(159deg,rgba(129,112,255,1),rgba(185,171,255,1))",
          shadow: "0px 6px 25px 0px RGBA(136, 119, 255, 1)"
        }
      ],
      sampleData: [
        {
          name: "知情同意书",
          data: 0
        },
        {
          name: "样本登记",
          data: 0
        }
      ],
      allData: {
        member_num: 0,
        record_num: 0,
        report_num: 0,
        consent_num: 0,
        check_num: 0,
        sample_num: 0
      },
      pieData: {
        status_1: 1,
        status_3: 1,
        status_2: 1
      },
      HandleThings: [],
      total: 0
    };
  },
  methods: {
    // 画图表
    drawPie(val) {
      var myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "检测报告",
            type: "pie",
            radius: [0, "30%"],

            label: {
              formatter: "{c} \n {b}",
              position: "center",
              color: "#6AA9FB",
              fontSize: 20,
              align: "center",
              lineHeight: 30,
              rich: {
                c: {
                  fontWeight: "bolder"
                }
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: val.status_1 + val.status_2 + val.status_3,
                name: "检测报告"
              }
            ],
            color: ["#fff"]
          },
          {
            name: "样本统计",
            type: "pie",
            radius: "55%",
            radius: ["50%", "60%"],
            label: {
              formatter: "{b} : {c}"
            },
            data: [
              { value: val.status_1, name: "样本处理中" },
              { value: val.status_3, name: "报告已出具" },
              { value: val.status_2, name: "样本检测中" }
            ]
          }
        ],
        color: ["#FEA2AB", "#B9ABFF", "#89AEFF"]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getTotalData() {
      this.loading = true;
      let p1 = this.$api["GetCheckReportCount"]();
      let p2 = this.$api["GetDataTotal"]();
      // let p3 = this.$api["GetHandleCheckReportList"]();
      Promise.all([p1, p2])
        .then(result => {
          this.loading = false;
          this.pieData = result[0];
          this.drawPie(this.pieData);

          let arr = Object.values(result[1]);
          this.$set(this.totalData[0], `data`, arr[0]);
          this.$set(this.totalData[1], `data`, arr[1]);
          this.$set(this.totalData[2], `data`, arr[4]);
          this.$set(this.sampleData[0], `data`, arr[3]);
          this.$set(this.sampleData[1], `data`, arr[5]);

          // this.total = result[2].data.length;
          // this.HandleThings = result[2].data;
        })
        .catch(err => {
          this.loading = false;
          this.$showMsg("数据获取失败");
        });
    }
  },
  mounted() {
    this.drawPie(this.pieData);
  },
  created() {
    this.getTotalData();
  }
};
</script>
<style lang="scss">
#homeCenter {
  display: flex;
  min-width: 1000px;
  max-width: 1710px;
  padding-top: 30px;
  .left-box {
    width: 100%;
    .total {
      display: grid;
      grid-template-columns: repeat(3, 33.33%);
      .item {
        padding: 30px 0;
        margin-right: 20px;
        display: flex;
        align-items: center;
        color: #fff;
        border-radius: 5px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        .bgImg {
          position: absolute;
          width: 131px;
          height: 100%;
          background: url("../../assets/images/index/circle.png") no-repeat;
          right: 0;
        }
        &:last-child {
          margin-right: 0;
        }
        & > div {
          text-align: center;
          width: 40%;
          i {
            font-size: 64px;
          }
          p {
            font-size: 20px;
          }
        }
        & > p {
          font-size: 36px;
        }
      }
    }
    .sampleData {
      margin-top: 30px;
      display: grid;
      grid-template-columns: 33.33% 66.66%;
      .data {
        width: 100%;
        padding-right: 20px;

        .sample {
          width: 100%;
          padding: 30px 0;
          text-align: center;
          border-radius: 5px;
          &:first-child {
            margin-bottom: 30px;
            background: url("../../assets/images/index/bg.png") no-repeat;
            background-size: 100% 100%;
            p {
              color: #687aff;
            }
            span {
              color: #6b7eff;
            }
          }
          &:last-child {
            background: url("../../assets/images/index/bg5.png") no-repeat;
            background-size: 100% 100%;
            p {
              color: #8170ff;
            }
            span {
              color: #8878ff;
            }
          }
          p {
            font-size: 36px;
            margin-bottom: 20px;
          }
          span {
            font-size: 20px;
          }
        }
      }
      .rightTotal {
        background: #fff;
        width: 100%;
        box-shadow: 0px 6px 25px 0px rgba(111, 133, 255, 0.2);
        border-radius: 5px;
      }
    }
  }
  .right-box {
    width: 34%;
    padding-left: 25px;
    border-radius: 5px;

    h1 {
      font-size: 18px;
      color: #333;
      font-weight: bold;
      line-height: 30px;
      margin-bottom: 15px;
      span {
        color: #ff7465;
      }
    }
    .willDo {
      height: 150px;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      // IE设置滚动条
      -ms-scroll-chaining: chained;
      -ms-overflow-style: none;
      -ms-content-zooming: zoom;
      -ms-scroll-rails: none;
      -ms-content-zoom-limit-min: 100%;
      -ms-content-zoom-limit-max: 500%;
      -ms-scroll-snap-type: proximity;
      -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
      -ms-overflow-style: none;
      overflow: auto;
    }
    .itemThing {
      font-size: 16px;
      line-height: 30px;

      &::before {
        content: "";
        height: 10px;
        width: 10px;
        display: inline-block;
        border-radius: 50%;
        background: #ff7465;
        margin-right: 10px;
      }
    }
  }
}
</style>