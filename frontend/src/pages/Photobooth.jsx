import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Photobooth() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const intervalRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [photos, setPhotos] = useState([])
  const [isAutoCapture, setIsAutoCapture] = useState(false)
  const [timer, setTimer] = useState(3)
  const [countdown, setCountdown] = useState(null)
  const [filter, setFilter] = useState('none')
  const [brightness, setBrightness] = useState(1)
  const [cameraError, setCameraError] = useState(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isMirrored, setIsMirrored] = useState(true)

  const filters = [
    { name: 'None', value: 'none', style: '' },
    { name: 'Grayscale', value: 'grayscale', style: 'grayscale(100%)' },
    { name: 'Sepia', value: 'sepia', style: 'sepia(100%)' },
    { name: 'Vintage', value: 'vintage', style: 'sepia(50%) contrast(1.2)' },
    { name: 'Cool', value: 'cool', style: 'hue-rotate(180deg) saturate(1.2)' },
    { name: 'Warm', value: 'warm', style: 'saturate(1.5) contrast(1.1)' },
  ]

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 1280, height: 720 } 
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      setCameraError('Unable to access camera. Please check permissions.')
      console.error('Camera error:', err)
    }
  }

  useEffect(() => {
    startCamera()
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-capture effect - trigger next capture after previous one completes
  useEffect(() => {
    if (isAutoCapture && photos.length > 0 && photos.length < 4 && countdown === null && !cameraError && !isCapturing) {
      // Trigger next capture automatically after previous capture completes
      const timeout = setTimeout(() => {
        handleCapture()
      }, 500) // Small delay between captures
      return () => clearTimeout(timeout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoCapture, photos.length, countdown, cameraError, isCapturing])

  const capturePhoto = () => {
    if (!videoRef.current || photos.length >= 4 || isCapturing) return
    
    setIsCapturing(true)
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext('2d')
    
    // Apply filter
    if (filter !== 'none') {
      const filterStyle = filters.find(f => f.value === filter)?.style
      ctx.filter = filterStyle || ''
    }
    
    // Mirror the image if mirror mode is on
    if (isMirrored) {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }
    
    ctx.drawImage(videoRef.current, 0, 0)
    const photoData = canvas.toDataURL('image/jpeg', 0.9)
    setPhotos(prev => [...prev, photoData])
    
    // Reset capturing state after a brief delay
    setTimeout(() => setIsCapturing(false), 500)
  }

  const handleCapture = () => {
    if (countdown !== null || photos.length >= 4 || isCapturing) return
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    // If timer is 0, capture immediately
    if (timer === 0) {
      capturePhoto()
      return
    }
    
    // Otherwise start countdown
    setCountdown(timer)
    let remainingTime = timer
    intervalRef.current = setInterval(() => {
      remainingTime -= 1
      if (remainingTime <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setCountdown(null)
        // Delay capture slightly to ensure state is settled
        setTimeout(() => capturePhoto(), 50)
      } else {
        setCountdown(remainingTime)
      }
    }, 1000)
  }

  const deletePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
    // Turn off auto-capture when user manually deletes a photo
    setIsAutoCapture(false)
  }

  const getFilterStyle = () => {
    const filterObj = filters.find(f => f.value === filter)
    const baseFilter = filterObj?.style || ''
    const brightnessFilter = `brightness(${brightness})`
    return baseFilter ? `${brightnessFilter} ${baseFilter}` : brightnessFilter
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg sm:text-xl font-normal tracking-tight text-gray-900" style={{fontFamily: '"Playfair Display", serif'}}>SnapStrip</h1>
          <div className="w-5 sm:w-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Camera Preview */}
          <div className="md:col-span-2 bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-gray-100">
            <div className="relative aspect-4/3 max-w-2xl mx-auto bg-black rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4">
              {cameraError ? (
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                  <div>
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p>{cameraError}</p>
                  </div>
                </div>
              ) : (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted
                    className="w-full h-full object-cover"
                    style={{ filter: getFilterStyle(), transform: isMirrored ? 'scaleX(-1)' : 'none' }}
                  />
                  {countdown !== null && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="text-white text-9xl font-black animate-pulse">{countdown}</div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Capture Mode & Timer */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAutoCapture(!isAutoCapture)}
                    className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                      isAutoCapture ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {isAutoCapture ? 'Auto' : 'Manual'}
                  </button>
                  <button
                    onClick={() => setIsMirrored(!isMirrored)}
                    className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                      isMirrored ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    title={isMirrored ? 'Mirror On' : 'Mirror Off'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-600">Timer:</span>
                  <select 
                    value={timer} 
                    onChange={(e) => setTimer(Number(e.target.value))}
                    className="flex-1 sm:flex-none px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  >
                    <option value={0}>No Timer</option>
                    <option value={3}>3s</option>
                    <option value={5}>5s</option>
                    <option value={10}>10s</option>
                  </select>
                </div>
              </div>

              {/* Brightness Control */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Brightness:</p>
                  <span className="text-xs text-gray-500">{Math.round(brightness * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={brightness}
                  onChange={(e) => setBrightness(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #e5e7eb 0%, #000 ${((brightness - 0.5) / 1.5) * 100}%, #e5e7eb ${((brightness - 0.5) / 1.5) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>

              {/* Filter Selection */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Filters:</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {filters.map(f => (
                    <button
                      key={f.value}
                      onClick={() => setFilter(f.value)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        filter === f.value 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Capture Button or Action Buttons */}
              {photos.length >= 4 ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setPhotos([])}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-full font-medium text-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Retake All
                  </button>
                  <button
                    onClick={() => navigate('/customize', { state: { photos } })}
                    className="flex-1 bg-black text-white py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Next
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleCapture}
                  disabled={countdown !== null || cameraError}
                  className="w-full bg-black text-white py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {countdown !== null ? (
                    `Capturing in ${countdown}...`
                  ) : (
                    <>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                      </svg>
                      <span className="hidden sm:inline">Capture Photo ({photos.length}/4)</span>
                      <span className="sm:hidden">Capture ({photos.length}/4)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Photo Preview Panel */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {photos.map((photo, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden group flex-shrink-0" style={{ width: '160px', height: '120px' }}>
                <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => deletePhoto(index)}
                  className="absolute top-2 right-2 bg-white/80 text-gray-700 rounded-full p-1.5 hover:bg-white hover:text-black transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

