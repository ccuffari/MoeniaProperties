import * as React from 'react';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { AuthLog } from '../../store/authStore';

interface ActivityLogProps {
  activities: AuthLog[];
}

export default function ActivityLog({ activities }: ActivityLogProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {t(`admin.activity.${activity.action}`)}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}