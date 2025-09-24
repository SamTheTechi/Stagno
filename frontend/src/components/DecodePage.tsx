import { useState } from 'react'
import { motion } from 'framer-motion'

function DecodePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [decodedMessage, setDecodedMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setDecodedMessage(null)
      setError(null)
    }
  }

  const handleDecode = async () => {
    if (!selectedImage) {
      setError('Please select an image')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedImage)

      const response = await fetch('http://localhost:8000/decode/', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to decode message')
      }

      const result = await response.json()
      setDecodedMessage(result.decoded_text)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
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
        Decode Message
      </motion.h1>

      <motion.p
        className="page-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Extract a secret message from an image
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
          onClick={handleDecode}
          disabled={isLoading || !selectedImage}
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
            'Decode Message'
          )}
        </motion.button>
      </motion.div>

      {decodedMessage && (
        <motion.div
          className="result-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h3>Decoded Message:</h3>
          <motion.div
            className="decoded-message-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>{decodedMessage}</p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default DecodePage
