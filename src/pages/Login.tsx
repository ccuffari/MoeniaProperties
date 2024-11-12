import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signInWithEmail } from '../services/firebase/auth';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmail(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(t('login.error.invalid'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl text-old-money-800 mb-4">
            {t('login.title')}
          </h2>
          <p className="text-old-money-600">
            {t('login.subtitle')}
          </p>
        </div>

        <form className="bg-white border border-old-money-100 p-8" onSubmit={handleSubmit}>
          {error && (
            <div className="mb-6 text-red-600 text-center text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-old-money-600 mb-2">
                {t('login.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-old-money-100 focus:border-old-money-200 focus:ring-0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-old-money-600 mb-2">
                {t('login.password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-old-money-100 focus:border-old-money-200 focus:ring-0"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-old-money-800 text-white px-6 py-3 text-sm tracking-wide hover:bg-old-money-700 transition-colors disabled:bg-old-money-300"
            >
              {loading ? t('login.loading') : t('login.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}