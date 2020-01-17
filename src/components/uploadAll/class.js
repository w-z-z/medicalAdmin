/*
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 12:29:42
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-17 13:37:04
 */
/**
 * form参数设置
 */
class uploadFileConfig {
  constructor({
    type = 1,
    customClass = null,
    autoUpload = false,
    maxLength = 10,
    multiple = false,
    //文件类型
    accpetType = ["pdf", "docx", "doc", "jpg", "jpeg", "png", "bmp"],
    fileSize = 1048576 * 1024,
    uploadUrl = "",
    token = "",
    chooseFiles = null,
    beforUpload = null,
    uploadSuss = null,
  } = {}) {
    //类型1 单文件上传 2多文件上传
    this.type = type
    //自己定义class
    this.customClass = customClass
    //自动上传还是手动上传
    this.autoUpload = autoUpload
    //接受的文件类型
    this.accpetType = accpetType
    this.fileSize = fileSize
    //最多上传的个数限制
    this.maxLength = maxLength
    //是否可以多选
    this.multiple = multiple
    //上传的地址
    this.uploadUrl = uploadUrl
    this.token = token
    //上传前的回调 
    this.chooseFiles = chooseFiles
    this.beforUpload = beforUpload
    this.uploadSuss = uploadSuss
  }
}


export {
  uploadFileConfig
}