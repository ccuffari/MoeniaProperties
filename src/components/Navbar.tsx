import React from 'react';
import { Building2, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-gray-900" />
            <span className="text-xl font-bold text-gray-900">Moenia Properties</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#properties" className="text-gray-600 hover:text-gray-900">Properties</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
              Schedule Visit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#properties" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Properties</a>
              <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-gray-900">About</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Contact</a>
              <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 mt-2">
                Schedule Visit
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}