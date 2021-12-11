
const express = require('express');
const router = express.Router();

const LogData= require('../models/user');
// const SalData = require("../models/salary");
router.get(`/`,async (req, res) => {

    const logDataList =await LogData.find();
    if(!logDataList){
        res.status(500).json({
            success:false
        });
    }else{
        res.status(200).send(logDataList)
    }
    res.send(logDataList);
});

//POST request for the ());lication
router.post(`/`, async(req, res) => {

    // const user= await LogData.findOne({name: req.body.name})
    const logVal = new LogData({
        name: req.body.name,
        email:req.body.email,
        roosterId:req.body.roosterId
    })
    logVal.save().then((createdLogData=>{
        console.log("---------");
        res.status(200).json(createdLogData)
    })).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
//   res.send(newUser);
});



//POST request for the Logging into flutter routerlication
router.post(`/log-emp`,async (req, res) => {

    const user= await LogData.findOne({email: req.body.email})
    if(!user){
        res.status(500).json({
            success:false
        });
    }else{
        res.status(200).send(user)
    }
});

module.exports=router;