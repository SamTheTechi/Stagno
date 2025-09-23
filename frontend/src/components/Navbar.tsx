import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <Link 
        to="/" 
        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
      >
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </motion.span>
      </Link>
      <Link 
        to="/encode" 
        className={`nav-link ${location.pathname === '/encode' ? 'active' : ''}`}
      >
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Encode
        </motion.span>
      </Link>
      <Link 
        to="/decode" 
        className={`nav-link ${location.pathname === '/decode' ? 'active' : ''}`}
      >
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Decode
        </motion.span>
      </Link>
    </nav>
  )
}

export default Navbar
