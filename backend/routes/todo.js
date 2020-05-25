const express=require('express');
const Todo =require('../models/todo');
const router=express.Router();


router.post("",(req,res,next)=>{

    const todo= new Todo({
                        name:req.body.name,
                        done:req.body.done,
                        trash:req.body.trash
                      });
    todo.save().then(response=>{
        res.status(200).json(     {
                                message:"this is success full",
                                id:response._id,
                                name:response.name,
                                done:response.done,
                                trash:response.trash
                                });
                          });
});

router.put("/:id",(req,res,next)=>{

  const todo= new Todo({_id:req.params.id,
                        name:req.body.name,
                        done:req.body.done,
                        trash:req.body.trash
                      });
                      console.log(todo,'object');
    Todo.updateOne({_id:req.params.id},todo).then(response=>{
      // console.log(response);
      // // console.log(response.done);
      // // console.log(response._id);
      if(response.n>0){
        res.status(200).json(     {
          message:"this is successfully updated",
          todoId: response._id,
          done: response.done
          })
      } else {
        res.status(401).json(     {
          message:"Updated failed "
          });
       }
    });
});



router.get("", (req,res,next)=>{

  let todo=Todo.find();
  let todoList;

  todo.then(response=>{
               todoList=response;
               return Todo.countDocuments()
             })
             .then(count=>{
              //  console.log(count);
               res.status(200).json({
                message:"get All ToDo List is success full",
                todoList:todoList,
                totalPages:count
               })
             })

});

// router.get("/:id", (req,res,next)=>{
//   Post.findById(req.params.id).then((response)=>{
//     if(response){
//       res.status(200).json({
//                               id:response._id,
//                               title:response.title,
//                               content:response.content,
//                               imageUrl:response.imageUrl
//                             })
//                 }
//     else  {
//       res.status(200).json({
//         message: (req.params.id+"Record not found")
//       })

//   }
// })
// });

router.delete("/:id",(req,res,next)=>{
  Todo.deleteOne({"_id":req.params.id}).then((response)=>{
     if(response.deletedCount===0){
         res.status(401).json({
        message:"Delete not permitted"
      })
    }
    else{
      res.status(200).json({
        message:"Delete is success full",
        todoId:req.params.id
      })
    }
  });

});


module.exports = router;

