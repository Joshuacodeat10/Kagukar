const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passport = require("passport");
const Schema = mongoose.Schema;

const masterSchema = new Schema({
  logo: {
    type: String,
    required: false
  },

  type: String, //hospital / school
  nameOfEstablishment: {
    type: String,
    default: "Surft"
  },
  day: Number,
  month: String,
  year: Number,
  tagline: String,

  about: String,
  aboutText: String,
  privacy: String,
  privacyText: String,
  tnc: String,
  tncText: String,

  map: String,

  // socials: {
  twitter: String,
  linkedin: String,
  facebook: String,
  youtube: String,
  // },
  //CONTACT INFO
  mobile: Number,
  address: String,
  location: String,
  email: String,

  //For Hospitals : Doctor
  //For Schools : Teachers
  staffs: {
    type: Number,
    default: 0
  },
  //For Hospitals : Patients
  //For Schools : Students
  clients: {
    type: Number,
    default: 0
  },

  //SUBSCRIPTION PARAMETERS STARTS ------
  subscription: {
    type: Boolean,
    default: false
  },
  subscriptionFee: String,
  subscriptionInterval: String,
  //SUBSCRIPTION PARAMETERS END ------



  ////ADMIN DETAILS
  name: String,
  username: String,
  password: String,
  date: String,
  cache: String,
  status: String,
  message: {
    type: Number,
    default: 0
  },
  department: String,
  rank: String,

  //VERIFICATION TO CHANGE PASSWORD
  mode: {
    type: Boolean,
    default: false
  },

  secret: {
    type: String,
    default: "christianovik009@gmail.com"
  },

  verification: {
    type: Boolean,
    default: false
  }
});

// masterSchema.plugin(passportLocalMongoose);
// masterSchema.plugin(findOrCreate);
const Master = new mongoose.model("Master", masterSchema);

// passport.use(Master.createStrategy());
// passport.serializeUser(function (master, done) {
//   done(null, master.id);
// });
// passport.deserializeUser(function (id, done) {
//   Master.findById(id, function (err, master) {
//     done(err, master);
//   });
// });

module.exports = Master;