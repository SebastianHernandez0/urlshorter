import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userurls.css';

const UserUrls = () => {
  const [urls, setUrls] = useState([]);
  console.log(urls);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    
    axios.get('http://localhost:3000/usuarios', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      setUrls(response.data);
    })
    .catch((error) => {
      console.error(error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    });
  }, []);

  return (
    <div className="user-urls">
      <h1>Mis URLs Acortadas</h1>
      <ul>
          {urls.map((url, index) => (
              <li key={index}>
                  <a href={'http://localhost:3000/'+url.short_url} target="_blank" rel="noopener noreferrer">{url.short_url}</a> - {url.original_url}
              </li>
          ))}
      </ul>
    </div>
  );
};

export default UserUrls;