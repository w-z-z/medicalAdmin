/*
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 12:29:42
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-15 10:26:04
 */
// vue.config.js
const fs = require('fs')
module.exports = {
  outputDir: process.env.outputDir,
  css: {
    loaderOptions: {
      sass: {
        prependData: fs.readFileSync('src/styles/globals.scss', 'utf-8')
      }
    }
  },
  //   chainWebpack: (config)=>{
  //     config.resolve.alias
  //         .set('@components',resolve('src/components'))

  // }
}