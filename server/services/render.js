//renderovanje ruta i  slanje http zahtjeva serveru
const axios=require('axios');
const { response } = require('express');
exports.homeRoutes=(req,res)=>{
    axios.get('http://localhost:3000/api/myFirstDatabase')
    .then(function(response){
        
        res.render('index',{myFirstDatabase:response.data});
    })  
    .catch(err=>{
        res.send(err);
    })
}
module.exports.login_post=(req,res)=>{
    res.render('login')
}
module.exports.signup_post=(req,res)=>{
    res.render('signup')
}
exports.add_user=(req,res)=>{
    res.render('add_user');
}

exports.update_user=(req,res)=>{
   axios.get('http://localhost:3000/api/myFirstDatabase',{params:{id:req.query.id}})
   .then(function(userdata){
      res.render ("update_user",{user:userdata.data})
   
    
})
.catch(err=>{
    res.send(err);
})

}