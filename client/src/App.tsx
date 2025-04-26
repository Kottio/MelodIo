import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Composition from './components/Composition'
import Part from './components/Part'


function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} >   </Route>
        <Route path="/composition/:compositionId" element={<Composition />}>
        </Route>
        <Route path='/composition/:compositionId/part/:partId' element={<Part />}></Route>

      </Routes >
    </BrowserRouter >
  </>
}

export default App
