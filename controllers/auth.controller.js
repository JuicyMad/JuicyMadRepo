const User = require("../models/User.model");
const Cart = require("../models/Cart.model");
const mongoose = require("mongoose");
const passport = require("passport");
const { ERROR_MESSAGE } = require("../config/passport.config");
const { Strategy } = require("passport-local");

module.exports.signup = (req, res, next) => {
  res.render("auth/signup");
};

module.exports.doSignup = (req, res, next) => {
  const renderWithErrors = (errors) => {
    const userData = { ...req.body };
    delete userData.password;
    delete userData.repeatPassword;
    res.render("auth/signup", {
      user: userData,
      errors,
    });
  };
  const { password, repeatPassword, username, email } = req.body;
  if (password && repeatPassword && password === repeatPassword) {
    User.findOne({ username, email })
      .then((user) => {
        if (user) {
          renderWithErrors({ email: "Some of your date are in use" });
        } else {
          req.body.role = "User";
          return User.create(req.body).then((userCreated) => {
            Cart.create({ user: userCreated._id })
              .then((cartCreated) => {
                userCreated.cart = cartCreated._id;
                userCreated
                  .save()
                  .then((userUpdated) => {
                    res.redirect("/login");
                  })
                  .catch(next);
              })
              .catch((err) => {
                console.log(err);
                next(err);
              });
          });
        }
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          renderWithErrors(err.errors);
        } else {
          next(err);
        }
      });
  } else {
    renderWithErrors({ password: "Passwords do not match" });
  }
};

module.exports.login = (req, res, next) => {
  res.render("auth/login");
};

const doLoginWithStrategy = (req, res, next, strategy = "local-auth") => {
  const { email, password } = req.body;

  if (strategy === "local-auth") {
    if (!email || !password) {
      res.render("auth/login", { errorMessage: ERROR_MESSAGE });
      return;
    }
  }
  passport.authenticate(strategy, (err, user, validations) => {
    if (err) {
      next(err);
    } else if (!user) {
      res.render("auth/login", {
        user: { email },
        errorMessage: validations.error,
      });
    } else {
      req.login(user, (loginError) => {
        if (loginError) {
          next(loginError);
        } else {
          res.redirect("/login");
        }
      });
    }
  })(req, res, next);
};
module.exports.doLogin = (req, res, next) => {
  doLoginWithStrategy(req, res, next);
};
module.exports.doLoginGoogle = (req, res, next) => {
  console.log("entro");
  doLoginWithStrategy(req, res, next, "google-auth");
};
module.exports.doLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};
