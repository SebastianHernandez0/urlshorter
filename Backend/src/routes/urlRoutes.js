const express = require('express');
const router = express.Router();
const {shortenUrl} = require('../controllers/userController');
const verificarToken = require('../middleware/verificarToken');

router.post('/',verificarToken,shortenUrl);

module.exports = router;
