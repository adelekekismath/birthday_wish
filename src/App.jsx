import Form from './pages/Form'
import Wishes from './pages/Wishes'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="wishes" element={<Wishes />} />
            <Route path="form" element={<Form />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
