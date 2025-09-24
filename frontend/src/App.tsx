import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import EncodePage from './components/EncodePage'
import DecodePage from './components/DecodePage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/encode" element={<EncodePage />} />
            <Route path="/decode" element={<DecodePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
