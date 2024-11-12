import * as React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-old-money-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <span className="text-xl font-display text-old-money-800">Moenia Properties</span>
            </div>
            <p className="text-old-money-600 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-old-money-800 mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4">
              <li><Link to="/properties" className="text-old-money-600 hover:text-old-money-800 text-sm">{t('nav.properties')}</Link></li>
              <li><Link to="/services" className="text-old-money-600 hover:text-old-money-800 text-sm">{t('nav.services')}</Link></li>
              <li><Link to="/about" className="text-old-money-600 hover:text-old-money-800 text-sm">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="text-old-money-600 hover:text-old-money-800 text-sm">{t('nav.contact')}</Link></li>
              <li><Link to="/privacy" className="text-old-money-600 hover:text-old-money-800 text-sm">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-old-money-800 mb-6">{t('footer.propertyTypes')}</h4>
            <ul className="space-y-4">
              <li><Link to="/properties" className="text-old-money-600 hover:text-old-money-800 text-sm">{t('footer.properties.luxury')}</Link></li>
              <li><Link to="/properties" className="text-old-money-600 hover:text-old-money-800 text-sm">{t('footer.properties.penthouses')}</Link></li>
              <li><Link to="/properties" className="text-old-money-600 hover:text-old-money-800 text-sm">{t('footer.properties.estates')}</Link></li>
              <li><Link to="/properties" className="text-old-money-600 hover:text-old-money-800 text-sm">{t('footer.properties.villas')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-old-money-800 mb-6">{t('footer.followUs')}</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-old-money-400 hover:text-old-money-800 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-old-money-400 hover:text-old-money-800 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/moeniaproperties/" className="text-old-money-400 hover:text-old-money-800 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-old-money-400 hover:text-old-money-800 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-old-money-100 pt-8">
          <div className="text-center">
            <p className="text-old-money-600 text-sm mb-2">
              © {new Date().getFullYear()} Moenia Properties. {t('footer.rights')}
            </p>
            <p className="text-old-money-500 text-xs">
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