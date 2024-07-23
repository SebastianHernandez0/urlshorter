import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userurls.css";

const UserUrls = () => {
  const [urls, setUrls] = useState([]);
  console.log(urls);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://localhost:3000/usuarios", {
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

  return (
    <div className="user-urls">
      <h1 className="user-urls__h1">Mis URLs</h1>
      <ul className="user-urls__urls">
        {urls.map((url, index) => (
          <li className="user-urls__url" key={index}>
            <div>{url.original_url}</div>
            <a
              href={"http://localhost:3000/" + url.short_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {"http://localhost:3000/" + url.short_url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserUrls;
