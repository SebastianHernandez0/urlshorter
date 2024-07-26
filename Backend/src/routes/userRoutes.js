const express = require('express');
const router = express.Router();

const {getUsuarios,getUrlsFromUser,deleteUrl}= require('../controllers/userController');

router.get('/',getUrlsFromUser);
router.delete('/:idUrl',deleteUrl);


module.exports = router;




