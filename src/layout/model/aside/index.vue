<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 14:26:54
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 17:25:41
 -->
<template>
  <div id="Maside">
    <ul class="navList">
      <li @click="changeRouter(item,index)"
        v-for="(item,index) in getRouters"
        :key="index"
        :class="[{'activeLi':item.meta.Mid==nowMid}]"
        v-show="item.isMenu">
        <span class="iconfontBox">
          <i :class="['iconfont',item.icon]"></i>
        </span>
        <span class="title">{{ item.meta.title}}</span>
      </li>
    </ul>
    <!-- <div v-if="showChilds"
      class="childNav">
      <button @click="showChilds=false">关闭</button>
      <ul class="childNavList">
        <li @click="changeRouter(child)"
          v-for='(child,index ) in  childRouter'
          :key='index'>
          {{child.meta.title}}
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Maside",
  data() {
    return {
      activeIndex: "0",
      showChilds: false
    };
  },
  computed: {
    ...mapGetters(["getRouters"]),
    nowMid() {
      return this.$route.meta.Mid;
    },
    childRouter(index) {
      return this.getRouters[this.activeIndex].children;
    }
  },
  methods: {
    openNav(item, index) {
      if (item.children && item.children.length >= 1) {
        // this.activeIndex = index;
        this.showChilds = true;
      } else {
        this.$router.push({
          name: item.name
        });
      }
    },
    changeRouter(item, index) {
      // this.activeIndex = index;
      this.$router.push({
        name: item.name
      });
    }
  },
  created() {},
  mounted() {},
  watch: {
    getRouters(value) {
      // console.log(value);
    }
  }
};
</script>


<style  lang='less' scoped>
#Maside {
  position: relative;
  padding-top: 50px;
  height: 100%;
  color: white;
  .navList {
    text-align: center;
    li {
      height: 96px;
      padding: 15px 0;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        color: #333;
      }
      .iconfontBox {
        display: block;
        width: 100%;
        padding-top: 6px;
        i {
          font-size: 32px;
          margin-bottom: 13px;
        }
      }
      .title {
        display: block;
      }
    }
    .activeLi {
      background-color: white;
      color: #333;
      &:hover {
        background-color: white;
      }
    }
  }
  // .childNav {
  //   position: absolute;
  //   left: 100%;
  //   width: 130px;
  //   top: 0;
  //   height: 100%;
  //   bottom: 0;
  //   background: white;
  //   z-index: 1;
  //   .childNavList {
  //     margin-top: 50px;
  //     li {
  //       border-left: 5px solid #8cb9ed;
  //       height: 40px;
  //       cursor: pointer;
  //       text-align: center;
  //       margin: 10px 0;
  //       color: #8cb9ed;
  //       line-height: 40px;
  //       &:hover {
  //         background: rgba(109, 127, 228, 0.1);
  //       }
  //     }
  //   }
  // }
}
</style>
