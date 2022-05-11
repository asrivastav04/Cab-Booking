const { prototype } = require('events')
const express = require('express')

const app = express()

const driverRouter = require('./routes/driver')
const riderRouter = require('./routes/rider')

app.use('/driver', driverRouter)
app.use('/rider', riderRouter)

app.use(express.json())

app.listen(3000, ()=> console.log("Listening to port"))