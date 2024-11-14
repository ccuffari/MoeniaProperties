import React from 'react';
import Hero from '../components/Hero';
import PropertyGrid from '../components/PropertyGrid';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <div className="pt-20">
      <Hero />
      <div className="container mx-auto px-4">
        <PropertyGrid />
        <ContactSection />
      </div>
    </div>
  );
}