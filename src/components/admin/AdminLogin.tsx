import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowLeft } from 'lucide-react';

export default function AdminLogin({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isSignUp) {
      const { error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) {
        setError(authError.message);
      } else {
        setSuccess('Account created! You can now sign in.');
        setIsSignUp(false);
      }
    } else {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        setError(authError.message);
      } else {
        onLogin();
        return;
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            marginBottom: '16px',
            padding: 0,
          }}
        >
          <ArrowLeft size={14} /> Back to site
        </button>
        <h2>{isSignUp ? 'Create Admin Account' : 'Admin Login'}</h2>
        <p>{isSignUp ? 'Create an account to manage your website' : 'Sign in to manage your website content'}</p>
        {error && <div className="auth-error">{error}</div>}
        {success && (
          <div className="auth-error" style={{ background: 'rgba(22,163,74,0.1)', borderColor: 'rgba(22,163,74,0.3)', color: '#4ade80' }}>
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jaspurahub.com"
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignUp ? 'Choose a password (min 6 chars)' : 'Enter password'}
              minLength={6}
              required
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); }}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '13px', padding: 0, fontFamily: 'inherit' }}
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </p>
      </div>
    </div>
  );
}
