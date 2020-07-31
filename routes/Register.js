var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../ModelsDb/DataBaseModel");
const jwt = require("jsonwebtoken");
process.env.SECRET_KEY = "secret";

router.get("/", (req, res, next) => {
  res.send("this site responded");
});

router.post("/", (req, res, next) => {
  const userData = {
    First_Name: req.body.first_name,
    Last_Name: req.body.last_name,
    Email: req.body.email,
    Password: req.body.password,
    Gender: req.body.gender,
    City: req.body.city,
    State: req.body.state,
    Zip: req.body.zip,
    GradesYT: req.body.gradesYT,
    Medium: req.body.medium,
  };
  console.log(userData);
  db.findOne({
    where: { Email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        const hashPassword = bcrypt.hashSync(userData.Password, 10);
        userData.Password = hashPassword;
        db.create(userData)
          .then(() => {
            let token = jwt.sign(userData, process.env.SECRET_KEY, {
              expiresIn: 31556926,
            });
            res.status(200).send({ token: token });
          })
          .catch((error) => {
            res.send("error" + error);
          });
      } else {
        res.status(404).send({ error: "user already registerd" });
        console.log(error);
      }
    })
    .catch((error) => {
      res.status(404).send("error" + error);
      console.log(error);
    });
});

module.exports = router;
