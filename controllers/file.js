const { response } = require('../services/response')
const { signUrl } = require('../services/s3')

const getSignedUrl = (req, res) => {
  const {
    type,
    ext,
    content_type,
  } = req.body
  res.json(response(signUrl(type, ext, content_type)))
}

module.exports = {
  getSignedUrl,
}
