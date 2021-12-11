
const mongoose=require('mongoose');

const requestDataSchema = mongoose.Schema({
      emplid:{
            type:String,
            required:true,
      },
      cat:{
            type:String,
            required:true,
      },
      msg:{
            type:String,
            required:true,
      }
});


module.exports = mongoose.model("requestdatas", requestDataSchema);
