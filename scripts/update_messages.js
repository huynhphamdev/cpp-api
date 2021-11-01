const fs = require('fs')
const apisauce = require('apisauce')

const errorResult = {}

// server errors
const ggApi = apisauce.create({
  responseType: 'text/csv',
})

ggApi.get('').then(async (response) => {
  if (!response.data) {
    process.exit(0)
  }
  response.data.split(/\r?\n/).forEach((row, index) => {
    if (index === 0) return
    const col = row.split(',')

    errorResult[col[0]] = {
      code: col[0],
      error_type: col[1],
      error_message: col[2],
    }
  })

  await fs.writeFileSync('./i18n/error_messages.json', JSON.stringify(errorResult))
  console.log('Error messages updated.')
  process.exit(0)
})