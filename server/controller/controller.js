var Userdb=require('../model/model');
exports.create=(req,res)=>{
    if(!req.body){
     res.status(400).send({message:"content can not be empty"}) ;
     return;
    }
    //varijabla koja prestavalja nas model iz baze podataka u apiju
    const user =new Userdb(
        {
            UserName:req.body.UserName,
            FirstName:req.body.FirstName , 
            LastName:req.body.LastName,  
            DateOfBirth:req.body.DateOfBirth,  
            Password:req.body.Password,  
            ConfirmPassword:req.body.ConfirmPassword   
        }
    )
user
.save(user)
.then(data=>{
    //res.send(data)
    res.redirect('/')
})
.catch (err=>{
    res.status(500).send({
        message:err.message||"error ocurred while creating create operation"
    })
})
}
exports.find=(req,res)=>{
    if(req.query.id){
        const id =req.query.id
        Userdb.findById(id)
        .then(data=>{
            if(!data){res.status(404).send({message:"Did not found USer with id"+id})}
        else{res.send(data)}
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving user with that id"+id})
        })

    }
    else{Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
          res.status(500).send({message:error||"Error occurred while retrieving a User"})  
        })}
    
    

}
exports.update=(req,res)=>{
    if(!req.body){
      return res 
      .status(400)
      .send({message:"You must fill in the data to update"})

    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
       res.status(404).send({message:`Cannot Update userwith${id}.User was not found`})
        }else{res.send(data)
        }
    })
    .catch(err=>
        {res.status(500).send({message:"error Update user information"})})

}
exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){ res.status(404).send({message:`cannot Delete user withid${id}id is not found`})

        }
        else{
            res.send({
                message:"User was deleted Successfully"
            })
            

        }
     

    })
.catch(err=>{
    res.status(500).send({
        message:"couldn't delete User with id="+id
    });
});

}
