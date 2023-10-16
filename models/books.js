const mongoose=require('mongoose');
const BookSchema= new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   author:{
    type:String
   },
   isbn:{
    type:String,
    required:true
   }
})
module.exports=mongoose.model('books',BookSchema)