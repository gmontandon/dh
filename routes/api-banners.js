const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const BANNERS_FILE = path.join(__dirname, '../data/banners.json');

// Obtener todos los banners
router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(BANNERS_FILE, 'utf8');
    const banners = JSON.parse(data);
    res.json(banners);
  } catch (error) {
    res.json([]);
  }
});

// Obtener banners por página (DEBE ir antes de /:id para evitar conflicto de rutas)
router.get('/pagina/:pagina', (req, res) => {
  try {
    const data = fs.readFileSync(BANNERS_FILE, 'utf8');
    const banners = JSON.parse(data);
    const bannersPagina = banners.filter(b => b.paginas.includes(req.params.pagina));
    res.json(bannersPagina);
  } catch (error) {
    res.json([]);
  }
});

// Obtener banner por ID
router.get('/:id', (req, res) => {
  try {
    const data = fs.readFileSync(BANNERS_FILE, 'utf8');
    const banners = JSON.parse(data);
    const banner = banners.find(b => b.id === req.params.id);
    if (banner) {
      res.json(banner);
    } else {
      res.json({ error: 'Banner no encontrado' });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear nuevo banner
router.post('/', (req, res) => {
  try {
    const { titulo, texto, imagen, boton_url, boton_texto, color_fondo, color_texto, paginas } = req.body;
    
    const data = fs.readFileSync(BANNERS_FILE, 'utf8');
    const banners = JSON.parse(data);
    
    const nuevoId = 'banner-' + Date.now();
    const nuevoBanner = {
      id: nuevoId,
      titulo,
      texto,
      imagen,
      boton_url,
      boton_texto,
      color_fondo: color_fondo || 'rgb(18, 21, 32)',
      color_texto: color_texto || '#ffffff',
      paginas: paginas || []
    };
    
    banners.push(nuevoBanner);
    fs.writeFileSync(BANNERS_FILE, JSON.stringify(banners, null, 2));
    
    res.json({ success: true, id: nuevoId });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Actualizar banner
router.put('/:id', (req, res) => {
  try {
    const { titulo, texto, imagen, boton_url, boton_texto, color_fondo, color_texto, paginas } = req.body;
    
    const data = fs.readFileSync(BANNERS_FILE, 'utf8');
    let banners = JSON.parse(data);
    
    const index = banners.findIndex(b => b.id === req.params.id);
    if (index !== -1) {
      banners[index] = {
        ...banners[index],
        titulo,
        texto,
        imagen,
        boton_url,
        boton_texto,
        color_fondo: color_fondo || 'rgb(18, 21, 32)',
        color_texto: color_texto || '#ffffff',
        paginas: paginas || []
      };
      fs.writeFileSync(BANNERS_FILE, JSON.stringify(banners, null, 2));
      res.json({ success: true });
    } else {
      res.json({ success: false, error: 'Banner no encontrado' });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Eliminar banner
router.delete('/:id', (req, res) => {
  try {
    const data = fs.readFileSync(BANNERS_FILE, 'utf8');
    let banners = JSON.parse(data);
    
    banners = banners.filter(b => b.id !== req.params.id);
    fs.writeFileSync(BANNERS_FILE, JSON.stringify(banners, null, 2));
    
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

module.exports = router;
