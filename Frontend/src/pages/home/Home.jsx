import './home.css'   
import axios from 'axios'
import {useEffect, useState} from 'react'

export default function Home() {
    const [url, setUrl] = useState('');
    const [input, setInput] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          setIsAuthenticated(true);
      }
    }, []);
    const urlRegex= /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/; 
    const handleForm=(e)=>{
        e.preventDefault();

        if(input.trim()===''){
            alert('Ingrese una url');
            return;
        }
        if(!urlRegex.test(input)){
            alert('Ingrese una url valida');
            return;
        }
        const token = localStorage.getItem('token');
        const config= isAuthenticated ?{
            url: 'http://localhost:3000/',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }:{
            url: 'http://localhost:3000/u',
        }
        axios.post(config.url, {url: input}, config)
        .then((response)=>{
            setUrl(response.data.url);
        })
        .catch((error)=>{
            console.log(error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        })
        
        
    }

    const handleInput=(e)=>{
        setInput(e.target.value);
    }
    return (
        <form className='home' onSubmit={handleForm}>
            <h1>Servicio de Acortar Urls</h1>
            <div className='home__input-container'>
                <input
                onChange={handleInput}
                value={input}
                type='text'
                placeholder='Ingrese la url'
                className='home__input'
                ></input>
                <button type='submit' className='home__button'>Acortar</button>
            </div>
            {url && (
                <div className='home__urls'>
                    <br></br>
                    <h2>Url acortada:</h2>
                    <a href={url} target='_blank' rel='noopener noreferrer'>{url}</a>
                </div>
            )}
        </form>
    );
}