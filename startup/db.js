const mongoose = require("mongoose");
var { User } = require("../models/user.model");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost:27017/ComplaintSystem", err => {
  if (!err) {
    console.log("MongoDB connection succeeded.");
    // Seeding Admin User
    let user = User.findOneAndUpdate({_id: '5e53a2bca8278708e3310ed7', email:'AlMokadem@gmail.com'},{
      fullName: "Mohamed AlMokadem",
      email: "AlMokadem@gmail.com",
      password: "123",
      staffId: "26018",
      firstName: "Mohamed",
      lastName: "AlMokadem",
      isAdmin: true
    }, 
    { upsert: true }); //option
    // console.log(user);

  } else {
    console.log(
      "Error in DB connection : " + JSON.stringify(err, undefined, 2)
    );
  }
});

module.exports = mongoose;
