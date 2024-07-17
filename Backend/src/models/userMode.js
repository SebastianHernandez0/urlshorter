const db= require('../config/database');


const consultarUsuario= async()=>{
    const query= `SELECT * FROM usuarios`;
    const {rows:users}= await db.query(query);
    return users;
}


module.exports={
    consultarUsuario
}