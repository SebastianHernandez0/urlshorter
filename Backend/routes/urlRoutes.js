const express = require('express');
const router = express.Router();
const {shortenUrl, getShortUrl, getAllUrls} = require('../controllers/userController');
const verificarToken = require('../middleware/verificarToken');

router.post('/',verificarToken,shortenUrl);
router.post('/u',shortenUrl);
router.get('/:shortUrl',getShortUrl);
router.get('/url/all',getAllUrls);

module.exports = router;
