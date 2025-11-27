import React from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <div className="min-h-screen bg-white p-6 sm:p-8">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <div className="flex gap-3 mb-8">
          <Link to="/" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
          Get in Touch
        </h1>
        
        <p className="text-gray-700 text-sm mb-6" style={{fontFamily: 'monospace'}}>
          Have questions or feedback? We'd love to hear from you!
        </p>

        {/* Contact Form */}
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            alert('Message sent! (Demo only)'); 
          }} 
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1.5">Name</label>
            <input 
              type="text" 
              required 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none" 
              placeholder="Your name"
              style={{fontFamily: 'monospace'}}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1.5">Email</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none" 
              placeholder="your@email.com"
              style={{fontFamily: 'monospace'}}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1.5">Message</label>
            <textarea 
              required 
              rows="6" 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none" 
              placeholder="Your message..."
              style={{fontFamily: 'monospace'}}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
