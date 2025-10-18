const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/sobre-nosotros.json');


// Vista de Sobre Nosotros
router.get('/', (req, res) => {
  let sobreNosotros = {};
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    sobreNosotros = JSON.parse(data);
  }
  res.render('sobre-nosotros', { title: 'Sobre Nosotros - David Henderson Grupo', sobreNosotros, active: 'sobre-nosotros' });
});

module.exports = router;
