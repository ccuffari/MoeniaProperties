import React from 'react';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(() => {
    return !localStorage.getItem('cookieConsent');
  });

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
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const savePreferences = () => {
    const consent = {
      ...settings,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleSettingChange = (setting: keyof CookieSettings) => {
    if (setting === 'necessary') return; // Necessary cookies can't be disabled
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto p-4">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 text-gray-600" />
              <p className="text-sm text-gray-600">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDetails(true)}
                className="text-gray-600 hover:text-gray-900 text-sm underline"
              >
                Cookie Settings
              </button>
              <button
                onClick={acceptAll}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 text-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Cookie Preferences</h3>
              <button onClick={() => setShowDetails(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
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
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Link
                to="/privacy"
                className="text-sm text-gray-600 hover:text-gray-900 underline"
                onClick={() => setIsVisible(false)}
              >
                Privacy Policy
              </Link>
              <div className="flex gap-4">
                <button
                  onClick={savePreferences}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 text-sm"
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