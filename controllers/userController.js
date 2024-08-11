const UserModel = require("../models/userModel");

exports.home = (req, res) => {
  if (req.session.user) {
    res.render("home-dashboard", { username: req.session.user.username });
  } else {
    res.render("home-guest");
  }
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
      req.session.user = user.user;
      // res.status(200).send(response);
      req.session.save(() => {
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

exports.logout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
