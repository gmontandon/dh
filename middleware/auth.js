// Middleware de autenticación para proteger rutas admin

const checkAuth = (req, res, next) => {
  // Verificar si hay cookie de sesión
  if (req.cookies && req.cookies.adminSession === 'authenticated') {
    return next();
  }
  
  // Si no está autenticado, redirigir a login
  res.redirect('/login');
};

module.exports = checkAuth;
