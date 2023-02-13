module.exports.home = (req, res, next) => {
  res.render("home");
};

module.exports.profile = (req, res, next) => {
  res.render("user/profile");
};
