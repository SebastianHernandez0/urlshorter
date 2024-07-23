import {Route, Routes} from "react-router-dom"
import  Navbar  from "./components/navbar/Navbar.jsx"
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import Success from './pages/success/Success.jsx'
import UserUrls from './pages/userUrls/UserUrls.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx"
function App() {
  

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/userUrls" element={
          <ProtectedRoute>
            <UserUrls />
          </ProtectedRoute>}
          />
      </Routes>
    </div>
  )
}

export default App
