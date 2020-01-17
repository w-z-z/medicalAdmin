import axios from 'axios';
import JSZip from 'jszip'; //打包压缩必备，参考链接https://stuk.github.io/jszip/
import FileSaver from 'file-saver'; //文件保存至本地，参考链接https://github.com/eligrey/FileSaver.js/
//单个下载文件
function getFile(file, type = 1) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: file.file_url,
      responseType: 'arraybuffer',
    }).then(res => {
      resolve(res)
      if (type == 1) {
        let url = window.URL.createObjectURL(new Blob([res]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", `${new Date().getTime()}.${file.file_type}`);
        document.body.appendChild(link);
        link.click();
      }
    }).catch(error => {
      reject(error.toString())
    })
  })
}

//批量下载文件
async function handleBatchDownload(selectImgList) {
  const self = this
  const data = selectImgList;
  const zip = new JSZip()
  const cache = {}
  const promises = []
  await data.forEach((item, key) => {
    const promise = getFile(item, 2).then(dta => { // 下载文件, 并存成ArrayBuffer对象
      const file_name = new Date().getTime() + '.' + item.file_type
      zip.file(file_name, '4', {
        binary: true
      })
      cache[file_name] = dta
    })
    promises.push(promise)
  })
  Promise.all(promises).then(() => {
    zip.generateAsync({
      type: "blob"
    }).then(content => { // 生成二进制流
      FileSaver.saveAs(content, new Date().getTime() + '.zip') // 利用file-saver保存文件
    }).catch(err => {
      this.$showMsg("下载失败");
    })
  })

}
let uploadFile = function (url, type = 1) {
  //单个文件下载
  if (type == 1) {
    // 下载图片
    getFile(url, 1)
  } else {
    handleBatchDownload(url)
  }
}


export default uploadFile