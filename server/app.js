require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const router = require('./routers/router')
const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(errorHandler)

module.exports = app

