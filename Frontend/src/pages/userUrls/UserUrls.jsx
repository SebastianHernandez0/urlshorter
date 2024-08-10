import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userurls.css";
import {FaTrash} from 'react-icons/fa';
import { FaEdit } from "react-icons/fa";


const UserUrls = () => {
  const [urls, setUrls] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editShortUrl, setEditShortUrl] = useState("");
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get("https://urlshorter-beryl.vercel.app/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUrls(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      });
  }, []);

  const deleteUrl= async(idUrl)=>{
    const token = localStorage.getItem("token");
    if (window.confirm("¿Seguro que quieres eliminar esta URL?")) {
      try{
        await axios.delete("https://urlshorter-beryl.vercel.app/usuarios/"+idUrl,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUrls(urls.filter(url=>url.id!==idUrl));
      }catch(error){
        console.log("Error en el delete",error);
      }

    }}
    const handleUpdateShortUrl= async(idUrl)=>{
      const token = localStorage.getItem("token");
      if (window.confirm("¿Seguro que quieres actualizar el short url?")) {
        try{
          await axios.put("https://urlshorter-beryl.vercel.app/usuarios/"+idUrl,{
            newShortUrl:editShortUrl},
            {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            
          });
          setUrls(urls.map(url=>url.id===idUrl?{id:url.id,original_url:url.original_url,short_url:editShortUrl}:url));
        }catch(error){
          console.log("Error en el update",error);
        } finally{
          setEditId(null);
          setEditShortUrl("");
        }
      } }

  return (
    <div className="user-urls">
      <h1 className="user-urls__h1">Mis URLs</h1>
      <ul className="user-urls__urls">
        {urls.map((url, index) => (
          <li className="user-urls__url" key={index}>
            <div>{url.original_url}</div>
            {editId== url.id? (
              <>
              <div className="edit__input-container">
              <h5 className="h4__input-container">https://surl-one.vercel.app/</h5>
              <input className="edit__input"
              type="text"
              value={editShortUrl}
              onChange={(e) => setEditShortUrl(e.target.value)}
              />
              </div>
              
            
              </>
              
            ):
            (<a
              href={"https://urlshorter-beryl.vercel.app/" + url.short_url}
              target="_blank"
              rel="noopener noreferrer"
            >
             <span className="user_span">{"https://surl-one.vercel.app/" + url.short_url}</span> 
            </a>)}
            <div className="url__actions">
            <FaTrash size={30}  className="delete__button" onClick={()=>deleteUrl(url.id)}/>
                {editId== url.id ? (
                  <button className="update__button" onClick={() => handleUpdateShortUrl(url.id)}>Guardar</button>
                ) : (
                  <FaEdit size={30}  className="edit__button" onClick={() => { setEditId(url.id); setEditShortUrl(url.short_url); }}/>
                )}
            </div>
            
              
              
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserUrls;
