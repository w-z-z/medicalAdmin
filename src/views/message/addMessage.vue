<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2020-01-02 16:59:37
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 15:45:55
 -->
<template>
  <div>
    <div class="BreadcrumbBox">
      <breadcrumb></breadcrumb>
    </div>
    <div id="addMessaage">

      <commonNews></commonNews>
    </div>
  </div>

</template>

<script>
import commonNews from "./model/commonNews.vue";
export default {
  components: { commonNews }
};
</script>

<style lang="scss">
#addMessaage {
  background: #fff;
  padding: 50px;
}
</style>