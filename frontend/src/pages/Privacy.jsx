import React from 'react'
import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <div className="flex gap-3 mb-8">
          <Link to="/" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
          Privacy Policy
        </h1>

        <div className="text-gray-700 space-y-6 leading-relaxed">
          <div>
            <p className="text-xs sm:text-sm mb-3" style={{fontFamily: 'monospace'}}>
              Your privacy is important. This Photobooth App doesn’t collect, save, or share any of your photos or personal data. Everything stays on your device, and nothing is sent online.
            </p>
            <p className="text-xs sm:text-sm mb-3" style={{fontFamily: 'monospace'}}>
              The app will only use your camera if you allow it. After you take your photos, they’re yours, they never leave your browser.
            </p>
            <p className="text-xs sm:text-sm" style={{fontFamily: 'monospace'}}>
              If you have any questions, feel free to message me anytime.
            </p>
          </div>

          <p className="pt-6 text-xs text-gray-400" style={{fontFamily: 'monospace'}}>
            Last updated: November 2025
          </p>
        </div>
      </div>
    </div>
  )
}
