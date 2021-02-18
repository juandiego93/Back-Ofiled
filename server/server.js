require('./config/config')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(require('./routes/index'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.listen((process.env.PORT), function () {
    console.log('Server running:', process.env.PORT);
})

mongoose.set('useCreateIndex', true)
mongoose.connect(
    process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (!err) {
            console.log('DB conneccted', process.env.URLDB);
        } else {
            console.log('Error connecting', err);
        }
    })