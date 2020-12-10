require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://user:password@cluster0.ecgcm.mongodb.net/dbnamed?retryWrites=true&w=majority`, // TODO: change back
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "adopifjqeporihgepoih349ru834tgihej",
    store: new MongoStore({ mongooseConnection: db }),
  })
);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000", //TODO: change back
    credentials: true,
  })
);

require("./controllers/users.controller.server")(app);
require("./controllers/reviews.controller.server")(app);

app.listen(process.env.PORT || 8080);
