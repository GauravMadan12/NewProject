const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Video = require('../models/video')
const Regis = require('../models/register')
const bodyParser = require('body-parser')

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

module.exports = router;