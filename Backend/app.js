const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const loginRouter = require('./controllers/login')
const newsRouter = require('./controllers/news')
const dialogFlowRouter = require('./controllers/dialogFlow')
const app = express()
const config = require('./utils/config')

mongoose.connect(config.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

app.use(cors())
app.use(express.json())
app.use('/login', loginRouter)
app.use('/news', newsRouter)
app.use('/', dialogFlowRouter)
app.use(express.static('build'))

module.exports = app
