const mongoose=require('mongoose');

const todoSchmea=mongoose.Schema({
  name:{type:String,required:true},
  done:{type:Boolean,required:true},
  trash:{type:Boolean,required:true}
})

module.exports=mongoose.model('Todo',todoSchmea);
