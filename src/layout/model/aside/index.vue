<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 14:26:54
 * @LastEditors  : ranli
 * @LastEditTime : 2019-12-24 09:33:21
 -->
<template>
  <div id='Maside'>
    <!-- {{getRouters}}1 -->
    45
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Maside",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getRouters"])
  },
  methods: {},
  created() {},
  mounted() {},
  watch: {}
};
</script>


<style  lang='less' scoped>
#footer {
  width: 100%;
  height: 100px;
  background-color: rgb(161, 127, 255);
}
</style>
