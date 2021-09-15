const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const schemaa = new mongoose.Schema({
  UserName: {
    type: String,
    required: true ,
    
    lowercase: true,
    
  },
  Password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});


// funckija za hesiranje password prije nego sto je sacuvana u bazu podataka
schemaa.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

// metoda koja uporedjuje unesen  username pasword iz forme i passworde iz baze  kao svoju vrijednost vraca varijablu user u kojoj je sacuvan rezultat poeredjenja "
schemaa.statics.login = async function(UserName, Password) {
  const user = await this.findOne({UserName});
  if (user) {
    const auth = await bcrypt.compare(Password, user.Password);
    if (auth) {
      return user;
    }
    throw Error('incorrect Password');
  }
  throw Error('incorrect UserName');
};

const User = mongoose.model('user', schemaa);

module.exports = User;