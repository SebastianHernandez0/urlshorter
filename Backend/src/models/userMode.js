const db= require('../config/database');
const jwt = require('jsonwebtoken');


const consultarUsuario= async()=>{
    const query= `SELECT * FROM usuarios`;
    const {rows:users}= await db.query(query);
    return users;
}

const consultarUsuarioByid= async(id)=>{
    const query= `SELECT * FROM usuarios WHERE id=$1`;
    const {rows:users}= await db.query(query,[id]);
    return users[0];
}

const registrarUsuario= async(email)=>{
    try {
        const databaseUser= await consultarUsuario();
        if(databaseUser.find(user=>user.email===email)){
            throw new Error('Email ya registrado');
        }
        const values= [email]
        const query= 'INSERT INTO usuarios (id,email) values (DEFAULT,$1) returning *';
        const {rows:users}= await db.query(query,values);
        return users[0];
    } catch (error) {
        console.log("Error en registro de usuario",error);
        throw error;
    }}

const verificarUsuario= async(email)=>{
    try {
        const values= [email]
        const query= 'SELECT * FROM usuarios WHERE email=$1';
        const {rows}= await db.query(query,values);
        if(rows.length===0){
            return null
        }
        const user= rows[0];
        return user;}
    catch (error) {
        console.log("Error en verificacion de usuario",error);
        throw error;
    }}


module.exports={
    consultarUsuario,verificarUsuario,consultarUsuarioByid,registrarUsuario
}