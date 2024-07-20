import './navbar.css'
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import {FaLink } from 'react-icons/fa'
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
  
    const handleAvatarClick = () => {
      setMenuOpen(!menuOpen);
    };
  
    return (
      <nav className="navbar">
        <div className='navbar-brand'>
            <FaLink/>
            <h2>Acortar urls</h2>
            
        </div>
        <div>
        <div className="navbar-menu">
          <div className="profile">
            <FaUserCircle size={30} onClick={handleAvatarClick} />
            {menuOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li>Logearse</li>
                  <li>Registrarse</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        </div>
        
      </nav>
    );
  }