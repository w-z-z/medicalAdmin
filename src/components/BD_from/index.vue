<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 12:29:42
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-08 16:20:41
 -->
<template>
  <el-form :model="formData"
    :class="renderFromConfig.coustomClass"
    v-bind="{...renderFromConfig}">
    <slot></slot>
    <slot name="slot-btn">
      <el-form-item class="BtnBox">
        <el-button @click="submitForm()"
          v-bind="renderFromConfig.okBtn">{{renderFromConfig.okBtn.label}}</el-button>
        <el-button v-if="renderFromConfig.noBtn.show"
          @click="resetForm()"
          v-bind="renderFromConfig.noBtn">{{renderFromConfig.noBtn.label}}</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>

<script>
import { FormConfigClass } from "./class";
export default {
  name: "BD-from",
  components: {},
  props: {
    formData: {
      type: [Object],
      default: null
    },
    fromConfig: {
      type: [Object],
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {
    renderFromConfig() {
      if (this.fromConfig) {
        return new FormConfigClass(this.fromConfig);
      } else {
        return new FormConfigClass();
      }
    }
  },
  methods: {
    submitForm() {
      let { ref } = this.renderFromConfig;
      this.$refs[ref].validate(valid => {
        if (valid) {
          this.$emit("submitForm");
        } else {
          console.log("验证不通过");
          return false;
        }
      });
    },
    resetForm() {
      let { ref } = this.renderFromConfig;
      this.$refs[ref].resetFields();
      this.$emit("resetForm");
    }
  },
  created() {
    this.$nextTick(() => {
      // console.log(new FormConfigClass());
      // console.log(this.$refs);
    });
  }
};
</script>

<style scoped>
</style>
