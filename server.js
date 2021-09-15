//Moramo imati zahtjeve za pakete i varijable
const cookieParser=require("cookie-parser");//manipolacija koijimaa
const authRoutes =require('./server/routes/authRoutes');//rutiranje login i signup
const express = require('express');//framewok
const dotenv = require('dotenv');
const morgan=require('morgan')
const bodyparser =require ("body-parser");//za rad sa json podacima poslanih hhtp requestom
const path = require('path');
const connectDB=require('./server/database/connection');
const { Session } = require('inspector');
const app= express();
dotenv.config({path:'config.env'});
const PORT = process.env.PORT||3000//lokalni port za korsititi
app.use(morgan('tiny'));
connectDB();
//deklarisanje korsicenja zahtjevanih varijabli i paketi
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json());
app.set("view engine","ejs");
app.use(cookieParser());
app.use(express.static('/model/User'))
const{requireAuth, checkUser}=require('./Middleware/authMiddleware')

app.get('*', checkUser);
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
app.use('/',require('./server/routes/router',requireAuth))//nisam mogao rijesiti problem zasto nije htio koristi app.get sa ovim routerima zato i nisam uspio staviti pocetnu stranicu signup ili login 


app.use(authRoutes);
app.listen (PORT,()=>{console.log(`Server is runing on http://localhost:${PORT}`)});



