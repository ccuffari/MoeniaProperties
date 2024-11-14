import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/', label: t('nav.home') },
    { path: '/properties', label: t('nav.properties') },
    { path: '/services', label: t('nav.services') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') }
  ];

  return (
    <header className="fixed w-full bg-cream/95 z-50 border-b border-old-money-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-display text-old-money-800">Moenia Properties</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`hover:text-old-money-800 font-body text-sm tracking-wide ${
                  isActive(path) ? 'text-old-money-800 font-medium' : 'text-old-money-600'
                }`}
              >
                {label}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-old-money-800" /> : <Menu className="h-6 w-6 text-old-money-800" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-cream border-t border-old-money-100">
          <div className="container mx-auto px-4 py-4">
            {menuItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block py-3 ${
                  isActive(path)
                    ? 'text-old-money-800 font-medium'
                    : 'text-old-money-600 hover:text-old-money-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="py-3">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}