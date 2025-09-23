import { useState } from 'react'
import { motion } from 'framer-motion'

function EncodePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [encodedImageUrl, setEncodedImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setEncodedImageUrl(null)
      setError(null)
    }
  }

  const handleEncode = async () => {
    if (!selectedImage || !message.trim()) {
      setError('Please select an image and enter a message')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedImage)
      formData.append('text', message)

      const response = await fetch('http://localhost:8000/encode/', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to encode message')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setEncodedImageUrl(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const downloadImage = () => {
    if (encodedImageUrl) {
      const link = document.createElement('a')
      link.href = encodedImageUrl
      link.download = 'encoded-image.png'
      link.click()
    }
  }

  return (
    <motion.div 
      className="page-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Encode Message
      </motion.h1>
      
      <motion.p 
        className="page-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Hide a secret message inside an image
      </motion.p>

      <motion.div 
        className="encode-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="form-group">
          <label htmlFor="image-input" className="form-label">
            Select Image
          </label>
          <motion.div 
            className="file-input-wrapper"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="file-input"
            />
            <div className="file-input-display">
              {selectedImage ? selectedImage.name : 'Choose an image file...'}
            </div>
          </motion.div>
        </div>

        <div className="form-group">
          <label htmlFor="message-input" className="form-label">
            Secret Message
          </label>
          <motion.textarea
            id="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your secret message here..."
            className="message-input"
            rows={4}
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {error}
          </motion.div>
        )}

        <motion.button
          onClick={handleEncode}
          disabled={isLoading || !selectedImage || !message.trim()}
          className="encode-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <motion.div 
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              
            </motion.div>
          ) : (
            'Encode Message'
          )}
        </motion.button>
      </motion.div>

      {encodedImageUrl && (
        <motion.div 
          className="result-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Message Encoded Successfully!</h3>
          <div className="encoded-image-container">
            <img 
              src={encodedImageUrl} 
              alt="Encoded image" 
              className="encoded-image"
            />
          </div>
          <motion.button
            onClick={downloadImage}
            className="download-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Encoded Image
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default EncodePage
