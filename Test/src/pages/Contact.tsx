import React from 'react';
import ContactSection from '../components/ContactSection';

export default function Contact() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <ContactSection />
      </div>
    </div>
  );
}