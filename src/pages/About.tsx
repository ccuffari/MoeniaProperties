import * as React from 'react';
import { Building2, Award, Users, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Moenia Properties",
    "description": t('about.description'),
    "areaServed": ["Beverly Hills", "Manhattan", "Chicago"],
    "knowsAbout": ["Luxury Real Estate", "Property Investment", "Real Estate Marketing"],
    "slogan": t('hero.title')
  };

  return (
    <div className="pt-24 pb-16">
      <Helmet>
        <title>{t('about.meta.title')}</title>
        <meta name="description" content={t('about.meta.description')} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('about.title')}</h1>
          
          <div className="prose max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              {t('about.intro')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Award className="h-12 w-12 text-gray-900 mb-4" />
                <h3 className="text-xl font-bold mb-2">{t('about.excellence.title')}</h3>
                <p className="text-gray-600">{t('about.excellence.description')}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Users className="h-12 w-12 text-gray-900 mb-4" />
                <h3 className="text-xl font-bold mb-2">{t('about.team.title')}</h3>
                <p className="text-gray-600">{t('about.team.description')}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">{t('about.mission.title')}</h2>
            <p className="text-gray-600 mb-8">{t('about.mission.description')}</p>

            <div className="bg-gray-50 p-8 rounded-xl mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('about.whyChooseUs.title')}</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-gray-900 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold">{t('about.whyChooseUs.experience.title')}</h3>
                    <p className="text-gray-600">{t('about.whyChooseUs.experience.description')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Building2 className="h-6 w-6 text-gray-900 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold">{t('about.whyChooseUs.portfolio.title')}</h3>
                    <p className="text-gray-600">{t('about.whyChooseUs.portfolio.description')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}