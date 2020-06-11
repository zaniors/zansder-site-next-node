const qiniu = require('qiniu')
const qiniuConfig = require('../config/qiniu.config')

qiniu.conf.ACCESS_KEY = qiniuConfig.access_key
qiniu.conf.SECRET_KEY = qiniuConfig.secret_key

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
    const bucket = qiniuConfig.bucket
    const config = new qiniu.conf.Config({
      zone: qiniu.zone.Zone_z2
    })
    const formUploader = new qiniu.form_up.FormUploader(config)
    const extra = new qiniu.form_up.PutExtra()
    const token = this.uptoken(bucket, filename)

    return new Promise((resolve, reject) => {
      formUploader.putFile(token, filename, localFile, extra, function (err, ret, info) {
        if (err) {
          reject(err)
        } else {
          if (info.statusCode === 200) {
            resolve(ret.key)
          } else {
            reject(ret.error)
          }
        }
      });
    })
  }
}



module.exports = new QiniuUploader()