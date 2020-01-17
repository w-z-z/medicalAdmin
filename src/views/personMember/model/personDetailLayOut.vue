<!--
 * @Description: 会员详情的入口文件
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2019-12-31 17:29:47
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 19:59:58
 -->
<template>
  <div id="personList">
    <div class="BreadcrumbBox">
      <breadcrumb></breadcrumb>
    </div>
    <div class="userInfo">
      <div class="userInfoInside">
        <span>
          <span>{{getActiveUser.true_name}}（{{getActiveUser.mobile}}）</span>
          <span>{{getActiveUser.sex==1?'男':"女"}}</span>
          <span>{{ $getAge(getActiveUser.birthday*1000)}}岁</span>
        </span>
        <span>会员性质：{{getActiveUser.account_attr?personMember.accountAttr[getActiveUser.account_attr]:"未知"}}</span>
        <span>会员来源：{{getActiveUser.channel?personMember.accountfrom[getActiveUser.channel]:"未知"}}&nbsp; &nbsp; &nbsp;</span>
      </div>
    </div>
    <div id="navBtn">
      <div class="navBtnLi">
        <ul>
          <li @click="handleClick(item)"
            :class="{'activeLi':item.url==routerName}"
            v-for="(item,index) in navList"
            :key="index">
            {{item.name}}
            <span>{{item.num}}</span>
          </li>
        </ul>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { personMember } from "@/utils/selectData";
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      active: "1",
      personMember,
      navList: [
        {
          name: "健康档案",
          url: "healthReportList",
          value: "1",
          num: "0"
        },
        {
          name: "体检报告",
          url: "MedicalReports",
          value: "2",
          num: "0"
        },
        {
          name: "知情同意书",
          url: "InformedConsent",
          value: "3",
          num: "0"
        },
        {
          name: "检测项目",
          url: "GeneTestReport",
          value: "4",
          num: "0"
        },
        {
          name: "样本登记记录",
          url: "sampleForm",
          value: "5",
          num: "0"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getActiveUser", "getPersonActiveNav", "getTotalData"]),
    newActiveNav() {
      return this.getPersonActiveNav;
    },
    routerName() {
      return this.$route.name;
    }
  },
  watch: {
    getTotalData(val) {
      this.navList[0].num = val.record_num;
      this.navList[1].num = val.report_num;
      this.navList[2].num = val.consent_num;
      this.navList[3].num = val.check_num;
      this.navList[4].num = val.sample_num;
    }
  },
  created() {
    this.active = this.getPersonActiveNav;
    this.$store.dispatch("changeProductList");
    this.$store.dispatch("changeTotalData");
    // this.$route.matched[2].meta.title = "256";
    // this.$route.matched[2].meta.title = this.getActiveUser.true_name;
  },
  methods: {
    handleClick(item) {
      this.active = item.value;
      this.$store.dispatch("changePersonActiveNav", item.value);
      this.$router.push({ name: item.url });
    }
  }
};
</script>
<style lang="scss" scoped>
.userInfo {
  .userInfoInside {
    background-color: white;
    padding: 26px 30px;
    display: inline-block;
    border-radius: 3px;
    > span {
      display: inline-block;
      padding: 0 15px;
      border-left: 1px solid #d6d6d6;
      > span {
        padding: 0 5px;
        &:first-child {
          padding-left: 0;
        }
      }
      &:first-child {
        border-left: none;
        padding-left: 0;
      }
    }
  }
}
#navBtn {
  margin: 8px 0;
  .navBtnLi {
    width: 100%;
    ul {
      overflow: hidden;
      li {
        cursor: pointer;
        float: left;
        font-size: 18px;
        font-family: Microsoft YaHei;
        color: rgba(102, 102, 102, 1);
        padding: 12px 22px;
        &.activeLi {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          position: relative;
          color: rgba(111, 168, 233, 1);
          &::after {
            content: "";
            width: 30px;
            position: absolute;
            height: 6px;
            background: rgba(111, 168, 233, 1);
            border-radius: 3px;
            bottom: 0px;
            right: calc(50% - 15px);
          }
        }
      }
    }
  }
}
</style>
