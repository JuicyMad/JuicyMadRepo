module.exports.isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    next()
  } else {
    res.redirect('/home');
  }
}

module.exports.isNotAdmin = (req, res, next) => {
  if (!req.user.role === "Admin") {
    next()
  } else {
    res.redirect('/home')
  }
}