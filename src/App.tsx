import { useNavigate } from 'react-router-dom';
import Ballpit from './components/Ballpit';
import './App.css';

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="lp-root">
      {/* Ballpit fills entire viewport */}
      <div className="lp-ballpit-wrap">
        <Ballpit
          count={120}
          gravity={0.01}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={true}
          colors={[0x7c3aed, 0xa855f7, 0x4f46e5, 0x6366f1, 0xc026d3]}
        />
      </div>

      {/* Overlay */}
      <div className="lp-overlay" />

      {/* Center content */}
      <main className="lp-content">
        <p className="lp-eyebrow">Full Stack Developer</p>

        <h1 className="lp-title">
          Kajal <span className="lp-name-accent">Verma</span>
        </h1>

        <p className="lp-tagline">
          Building scalable products with clean code and thoughtful design.
        </p>

        <div className="lp-actions">
          <button className="lp-btn-login" onClick={() => navigate('/login')}>
            Login
          </button>
          <a href="mailto:hello@kajal.dev" className="lp-btn-ghost">
            Get in touch
          </a>
        </div>
      </main>
    </div>
  );
}
