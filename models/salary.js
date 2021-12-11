
const mongoose=require('mongoose');

const salDataSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    emplid: {
        type:String,
        required:true
    },
    salary: {
        type:String,
        required:true
    },
    month: {
        type:String,
    }
});
module.exports = mongoose.model("saldatas", salDataSchema);