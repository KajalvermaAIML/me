import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode } from 'lucide-react';
import type { BallpitSettings } from './PreviewStage';

interface CodeViewerProps {
  settings: BallpitSettings;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ settings }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'usage' | 'component-ts' | 'component-js'>('usage');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionId: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  };

  const installCommand = 'npm i three gsap';

  const usageCode = `// Component inspired by Kevin Levron:
// https://x.com/soju22/status/1858925191671271801

import Ballpit from './Ballpit';

export default function HeroSection() {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '500px',
      maxHeight: '500px',
      width: '100%'
    }}>
      <Ballpit
        count={${settings.count}}
        gravity={${settings.gravity}}
        friction={${settings.friction}}
        wallBounce={${settings.wallBounce}}
        followCursor={${settings.followCursor}}
        colors={[${settings.colors.join(', ')}]}
      />
    </div>
  );
}`;

  const componentSnippetTS = `// Ballpit.tsx - Three.js + GSAP Interactive 3D Physics
// Component inspired by Kevin Levron: https://x.com/soju22/status/1858925191671271801
'use client';

import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  InstancedMesh,
  MathUtils,
  MeshPhysicalMaterial,
  Object3D,
  PerspectiveCamera,
  Plane,
  PMREMGenerator,
  PointLight,
  Raycaster,
  Scene,
  ShaderChunk,
  SphereGeometry,
  SRGBColorSpace,
  Timer,
  Vector2,
  Vector3,
  WebGLRenderer,
  type WebGLRendererParameters
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

gsap.registerPlugin(Observer);

// Full Three.js physics & subsurface scattering shaders
// Export default Ballpit component...
`;

  const componentSnippetJS = `// Ballpit.jsx - Three.js + GSAP Interactive 3D Physics
'use client';

import { useEffect, useRef } from 'react';
import {
  Vector3,
  MeshPhysicalMaterial,
  InstancedMesh,
  Timer,
  AmbientLight,
  SphereGeometry,
  ShaderChunk,
  Scene,
  Color,
  Object3D,
  SRGBColorSpace,
  MathUtils,
  PMREMGenerator,
  Vector2,
  WebGLRenderer,
  PerspectiveCamera,
  PointLight,
  ACESFilmicToneMapping,
  Plane,
  Raycaster
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Export default Ballpit component...
`;

  return (
    <div className="rb-code-viewer-container">
      {/* Dependency Install Command Box */}
      <div className="rb-install-box">
        <div className="rb-install-left">
          <Terminal size={16} className="rb-install-icon" />
          <span className="rb-install-prompt">$</span>
          <code className="rb-install-cmd">{installCommand}</code>
        </div>
        <button
          className="rb-copy-install-btn"
          onClick={() => copyToClipboard(installCommand, 'install')}
          title="Copy install command"
        >
          {copiedSection === 'install' ? (
            <>
              <Check size={14} color="#10B981" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Tabs */}
      <div className="rb-code-box">
        <div className="rb-code-header">
          <div className="rb-code-tabs">
            <button
              className={`rb-code-tab ${activeCodeTab === 'usage' ? 'active' : ''}`}
              onClick={() => setActiveCodeTab('usage')}
            >
              <FileCode size={14} />
              <span>Usage.tsx</span>
            </button>
            <button
              className={`rb-code-tab ${activeCodeTab === 'component-ts' ? 'active' : ''}`}
              onClick={() => setActiveCodeTab('component-ts')}
            >
              <FileCode size={14} />
              <span>Ballpit.tsx</span>
            </button>
            <button
              className={`rb-code-tab ${activeCodeTab === 'component-js' ? 'active' : ''}`}
              onClick={() => setActiveCodeTab('component-js')}
            >
              <FileCode size={14} />
              <span>Ballpit.jsx</span>
            </button>
          </div>

          <button
            className="rb-copy-code-btn"
            onClick={() => {
              const codeToCopy =
                activeCodeTab === 'usage'
                  ? usageCode
                  : activeCodeTab === 'component-ts'
                  ? componentSnippetTS
                  : componentSnippetJS;
              copyToClipboard(codeToCopy, activeCodeTab);
            }}
          >
            {copiedSection === activeCodeTab ? (
              <>
                <Check size={14} color="#10B981" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        <pre className="rb-code-pre">
          <code>
            {activeCodeTab === 'usage' && usageCode}
            {activeCodeTab === 'component-ts' && componentSnippetTS}
            {activeCodeTab === 'component-js' && componentSnippetJS}
          </code>
        </pre>
      </div>
    </div>
  );
};
