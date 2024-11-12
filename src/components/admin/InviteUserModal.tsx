import * as React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore, type Role } from '../../store/authStore';

interface InviteUserModalProps {
  onClose: () => void;
}

export default function InviteUserModal({ onClose }: InviteUserModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState<Role>('agent');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await useAuthStore.getState().createInvite(email, role);
      onClose();
    } catch (err) {
      setError(t('admin.users.inviteError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t('admin.users.invite')}</h2>
            <button onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.users.form.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.users.form.role')}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="agent">{t('admin.users.roles.agent')}</option>
                <option value="manager">{t('admin.users.roles.manager')}</option>
                <option value="developer">{t('admin.users.roles.developer')}</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                {t('admin.form.cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                {loading ? t('admin.users.sending') : t('admin.users.sendInvite')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}