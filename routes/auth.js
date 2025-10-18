const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Mostrar formulario de login
router.get('/login', (req, res) => {
  // Si ya está autenticado, redirigir a admin
  if (req.cookies && req.cookies.adminSession === 'authenticated') {
    return res.redirect('/admin');
  }
  
  res.render('login', { title: 'Acceder - David Henderson Grupo', error: null });
});

// Procesar login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const credentialsPath = path.join(__dirname, '../data/credentials.json');
  
  try {
    const data = fs.readFileSync(credentialsPath, 'utf8');
    const credentials = JSON.parse(data);
    
    // Verificar credenciales
    if (credentials.admin && 
        credentials.admin.username === username && 
        credentials.admin.password === password) {
      
      // Crear cookie de sesión (válida por 24 horas)
      res.cookie('adminSession', 'authenticated', { 
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true 
      });
      
      return res.redirect('/admin');
    } else {
      return res.render('login', { 
        title: 'Acceder - David Henderson Grupo', 
        error: 'Usuario o contraseña incorrectos' 
      });
    }
  } catch (error) {
    console.error('Error al leer credenciales:', error);
    return res.render('login', { 
      title: 'Acceder - David Henderson Grupo', 
      error: 'Error al procesar el login' 
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('adminSession');
  res.redirect('/login');
});

module.exports = router;
