const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const indexRoutes = require('./routes/index');
const noticiasRoutes = require('./routes/noticias');
const apiNoticiasRoutes = require('./routes/api-noticias');
const contactoRoutes = require('./routes/contacto');
const serviciosRoutes = require('./routes/servicios');
const sobreNosotrosRoutes = require('./routes/sobre-nosotros');
const apiBannersRoutes = require('./routes/api-banners');
const adminBannersRoutes = require('./routes/admin-banners');
const authRoutes = require('./routes/auth');
const checkAuth = require('./middleware/auth');

app.use('/', indexRoutes);
app.use('/noticias', noticiasRoutes);
app.use('/api/noticias', apiNoticiasRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/sobre-nosotros', sobreNosotrosRoutes);
app.use('/api/banners', apiBannersRoutes);
app.use('/', authRoutes);

// Rutas admin protegidas
app.use('/admin', checkAuth);
app.use('/admin/banners', adminBannersRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
