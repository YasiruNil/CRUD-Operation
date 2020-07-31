var express = require("express");
var router = express.Router();
const db = require("../ModelsDb/DataBaseModel");
const jwt = require("jsonwebtoken");
process.env.SECRET_KEY = "secret2";
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  db.findAll()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.send("this site is not responded " + err);
    });
});
router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  db.findOne({ where: { Email: email } }).then((user) => {
    if (!user) {
      return res.status(404).send("email is not found");
    }
    bcrypt
      .compare(password, user.Password)
      .then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.ID,
            first_name: user.First_Name,
            last_name: user.Last_Name,
          };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 31556926,
          });

          res.status(200).send({ token, payload });
        } else {
          res.status(404).send({ massege: "invalid user pass" });
        }
      })
      .catch((error) => {
        res.status(404).send("error" + error);
        console.log(error);
      });
  });
});

router.get("/:ID", (req, res, next) => {
  db.findOne({
    where: {
      id: req.params.ID,
    },
  })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("user doesnt exist");
      }
    })
    .catch((error) => {
      res.status(404).send("error: ", error);
    });
});
router.delete("/:ID", (req, res, next) => {
  db.destroy({
    where: {
      id: req.params.ID,
    },
  })
    .then(() => {
      res.json({ status: "user deleted" });
    })
    .catch((error) => {
      res.send("user could not delete");
    });
});
router.put("/:ID", (req, res, next) => {
  db.update({
    where: {
      ID: req.body.ID,
      First_Name: req.body.First_Name,
      Last_Name: req.body.Last_Name,
      Email: req.body.Email,
      Password: req.body.Password,
      Gender: req.body.Gender,
      City: req.body.City,
      State: req.body.State,
      Zip: req.body.Zip,
      GradesYT: req.body.GradesYT,
      Medium: req.body.Medium,
    },
  })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.send("User Updated");
      }
    })
    .catch((error) => {
      res.send("error: ", error);
    });
});

module.exports = router;
