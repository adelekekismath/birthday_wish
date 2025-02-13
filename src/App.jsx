import Form from './pages/Form'
import Wishes from './pages/Wishes'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import './styles/App.scss';


function App() {

  return (
    <UserProvider>
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="wishes" element={<Wishes />} />
            <Route path="form" element={<Form />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path='about' element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </UserProvider>
  )
}

export default App
