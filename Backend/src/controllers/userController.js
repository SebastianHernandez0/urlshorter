const jwt = require('jsonwebtoken');
const {
  consultarUsuario,
  acortarUrl
  
} = require("../models/userModel");


const getUsuarios = async (req, res) => {
  try {
    const users = await consultarUsuario();
    res.json(users);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al consultar usuarios" });
  }
};

const shortenUrl= async (req,res)=>{
    try{
        const url= req.body.url
        const Authorization= req.header('Authorization');
        const token= Authorization.split('Bearer ')[1];
        jwt.verify(token,process.env.JWT_SECRET);
        const {id}= jwt.decode(token);
        const shortUrl= await acortarUrl(url,id);
        console.log(shortUrl)
        res.json({url: `http://localhost:3000/${shortUrl}`  })
    }catch (error) {
        res.status(500).json({ mensaje: "Error al acortar url" });
    }
}


module.exports = {
  getUsuarios,
  shortenUrl           
}
