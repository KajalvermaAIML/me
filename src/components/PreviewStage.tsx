import React, { useState } from 'react';
import {
  Eye,
  Code2,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Heart,
  Share2,
  Sparkles,
  RotateCw,
  Check
} from 'lucide-react';
import Ballpit, { type BallpitRef } from './Ballpit';

export interface BallpitSettings {
  count: number;
  gravity: number;
  friction: number;
  wallBounce: number;
  followCursor: boolean;
  colors: number[];
  minSize: number;
  maxSize: number;
  maxVelocity: number;
}

interface PreviewStageProps {
  settings: BallpitSettings;
  activeViewTab: 'preview' | 'code';
  onChangeViewTab: (tab: 'preview' | 'code') => void;
  ballpitRef: React.RefObject<BallpitRef | null>;
  onReset: () => void;
  onCopyAI: () => void;
  copiedAI: boolean;
}

export const PreviewStage: React.FC<PreviewStageProps> = ({
  settings,
  activeViewTab,
  onChangeViewTab,
  ballpitRef,
  onReset,
  onCopyAI,
  copiedAI
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [demoContent, setDemoContent] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const getContainerWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return '390px';
      case 'tablet':
        return '768px';
      default:
        return '100%';
    }
  };

  return (
    <div className={`rb-preview-card ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      {/* Top action header */}
      <div className="rb-preview-header">
        <div className="rb-header-tabs">
          <button
            className={`rb-view-tab ${activeViewTab === 'preview' ? 'active' : ''}`}
            onClick={() => onChangeViewTab('preview')}
          >
            <Eye size={15} />
            <span>Preview</span>
          </button>
          <button
            className={`rb-view-tab ${activeViewTab === 'code' ? 'active' : ''}`}
            onClick={() => onChangeViewTab('code')}
          >
            <Code2 size={15} />
            <span>Code</span>
          </button>
        </div>

        <div className="rb-header-tools">
          <div className="rb-device-group">
            <button
              className={`rb-tool-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
              onClick={() => setDeviceMode('desktop')}
              title="Desktop view"
            >
              <Monitor size={15} />
            </button>
            <button
              className={`rb-tool-btn ${deviceMode === 'tablet' ? 'active' : ''}`}
              onClick={() => setDeviceMode('tablet')}
              title="Tablet view"
            >
              <Tablet size={15} />
            </button>
            <button
              className={`rb-tool-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
              onClick={() => setDeviceMode('mobile')}
              title="Mobile view"
            >
              <Smartphone size={15} />
            </button>
          </div>

          <div className="rb-tools-separator" />

          <button
            className="rb-tool-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            <Maximize2 size={15} />
          </button>

          <button
            className={`rb-tool-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
            title="Bookmark component"
          >
            <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
          </button>

          <button
            className="rb-tool-btn"
            onClick={handleShare}
            title={copiedShare ? 'Link copied!' : 'Share'}
          >
            {copiedShare ? <Check size={15} color="#10B981" /> : <Share2 size={15} />}
          </button>

          <button
            className={`rb-ai-btn ${copiedAI ? 'copied' : ''}`}
            onClick={onCopyAI}
            title="Copy component prompt for AI"
          >
            {copiedAI ? (
              <>
                <Check size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Sparkles size={14} />
                <span>Copy for AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="rb-stage-outer">
        <div
          className="rb-stage-frame"
          style={{
            maxWidth: getContainerWidth(),
            transition: 'max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div
            className="rb-ballpit-container"
            style={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: '500px',
              maxHeight: isFullscreen ? 'calc(100vh - 120px)' : '500px',
              height: isFullscreen ? 'calc(100vh - 120px)' : '500px',
              width: '100%'
            }}
          >
            {/* Top Right Reset Button */}
            <button
              className="rb-stage-reset-btn"
              onClick={onReset}
              title="Reset physics simulation"
              aria-label="Reset simulation"
            >
              <RotateCw size={17} />
            </button>

            {/* Overlaid Demo Content */}
            <div className={`rb-stage-overlay ${demoContent ? 'visible' : 'hidden'}`}>
              {/* Floating inner pill navbar */}
              <div className="rb-inner-nav">
                <div className="rb-inner-logo">
                  <span className="rb-inner-atom">⚛</span>
                  <span>React Bits</span>
                </div>
                <div className="rb-inner-menu">
                  <span className="rb-inner-link">Features</span>
                  <span className="rb-inner-link">About</span>
                  <button className="rb-inner-signup-btn">Sign up</button>
                </div>
              </div>

              {/* Centered Hero Content */}
              <div className="rb-inner-hero">
                <div className="rb-hero-pill-badge">
                  <span className="rb-badge-new">NEW</span>
                  <span className="rb-badge-text">Creative Components</span>
                </div>

                <h1 className="rb-hero-title">
                  Balls! What's not to like about them?
                </h1>

                <div className="rb-hero-actions">
                  <button className="rb-hero-btn-primary">
                    Get started
                  </button>
                  <button className="rb-hero-btn-secondary">
                    Learn more
                  </button>
                </div>
              </div>
            </div>

            {/* Live 3D Physics Canvas */}
            <Ballpit
              ref={ballpitRef}
              count={settings.count}
              gravity={settings.gravity}
              friction={settings.friction}
              wallBounce={settings.wallBounce}
              followCursor={settings.followCursor}
              colors={settings.colors}
              minSize={settings.minSize}
              maxSize={settings.maxSize}
              maxVelocity={settings.maxVelocity}
            />

            {/* Bottom Right Demo Content Toggle */}
            <div className="rb-demo-toggle-wrap">
              <label className="rb-demo-toggle-label" htmlFor="demo-content-toggle">
                <span>Demo Content</span>
                <div className={`rb-toggle-switch ${demoContent ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    id="demo-content-toggle"
                    checked={demoContent}
                    onChange={e => setDemoContent(e.target.checked)}
                    className="rb-sr-only"
                  />
                  <div className="rb-toggle-thumb" />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
