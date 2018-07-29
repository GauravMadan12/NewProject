const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Video = require('../models/video')

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
    
module.exports = router;