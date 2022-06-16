require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const router = require('./routes/router')
const db = require('./config/config').database
const port = process.env.PORT || 1000

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:8080'
    ],
    credentials: true,
}))
app.use(helmet())
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    cookie: {
        path: '/',
        httpOnly: false,
    },
    secret: "MY_SECRET",
    resave: false,
    saveUninitialized: true
}))


app.use('/api', router)


mongoose.Promise = global.Promise
mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true})

const con = mongoose.connection;

con.on('error', console.error.bind(console, 'connection error:'));

con.once('open', function () {
    console.log("Connection Successful!");
    
    app.listen(port, () => {
        console.log('====================================')
        console.log(`http://localhost:${port}`)
        console.log('====================================')
    })
});
