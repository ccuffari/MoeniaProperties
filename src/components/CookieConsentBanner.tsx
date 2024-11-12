import * as React from 'react';
import { Cookie, X, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setCookieConsent, getCookieConsent, initializeAnalytics, initializeMarketing } from '../utils/cookieConsent';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = React.useState(() => !getCookieConsent());
  const [showDetails, setShowDetails] = React.useState(false);
  const [settings, setSettings] = React.useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false
  });

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    setCookieConsent(consent);
    initializeAnalytics();
    initializeMarketing();
    setIsVisible(false);
  };

  const savePreferences = () => {
    const consent = {
      ...settings,
      timestamp: new Date().toISOString()
    };
    setCookieConsent(consent);
    if (settings.analytics) initializeAnalytics();
    if (settings.marketing) initializeMarketing();
    setIsVisible(false);
  };

  const handleSettingChange = (setting: keyof CookieSettings) => {
    if (setting === 'necessary') return;
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 shadow-lg z-50" role="dialog" aria-modal="true" aria-labelledby="cookie-consent-title">
      <div className="container mx-auto p-4">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 text-gray-600" aria-hidden="true" />
              <p className="text-sm text-gray-600">
                We value your privacy. This site uses cookies to enhance your experience and analyze website traffic.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDetails(true)}
                className="text-gray-600 hover:text-gray-900 text-sm underline"
                aria-label="View cookie settings"
              >
                Cookie Settings
              </button>
              <button
                onClick={acceptAll}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 text-sm"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold" id="cookie-consent-title">Cookie Preferences</h3>
              <button 
                onClick={() => setShowDetails(false)} 
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close cookie preferences"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Necessary Cookies</p>
                  <p className="text-sm text-gray-600">Required for the website to function properly</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.necessary}
                  disabled
                  className="h-4 w-4 text-gray-900"
                  aria-label="Necessary cookies (required)"
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Analytics Cookies</p>
                  <p className="text-sm text-gray-600">Help us improve our website by collecting usage information</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.analytics}
                  onChange={() => handleSettingChange('analytics')}
                  className="h-4 w-4 text-gray-900 cursor-pointer"
                  aria-label="Analytics cookies"
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Marketing Cookies</p>
                  <p className="text-sm text-gray-600">Used to deliver personalized advertisements</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.marketing}
                  onChange={() => handleSettingChange('marketing')}
                  className="h-4 w-4 text-gray-900 cursor-pointer"
                  aria-label="Marketing cookies"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Link
                to="/privacy"
                className="text-sm text-gray-600 hover:text-gray-900 underline flex items-center gap-2"
                onClick={() => setIsVisible(false)}
              >
                <Shield className="h-4 w-4" aria-hidden="true" />
                Privacy Policy
              </Link>
              <div className="flex gap-4">
                <button
                  onClick={savePreferences}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 text-sm"
                  aria-label="Save cookie preferences"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}