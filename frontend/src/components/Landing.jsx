import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      {/* Animated Radial Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl animate-blob"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
              top: '20%',
              left: '10%',
              animation: 'blob 7s infinite'
            }}
          ></div>
          <div 
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl animate-blob animation-delay-2000"
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
              top: '40%',
              right: '10%',
              animation: 'blob 7s infinite 2s'
            }}
          ></div>
          <div 
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl animate-blob animation-delay-4000"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
              bottom: '20%',
              left: '30%',
              animation: 'blob 7s infinite 4s'
            }}
          ></div>
        </div>
      </div>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 text-center">
        <div className="w-full max-w-xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-normal leading-none mb-3 sm:mb-4 tracking-tight text-gray-900" style={{fontFamily: '"Playfair Display", serif'}}>
            SnapStrip
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mb-8 sm:mb-12 font-light">Capture fun photo-strip moments right from your browser.</p>

          <Link 
            to="/photobooth" 
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-black text-white font-normal text-sm hover:bg-gray-800 transition-colors"
          >
            Start
          </Link>
        </div>
      </main>

      {/* Footer Links */}
      <footer className="py-6 sm:py-8 px-4 sm:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs text-gray-400">
          <Link to="/about" className="hover:text-gray-600 transition-colors">About</Link>
          <Link to="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
          <Link to="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  )
}
