import Form from './pages/Form'
import Wishes from './pages/Wishes'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="wishes" element={<Wishes />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
