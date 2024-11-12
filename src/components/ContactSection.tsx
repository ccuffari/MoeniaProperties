import * as React from 'react';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl text-old-money-800 mb-6">{t('contact.title')}</h2>
          <p className="text-old-money-600 text-lg">{t('contact.getInTouch')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white border border-old-money-100 p-12">
            <h3 className="font-display text-2xl text-old-money-800 mb-8">{t('contact.form.title')}</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-old-money-600 mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-old-money-100 focus:border-old-money-200 focus:ring-0 bg-white"
                  placeholder={t('contact.form.name')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-old-money-600 mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-old-money-100 focus:border-old-money-200 focus:ring-0 bg-white"
                  placeholder={t('contact.form.email')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-old-money-600 mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  className="w-full p-3 border border-old-money-100 focus:border-old-money-200 focus:ring-0 bg-white"
                  rows={4}
                  placeholder={t('contact.form.message')}
                ></textarea>
              </div>
              
              <button className="w-full bg-old-money-800 text-white px-6 py-3 text-sm tracking-wide hover:bg-old-money-700 transition-colors">
                {t('contact.form.send')}
              </button>
            </form>
          </div>
          
          <div className="bg-white border border-old-money-100 p-12">
            <h3 className="font-display text-2xl text-old-money-800 mb-8">{t('contact.info.title')}</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-old-money-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-medium text-old-money-800 mb-1">{t('contact.info.phone')}</h4>
                  <p className="text-old-money-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-old-money-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-medium text-old-money-800 mb-1">{t('contact.info.email')}</h4>
                  <p className="text-old-money-600">contact@moeniaproperties.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-old-money-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-medium text-old-money-800 mb-1">{t('contact.info.office')}</h4>
                  <p className="text-old-money-600">123 Madison Avenue, New York, NY 10022</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="h-6 w-6 text-old-money-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-medium text-old-money-800 mb-1">{t('contact.info.hours')}</h4>
                  <p className="text-old-money-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-old-money-600">Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}