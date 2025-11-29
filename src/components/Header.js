import React, { useState } from 'react';
import { Menu, X, ImagePlus } from 'lucide-react';

const Header = ({
  companyInfo = { name: 'Company Name', tagline: 'Your Tagline' },
  setCurrentView = () => {},
  setShowPasswordModal = () => {},
  activeView = 'home'
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'Products' },
    { key: 'articles', label: 'Artikel' },
    { key: 'gallery', label: 'Galeri Karya' }, 
        { key: 'profil', label: 'Profile' },// 🟢 menu baru
  ];

  const handleNavClick = (key) => {
    if (key === 'admin') {
      setShowPasswordModal(true);
    } else {
      setCurrentView(key);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo dan Info Perusahaan */}
          <div className="flex items-center space-x-3">
            <img
              src="/logocraftinova.png"
              alt="Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-teal-800">{companyInfo.name}</h1>
              <p className="text-xs text-teal-600 hidden sm:block">{companyInfo.tagline}</p>
            </div>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`transition-colors duration-200 ${
                  activeView === item.key
                    ? 'text-teal-600 font-semibold'
                    : 'text-gray-600 hover:text-teal-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Tombol Menu Mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`text-left px-2 py-2 rounded-lg transition-colors duration-200 ${
                    activeView === item.key
                      ? 'text-teal-600 font-semibold bg-teal-50'
                      : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;