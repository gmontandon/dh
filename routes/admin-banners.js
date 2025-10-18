const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const BANNERS_FILE = path.join(__dirname, '../data/banners.json');

// Página de admin de banners
router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(BANNERS_FILE, 'utf8');
    const banners = JSON.parse(data);
    res.render('admin-banners', {
      title: 'Admin - Banners',
      banners: banners
    });
  } catch (error) {
    res.render('admin-banners', {
      title: 'Admin - Banners',
      banners: []
    });
  }
});

module.exports = router;
