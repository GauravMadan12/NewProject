const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
// const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')


const api = require('./server/routes/api')

const PORT = 3000

const app = express()

// app.engine('handlebars',exphbs)
// app.set('view engine','handlebars')

app.use(express.static(path.join(__dirname,'dist/App')))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use('/api',api)

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/App/index.html'))
})

app.listen(PORT,function(){
    console.log("Sever running on port " + PORT)
})