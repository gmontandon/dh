const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const contactosPath = path.join(__dirname, '../data/contactos.json');

// Procesar formulario de contacto
// Vista de contacto
router.get('/', (req, res) => {
  res.render('contacto', { title: 'Contacto - David Henderson Grupo', active: 'contacto' });
});

router.post('/', (req, res) => {
  let contactos = [];
  
  if (fs.existsSync(contactosPath)) {
    const data = fs.readFileSync(contactosPath, 'utf8');
    contactos = JSON.parse(data);
  }
  
  const nuevoContacto = {
    id: Date.now(),
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    mensaje: req.body.mensaje,
    fecha: new Date().toISOString()
  };
  
  contactos.push(nuevoContacto);
  fs.writeFileSync(contactosPath, JSON.stringify(contactos, null, 2));
  
  res.json({ success: true, message: 'Mensaje enviado correctamente' });
});

module.exports = router;
