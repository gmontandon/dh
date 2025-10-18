const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const noticiasPath = path.resolve(__dirname, '../data/noticias.json');
const bannersPath = path.resolve(__dirname, '../data/banners.json');

// Función para obtener banners de una página
function obtenerBanneres(pagina) {
  try {
    const data = fs.readFileSync(bannersPath, 'utf8');
    const banners = JSON.parse(data);
    return banners.filter(b => b.paginas.includes(pagina));
  } catch (error) {
    return [];
  }
}

// Vista de lista de noticias
router.get('/', (req, res) => {
  let noticias = [];
  if (fs.existsSync(noticiasPath)) {
    try {
      const data = fs.readFileSync(noticiasPath, 'utf8');
      noticias = JSON.parse(data);
      // Ordenar por ID descendente (más recientes primero)
      noticias.sort((a, b) => {
        console.log(`Comparando ${b.id} - ${a.id} = ${b.id - a.id}`);
        return b.id - a.id;
      });
      console.log('Noticias ordenadas:', noticias.map(n => ({ id: n.id, titulo: n.titulo })));
    } catch (error) {
      console.error('Error al leer noticias:', error);
      noticias = [];
    }
  }
  const banners = obtenerBanneres('noticias');
  res.render('noticias', { title: 'Noticias - David Henderson Grupo', noticias, banners, active: 'noticias' });
});

// Vista de noticia individual
router.get('/:id', (req, res) => {
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
  const noticia = noticias.find(n => n.id == parseInt(req.params.id));
  if (!noticia) {
    return res.status(404).render('error', { title: 'Noticia no encontrada', message: 'La noticia solicitada no existe.' });
  }
  res.render('noticia', { title: noticia.titulo, noticia, active: 'noticias' });
});

module.exports = router;
