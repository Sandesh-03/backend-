const mongoose = require('mongoose');
const noteschema= mongoose.Schema({
    id:{
        type : String,
        unique : true,
        required :true
    },
    usrid:{
        type : String,
        required :true
    },
 title:{
        type : String,
        required :true
    },
    content:{
        type : String
    },
    date:{
        type : Date,
        default:Date.now,
    },
});
module.exports =  mongoose.model("noteModel",noteschema);