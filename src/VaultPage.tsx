import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VaultPage.css';

interface Category {
  id: string;
  icon: React.ReactNode;
  label: string;
  desc: string;
  count: string;
}

const EyeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const CATEGORIES: Category[] = [
  {
    id: 'photos',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    label: 'Photographs',
    desc: 'Personal & family photos',
    count: '—',
  },
  {
    id: 'gov',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    label: 'Gov Documents',
    desc: 'Aadhaar, PAN, passport & more',
    count: '—',
  },
  {
    id: 'passwords',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    label: 'Passwords',
    desc: 'Saved credentials & secrets',
    count: '—',
  },
  {
    id: 'notes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    label: 'Secure Notes',
    desc: 'Private notes & memos',
    count: '—',
  },
  {
    id: 'cards',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    label: 'Bank & Cards',
    desc: 'Account & card details',
    count: '—',
  },
  {
    id: 'other',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
    label: 'Other Files',
    desc: 'Miscellaneous documents',
    count: '—',
  },
];

export default function VaultPage() {
  const navigate = useNavigate();

  // Guard: if not logged in, send to login
  useEffect(() => {
    if (!sessionStorage.getItem('kv_auth')) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('kv_auth');
    navigate('/login', { replace: true });
  };

  return (
    <div className="vt-root">

      {/* ── Top bar ── */}
      <header className="vt-topbar">
        <div className="vt-topbar-inner">
          <div className="vt-brand">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" fill="#6d28d9"/>
              <path d="M10 18h16M18 10v16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span>Vault</span>
          </div>

          <div className="vt-topbar-right">
            <div className="vt-user-chip">
              <div className="vt-avatar">K</div>
              <span>Kajal</span>
            </div>
            <button className="vt-logout" onClick={handleLogout}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="vt-main">
        <div className="vt-container">

          {/* Page header */}
          <div className="vt-page-header">
            <div>
              <h1 className="vt-title">Your Vault</h1>
              <p className="vt-sub">Select a category to view or download your files.</p>
            </div>
            <div className="vt-security-badge">
              <EyeIcon />
              <span>End-to-end secured</span>
            </div>
          </div>

          {/* Category grid */}
          <div className="vt-grid">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                className="vt-card"
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => alert(`Opening "${cat.label}" — coming soon.`)}
              >
                <div className="vt-card-icon">{cat.icon}</div>
                <div className="vt-card-body">
                  <span className="vt-card-label">{cat.label}</span>
                  <span className="vt-card-desc">{cat.desc}</span>
                </div>
                <div className="vt-card-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
