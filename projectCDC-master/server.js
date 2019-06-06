const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const admin = require("./src/routes/admin");
const project = require("./src/routes/project");
const collaborater = require("./src/routes/collaborater");
const contact = require("./src/routes/contact");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(require("morgan")("dev"));

//DB Config
const db = require("./src/config/keys").mongoURI;
var mongoDB = "mongodb://127.0.0.1/project_GMC";

//Connect to Mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./src/config/passport")(passport);

app.use("/api/users", admin);
app.use("/api/project", project);
app.use("/api/collaborater", collaborater);
app.use("/api/contact", contact);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
