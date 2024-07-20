const express = require('express');
const router = express.Router();

const {getUsuarios,getUrlsFromUser}= require('../controllers/userController');

router.get('/',getUrlsFromUser);


module.exports = router;




