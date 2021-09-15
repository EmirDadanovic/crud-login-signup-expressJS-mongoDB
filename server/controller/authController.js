const User = require("../model/User");//zahtjevamo model 
const jwt = require('jsonwebtoken');// varijabla za jsonwentokene

// greske
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { UserName: '', Password: '' };
  
  
  if (err.message ==='incorrect UserName')
  errors.UserName='that UserName is not registered'
  if (err.message ==='incorrect Password')
  errors.UserName='that Password is not registered'


  
  

  // greske prilikom validacije
  if (err.message.includes('user validation failed')) {
   
    Object.values(err.errors).forEach(({ properties }) => {
      
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

//kreiranje tokena
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'tajna', {
    expiresIn: maxAge
  });
};

 //renderovanje dohavecenih podatakka i 
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

//asinhrona funckcija kreiranje tokena i davanje id podacima iz baze sa njima za signup
module.exports.signup_post = async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    const user = await User.create({ UserName, Password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}
//asinhrona funckcija kreiranje tokena i davanje id podacima iz baze sa njima za login 
module.exports.login_post = async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    const user = await User.login(UserName, Password);
    
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
    return user;
  } catch (err) 
  { const errors=handleErrors(err)
    res.status(400).json({errors});
  }
  ;

}