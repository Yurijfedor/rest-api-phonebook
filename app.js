const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const app = express()

const contactsRouter = require('./src/routes/api/contacts')
const authRouter = require('./src/routes/api/auth')
const filesRouter = require('./src/routes/api/files')

const { errorHandler } = require('./src/helpers/apiHelpers')
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use("/public/avatars", express.static('avatar'))

app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)
app.use('/api/files', filesRouter)

app.use(errorHandler)

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
