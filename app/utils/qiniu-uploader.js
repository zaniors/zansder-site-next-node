const qiniu = require('qiniu')

qiniu.conf.ACCESS_KEY = 'p6oilamckbozaQPgnd2DnEzbA_sFz-bBQTfB23lD'
qiniu.conf.SECRET_KEY = 'SZwaNoyVNUi5mC7HMwKgx9muxaZt4Ck8WoFys0sO'

class QiniuUploader {
  /**
   * 七牛云上传策略
   * @param {*} bucket 七牛云空间名称
   * @param {*} key 空间中的资源名
   */
  uptoken(bucket, key) {
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: bucket + ":" + key
    })
    return putPolicy.uploadToken()
  }

  uploadFile(filename, localFile) {
    const bucket = 'cdn'
    const config = new qiniu.conf.Config({
      zone: qiniu.zone.Zone_z2
    })
    const formUploader = new qiniu.form_up.FormUploader(config)
    const extra = new qiniu.form_up.PutExtra()
    const token = this.uptoken(bucket, filename)

    formUploader.putFile(token, filename, localFile, extra, function (err, ret) {
      if (!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId, 'success')
      } else {
        // 上传失败， 处理返回代码
        console.log(err, 'error')
      }
    });
  }
}



module.exports = new QiniuUploader()