const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const userSchema = new mongoose.Schema(
   {
    username :{
      type : String,
      required: [true, 'User name is required'],
      unique: [true, 'User name is already in use'],
    },
    firstName: {
      type: String,
      required: [true, 'First name is required']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required']
    },
    email: {
      type: String,
      match: EMAIL_PATTERN,
      required: [true, 'Email is required'],
      unique: [true, 'Email is already in use'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Your password must have at least 8 characters']
    },
    image:{
      type: String,
      default:  "https://res.cloudinary.com/dzlyhonx9/image/upload/v1676116676/image_r4wz1d.png"
    }, 
    role:{
      type: String,
      enum: ["Admin", "User"],
      required: true,
      default: "User"
    },
    cart:{
      type: mongoose.Types.ObjectId,
      ref: "Cart"
    },
  },
  {
    timestamps: true,
    toObject: { 
      virtuals: true
    },
  }
);

userSchema.pre('save', function(next) {
  const rawPassword = this.password;
  if (this.isModified('password')) {
    bcrypt.hash(rawPassword, SALT_ROUNDS)
      .then(hash => {
        this.password = hash;
        next()
      })
      .catch(err => next(err))
  } else {
    next();
  }
})

userSchema.methods.checkPassword = function(passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;