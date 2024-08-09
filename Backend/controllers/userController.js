const jwt = require('jsonwebtoken');
const {
  consultarUsuario,
  acortarUrl,
  consultarUrls,
  consultarShortUrl,
  eliminarUrlFromuser,
  modificarShortUrl
  
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
        const customName= req.body.customName
        const Authorization= req.header('Authorization');
        if(Authorization && customName){
            const token= Authorization.split('Bearer ')[1];
            jwt.verify(token,process.env.JWT_SECRET);
            const {id}= jwt.decode(token);
            const shortUrl= await acortarUrl(url,id, customName);
            res.json({url: `https://urlshorter-beryl.vercel.app/${shortUrl}`  })
        }if(Authorization && !customName){
            const token= Authorization.split('Bearer ')[1];
            jwt.verify(token,process.env.JWT_SECRET);
            const {id}= jwt.decode(token);
            const shortUrl= await acortarUrl(url,id);
            res.json({url: `https://urlshorter-beryl.vercel.app/${shortUrl}`  })
        }if(!Authorization && customName){
            const shortUrl= await acortarUrl(url,null,customName);
            res.json({url: `https://urlshorter-beryl.vercel.app/${shortUrl}`  })
        }if(!Authorization && !customName){
            const shortUrl= await acortarUrl(url);
            res.json({url: `https://urlshorter-beryl.vercel.app/${shortUrl}`  })
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

const getAllUrls= async(req,res)=>{
    try {
        const urls=await consultarUrls();
        res.json(urls);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteUrl= async(req,res)=>{
    try{
        const Authorization= req.header('Authorization');
        const token= Authorization.split('Bearer ')[1];
        jwt.verify(token,process.env.JWT_SECRET)
        const {id}= jwt.decode(token);
        const idUrl= req.params.idUrl;
        await eliminarUrlFromuser(id,idUrl);
        console.log(`El usuario ${id} ha eliminado la url ${idUrl}`);
        res.json("Url eliminada");
    }catch (error) {
        res.status(500).json({error: error.message});
    }

}
const updateShortUrl= async(req,res)=>{
    try{
        const Authorization= req.header('Authorization');
        const token= Authorization.split('Bearer ')[1];
        jwt.verify(token,process.env.JWT_SECRET)
        const {id}= jwt.decode(token);
        const idUrl= req.params.idUrl;
        const newShortUrl= req.body.newShortUrl;
        await modificarShortUrl(id,idUrl,newShortUrl);
        console.log(`El usuario ${id} ha modificado la url ${idUrl} a ${newShortUrl}`);
        res.json("Url modificada");
    }catch (error) {
        res.status(500).json({error: error.message});
    }

}
module.exports = {
  getUsuarios,
  shortenUrl,
  getShortUrl,
  getUrlsFromUser,
  getAllUrls,
  deleteUrl,
  updateShortUrl
}
