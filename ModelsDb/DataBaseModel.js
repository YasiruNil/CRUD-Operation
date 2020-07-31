const Sequelize = require("sequelize");
const db = require("../DataBase/db");
module.exports = db.sequelize.define(
  "Register",
  {
    ID: {
      feild: "ID",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    First_Name: {
      feild: "First_Name",
      type: Sequelize.STRING,
    },

    Last_Name: {
      feild: "Last_Name",
      type: Sequelize.STRING,
    },
    Email: {
      feild: "Email",
      type: Sequelize.STRING,
    },
    Password: {
      feild: "Password",
      type: Sequelize.STRING,
    },

    Gender: {
      feild: "Gender",
      type: Sequelize.STRING,
    },
    City: {
      feild: "City",
      type: Sequelize.STRING,
    },
    State: {
      feild: "State",
      type: Sequelize.STRING,
    },
    Zip: {
      feild: "Zip",
      type: Sequelize.INTEGER,
    },
    GradesYT: {
      feild: "GradesYT",
      type: Sequelize.STRING,
    },
    Medium: {
      feild: "Medium",
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
