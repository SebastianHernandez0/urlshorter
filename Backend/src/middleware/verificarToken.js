const jwt = require("jsonwebtoken");

const verificarToken = async (req, res, next) => {
    const vtoken= req.headers.authorization;
    if(!vtoken){ 
        return res.status(401).json({error:"Acceso no autorizado. Token no proporcionado"});
    }
    const [bearer, token]= vtoken.split(" ");
    if(bearer!=="Bearer"){
        return res.status(401).json({error:"Invalid token"});
    }
    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({error:"Invalid token"});
    }
}

module.exports= verificarToken;