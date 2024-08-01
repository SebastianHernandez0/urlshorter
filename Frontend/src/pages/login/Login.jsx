import './login.css'

export default function Login() {
    const handleGoogleAuth= ()=>{
        window.location.href='https://urlshorter-beryl.vercel.app/auth/google'
    }


    return (
        <div className="login">
            <div className='login__container'>
                <img src="url-link.jpg" className="logo-url"></img>
            <h1>Log in to Surls</h1>
            <h5 className='login__h5'>Log in with your Google account</h5>
            <div className='login__google-button' onClick={handleGoogleAuth}>
            <img  className="logo" src="google.png"></img>
            <h5>Continue with Google</h5>
            </div>
            
            </div>
            
        </div>
    )
}