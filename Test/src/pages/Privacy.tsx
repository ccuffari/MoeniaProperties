import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function Privacy() {
  const lastUpdated = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-24 pb-16">
      <Helmet>
        <title>Privacy Policy & Cookie Notice | Moenia Properties</title>
        <meta name="description" content="Learn about how Moenia Properties handles and protects your personal information, data collection practices, and cookie usage." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://moeniaproperties.com/privacy" />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-gray-900" />
            <h1 className="text-4xl font-bold">Privacy Policy & Cookie Notice</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Last updated: {lastUpdated}
            </p>

            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="h-6 w-6" />
                <h2 className="text-2xl font-bold">1. Data Protection & Collection</h2>
              </div>
              <p className="mb-4">At Moenia Properties, we take your privacy seriously. This policy explains:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>What personal data we collect</li>
                <li>How we use your information</li>
                <li>Your rights under GDPR and other privacy laws</li>
                <li>Our data retention policies</li>
                <li>Third-party data processors we use</li>
              </ul>
              
              <h3 className="text-xl font-bold mb-3">1.1 Personal Information We Collect</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Name and contact details</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Property preferences</li>
                <li>Viewing appointment details</li>
                <li>Communication history</li>
              </ul>

              <h3 className="text-xl font-bold mb-3">1.2 Legal Basis for Processing</h3>
              <p className="mb-4">We process your data based on:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Your consent</li>
                <li>Contractual necessity</li>
                <li>Legal obligations</li>
                <li>Legitimate business interests</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-6 w-6" />
                <h2 className="text-2xl font-bold">2. Cookie Policy</h2>
              </div>
              <h3 className="text-xl font-bold mb-3">2.1 Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Necessary Cookies:</strong> Essential for website functionality
                  <ul className="list-disc pl-6 mt-2">
                    <li>Session management</li>
                    <li>Security features</li>
                    <li>Basic functionality</li>
                  </ul>
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand website usage
                  <ul className="list-disc pl-6 mt-2">
                    <li>Google Analytics</li>
                    <li>Usage patterns</li>
                    <li>Performance monitoring</li>
                  </ul>
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used for targeted advertising
                  <ul className="list-disc pl-6 mt-2">
                    <li>Advertising preferences</li>
                    <li>Remarketing</li>
                    <li>Campaign effectiveness</li>
                  </ul>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-3">2.2 Cookie Management</h3>
              <p className="mb-4">You can manage your cookie preferences through:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Our cookie consent banner</li>
                <li>Browser settings</li>
                <li>Third-party opt-out tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6" />
                <h2 className="text-2xl font-bold">3. Your Rights</h2>
              </div>
              <p className="mb-4">Under GDPR and other privacy laws, you have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. International Data Transfers</h2>
              <p className="mb-4">
                We may transfer your data to countries outside your residence. We ensure adequate safeguards through:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Standard contractual clauses</li>
                <li>Privacy Shield certification</li>
                <li>Appropriate security measures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Contact Information</h2>
              <p className="mb-4">
                For any privacy-related questions or requests, contact our Data Protection Officer:
              </p>
              <ul className="list-none pl-6 mb-4">
                <li>Email: privacy@moeniaproperties.com</li>
                <li>Phone: +1-555-123-4567</li>
                <li>Address: 123 Madison Avenue, New York, NY 10022</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this policy periodically. We will notify you of any material changes through:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Email notifications</li>
                <li>Website announcements</li>
                <li>Updated policy date</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}