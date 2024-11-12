import * as React from 'react';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-16 bg-gray-50 rounded-xl mt-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('contact.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6">{t('contact.getInTouch')}</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder={t('contact.form.name')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg"
                  placeholder={t('contact.form.email')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.message')}
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={4}
                  placeholder={t('contact.form.message')}
                ></textarea>
              </div>
              
              <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800">
                {t('contact.form.send')}
              </button>
            </form>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-gray-900 mr-4" />
                <div>
                  <h4 className="font-medium">{t('contact.info.phone')}</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-gray-900 mr-4" />
                <div>
                  <h4 className="font-medium">{t('contact.info.email')}</h4>
                  <p className="text-gray-600">contact@moeniaproperties.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-gray-900 mr-4" />
                <div>
                  <h4 className="font-medium">{t('contact.info.office')}</h4>
                  <p className="text-gray-600">123 Madison Avenue, New York, NY 10022</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-gray-900 mr-4" />
                <div>
                  <h4 className="font-medium">{t('contact.info.hours')}</h4>
                  <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}