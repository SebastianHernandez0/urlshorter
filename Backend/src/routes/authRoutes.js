const express = require('express');
const router = express.Router();
const passport = require('../controllers/passportConfig');
const jwt = require('jsonwebtoken');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req,res)=>{
    try {
        const token= jwt.sign({email: req.user.email, id: req.user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.redirect(`/sucess?token=${token}`);
        console.log("Token generado: ", token);

    } catch (error) {
        console.log("Error en el callback", error);
        res.status(500).json({mensaje:'Internal server error'});
    }
}   );

module.exports = router;