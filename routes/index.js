const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Página de inicio
router.get('/', (req, res) => {
  const bannersPath = path.join(__dirname, '../data/banners.json');
  let banners = [];
  
  if (fs.existsSync(bannersPath)) {
    try {
      const data = fs.readFileSync(bannersPath, 'utf8');
      const allBanners = JSON.parse(data);
      banners = allBanners.filter(b => b.paginas.includes('inicio'));
    } catch (error) {
      banners = [];
    }
  }
  
  res.render('index', { title: 'Inicio - David Henderson Grupo', active: 'inicio', banners });
});

// Página de servicios
router.get('/servicios', (req, res) => {
  const serviciosPath = path.join(__dirname, '../data/servicios.json');
  const bannersPath = path.join(__dirname, '../data/banners.json');
  let servicios = [];
  let banners = [];
  
  if (fs.existsSync(serviciosPath)) {
    const data = fs.readFileSync(serviciosPath, 'utf8');
    servicios = JSON.parse(data);
  }
  
  if (fs.existsSync(bannersPath)) {
    try {
      const data = fs.readFileSync(bannersPath, 'utf8');
      const allBanners = JSON.parse(data);
      banners = allBanners.filter(b => b.paginas.includes('servicios'));
    } catch (error) {
      banners = [];
    }
  }
  
  res.render('servicios', { title: 'Servicios - David Henderson Grupo', servicios, banners, active: 'servicios' });
});

// Página de servicio individual
router.get('/servicios/:id', (req, res) => {
  const serviciosPath = path.join(__dirname, '../data/servicios.json');
  
  if (fs.existsSync(serviciosPath)) {
    const data = fs.readFileSync(serviciosPath, 'utf8');
    const servicios = JSON.parse(data);
    const servicio = servicios.find(s => s.id === parseInt(req.params.id));
    
    if (servicio) {
  return res.render('servicio', { title: `${servicio.titulo} - David Henderson Grupo`, servicio, active: 'servicios' });
    }
  }
  
  res.status(404).send('Servicio no encontrado');
});

// Página de noticias
router.get('/noticias', (req, res) => {
  const noticiasPath = path.join(__dirname, '../data/noticias.json');
  const bannersPath = path.join(__dirname, '../data/banners.json');
  let noticias = [];
  let banners = [];
  
  if (fs.existsSync(noticiasPath)) {
    const data = fs.readFileSync(noticiasPath, 'utf8');
    noticias = JSON.parse(data);
  }
  
  if (fs.existsSync(bannersPath)) {
    try {
      const data = fs.readFileSync(bannersPath, 'utf8');
      const allBanners = JSON.parse(data);
      banners = allBanners.filter(b => b.paginas.includes('noticias'));
    } catch (error) {
      banners = [];
    }
  }
  
  res.render('noticias', { title: 'Noticias - David Henderson Grupo', noticias, banners, active: 'noticias' });
});

// Página de contacto
router.get('/contacto', (req, res) => {
  const bannersPath = path.join(__dirname, '../data/banners.json');
  let banners = [];
  
  if (fs.existsSync(bannersPath)) {
    try {
      const data = fs.readFileSync(bannersPath, 'utf8');
      const allBanners = JSON.parse(data);
      banners = allBanners.filter(b => b.paginas.includes('contacto'));
    } catch (error) {
      banners = [];
    }
  }
  
  res.render('contacto', { title: 'Contacto - David Henderson Grupo', active: 'contacto', banners });
});

// Panel de administración
router.get('/admin', (req, res) => {
  const noticiasPath = path.join(__dirname, '../data/noticias.json');
  let noticias = [];
  
  if (fs.existsSync(noticiasPath)) {
    const data = fs.readFileSync(noticiasPath, 'utf8');
    noticias = JSON.parse(data);
  }
  
  res.render('admin', { title: 'Admin - David Henderson Grupo', noticias, currentPath: req.path });
});

// Panel de administración de servicios
router.get('/admin-servicios', (req, res) => {
  const serviciosPath = path.join(__dirname, '../data/servicios.json');
  let servicios = [];
  
  if (fs.existsSync(serviciosPath)) {
    const data = fs.readFileSync(serviciosPath, 'utf8');
    servicios = JSON.parse(data);
  }
  
  res.render('admin-servicios', { title: 'Admin Servicios - David Henderson Grupo', servicios, currentPath: req.path });
});

// Página Sobre Nosotros
router.get('/sobre-nosotros', (req, res) => {
  const sobrePath = path.join(__dirname, '../data/sobre-nosotros.json');
  const bannersPath = path.join(__dirname, '../data/banners.json');
  let sobre = {};
  let banners = [];
  
  if (fs.existsSync(sobrePath)) {
    const data = fs.readFileSync(sobrePath, 'utf8');
    sobre = JSON.parse(data);
  }
  
  if (fs.existsSync(bannersPath)) {
    try {
      const data = fs.readFileSync(bannersPath, 'utf8');
      const allBanners = JSON.parse(data);
      banners = allBanners.filter(b => b.paginas.includes('sobre-nosotros'));
    } catch (error) {
      banners = [];
    }
  }
  
  res.render('sobre-nosotros', { title: 'Sobre Nosotros - David Henderson Grupo', sobre, banners, active: 'sobre-nosotros' });
});

// Panel de administración de Sobre Nosotros
router.get('/admin-sobre-nosotros', (req, res) => {
  const sobrePath = path.join(__dirname, '../data/sobre-nosotros.json');
  let sobre = {};
  if (fs.existsSync(sobrePath)) {
    const data = fs.readFileSync(sobrePath, 'utf8');
    sobre = JSON.parse(data);
  }
  res.render('admin-sobre-nosotros', { title: 'Admin Sobre Nosotros - David Henderson Grupo', sobre, currentPath: req.path });
});

module.exports = router;
