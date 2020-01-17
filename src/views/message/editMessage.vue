<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2020-01-03 17:48:40
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-08 11:29:08
 -->
<template>
  <div id="editMessaage">
    <commonNews></commonNews>
  </div>
</template>

<script>
import commonNews from "./model/commonNews.vue";
export default {
  components: { commonNews }
};
</script>

<style lang="scss" scoped>
#editMessaage {
  background: #fff;
  padding: 50px;
}
</style>