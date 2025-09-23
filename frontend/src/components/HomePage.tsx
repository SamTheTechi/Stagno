import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <motion.div 
      className="page-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="hero-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        🔐 Steganography Tool
      </motion.h1>
      
      <motion.p 
        className="hero-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Hide secret messages inside images using advanced steganography techniques
      </motion.p>

      <motion.div 
        className="features-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="feature-icon">📝</div>
          <h3>Encode Messages</h3>
          <p>Hide secret text messages inside your images without visible changes</p>
          <Link to="/encode" className="feature-link">
            <motion.button 
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Encoding
            </motion.button>
          </Link>
        </motion.div>

        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="feature-icon">🔍</div>
          <h3>Decode Messages</h3>
          <p>Extract hidden messages from images that contain secret data</p>
          <Link to="/decode" className="feature-link">
            <motion.button 
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Decoding
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className="info-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h3>How it works</h3>
        <p>
          This tool uses LSB (Least Significant Bit) steganography to hide text messages 
          in the red channel of image pixels. The changes are imperceptible to the human eye 
          but can be decoded by the algorithm.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default HomePage
