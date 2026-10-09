import { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { PreviewStage, type BallpitSettings } from './components/PreviewStage';
import { CustomizerPanel } from './components/CustomizerPanel';
import { CodeViewer } from './components/CodeViewer';
import type { BallpitRef } from './components/Ballpit';
import { ExternalLink, Terminal } from 'lucide-react';
import './App.css';

const DEFAULT_SETTINGS: BallpitSettings = {
  count: 100,
  gravity: 0.01,
  friction: 0.9975,
  wallBounce: 0.95,
  followCursor: false,
  colors: [8141549, 1579035, 10592682],
  minSize: 0.5,
  maxSize: 1.0,
  maxVelocity: 0.15
};

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [activeComponentId, setActiveComponentId] = useState<string>('ballpit');
  const [activeViewTab, setActiveViewTab] = useState<'preview' | 'code'>('preview');
  const [settings, setSettings] = useState<BallpitSettings>(DEFAULT_SETTINGS);
  const [copiedAI, setCopiedAI] = useState<boolean>(false);
  const ballpitRef = useRef<BallpitRef>(null);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleUpdateSettings = (newProps: Partial<BallpitSettings>) => {
    setSettings(prev => ({ ...prev, ...newProps }));
  };

  const handleResetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    ballpitRef.current?.reset();
  };

  const handleResetSimulation = () => {
    ballpitRef.current?.reset();
  };

  const handleCopyAI = () => {
    const aiPrompt = `Here is the Ballpit 3D background component:
<div style={{position: 'relative', overflow: 'hidden', minHeight: '500px', maxHeight: '500px', width: '100%'}}>
  <Ballpit
    count={${settings.count}}
    gravity={${settings.gravity}}
    friction={${settings.friction}}
    wallBounce={${settings.wallBounce}}
    followCursor={${settings.followCursor}}
    colors={[${settings.colors.join(',')}]}
  />
</div>`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(aiPrompt);
      setCopiedAI(true);
      setTimeout(() => setCopiedAI(false), 2000);
    }
  };

  return (
    <div className={`rb-app ${theme}`}>
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <div className="rb-layout-container">
        {/* Left Sidebar */}
        <Sidebar
          activeId={activeComponentId}
          onSelectComponent={id => setActiveComponentId(id)}
        />

        {/* Main Content Area */}
        <main className="rb-main-content">
          {/* Component Breadcrumb & Title Header */}
          <div className="rb-component-header">
            <div className="rb-breadcrumbs">
              <span>Backgrounds</span>
              <span className="rb-breadcrumb-slash">/</span>
              <span className="rb-breadcrumb-current">Ballpit</span>
            </div>

            <div className="rb-title-row">
              <div className="rb-title-left">
                <h1 className="rb-component-title">Ballpit</h1>
                <span className="rb-pill-tag">Interactive 3D</span>
                <span className="rb-pill-tag new">NEW</span>
              </div>

              <div className="rb-title-actions">
                <a
                  href="https://x.com/soju22/status/1858925191671271801"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rb-social-credit-btn"
                >
                  <span>Kevin Levron</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <p className="rb-component-description">
              A playful, interactive 3D physics-based ball pit background powered by Three.js and GSAP.
              Features custom subsurface scattering shaders, room environment reflections, and smooth cursor collision dynamics.
            </p>
          </div>

          {/* Interactive Preview or Code Section */}
          <PreviewStage
            settings={settings}
            activeViewTab={activeViewTab}
            onChangeViewTab={setActiveViewTab}
            ballpitRef={ballpitRef}
            onReset={handleResetSimulation}
            onCopyAI={handleCopyAI}
            copiedAI={copiedAI}
          />

          {/* If Code Tab is active, display the Code Viewer directly */}
          {activeViewTab === 'code' ? (
            <div className="rb-code-section-wrapper">
              <CodeViewer settings={settings} />
            </div>
          ) : (
            <>
              {/* Interactive Customizer Controls */}
              <CustomizerPanel
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                onResetDefaults={handleResetDefaults}
              />

              {/* Quick Code Reference Box */}
              <div className="rb-section-divider-title">
                <Terminal size={17} />
                <h3>Installation & Quick Usage</h3>
              </div>
              <CodeViewer settings={settings} />

              {/* Props Table */}
              <section className="rb-props-table-section">
                <h3 className="rb-section-heading">Props & Configurations</h3>
                <div className="rb-table-wrapper">
                  <table className="rb-props-table">
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>count</code></td>
                        <td><code>number</code></td>
                        <td><code>100</code></td>
                        <td>Total number of spheres simulated in the container.</td>
                      </tr>
                      <tr>
                        <td><code>gravity</code></td>
                        <td><code>number</code></td>
                        <td><code>0.01</code></td>
                        <td>Vertical gravity force accelerating balls downwards.</td>
                      </tr>
                      <tr>
                        <td><code>friction</code></td>
                        <td><code>number</code></td>
                        <td><code>0.9975</code></td>
                        <td>Velocity damping factor applied each physics tick.</td>
                      </tr>
                      <tr>
                        <td><code>wallBounce</code></td>
                        <td><code>number</code></td>
                        <td><code>0.95</code></td>
                        <td>Elastic bounce multiplier on wall/floor impact.</td>
                      </tr>
                      <tr>
                        <td><code>followCursor</code></td>
                        <td><code>boolean</code></td>
                        <td><code>false</code></td>
                        <td>Renders a visible glowing sphere at the cursor position.</td>
                      </tr>
                      <tr>
                        <td><code>colors</code></td>
                        <td><code>number[]</code></td>
                        <td><code>[8141549, 1579035, 10592682]</code></td>
                        <td>Array of decimal hex colors smoothly interpolated across the spheres.</td>
                      </tr>
                      <tr>
                        <td><code>minSize / maxSize</code></td>
                        <td><code>number</code></td>
                        <td><code>0.5 / 1.0</code></td>
                        <td>Minimum and maximum sphere radii generated.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* Footer */}
          <footer className="rb-page-footer">
            <div className="rb-footer-content">
              <p>
                Crafted for <a href="https://github.com/KajalvermaAIML/me" target="_blank" rel="noopener noreferrer">KajalvermaAIML/me</a> by <strong>aryanRN2</strong> (aryannsv@gmail.com).
              </p>
              <p className="rb-footer-sub">
                Component inspired by <a href="https://x.com/soju22/status/1858925191671271801" target="_blank" rel="noopener noreferrer">Kevin Levron (@soju22)</a> and React Bits.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
