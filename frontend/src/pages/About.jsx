import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
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

        {/* About Section */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
          About SnapStrip
        </h1>
        
        <div className="text-gray-700 text-xs sm:text-sm leading-relaxed" style={{fontFamily: 'monospace'}}>
          <p className="mb-3">
            I’ve always enjoyed the charm of photobooths, they freeze little moments in the best way. Since they’re not always easy to access, I built SnapStrip, a personal project, so you can enjoy that photobooth vibe anytime you want.
          </p>
          <p className='mb-6'>
            This app brings back the classic photo strip style: stacked shots, simple text, and an easy download. Whether you’re being silly, sweet, or just capturing a moment, SnapStrip lets you create that nostalgic strip right from your browser.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* FAQs Section */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
          Things you might ask
        </h2>
        
        <div className="space-y-6">
          <div>
            <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Do my photos get uploaded anywhere?</p>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed" style={{fontFamily: 'monospace'}}>
              No. All photos stay on your device. Nothing is sent to a server or stored online.
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Why is my camera not working?</p>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed" style={{fontFamily: 'monospace'}}>
              Make sure you allowed camera access in your browser. If it still doesn’t work, try refreshing the page or switching browsers.
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Can I retake a photo if I don’t like it?</p>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed" style={{fontFamily: 'monospace'}}>
              Yes! Just retake the photo before saving your strip.
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Can I use this on my phone?</p>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed" style={{fontFamily: 'monospace'}}>
              Absolutely. SnapStrip works on most mobile browsers, as well as tablets and desktops.
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base">How do I save my photo strip?</p>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed" style={{fontFamily: 'monospace'}}>
              After you finish your shots, tap the download button and it will save directly to your device.
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Will SnapStrip slow down my device or use a lot of data?</p>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed" style={{fontFamily: 'monospace'}}>
              No. Everything happens locally in your browser, and the app doesn’t upload anything.
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Why did you make this app?</p>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed" style={{fontFamily: 'monospace'}}>
              I love photobooths and wanted to recreate the fun, nostalgic experience online so anyone can use it anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
