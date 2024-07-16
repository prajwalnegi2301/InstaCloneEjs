const mongoose = require('mongoose');
const plm= require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/postforgolus");

const postSchema= new mongoose.Schema({
    postText:{
        type:String,
        require:true,
    },
    likes:{
        type:Array,
        default:[]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
    }
})


plugin(plm);
module.exports = moongose.connect(postSchema,"Posts");
