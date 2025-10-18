const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Panel de administración de NOTICIAS
// URL: /admin (cuando se monta en /admin)
router.get('/', (req, res) => {
  const noticiasPath = path.join(__dirname, '../data/noticias.json');
  let noticias = [];
  
  if (fs.existsSync(noticiasPath)) {
    const data = fs.readFileSync(noticiasPath, 'utf8');
    noticias = JSON.parse(data);
  }
  
  res.render('admin', { title: 'Admin - David Henderson Grupo', noticias, currentPath: req.path });
});

// Panel de administración de SERVICIOS
// URL: /admin-servicios (cuando se monta en /admin)
router.get('/servicios', (req, res) => {
  const serviciosPath = path.join(__dirname, '../data/servicios.json');
  let servicios = [];
  
  if (fs.existsSync(serviciosPath)) {
    const data = fs.readFileSync(serviciosPath, 'utf8');
    servicios = JSON.parse(data);
  }
  
  res.render('admin-servicios', { title: 'Admin Servicios - David Henderson Grupo', servicios, currentPath: req.path });
});

// Panel de administración de SOBRE NOSOTROS
// URL: /admin-sobre-nosotros (cuando se monta en /admin)
router.get('/sobre-nosotros', (req, res) => {
  const sobrePath = path.join(__dirname, '../data/sobre-nosotros.json');
  let sobre = {};
  if (fs.existsSync(sobrePath)) {
    const data = fs.readFileSync(sobrePath, 'utf8');
    sobre = JSON.parse(data);
  }
  res.render('admin-sobre-nosotros', { title: 'Admin Sobre Nosotros - David Henderson Grupo', sobre, currentPath: req.path });
});

// Panel de administración de BANNERS
// URL: /admin/banners (cuando se monta en /admin)
router.get('/banners', (req, res) => {
  const bannersPath = path.join(__dirname, '../data/banners.json');
  let banners = [];
  
  try {
    const data = fs.readFileSync(bannersPath, 'utf8');
    banners = JSON.parse(data);
  } catch (error) {
    banners = [];
  }
  
  res.render('admin-banners', {
    title: 'Admin - Banners',
    banners: banners
  });
});

module.exports = router;
