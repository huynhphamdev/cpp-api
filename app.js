const express = require('express')
require('express-async-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const { execSync } = require('child_process')
const _ = require('lodash')

const { version } = require('./package.json')
const routes = require('./routes')
const { exception } = require('./services/response')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan(function (tokens, req, res) {
  const status = tokens.status(req, res)
  if (status < 400 || Number(status) === 404) return null
  return [
    req.headers['x-forwarded-for'] || req.ip,
    tokens.method(req, res),
    tokens.url(req, res),
    JSON.stringify(req.body),
    tokens.status(req, res),
    tokens['response-time'](req, res),
    'ms',
  ].join(' ')
}))

app.get('/', (req, res) => {
  res.json({
    meta: {
      code: 200,
      error_type: 'UNKNOWN',
      message: 'API server is running.',
      version,
      revision: process.env.REVISION,
    },
  })
})
app.use('/admin', routes.admin)
app.use('/user', routes.user)

// error handler
app.use(function (err, req, res, next) {
  if (err) {
    const { error: meta, status } = exception(err)
    const finalStatus = res.statusCode !== 200 ? res.statusCode : status
    res.status(finalStatus).json({
      meta,
    })

    if (status.code !== '10001') {
      console.log('[error]', _.get(req, ['currentUser', 'id'], ''), JSON.stringify(meta))
      console.log('[error_stack]', err.stack)
    }
    return
  }

  next()
})

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).json({ message: 'Not found' })
})

try {
  console.log(execSync('npm run migrate').toString()) // to escape buffer characters
} catch (e) {
  console.log('[error]', e.toString())
}

module.exports = app
