const db= require('../config/database');
const jwt = require('jsonwebtoken');

function shortcode(){
    return Math.random().toString(36).substring(2,8);
}



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

const acortarUrl= async(url,id)=>{
    try{
        const short_url= shortcode();
        const values= [id,url,short_url];
        const query= 'INSERT INTO urls (id,usuario_id,original_url,short_url,created_at) values (DEFAULT,$1,$2,$3,DEFAULT) returning short_url';    
        const {rows:urls}= await db.query(query,values);
        return urls[0].short_url;
        
    }
    catch (error) {
        console.log("Error en registro de url",error);
        throw error;
    }}  

module.exports={
    consultarUsuario,verificarUsuario,consultarUsuarioByid,registrarUsuario,acortarUrl
}