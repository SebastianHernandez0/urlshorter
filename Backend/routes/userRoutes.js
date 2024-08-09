const express = require('express');
const router = express.Router();

const {getUsuarios,getUrlsFromUser,deleteUrl,updateShortUrl}= require('../controllers/userController');

router.get('/',getUrlsFromUser);
router.delete('/:idUrl',deleteUrl);
router.put('/:idUrl',updateShortUrl);


module.exports = router;




