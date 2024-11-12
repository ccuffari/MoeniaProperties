import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative h-[85vh] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl mb-8 font-light">
          {t('hero.subtitle')}
        </p>
        
        <button
          onClick={() => navigate('/properties')}
          className="bg-white text-old-money-800 px-8 py-3 text-sm tracking-wide hover:bg-old-money-50 transition-colors"
        >
          View Properties
        </button>
      </div>
    </div>
  );
}