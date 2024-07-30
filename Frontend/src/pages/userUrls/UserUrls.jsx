import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userurls.css";
import {FaTrash} from 'react-icons/fa';

const UserUrls = () => {
  const [urls, setUrls] = useState([]);
  const[dUrls, setdUrls]= useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get("https://urlshorter-uat6.onrender.com/usuarios", {
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
        await axios.delete("https://urlshorter-uat6.onrender.com/usuarios/"+idUrl,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUrls(urls.filter(url=>url.id!==idUrl));
      }catch(error){
        console.log("Error en el delete",error);
      }

    }

    
  }

  return (
    <div className="user-urls">
      <h1 className="user-urls__h1">Mis URLs</h1>
      <ul className="user-urls__urls">
        {urls.map((url, index) => (
          <li className="user-urls__url" key={index}>
            <div>{url.original_url}</div>
            <a
              href={"https://urlshorter-uat6.onrender.com/" + url.short_url}
              target="_blank"
              rel="noopener noreferrer"
            >
             <span className="user_span">{"https://surl-one.vercel.app/" + url.short_url}</span> 
            </a>
            
              <FaTrash size={30}  className="delete__button" onClick={()=>deleteUrl(url.id)}/>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserUrls;
