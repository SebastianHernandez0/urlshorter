const {consultarUsuario}= require('../models/userMode');

const getUsuarios= async(req,res)=>{
    try {
        const users= await consultarUsuario();
        res.json(users);
    } catch (error) {
        res.status(500).json({mensaje:'Error al consultar usuarios'});
    }
}


module.exports={
    getUsuarios
}