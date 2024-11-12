import * as React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'it', label: 'IT' },
    { code: 'en', label: 'EN' }
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
      setIsOpen(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[1];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        {currentLanguage.label}
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-20 bg-gray-900 rounded-lg shadow-lg py-1 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`block w-full text-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 ${
                i18n.language === lang.code ? 'bg-gray-800 text-white font-medium' : ''
              }`}
              role="menuitem"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}