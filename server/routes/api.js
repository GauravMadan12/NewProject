const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Video = require('../models/video')
const Regis = require('../models/register')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
var http = require("http");


var urlencoded = bodyParser.urlencoded({extended:true})

const db = "mongodb://gauravuser:gaurav12@ds123971.mlab.com:23971/gmdata"
mongoose.Promise = global.Promise

mongoose.connect(db,function(err){
    if(err){
        console.error("Error!"+err)
    }
})

// Get all data
router.get('/videos',function(req,res){
    console.log("Get req for all data")
    Video.find({})
    .exec(function(err,videos){
        if(err){
        console.log("Error retrieving data")
    }
    else{
        res.json(videos)
    }
    })
})

//Post data
router.post('/video',function(req,res){
    console.log("Post a video")
    var newVideo = new Video()
    newVideo.name = req.body.name;
    newVideo.email = req.body.email;
    newVideo.password  = req.body.password
    newVideo.save(function(err,insertedVideo){
        if(err){
            console.log("Error saving video")
        }
        else{
            res.json(insertedVideo)
        }
    })
})

// Login 
router.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    Video.findOne({ email:email, password: password},function(err,videos){
        if(err){
            console.log(err)
            return res.status(500).send()
        }
        if(!videos){
            return res.status(404).send()
        }
        else{
            return res.json(videos)
        }
    })
})
    
//Post data to add contact
router.post('/register',function(req,res){
    console.log("Add new contact")
    var newReg = new Regis()
    newReg.created = req.body.created;
    newReg.name = req.body.name;
    newReg.email = req.body.email;
    newReg.phone  = req.body.phone;
    newReg.save(function(err,insertedData){
        if(err){
            console.log("Error saving data")
        }
        else{
            res.json(insertedData)
        }
    })
})

// Sending Messages
router.get('/send',function(req,res,next){
    router.render('api.msg91.com/api/sendhttp.php',{
        sender:req.body.sender,
        route:req.body.route,
        mobiles:req.body.mobiles,
        authkey:req.body.authkey,
        country:req.body.country,
        message:req.body.message
    })
})

// Sending Mails
router.post('/mails',(req,res)=>{
    const output = `<h3>Messgae:</h3>
        <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'gmadan046@gmail.com', // generated ethereal user
            pass: '********' // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"GM Productions" <gmadan046@gmail.com>', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: 'Hello world?', // plain text body
        html:  output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('mail',{msg:'Email has been sent'})
    });
});

    // Group Component
    router.post('/data',function(req,res){
        var created = req.body.created;
        Regis.find({created:created},function(err,videos){
            if(err){
                console.log(err)
                return res.status(500).send()
            }
            if(!videos){
                return res.status(404).send()
            }
            else{
                return res.json(videos)
            }
        })
    })


   // Sending Group Emails
   router.post('/gpmails',(req,res)=>{
      var data =  req.body.value;
  
      data.forEach(element => {
          
      
    const output = `<h3>Message:</h3>
        <p>${req.body.data}</p>
    `
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'gmadan046@gmail.com', // generated ethereal user
            pass: '*********' // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"GM Productions" <gmadan046@gmail.com>', // sender address
        to: element, // list of receivers
        subject: req.body.sub, // Subject line
        text: 'Hello world?', // plain text body
        html:  output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // res.render('mail',{msg:'Email has been sent'})
    });
    });
});
 
module.exports = router;