import React, { useState } from 'react';

const Navbar = ({ openModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md mx-auto mt-5 rounded-full max-w-3xl">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center md:flex-none">
            <div className="flex-shrink-0">
              <img 
                className="h-10 w-10 rounded-full object-cover"
                src="/cybermind_works_logo-qLEHG32l.jpeg" 
                alt="logo"
              />
            </div>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <h1 className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Home</h1>
            <h1 className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Find Jobs</h1>
            <h1 className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Find Talents</h1>
            <h1 className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">About Us</h1>
            <h1 className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Testimonials</h1>
          </div>
          
          {/* Create Job Button (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={openModal}
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            >
              Create Job
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600"
              aria-expanded="false"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-b-xl shadow-lg">
            <h1 className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer">Home</h1>
            <h1 className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer">Find Jobs</h1>
            <h1 className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer">Find Talents</h1>
            <h1 className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer">About Us</h1>
            <h1 className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer">Testimonials</h1>
            <button
              onClick={openModal}
              className="w-full mt-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            >
              Create Job
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;