import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  const [showModal, setShowModal] = useState(false)
  const [activeSection, setActiveSection] = useState(null)

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-orange-100 via-pink-50 to-blue-100">
      <main className="relative z-10 px-8 text-center w-full max-w-2xl">
        <h1 className="text-8xl sm:text-9xl font-black leading-none mb-6 tracking-tighter" style={{fontFamily: '"Playfair Display", serif'}}>
          SnapStrip
        </h1>
        <p className="text-lg text-gray-700 mb-12 font-light">Instant photo strips, beautifully simple.</p>

        <Link 
          to="/photobooth" 
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-black text-white font-medium text-sm hover:scale-105 transition-transform duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Start
        </Link>

        {/* Footer Links */}
        <footer className="mt-16 pt-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <button onClick={() => setActiveSection('about')} className="hover:text-gray-900 transition-colors">About</button>
            <button onClick={() => setActiveSection('faqs')} className="hover:text-gray-900 transition-colors">FAQs</button>
            <button onClick={() => setActiveSection('privacy')} className="hover:text-gray-900 transition-colors">Privacy Policy</button>
            <button onClick={() => setShowModal(true)} className="hover:text-gray-900 transition-colors">Contact</button>
          </div>
        </footer>

        {/* About/FAQs/Privacy Modals */}
        {activeSection && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={() => setActiveSection(null)}>
            <div className="bg-white rounded-3xl p-12 max-w-lg w-full shadow-xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setActiveSection(null)} className="absolute top-6 right-6 text-gray-300 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light tracking-wide" style={{fontFamily: '"Playfair Display", serif'}}>
                  {activeSection === 'about' && 'About'}
                  {activeSection === 'faqs' && 'FAQs'}
                  {activeSection === 'privacy' && 'Privacy'}
                </h2>
              </div>
              
              {activeSection === 'about' && (
                <div className="text-gray-600 space-y-4 text-center leading-relaxed">
                  <p>SnapStrip is a minimalist photobooth app that lets you capture instant photo strips anywhere, anytime.</p>
                  <p>Our mission is to make photo memories simple, beautiful, and accessible to everyone.</p>
                  <p>No installations, no complicated setups — just pure photo fun.</p>
                </div>
              )}
              
              {activeSection === 'faqs' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="font-medium text-gray-800 mb-2">How does SnapStrip work?</p>
                    <p className="text-gray-600 text-sm leading-relaxed">Click Start, allow camera access, take photos, and download your strip instantly.</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-800 mb-2">Are my photos stored?</p>
                    <p className="text-gray-600 text-sm leading-relaxed">No, all photos are processed locally in your browser and never uploaded to our servers.</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-800 mb-2">Can I use this on mobile?</p>
                    <p className="text-gray-600 text-sm leading-relaxed">Yes! SnapStrip works on any device with a camera and modern browser.</p>
                  </div>
                </div>
              )}
              
              {activeSection === 'privacy' && (
                <div className="text-gray-600 space-y-4 text-center leading-relaxed">
                  <p className="font-medium text-gray-800">Privacy First</p>
                  <p className="text-sm">We respect your privacy completely.</p>
                  <div className="space-y-2 text-sm pt-2">
                    <p>Your photos are processed entirely in your browser</p>
                    <p>No data is sent to our servers</p>
                    <p>No tracking or analytics</p>
                    <p>No accounts or sign-ups required</p>
                  </div>
                  <p className="pt-4 text-xs text-gray-400">Last updated: November 2025</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">Drop a Message</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent! (Demo only)'); setShowModal(false); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" placeholder="Your name" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" placeholder="your@email.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none" placeholder="Your message..."></textarea>
              </div>
              
              <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
