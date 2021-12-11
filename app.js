const express=require('express');
const app=express();
const morgan=require('morgan');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors= require('cors');


require('dotenv/config');
const api= process.env.API_URL;
app.use(morgan('tiny'));
app.use(cors());

var fs = require('fs');
var path = require('path');
//<------------------------------------------------------------------------------------>
//middleware calling section
// Express v4.16.0 and higher
// --------------------------
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// For Express version less than 4.16.0
// ------------------------------------
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.listen(process.env.PORT || 3000, () => {
    console.log(api);
    console.log("Server running on port 3000, http://localhost:3000/");
});

//<------------------------------------------------------------------------------------>


//create connection


//Mongoose Database connection
//Mongoose online database connection database name --recipe-database
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "restaurant-database",
    })
    .then(() => {
        console.log("Database connected....");
    })
    .catch((err) => {
        console.log(err);
    });



//Create new Database in MongoBD Atlas
//
// const logDataSchema = mongoose.Schema({
//     name: {
//         type:String,
//         required:true
//       },
//     password: {
//       type:String,
//       required:true
//     },
//     counter: Number
//   });
//
// const LogData = mongoose.model("logdatas", logDataSchema);
//
//
//   app.get(`${api}/logdatas`,async (req, res) => {
//
//     const logDataList =await LogData.findOne({name: req.body.name,password:req.body.password});
//     if(!logDataList){
//         res.status(500).json({
//             success:false
//         });
//     }else{
//       res.status(200).json({
//         success:true,
//         name:logDataList.name
//       })
//     }
//     res.send(logDataList);
//   });
//
//   //POST request for the application
//   app.post(`${api}/logdatas`, async(req, res) => {
//
//     // const user= await LogData.findOne({name: req.body.name})
//     const logVal = new LogData({
//       name: req.body.name,
//       password: req.body.password
//     })
//     logVal.save().then((createdLogData=>{
//       console.log(user.name);
//       console.log("---------");
//       console.log(req.body.name);
//         res.status(200).json(createdLogData)
//       })).catch((err)=>{
//           res.status(500).json({
//               error:err,
//               success:false
//           })
//       })
//   //   res.send(newUser);
//   });
//
//
//   //POST request for the Logging into flutter application
//   app.post(`${api}/logging`,async (req, res) => {
//
//     const user= await LogData.find({name: req.body.name})
//     console.log(user);
//     if(!user){
//       res.status(500).json({
//           success:false
//       });
//   }else{
//     res.status(200).json({
//       success:true,
//       name:user.name
//     })
//   }
// });
//
//
//





const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    maker: {
        type: String,
        // required: true,
    },
    calories: {
        type: String,
        // required: true,
    },
    image: {
        type: String,
        // required: true,
    },
    time: {
        type: String,
        // required: true,
    },

    category: {
        type: String,
        // required: true,
    },
    jobLevel: {
        type: String,
        // required: true,
    }
});

const recipeData = mongoose.model(
    "recipes",
    recipeSchema
);



app.post(`${api}/recipe`,async(req,res)=>{

    const recipeVal= new recipeData({
        title:req.body.title,
        maker:req.body.maker,
        calories:req.body.calories,
        category:req.body.category,
        image:req.body.image,
        time:req.body.time,
        jobLevel:req.body.jobLevel,
    });
    recipeVal.save().then((createdRecipeData=>{
        // console.log(user.name);
        console.log("---------");
        console.log(req.body.title);
        res.status(200).json(createdRecipeData)
    })).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
});



app.get(`${api}/recipe`,async(req,res)=>{
    const recipeList=await recipeData.find();
    if(!recipeList){
        res.status(500).json({
            success:false
        });
    }else{
        res.status(200).send(recipeList);

    }
    res.send(recipeList);
});
app.post(`${api}/recipeByCategory`,async (req, res) => {

    const recipeList= await recipeData.find({category: req.body.category})
    console.log(recipeList);
    if(!recipeList){
        res.status(500).json({
            success:false
        });
    }else{
        res.status(200).send(recipeList);
    }
});



const recipeLoginSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    }
});
const recipeLoginData = mongoose.model(
    "recipes-login",
    recipeLoginSchema
);



app.post(`${api}/recipe-new-member`,async(req,res)=>{

    const recipeNewMemberVal= new recipeLoginData({
        username:req.body.username,
        password:req.body.password,
        name:req.body.name,
        email:req.body.email
    });
    recipeNewMemberVal.save().then((createdRecipeData=>{
        // console.log(user.name);
        console.log("---------");
        console.log("success");
        res.status(200).json({success:true})
    })).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
});
// "maker_id": "61a8eac32f66550023a8dcf4"

app.post(`${api}/recipe-login`,async (req, res) => {

    const recipeLoginList= await recipeLoginData.find({username: req.body.username,password: req.body.password,})
    console.log(recipeLoginList);
    if(!recipeLoginList){
        res.status(500).json({
            success:false
        });
    }else{
        res.status(200).send(recipeLoginList);
    }
});

const userDataRouters= require('./router/user_router');
app.use(`${api}/userDatas`,userDataRouters);

// user enter of the recipe into the database
const recipeAddRouters= require('./router/salary_router');
app.use(`${api}/new-salary`,recipeAddRouters);
// user enter of the recipe into the database
const roosterRouters= require('./router/rooster_router');
app.use(`${api}/new-rooster`,roosterRouters);
// user enter of the recipe into the database
const requestRouters= require('./router/request_route');
app.use(`${api}/new-request`,requestRouters);