import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Customize() {
  const location = useLocation()
  const photos = location.state?.photos || []
  
  const [frameColor, setFrameColor] = useState('#ffffff')
  const [customText, setCustomText] = useState('')
  const [showDate, setShowDate] = useState(false)
  const [roundedCorners, setRoundedCorners] = useState(false)
  const [whiteText, setWhiteText] = useState(false)

  const presetColors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' },
    { name: 'Pink', value: '#ffc0cb' },
    { name: 'Blue', value: '#add8e6' },
    { name: 'Yellow', value: '#ffffe0' },
    { name: 'Lavender', value: '#e6e6fa' },
  ]

  const getCurrentDate = () => {
    const date = new Date()
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const downloadStrip = async () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // Custom photo strip size: 880x2828 pixels (matching preview ratio)
    canvas.width = 880
    canvas.height = 2828
    
    // Fill background with frame color
    ctx.fillStyle = frameColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const padding = 55 // Tighter padding
    const cornerRadius = roundedCorners ? 45 : 20 // Scaled proportionally
    
    let yPosition = padding
    
    // Calculate photo dimensions (4:3 aspect ratio to match preview)
    const photoWidth = canvas.width - (padding * 2)
    const photoHeight = (photoWidth * 3) / 4
    const spacing = 28 // Tighter spacing between photos
    
    // Load all images first
    const loadedImages = await Promise.all(
      photos.map((photoData) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => resolve(img)
          img.src = photoData
        })
      })
    )
    
    // Draw each photo
    loadedImages.forEach((img) => {
      // Draw rounded rectangle
      ctx.save()
      ctx.beginPath()
      
      const x = padding
      const y = yPosition
      const w = photoWidth
      const h = photoHeight
      
      // Rounded corners path
      ctx.moveTo(x + cornerRadius, y)
      ctx.lineTo(x + w - cornerRadius, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + cornerRadius)
      ctx.lineTo(x + w, y + h - cornerRadius)
      ctx.quadraticCurveTo(x + w, y + h, x + w - cornerRadius, y + h)
      ctx.lineTo(x + cornerRadius, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - cornerRadius)
      ctx.lineTo(x, y + cornerRadius)
      ctx.quadraticCurveTo(x, y, x + cornerRadius, y)
      ctx.closePath()
      ctx.clip()
      
      // Calculate dimensions to maintain aspect ratio and cover the area (object-cover behavior)
      const imgAspect = img.width / img.height
      const targetAspect = w / h
      
      let drawWidth, drawHeight, offsetX, offsetY
      
      if (imgAspect > targetAspect) {
        // Image is wider, fit to height
        drawHeight = h
        drawWidth = h * imgAspect
        offsetX = x - (drawWidth - w) / 2
        offsetY = y
      } else {
        // Image is taller, fit to width
        drawWidth = w
        drawHeight = w / imgAspect
        offsetX = x
        offsetY = y - (drawHeight - h) / 2
      }
      
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
      ctx.restore()
      
      yPosition += photoHeight + spacing
    })
    
    // Draw branding - closer to photos with minimal spacing
    yPosition += 65
    ctx.fillStyle = whiteText ? '#ffffff' : '#000000'
    ctx.font = '900 68px "Playfair Display", serif'
    ctx.textAlign = 'center'
    ctx.fillText('SnapStrip', canvas.width / 2, yPosition)
    
    // Draw custom text if exists - very close spacing to SnapStrip
    if (customText.trim()) {
      yPosition += 65
      ctx.fillStyle = whiteText ? '#ffffff' : '#000000'
      ctx.font = '58px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.fillText(customText, canvas.width / 2, yPosition)
    }
    
    // Draw date at bottom if enabled - much closer to bottom edge
    if (showDate) {
      ctx.fillStyle = whiteText ? '#ffffff' : '#000000'
      ctx.font = '48px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.fillText(getCurrentDate(), canvas.width / 2, canvas.height - 90)
    }
    
    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `snapstrip-${Date.now()}.png`
      link.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <Link to="/photobooth" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg sm:text-xl font-normal tracking-tight text-gray-900" style={{fontFamily: '"Playfair Display", serif'}}>Customize</h1>
          <div className="w-5 sm:w-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Customization Options */}
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 space-y-4 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-normal text-gray-900 mb-3 sm:mb-4">Options</h2>

            {/* Custom Text */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Add custom text or emoji</p>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                
                maxLength={30}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">{customText.length}/30 characters</p>
            </div>

            {/* Frame Color */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Frame color</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {presetColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setFrameColor(color.value)}
                    className={`px-6 py-4 rounded-lg font-medium transition-all border-2 ${
                      frameColor === color.value
                        ? 'border-black scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Custom:</label>
                <input
                  type="color"
                  value={frameColor}
                  onChange={(e) => setFrameColor(e.target.value)}
                  className="w-16 h-10 rounded-lg cursor-pointer border border-gray-300"
                />
                <span className="text-xs text-gray-500 font-mono">{frameColor}</span>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Show date</span>
                <button
                  onClick={() => setShowDate(!showDate)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    showDate ? 'bg-black' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      showDate ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Rounded corners</span>
                <button
                  onClick={() => setRoundedCorners(!roundedCorners)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    roundedCorners ? 'bg-black' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      roundedCorners ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">White text</span>
                <button
                  onClick={() => setWhiteText(!whiteText)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    whiteText ? 'bg-black' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      whiteText ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button 
                onClick={downloadStrip}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors"
              >
                Download Strip
              </button>
              <Link to="/" className="flex-1 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors text-center">
                Start Over
              </Link>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="flex items-center justify-center mt-6 md:mt-0">
            {/* Photo Strip Preview */}
            <div
              className={`relative pt-3 px-3 pb-16 shadow-2xl ${roundedCorners ? 'rounded-2xl' : 'rounded-lg'}`}
              style={{ backgroundColor: frameColor, width: '180px', maxWidth: '100%' }}
            >
              <div className="space-y-1.5">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className={`overflow-hidden shadow-sm ${roundedCorners ? 'rounded-xl' : 'rounded-md'}`}
                    style={{ aspectRatio: '4/3' }}
                  >
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <div className={`text-center mt-3 font-bold ${whiteText ? 'text-white' : 'text-black'}`} style={{ fontSize: '15px', fontFamily: '"Playfair Display", serif', fontWeight: '900' }}>
                SnapStrip
              </div>
              
              {customText.trim() && (
                <div className={`text-center mt-1.5 ${whiteText ? 'text-white' : 'text-black'}`} style={{ fontSize: '13px', fontFamily: '"Playfair Display", serif' }}>
                  {customText}
                </div>
              )}
              
              {showDate && (
                <div className={`text-center ${whiteText ? 'text-white' : 'text-black'}`} style={{ fontSize: '10.5px', fontFamily: '"Playfair Display", serif', position: 'absolute', bottom: '18px', left: 0, right: 0 }}>
                  {getCurrentDate()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
