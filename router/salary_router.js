
const express = require('express');
const router = express.Router();

const SalData= require('../models/salary');
router.get(`/`,async (req, res) => {

    const SalDataList =await SalData.findOne({emplid: req.body.emplid,});
    if(!SalDataList){
        res.status(500).json({
            success:false
        });
    }else{
        res.status(200).json({
            success:true,
            emplid:SalDataList.emplid
        })
    }
    res.send(SalDataList);
});

//POST request for the ());lication
router.post(`/`, async(req, res) => {

    // const user= await LogData.findOne({name: req.body.name})
    const SalDataVal = new SalData({
        emplid: req.body.emplid,
        name:req.body.name,
        salary:req.body.salary,
        month:req.body.month,

    })
    SalDataVal.save().then((createdLogData=>{
        // console.log(user.name);
        console.log("---------");
        // console.log(req.body.name);
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
router.post(`/search-emp`,async (req, res) => {

    const user= await SalData.find({emplid: req.body.emplid})
    console.log(user);
    if(!user){
        res.status(500).json({
            success:false
        });
    }else{
        res.status(200).send(user);
    }
});


module.exports=router;