const standardizeQueryString = (query) => {
  return query.toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
}

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const POSSIBLE_CHARACTERS = 'abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const randomString = (length = 8) => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += POSSIBLE_CHARACTERS.charAt(Math.floor(Math.random() * 56))
  }
  return result
}

module.exports = {
  sleep,
  randomString,
  standardizeQueryString,
}
