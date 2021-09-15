const jwt= require('jsonwebtoken');
const User = require('../server/model/User');

//funckija koja provjerava da li postoje tokeni da li ispravni i na osnovu salje na login signup page ili na index page
const requireAuth=(req,res,next)=>{
    const token = req.cookies.jwt

if(token){
jwt.verify(token,'tajna',(err,decodedToken)=>{
    if(err){
        console.log(err.message)
    res.redirect('/login') 
    }  
    else{
        console.log(decodedToken);
        next();

    }
});
}
else{
    res.redirect('/login')
}
};

//prikaz trenutno logovanog korsinika
const checkUser =(req,res,next)=>{
const token=req.cookies.jwt;
if (token){
    jwt.verify(token,'tajna', async(err,decodedToken)=>{
        if(err){
            console.log(err.message)
            res.locals.user=null;
        next();
        }  
        else{
            console.log(decodedToken);
            let user =await User.findById(decodedToken.id)
            res.locals.user=user;

            next();
    
        }
    })

}
else{

res.locals.user=null;
next();
}
}
module.exports={requireAuth, checkUser};
