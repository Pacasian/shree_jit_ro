const mongoose=require('mongoose');

const logDataSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    }, email: {
        type:String,
        required:true
    }, roosterId: {
        type:String,
    }
});

module.exports = mongoose.model("logdatas", logDataSchema);
