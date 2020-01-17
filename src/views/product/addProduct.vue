<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2020-01-03 15:51:07
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 15:45:11
 -->
<template>
  <div>
    <div class="BreadcrumbBox">
      <breadcrumb></breadcrumb>
    </div>
    <commonPro></commonPro>
  </div>
</template>

<script>
import commonPro from "./model/commonPro";
export default {
  name: "addProduct",
  components: {
    commonPro
  }
};
</script>

<style lang="scss" scoped>
</style>