import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Key, Gem, Briefcase, Home, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "Property Acquisition",
      description: "Expert guidance through every step of your property purchase, from initial viewing to final closing."
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Investment Advisory",
      description: "Strategic investment consulting to maximize your real estate portfolio's potential and returns."
    },
    {
      icon: <Key className="h-8 w-8" />,
      title: "Property Management",
      description: "Comprehensive management services ensuring your property maintains its value and generates optimal returns."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Reach",
      description: "Access to an exclusive network of international properties and qualified buyers worldwide."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Legal Services",
      description: "Expert legal assistance throughout the entire transaction process, ensuring your interests are protected."
    },
    {
      icon: <Gem className="h-8 w-8" />,
      title: "Luxury Rentals",
      description: "Premium rental services for both landlords and tenants in the luxury real estate market."
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-cream">
      <Helmet>
        <title>Our Services | Moenia Properties</title>
        <meta name="description" content="Discover our comprehensive range of luxury real estate services, from property acquisition to investment advisory and global reach." />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl text-old-money-800 mb-6">
            Exceptional Services for Exceptional Properties
          </h1>
          <p className="text-old-money-600 text-lg">
            We offer a comprehensive suite of services tailored to meet the unique needs of our distinguished clientele.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 border border-old-money-100 hover:border-old-money-200 transition-colors"
            >
              <div className="text-old-money-600 mb-4">
                {service.icon}
              </div>
              <h3 className="font-display text-2xl text-old-money-800 mb-3">
                {service.title}
              </h3>
              <p className="text-old-money-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-white border border-old-money-100 p-12">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl text-old-money-800 mb-4">
              Personalized Approach
            </h2>
            <p className="text-old-money-600">
              Every client receives a tailored experience based on their unique requirements and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-display text-old-money-800 mb-2">25+</div>
              <p className="text-old-money-600">Years of Experience</p>
            </div>
            <div>
              <div className="text-2xl font-display text-old-money-800 mb-2">500+</div>
              <p className="text-old-money-600">Properties Sold</p>
            </div>
            <div>
              <div className="text-2xl font-display text-old-money-800 mb-2">98%</div>
              <p className="text-old-money-600">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}