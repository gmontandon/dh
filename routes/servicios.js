const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const serviciosFile = path.join(__dirname, '../data/servicios.json');

// Obtener todos los servicios
router.get('/', (req, res) => {
  try {
          let servicios = [];
          if (fs.existsSync(serviciosFile)) {
            const data = fs.readFileSync(serviciosFile, 'utf8');
            servicios = JSON.parse(data);
          }
          res.render('servicios', { title: 'Servicios - David Henderson Grupo', servicios, active: 'servicios' });
  } catch (error) {
    console.error('Error al leer servicios:', error);
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
});

// Obtener un servicio por ID (API JSON) - debe ir antes de /:id
router.get('/json/:id', (req, res) => {
  try {
    const data = fs.readFileSync(serviciosFile, 'utf8');
    const servicios = JSON.parse(data);
    const servicio = servicios.find(s => s.id === parseInt(req.params.id));
    
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    
    res.json(servicio);
  } catch (error) {
    console.error('Error al leer servicio:', error);
    res.status(500).json({ error: 'Error al obtener servicio' });
  }
});

// Obtener un servicio por ID (Vista HTML)
router.get('/:id', (req, res) => {
  try {
    const data = fs.readFileSync(serviciosFile, 'utf8');
    const servicios = JSON.parse(data);
    const servicio = servicios.find(s => s.id === parseInt(req.params.id));
    
    if (!servicio) {
      return res.status(404).send('Servicio no encontrado');
    }
    
  res.render('servicio', { title: servicio.titulo + ' - David Henderson Grupo', servicio, active: 'servicios' });
  } catch (error) {
    console.error('Error al leer servicio:', error);
    res.status(500).json({ error: 'Error al obtener servicio' });
  }
});

// Crear un nuevo servicio
router.post('/', (req, res) => {
  try {
    const data = fs.readFileSync(serviciosFile, 'utf8');
    const servicios = JSON.parse(data);
    
    const nuevoServicio = {
      id: servicios.length > 0 ? Math.max(...servicios.map(s => s.id)) + 1 : 1,
      titulo: req.body.titulo,
      descripcionCorta: req.body.descripcionCorta,
      descripcionLarga: req.body.descripcionLarga,
      imagen: req.body.imagen || '/img/servicio-default.jpg',
      caracteristicas: req.body.caracteristicas || [],
      fecha: new Date().toISOString().split('T')[0]
    };
    
    servicios.push(nuevoServicio);
    fs.writeFileSync(serviciosFile, JSON.stringify(servicios, null, 2));
    
    res.status(201).json(nuevoServicio);
  } catch (error) {
    console.error('Error al crear servicio:', error);
    res.status(500).json({ error: 'Error al crear servicio' });
  }
});

// Actualizar un servicio
router.put('/:id', (req, res) => {
  try {
    const data = fs.readFileSync(serviciosFile, 'utf8');
    const servicios = JSON.parse(data);
    const index = servicios.findIndex(s => s.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    
    servicios[index] = {
      ...servicios[index],
      titulo: req.body.titulo,
      descripcionCorta: req.body.descripcionCorta,
      descripcionLarga: req.body.descripcionLarga,
      imagen: req.body.imagen,
      caracteristicas: req.body.caracteristicas
    };
    
    fs.writeFileSync(serviciosFile, JSON.stringify(servicios, null, 2));
    res.json(servicios[index]);
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    res.status(500).json({ error: 'Error al actualizar servicio' });
  }
});

// Eliminar un servicio
router.delete('/:id', (req, res) => {
  try {
    const data = fs.readFileSync(serviciosFile, 'utf8');
    let servicios = JSON.parse(data);
    const index = servicios.findIndex(s => s.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    
    servicios = servicios.filter(s => s.id !== parseInt(req.params.id));
    fs.writeFileSync(serviciosFile, JSON.stringify(servicios, null, 2));
    
    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({ error: 'Error al eliminar servicio' });
  }
});

module.exports = router;
