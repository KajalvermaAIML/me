import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const VALID_ID = 'kajal';
const VALID_PASS = 'kajal';

export default function LoginPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const passRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!id.trim() || !pass.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    // Simulate auth delay for realism
    setTimeout(() => {
      if (id.trim() === VALID_ID && pass === VALID_PASS) {
        sessionStorage.setItem('kv_auth', '1');
        navigate('/vault');
      } else {
        setLoading(false);
        setError('Invalid credentials. Please try again.');
      }
    }, 900);
  };

  return (
    <div className="ln-root">
      {/* Background gradient blobs */}
      <div className="ln-blob ln-blob-1" />
      <div className="ln-blob ln-blob-2" />

      <div className="ln-card">
        {/* Logo mark */}
        <div className="ln-logo">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="10" fill="#6d28d9"/>
            <path d="M10 18h16M18 10v16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span>Vault</span>
        </div>

        <h1 className="ln-title">Welcome back</h1>
        <p className="ln-sub">Sign in to access your secure vault.</p>

        <form className="ln-form" onSubmit={handleSubmit} noValidate>
          {/* User ID */}
          <div className="ln-field">
            <label htmlFor="ln-userid">User ID</label>
            <input
              id="ln-userid"
              type="text"
              autoComplete="username"
              autoFocus
              placeholder="Enter your user ID"
              value={id}
              onChange={e => setId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && passRef.current?.focus()}
              className={error ? 'ln-input-error' : ''}
            />
          </div>

          {/* Password */}
          <div className="ln-field">
            <label htmlFor="ln-pass">Password</label>
            <div className="ln-pass-wrap">
              <input
                id="ln-pass"
                ref={passRef}
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                className={error ? 'ln-input-error' : ''}
              />
              <button
                type="button"
                className="ln-eye"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="ln-error" role="alert">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="ln-submit"
            disabled={loading}
          >
            {loading ? (
              <span className="ln-spinner" />
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
