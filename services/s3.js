const AWS = require('aws-sdk')

const { randomString } = require('./utils')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
})

const validFolders = [
  'lessons',
  'exercises',
]

const signUrl = (folder, ext, contentType) => {
  if (!validFolders.includes(folder)) {
    throw new Error('50000')
  }

  const Key = `${folder}/${randomString(32)}.${ext}`
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key,
    ACL: 'public-read',
    ContentType: contentType,
    'Metadata':{
      CacheControl: 'max-age=2592000', // 30 days
    },
    Expires: 600, // expires link upload
  }

  return {
    signedRequest: s3.getSignedUrl('putObject', params),
    url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${Key}`,
  }
}

module.exports = {
  signUrl,
}
