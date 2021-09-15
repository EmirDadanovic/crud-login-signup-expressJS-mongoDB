// rutiranje za crud frontedn
const express=require('express');
const route=express.Router();

const services=require('../services/render');
const controller= require('../controller/controller')

route.get('/',services.homeRoutes );
 

route.get('/add-user',services.add_user);
 
 
 route.get('/update-user',services.update_user);
    
 
 route.post('/api/myFirstDatabase',controller.create);
    route.get('/api/myFirstDatabase',controller.find);
    route.put('/api/myFirstDatabase/:id',controller.update);
    route.delete('/api/myFirstDatabase/:id',controller.delete);
 
 module.exports=route 