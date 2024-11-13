import * as React from 'react';
import { Building2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-cream/95 pt-16 pb-8 border-t border-old-money-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/img/logo.jpg" alt="Moenia Properties" className="h-8 w-8" />
              <span className="text-xl font-bold text-old-money-800">Moenia Properties</span>
            </div>
            <p className="text-old-money-600">
              {t('footer.description')}
            </p>
          </div>
                    
          <div>
            <h4 className="text-lg font-bold mb-4 text-old-money-800">{t('footer.followUs')}</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-old-money-600 hover:text-old-money-800">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-old-money-600 hover:text-old-money-800">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/moeniaproperties/" className="text-old-money-600 hover:text-old-money-800">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-old-money-600 hover:text-old-money-800">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-old-money-100 pt-8">
          <div className="text-center text-old-money-600">
            <p className="mb-2">© {new Date().getFullYear()} Moenia Properties. {t('footer.rights')}</p>
            <p className="text-sm">
              {t('footer.cookieNotice')}{' '}
              <Link to="/privacy" className="underline hover:text-old-money-800">
                {t('footer.privacy')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}