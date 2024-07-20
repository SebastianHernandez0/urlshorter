const jwt = require('jsonwebtoken');
const {
  consultarUsuario,
  acortarUrl,
  consultarUrls,
  consultarShortUrl
  
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
        if(Authorization){
            const token= Authorization.split('Bearer ')[1];
            jwt.verify(token,process.env.JWT_SECRET);
            const {id}= jwt.decode(token);
            const shortUrl= await acortarUrl(url,id);
            res.json({url: `http://localhost:3000/${shortUrl}`  })
        }else{
            const shortUrl= await acortarUrl(url);
            res.json({url: `http://localhost:3000/${shortUrl}`  })
        }
    }catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getShortUrl= async (req,res)=>{
    try {
        const shortUrl= req.params.shortUrl;
        console.log("Short url: ", shortUrl);
        const originalUrl= await consultarShortUrl(shortUrl);
        res.redirect(originalUrl);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getUrlsFromUser= async (req,res)=>{
    try {
        const Authorization= req.header('Authorization');
        const token= Authorization.split('Bearer ')[1];
        jwt.verify(token,process.env.JWT_SECRET);
        const {id}= jwt.decode(token);
        const urls= await consultarUrls(id);
        res.json(urls);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
  getUsuarios,
  shortenUrl,
  getShortUrl,
  getUrlsFromUser
}
