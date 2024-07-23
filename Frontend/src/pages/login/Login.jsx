import './login.css'
import axios from 'axios'
export default function Login() {
    const handleGoogleAuth= ()=>{
        window.location.href='http://localhost:3000/auth/google'
    }


    return (
        <div className="login">
            <h1>Iniciar sesión</h1>
            <img onClick={handleGoogleAuth} className="logo" src="google.png"></img>
        </div>
    )
}