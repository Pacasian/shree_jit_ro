
const express = require('express');
const router = express.Router();

const roosterData= require('../models/rooster');
router.get(`/`,async (req, res) => {

    const roosterDataList =await roosterData.find();
    if(!roosterDataList){
        res.status(500).json({
            success:false
        });
    }else{
        res.status(200).send(roosterDataList);
    }
    res.send(roosterDataList);
});

//POST request for the ());lication
router.post(`/`, async(req, res) => {

    // const user= await LogData.findOne({name: req.body.name})
    const roosterDataVal = new roosterData({
        mm: req.body.mm,
        mt: req.body.mt,
        mw:req.body.mw,
        mth:req.body.mth,
        mf:req.body.mf,
        nm: req.body.nm,
        nt: req.body.nt,
        nw:req.body.nw,
        nth:req.body.nth,
        nf:req.body.nf,

    })
    roosterDataVal.save().then((createdLogData=>{
        console.log("---------");
        res.status(200).json({
            success:true
        })
    })).catch((err)=>{
        res.status(500).json({
            success:false
        })
    })
//   res.send(newUser);
});


//POST request for the Logging into flutter routerlication
router.post(`/search`,async (req, res) => {

    const user= await roosterData.find({mm: req.body.mm})
    console.log(user);
    if(!user){
        res.status(500).json({
            success:false
        });
    }else{
        res.status(200).json({
            success:true,
            mm:user.mm
        })
    }
});


module.exports=router;