
const express = require('express');
const router = express.Router();

const requestData= require('../models/request');
router.get(`/`,async (req, res) => {

      const requestDataList =await requestData.find();
      if(!requestDataList){
            res.status(500).json({
                  success:false
            });
      }else{
            res.status(200).send(requestDataList)
      }
      res.send(requestDataList);
});

//POST request for the ());lication
router.post(`/`, async(req, res) => {

      // const user= await LogData.findOne({name: req.body.name})
      const requestDataVal = new requestData({
            emplid: req.body.emplid,
            cat:req.body.cat,
//             msg:req.body.msg,

      })
      requestDataVal.save().then((createdLogData=>{
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
router.post(`/logging`,async (req, res) => {

      const user= await requestData.find({emplid: req.body.emplid})
      console.log(user);
      if(!user){
            res.status(500).json({
                  success:false
            });
      }else{
            res.status(200).json({
                  success:true,
                  name:user.name
            })
      }
});


module.exports=router;
