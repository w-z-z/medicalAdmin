<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 12:29:42
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 15:41:26
 -->
<template>
  <div id="editProduct">
    <div class="BreadcrumbBox">
      <breadcrumb></breadcrumb>
    </div>
    <commonPro></commonPro>
  </div>
</template>

<script>
import commonPro from "./model/commonPro";
export default {
  name: "editProduct",
  components: {
    commonPro
  }
};
</script>

<style lang="scss">
</style>
