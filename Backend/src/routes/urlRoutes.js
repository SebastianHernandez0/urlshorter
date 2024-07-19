const express = require('express');
const router = express.Router();
const {shortenUrl, getShortUrl} = require('../controllers/userController');
const verificarToken = require('../middleware/verificarToken');

router.post('/',verificarToken,shortenUrl);
router.get('/:shortUrl',getShortUrl);

module.exports = router;
