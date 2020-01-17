<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 12:29:42
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 15:40:21
 -->
<template>
  <div>
    <el-container>
      <el-header height="68px">
        <Mheader></Mheader>
      </el-header>
      <el-container>
        <el-aside width="96px">
          <Maside></Maside>
        </el-aside>
        <el-container>
          <el-main>
            <section id="content">
              <!-- <div class="BreadcrumbBox">
                <breadcrumb></breadcrumb>
              </div> -->
              <div class="mainBox">
                <router-view></router-view>
              </div>
              <el-footer>
                <Mfooter></Mfooter>
              </el-footer>
            </section>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Mheader from "./model/Mheader";
import Maside from "./model/aside/index.vue";
import Mfooter from "./model/Mfooter";
export default {
  name: "",
  components: {
    Mfooter,
    Maside,
    Mheader
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style lang="less">
#content {
  height: calc(100vh - 109px);
  display: flex;
  flex-direction: column;
}
.el-header,
.el-footer {
  padding: 0;
}
.el-aside {
  background-color: #6fa8e9;
  min-height: 100%;
  overflow: visible;
}
.el-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.el-main {
  background-color: #f9f9f9;
  // color: #333;
  padding: 20px 50px;
}
.mainBox {
  flex: 1;
}
</style> 
