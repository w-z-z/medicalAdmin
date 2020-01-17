/*
 * @Description: 文件上传前的数据拆分和拼接
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-01-14 11:30:45
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-17 14:26:05
 */
import * as qiniu from "qiniu-js";
//选择的文件数组
let allFiles = []
// 初始化数据配置
let initConfig = {}
//文件上传的状态
export function initUploadConfig(obj, arr) {
  initConfig = obj
  allFiles = arr
};
//选择文件
export function hanelChooseFiles(files) {
  return new Promise((resove, reject) => {
    for (let file of files) {
      //检查文件是否符合配置条件
      //配置
      const upType = initConfig.accpetType; //接受类型
      const fileSizeLimit = initConfig.fileSize //文件大小
      const maxLength = initConfig.maxLength //文件个数
      if (allFiles.length >= maxLength || files.length > maxLength) {
        reject(`最多允许上传${maxLength}份文件`)
        break;
      }
      //当前文件属性
      let postfix = getType(file.name);
      let fileInfo = {
        file_name: file.name,
        file_size: file.size,
        file_kind: file.type,
        file_type: postfix,
        postfix: postfix,
      }
      if (fileInfo.file_size > fileSizeLimit) {
        reject(`文件大小应小于${fileSizeLimit / 1024 / 1024}M`)
        break;
      }
      if (upType.indexOf(fileInfo.postfix) === -1) {
        reject(`请上传正确的文件类型`)
        break;
      };
      //获取文件base64
      getImgBase64(file).then(res => {
        fileInfo['uploadStatus'] = 'first';
        fileInfo['file'] = file;
        fileInfo['percentage'] = 0;
        fileInfo['file_url'] = res;
        fileInfo['upload_name'] = new Date().getTime() + Math.ceil(Math.random() * 100);
        fileInfo['uploadStatus'] = 'first';
        if (initConfig.type == 2) {
          //自动上传
          allFiles.push(fileInfo)
        } else {
          allFiles = allFiles.concat([fileInfo])
        }
        //如果传入了文件上传的回调
        if (initConfig.chooseFiles) {
          initConfig.chooseFiles({
            allFiles,
            fileInfo,
            index: allFiles.length - 1
          }, resove)
        } else {
          resove({
            allFiles,
            fileInfo,
            index: allFiles.length - 1
          })
        }

      })
    }
  })
}
//文件上传的方法
export function UploadFiles(item, _index, type) {
  return new Promise((resovebox, rejectbox) => {

    let newFiles = []
    //自动上传//重传
    if (type) {
      newFiles = [allFiles[_index]]
      //手动上传
    } else {
      newFiles = [...allFiles]
    }
    let c_newFiles = [];
    newFiles.map(item => {
      if (!item.uploadStatus || item.uploadStatus == 'first') {
        c_newFiles.push(item)
      }
    })
    if (c_newFiles.length <= 0) {
      rejectbox("暂无数据上传")
    }
    //如果传入一波了文件上传前的回调
    if (initConfig.beforUpload) {
      initConfig.beforUpload(c_newFiles)
    }
    c_newFiles.map((item, index) => {
      let {
        file,
        file_name,
        postfix,
        file_kind,
        upload_name,
        percentage,
      } = item;

      new Promise((resove, reject) => {
        let nameFiles = `${upload_name}${postfix}`;
        const observable = qiniu.upload(
          file,
          nameFiles,
          initConfig.token, {
            fname: file_name,
            params: {},
            mimeType: [file_kind]
          }, {
            useCdnDomain: true
          }
        );
        observable.subscribe(
          function (res) {
            let currentIndex = type ? _index : index
            allFiles[currentIndex].percentage = res.total.percent
          },
          function (error) {
            let currentIndex = type ? _index : index
            allFiles[currentIndex].uploadStatus = false
            reject(error)
            rejectbox(error)
          },
          function (backData) {
            let currentIndex = type ? _index : index
            if (c_newFiles.length - 1 == index) {
              //最后一个文件上传完成
              if (initConfig.uploadSuss) {
                initConfig.uploadSuss(newFiles)
              }
              resovebox(pickSuccData(newFiles))
            }
            //图片
            if (postfix == 'png' || postfix == 'jpg' || postfix == 'jpeg' || postfix == 'bmp') {
              initImg(initConfig.uploadUrl + backData.key).then(res => {
                allFiles[currentIndex].uploadStatus = true
                allFiles[currentIndex].file_url = initConfig.uploadUrl + backData.key;
                resove(allFiles[currentIndex])
              })
              //非图片
            } else {
              allFiles[currentIndex].uploadStatus = true
              allFiles[currentIndex].file_url = initConfig.uploadUrl + backData.key;
              resove(allFiles[currentIndex])
            }
          }
        )
      })
    })
  })

};

//挑选已上传成功的数据
function pickSuccData(newFiles) {
  let data = []
  newFiles.map(ite => {
    if (ite.uploadStatus) {
      data.push(ite)
    }
  })
  return data
}

//删除
export function deleteFile(index) {
  allFiles.splice(index, 1);
}
//获取文件后缀
function getType(file) {
  var filename = file;
  var index1 = filename.lastIndexOf(".") + 1;
  var index2 = filename.length;
  var type = filename.substring(index1, index2);
  return type;
};
//图片加载成功的回调方法
async function initImg(isrc) {
  await new Promise(resolve => {
    var Img = new Image();
    Img.src = isrc;
    Img.onload = function () {
      resolve(true)
    }
  });
}
//获取图片base64
async function getImgBase64(file) {
  return await new Promise((resolve, reject) => {
    if (window.FileReader) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        resolve(e.target.result);
      };
    } else {
      reject("不支持读取文件的方法")
    }
  })
}