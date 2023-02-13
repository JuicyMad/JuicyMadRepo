module.exports.isAuthenticated = (req, res, next) => {
  // para saber si esta autenticado
  if (req.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {
  // para saber si esta autenticado
  if (!req.user) {
    next()
  } else {
    res.redirect('/profile')
  }
}