import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem('token', token);
           
            window.dispatchEvent(new Event('storage'));
            navigate('/userUrls');  
        } else {
            navigate('/login'); 
        }
    }, [navigate]);

    return (
        <div>
            <h1>Redireccionando...</h1>
        </div>
    );
};

export default Success;