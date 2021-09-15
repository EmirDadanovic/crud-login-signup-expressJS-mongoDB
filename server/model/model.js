const mongoose=require('mongoose');
 

var schema = new mongoose.Schema({
     UserName:{
        type:String,
        
    },
    FirstName:{
        type:String,
       
    },
    LastName:{
        type:String,
        
    },
    DateOfBirth:{
        type:Date,
        
    },
    Password:{
        type:String,
       
    }, 

    ConfirmPassword:{
        type:String,
      
    }

})
const Userdb=mongoose.model('userdb',schema);
module.exports=Userdb;