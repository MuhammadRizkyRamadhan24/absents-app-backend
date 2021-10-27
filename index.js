const express = require('express')
const path = require('path')
const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  const data = {
    success: true,
    message: 'backend is run well'
  }
  return res.json(data)
})

const authRoute = require('./src/routes/auth')
const userRoute = require('./src/routes/users')
const absentRoute = require('./src/routes/absents')
const dailyRoute = require('./src/routes/daily_reports')

app.use('/static', express.static(path.join(__dirname, 'src/public')))
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/absent', absentRoute)
app.use('/daily', dailyRoute)

const port = process.env.PORT || 8880

app.listen(port || 8880, () => {
  console.log(`app running on port ${port}`)
})