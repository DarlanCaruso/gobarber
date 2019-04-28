module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // locals é uma informação que é exposta para todos os templates da
    // aplicação, no caso abaixo pode ser acessada por meio de {{ user }}
    res.locals.user = req.session.user
    return next()
  }

  return res.redirect('/')
}
