
// Defining the schema
const mongoose=require('mongoose');

const roosterDataSchema = mongoose.Schema({
    mm:{
        type:String,
        required:true,
    },
    mt:{
        type:String,
        required:true,
    },
    mw:{
        type:String,
        required:true,
    },
    mth:{
        type:String,
        required:true,
    },
    mf:{
        type:String,
        required:true,
    },
    nm:{
        type:String,
        required:true,
    },
    nt:{
        type:String,
        required:true,
    },
    nw:{
        type:String,
        required:true,
    },
    nth:{
        type:String,
        required:true,
    },
    nf:{
        type:String,
        required:true,
    },
});

//Compiling the model
module.exports = mongoose.model("roosterdatas", roosterDataSchema);
