import './navbar.css'
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import {FaLink } from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
  
    const handleAvatarClick = () => {
      setMenuOpen(!menuOpen);
    };
    const handleCloseMenu= ()=>{
      setMenuOpen(false);
    }

    useEffect(() => {
      const updateAuthState= ()=>{
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
      }
      updateAuthState();

      window.addEventListener('storage', updateAuthState);

      return ()=>{
        window.removeEventListener('storage', updateAuthState);
      }

    }, []);

    const handleLogout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(!!token);
      navigate('/login');
    }
  
    return (
      <nav className="navbar">
        <div className='navbar-brand'>
            <FaLink/>
            <Link to='/' className='navbar-brand__link'>Acortar urls</Link>
            
        </div>
        <div>
        <div className="navbar-menu">
          <div className="profile">
            <FaUserCircle size={30} onClick={handleAvatarClick} />
            {menuOpen && (
              <div className="dropdown-menu">
                <ul>
                  {isAuthenticated ? (
                    <>
                    <li>
                      <Link className='dropdown-menu__link' to='/userUrls' onClick={handleCloseMenu}>Mis URLs</Link>
                    </li>
                    <li>
                    <Link className='dropdown-menu__link' to='/logout' onClick={handleLogout}>Cerrar sesión</Link>
                  </li>
                  </>
                  ) : (
                    <li>
                      <Link className='dropdown-menu__link' to='/login' onClick={handleCloseMenu}>Iniciar sesión</Link>
                    </li>
                    
                    
                  )}
                  
                </ul>
              </div>
            )}
          </div>
        </div>
        </div>
        
      </nav>
    );
  }