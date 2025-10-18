const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const noticiasPath = path.resolve(__dirname, '../data/noticias.json');

// API - Obtener todas las noticias
router.get('/', (req, res) => {
  let noticias = [];
  if (fs.existsSync(noticiasPath)) {
    try {
      const data = fs.readFileSync(noticiasPath, 'utf8');
      noticias = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer noticias:', error);
      noticias = [];
    }
  }
  res.json(noticias);
});

// API - Crear nueva noticia
router.post('/', (req, res) => {
  let noticias = [];
  
  if (fs.existsSync(noticiasPath)) {
    try {
      const data = fs.readFileSync(noticiasPath, 'utf8');
      noticias = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer noticias:', error);
      noticias = [];
    }
  }
  
  console.log('POST /api/noticias - Datos recibidos:', req.body);
  console.log('Subtítulo recibido:', req.body.subtitulo);
  
  const nuevaNoticia = {
    id: Date.now(),
    titulo: req.body.titulo || '',
    subtitulo: req.body.subtitulo || '',
    categoria: req.body.categoria || '',
    contenido: req.body.contenido || '',
    imagen: req.body.imagen || '',
    fecha: new Date().toISOString()
  };
  
  console.log('Noticia a guardar:', nuevaNoticia);
  
  noticias.push(nuevaNoticia);
  try {
    fs.writeFileSync(noticiasPath, JSON.stringify(noticias, null, 2));
    console.log('Noticia guardada exitosamente');
    res.json({ success: true, noticia: nuevaNoticia });
  } catch (error) {
    console.error('Error al guardar noticia:', error);
    res.status(500).json({ success: false, message: 'Error al guardar la noticia' });
  }
});

// API - Actualizar noticia
router.put('/:id', (req, res) => {
  if (!fs.existsSync(noticiasPath)) {
    return res.status(404).json({ success: false, message: 'No hay noticias' });
  }
  
  let noticias = [];
  try {
    const data = fs.readFileSync(noticiasPath, 'utf8');
    noticias = JSON.parse(data);
  } catch (error) {
    console.error('Error al leer noticias:', error);
    return res.status(500).json({ success: false, message: 'Error al leer las noticias' });
  }
  
  const index = noticias.findIndex(n => n.id == parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Noticia no encontrada' });
  }
  
  noticias[index] = {
    ...noticias[index],
    titulo: req.body.titulo || '',
    subtitulo: req.body.subtitulo || '',
    categoria: req.body.categoria || '',
    contenido: req.body.contenido || '',
    imagen: req.body.imagen || ''
  };
  
  try {
    fs.writeFileSync(noticiasPath, JSON.stringify(noticias, null, 2));
    res.json({ success: true, noticia: noticias[index] });
  } catch (error) {
    console.error('Error al actualizar noticia:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar la noticia' });
  }
});

// API - Eliminar noticia
router.delete('/:id', (req, res) => {
  if (!fs.existsSync(noticiasPath)) {
    return res.status(404).json({ success: false, message: 'No hay noticias' });
  }
  
  let noticias = [];
  try {
    const data = fs.readFileSync(noticiasPath, 'utf8');
    noticias = JSON.parse(data);
  } catch (error) {
    console.error('Error al leer noticias:', error);
    return res.status(500).json({ success: false, message: 'Error al leer las noticias' });
  }
  
  const initialLength = noticias.length;
  noticias = noticias.filter(n => n.id != parseInt(req.params.id));
  
  if (noticias.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Noticia no encontrada' });
  }
  
  try {
    fs.writeFileSync(noticiasPath, JSON.stringify(noticias, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar noticia:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar la noticia' });
  }
});

module.exports = router;
