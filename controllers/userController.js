const UserModel = require("../models/userModel");

exports.home = (req, res) => {
  res.render("home-guest");
};

exports.profile = (req, res) => {
  res.send("Profile Page");
};

exports.register = (req, res) => {
  const user = new UserModel(req.body);
  user
    .storeUser()
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

exports.login = async (req, res, next) => {
  const user = new UserModel(req.body);
  await user
    .findUser()
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};
