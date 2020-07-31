var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var LoginRouter = require("./routes/Login");
var RegisterRouter = require("./routes/Register");
var bodyParser = require("body-parser");
const db = require("./DataBase/db");

var app = express();
app.use(bodyParser.json());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/teacher/login", LoginRouter);
app.use("/teacher/register", RegisterRouter);

db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
module.exports = app;
