const messages = require('../i18n/error_messages')

const response = (res, options = {}) => ({
  meta: Object.assign({
    code: 200,
    error_type: null,
    error_message: null,
  }, options),
  data: res,
})

const exception = (error) => {
  const { message } = error.errors && error.errors.length > 0 ? // for sequelize validation error
    error.errors[0] :
    error

  if (messages[message]) {
    return {
      error: messages[message],
      status: 400,
    }
  } else {
    return {
      error: {
        code: 0,
        error_type: 'UNKNOWN',
        error_message: message,
      },
      status: 500,
    }
  }
}

module.exports = {
  response,
  exception,
}
