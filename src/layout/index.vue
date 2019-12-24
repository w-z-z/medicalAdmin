<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 12:29:42
 * @LastEditors  : ranli
 * @LastEditTime : 2019-12-24 09:30:53
 -->
<template>
  <div>
    <Mheader></Mheader>
    <!-- 内容 -->
    <Maside></Maside>
    <section id="content">
      <router-view></router-view>
    </section>
    <Mfooter></Mfooter>
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
  background-color: rgb(233, 233, 233);
  min-height: calc(100vh - 200px);
  padding-top: 100px;
}
</style> 
