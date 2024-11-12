import * as React from 'react';
import { Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NotificationCenter() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      type: 'appointment',
      message: 'New viewing request for Contemporary Villa',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'system',
      message: 'System maintenance scheduled for tonight',
      time: '1 hour ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg relative"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">{t('admin.notifications.title')}</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b hover:bg-gray-50 ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
          <div className="p-4 text-center">
            <button
              onClick={() => setNotifications(n => n.map(notification => ({ ...notification, read: true })))}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {t('admin.notifications.markAllRead')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}