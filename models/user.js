const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passport = require("passport");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    idn: {
      type: Number,
      default: 0
    },

  image: {
    type: String,
    required: false
  },
  slug: String,
  nickname: String,
  name: String,
  username: String,
  password: String,
  dob: String,
  date: String,
  
  cache: String,   //master, admin:CMD, Principal, ICT, senior:HOD, junior:Doctor,Teacher, regular:Patient, Parent, basic: Others - role
  
  secret:String,
  gender: String,
  status: String, //for staffs or patients
  message: {
    type: Number,
    default: 0
  },

  department: String,
  rank: String,
  about: String,

  //portfolio
  portfolio: String, //for cmd, cmac, principal, teacher, bursar etc.

  // ________________________________________
  //FOR DOCTOR USERS ------------------------
  // ________________________________________
  qualification: String,
  speciality: String,
  services: String,
  //stats
  patientCount: Number, //number of patients attended to 
  //also get the name of the last patient attended to 

  //FOR DOCTORS END -------------------------
  // ________________________________________


  //************ FOR SCHOOLS  ****************
  //_________________________________________
  // FOR TEACHERS ---------------------------
  // ________________________________________
  section: String, //For respective section user belongs to
  quote: String, //leave a motivational quote for your student


  //_________________________________________
  // FOR TEACHERS ENDS---------------------------
  // ________________________________________

  profileVisibility: {
    type: Boolean,
    default: false
  }, //Public or private

  notification: {
    type: Boolean,
    default: false
  }, //show me notification or not


  functional: {
    type: Number,
    default: 0
  },  //

  hod: String,  //for Class teacher or Department leader

  guardian: String, //Parent or Patient watchPerson

  mobile: Number,
  noOfArticles: {type: Number, default: 0},
  activities: {type: Number, default: 0},

  //VERIFICATION TO CHANGE PASSWORD
  mode: {
    type: Boolean,
    default: false
  }, //User preffered theme
  verified: {
    type: Boolean,
    default: false
  }, //User's Account verification


  //Socials
  whatsapp: String,
  linkedin: String,
  facebook: String,
  instagram: String,
  twitter: String,
  youtube: String,

  //Profile visibility: 
  
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


module.exports = User;