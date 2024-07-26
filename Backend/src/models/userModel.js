const db= require('../config/database');


function shortcode(){
    return Math.random().toString(36).substring(2,8);
}

const consultarUsuario= async()=>{
    const query= `SELECT * FROM usuarios`;
    const {rows:users}= await db.query(query);
    return users;
}

const consultarUrls= async(id)=>{
    if(id){
        const query= `SELECT * FROM urls WHERE usuario_id=$1`;
        const {rows:urls}= await db.query(query,[id]);
        return urls;
    }else{
        const query= `SELECT * FROM urls`;
        const {rows:urls}= await db.query(query);
        return urls;
    }
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

const acortarUrl= async(original_url,id)=>{
    try{
        if(id){
            const databaseUrls= await consultarUrls(id);
            const url= databaseUrls.find(url=>url.original_url===original_url);
            
            if(databaseUrls.find(url=>url.original_url===original_url)){
                return url.short_url;
            }
            const short_url= shortcode();
            const values= [id,original_url,short_url];
            const query= 'INSERT INTO urls (id,usuario_id,original_url,short_url,created_at) values (DEFAULT,$1,$2,$3,DEFAULT) returning short_url';    
            const {rows:urls}= await db.query(query,values);
            return urls[0].short_url;}
        else{
            const databaseUrls= await consultarUrls();
            const url= databaseUrls.find(url=>url.original_url===original_url);
            
            if(databaseUrls.find(url=>url.original_url===original_url)){
                return url.short_url;
            }
            const short_url= shortcode();
            const values= [original_url,short_url];
            const query= 'INSERT INTO urls (id,usuario_id,original_url,short_url,created_at) values (DEFAULT,null,$1,$2,DEFAULT) returning short_url';    
            const {rows:urls}= await db.query(query,values);
            return urls[0].short_url;
        }
        
    }
    catch (error) {
        console.log("Error en registro de url",error);
        throw error;
    }}  


const consultarShortUrl= async(short_url)=>{
    try {
        const query='SELECT original_url FROM urls WHERE short_url=$1';
        const {rows}= await db.query(query,[short_url]);
        if(rows.length===0){
            return "Url no encontrada";
        }
        const original_url= rows[0].original_url;
        return original_url;
    } catch (error) {
        
    }}

const eliminarUrlFromuser= async(idUser,idUrl)=>{
    try{
        const values=[idUser,idUrl];
        const query= 'DELETE FROM urls WHERE usuario_id=$1 AND id=$2';
        const {rows}=await db.query(query,values);
        return rows;
    }catch (error) {
        console.log("Error en eliminar url",error);
        throw error;
    }}

module.exports={
    consultarUsuario,verificarUsuario,consultarUsuarioByid,registrarUsuario,acortarUrl,consultarShortUrl,consultarUrls,eliminarUrlFromuser
}