import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { Shield, Key, Bell, Globe } from 'lucide-react';

export default function AdminSettings() {
  const { t } = useTranslation();
  const { user, enable2FA, disable2FA } = useAuthStore();
  const [showQRCode, setShowQRCode] = React.useState(false);
  const [qrCodeData, setQRCodeData] = React.useState('');

  const handleToggle2FA = async () => {
    try {
      if (user?.twoFactorEnabled) {
        await disable2FA();
      } else {
        const qrCode = await enable2FA();
        setQRCodeData(qrCode);
        setShowQRCode(true);
      }
    } catch (error) {
      console.error('Error toggling 2FA:', error);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{t('admin.settings.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6" />
              <h2 className="text-xl font-bold">{t('admin.settings.security')}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{t('admin.settings.twoFactor')}</h3>
                  <p className="text-sm text-gray-600">{t('admin.settings.twoFactorDesc')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={user?.twoFactorEnabled}
                    onChange={handleToggle2FA}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{t('admin.settings.password')}</h3>
                  <p className="text-sm text-gray-600">{t('admin.settings.passwordDesc')}</p>
                </div>
                <button className="text-gray-900 hover:text-gray-700">
                  <Key className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-6 w-6" />
              <h2 className="text-xl font-bold">{t('admin.settings.notifications')}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{t('admin.settings.emailNotifications')}</h3>
                  <p className="text-sm text-gray-600">{t('admin.settings.emailNotificationsDesc')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{t('admin.settings.browserNotifications')}</h3>
                  <p className="text-sm text-gray-600">{t('admin.settings.browserNotificationsDesc')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-6 w-6" />
              <h2 className="text-xl font-bold">{t('admin.settings.language')}</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admin.settings.preferredLanguage')}
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="en">English</option>
                  <option value="it">Italiano</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {showQRCode && qrCodeData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">{t('admin.settings.scan2FACode')}</h3>
              <div className="mb-4">
                <img src={qrCodeData} alt="2FA QR Code" className="mx-auto" />
              </div>
              <button
                onClick={() => setShowQRCode(false)}
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                {t('admin.settings.close')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}