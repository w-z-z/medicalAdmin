/*
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 12:29:42
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-08 15:45:04
 */
/**
 * form参数设置
 */
class FormConfigClass {
  constructor({
    rules = null,
    inline = false,
    ref = 'ruleForm',
    labelWidth = '80px',
    size = 'default',
    labelPosition = 'right',
    okBtn = {
      label: "确 定",
      type: "danger",
      show: true
    },
    noBtn = {
      label: "取 消",
      show: true
    },
    coustomClass = "",
    btnAlain = "center",
    disabled = false,
    validateOnRuleChange = false,
  } = {}) {
    this.rules = rules
    this.inline = inline
    this.ref = ref
    this.labelWidth = labelWidth
    this.size = size
    this.labelPosition = labelPosition
    this.okBtn = okBtn
    this.noBtn = noBtn
    this.disabled = disabled
    this.btnAlain = btnAlain
    this.coustomClass = coustomClass
    this.validateOnRuleChange = validateOnRuleChange
  }
}


export {
  FormConfigClass
}