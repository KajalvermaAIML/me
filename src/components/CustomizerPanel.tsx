import React from 'react';
import { Palette, Sliders, RefreshCw, Layers } from 'lucide-react';
import type { BallpitSettings } from './PreviewStage';

interface ColorPreset {
  id: string;
  name: string;
  colors: number[];
  hexes: string[];
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'default',
    name: 'React Bits (Purple/Zinc)',
    colors: [8141549, 1579035, 10592682],
    hexes: ['#7C3AED', '#18181B', '#A1A1AA']
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    colors: [442620, 15485081, 4988309],
    hexes: ['#06B6D4', '#EC4899', '#4C1D95']
  },
  {
    id: 'emerald',
    name: 'Emerald Aurora',
    colors: [1096065, 889992, 413243],
    hexes: ['#10B981', '#0D9488', '#064E3B']
  },
  {
    id: 'sunset',
    name: 'Sunset Mirage',
    colors: [16007006, 16096779, 4850766],
    hexes: ['#F43F5E', '#F59E0B', '#4A044E']
  },
  {
    id: 'monochrome',
    name: 'Minimal Mono',
    colors: [16777215, 7434618, 592137],
    hexes: ['#FFFFFF', '#71717A', '#09090B']
  }
];

interface CustomizerPanelProps {
  settings: BallpitSettings;
  onUpdateSettings: (newSettings: Partial<BallpitSettings>) => void;
  onResetDefaults: () => void;
}

export const CustomizerPanel: React.FC<CustomizerPanelProps> = ({
  settings,
  onUpdateSettings,
  onResetDefaults
}) => {
  const handlePresetSelect = (preset: ColorPreset) => {
    onUpdateSettings({ colors: preset.colors });
  };

  const hexToInt = (hex: string): number => {
    return parseInt(hex.replace('#', ''), 16);
  };

  const intToHex = (num: number): string => {
    return '#' + num.toString(16).padStart(6, '0');
  };

  const handleCustomColorChange = (index: number, hex: string) => {
    const newColors = [...settings.colors];
    newColors[index] = hexToInt(hex);
    onUpdateSettings({ colors: newColors });
  };

  return (
    <section className="rb-customizer-card">
      <div className="rb-customizer-header">
        <div className="rb-customizer-title-wrap">
          <Sliders size={18} className="rb-customizer-icon" />
          <h2 className="rb-customizer-title">Customize</h2>
        </div>

        <div className="rb-customizer-actions">
          <button
            className="rb-reset-defaults-btn"
            onClick={onResetDefaults}
            title="Reset parameters to original defaults"
          >
            <RefreshCw size={13} />
            <span>Reset Defaults</span>
          </button>

          <a
            href="https://reactbits.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="rb-bg-studio-btn"
          >
            <Palette size={14} />
            <span>Open in BG Studio</span>
          </a>
        </div>
      </div>

      <div className="rb-customizer-grid">
        {/* Color Presets */}
        <div className="rb-control-group full-width">
          <div className="rb-control-label-row">
            <span className="rb-control-label">
              <Layers size={14} />
              Color Schemes & Palette
            </span>
          </div>

          <div className="rb-presets-list">
            {COLOR_PRESETS.map(preset => {
              const isSelected =
                settings.colors.length === preset.colors.length &&
                settings.colors.every((c, i) => c === preset.colors[i]);

              return (
                <button
                  key={preset.id}
                  className={`rb-preset-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => handlePresetSelect(preset)}
                >
                  <div className="rb-preset-dots">
                    {preset.hexes.map((hex, idx) => (
                      <span
                        key={idx}
                        className="rb-color-dot"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  <span className="rb-preset-name">{preset.name}</span>
                </button>
              );
            })}
          </div>

          <div className="rb-palette-custom-row">
            <span className="rb-palette-sublabel">Fine-tune Palette:</span>
            <div className="rb-palette-pickers">
              {settings.colors.map((col, idx) => (
                <label key={idx} className="rb-color-picker-label" title={`Color #${idx + 1}`}>
                  <input
                    type="color"
                    value={intToHex(col)}
                    onChange={e => handleCustomColorChange(idx, e.target.value)}
                    className="rb-native-color-picker"
                  />
                  <span
                    className="rb-color-swatch-preview"
                    style={{ backgroundColor: intToHex(col) }}
                  />
                  <span className="rb-hex-label">{intToHex(col).toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="rb-control-group">
          <div className="rb-control-label-row">
            <label htmlFor="ctrl-count" className="rb-control-label">Ball Count</label>
            <span className="rb-control-val">{settings.count}</span>
          </div>
          <input
            id="ctrl-count"
            type="range"
            min={20}
            max={250}
            step={5}
            value={settings.count}
            onChange={e => onUpdateSettings({ count: Number(e.target.value) })}
            className="rb-range-slider"
          />
          <div className="rb-slider-bounds">
            <span>20</span>
            <span>250</span>
          </div>
        </div>

        {/* Gravity */}
        <div className="rb-control-group">
          <div className="rb-control-label-row">
            <label htmlFor="ctrl-gravity" className="rb-control-label">Gravity</label>
            <span className="rb-control-val">{settings.gravity.toFixed(3)}</span>
          </div>
          <input
            id="ctrl-gravity"
            type="range"
            min={0.00}
            max={0.06}
            step={0.002}
            value={settings.gravity}
            onChange={e => onUpdateSettings({ gravity: Number(e.target.value) })}
            className="rb-range-slider"
          />
          <div className="rb-slider-bounds">
            <span>0.000 (Float)</span>
            <span>0.060 (Heavy)</span>
          </div>
        </div>

        {/* Friction */}
        <div className="rb-control-group">
          <div className="rb-control-label-row">
            <label htmlFor="ctrl-friction" className="rb-control-label">Friction</label>
            <span className="rb-control-val">{settings.friction.toFixed(4)}</span>
          </div>
          <input
            id="ctrl-friction"
            type="range"
            min={0.9700}
            max={0.9999}
            step={0.0005}
            value={settings.friction}
            onChange={e => onUpdateSettings({ friction: Number(e.target.value) })}
            className="rb-range-slider"
          />
          <div className="rb-slider-bounds">
            <span>0.9700 (High Drag)</span>
            <span>0.9999 (Slick)</span>
          </div>
        </div>

        {/* Wall Bounce */}
        <div className="rb-control-group">
          <div className="rb-control-label-row">
            <label htmlFor="ctrl-bounce" className="rb-control-label">Wall Bounce</label>
            <span className="rb-control-val">{settings.wallBounce.toFixed(2)}</span>
          </div>
          <input
            id="ctrl-bounce"
            type="range"
            min={0.50}
            max={1.00}
            step={0.01}
            value={settings.wallBounce}
            onChange={e => onUpdateSettings({ wallBounce: Number(e.target.value) })}
            className="rb-range-slider"
          />
          <div className="rb-slider-bounds">
            <span>0.50 (Dampened)</span>
            <span>1.00 (Elastic)</span>
          </div>
        </div>

        {/* Min Size & Max Size */}
        <div className="rb-control-group">
          <div className="rb-control-label-row">
            <label htmlFor="ctrl-minsize" className="rb-control-label">Sphere Size Range</label>
            <span className="rb-control-val">{settings.minSize.toFixed(1)} — {settings.maxSize.toFixed(1)}</span>
          </div>
          <div className="rb-dual-range">
            <input
              id="ctrl-minsize"
              type="range"
              min={0.2}
              max={1.0}
              step={0.1}
              value={settings.minSize}
              onChange={e => onUpdateSettings({ minSize: Number(e.target.value) })}
              className="rb-range-slider"
            />
            <input
              id="ctrl-maxsize"
              type="range"
              min={1.0}
              max={2.5}
              step={0.1}
              value={settings.maxSize}
              onChange={e => onUpdateSettings({ maxSize: Number(e.target.value) })}
              className="rb-range-slider"
            />
          </div>
          <div className="rb-slider-bounds">
            <span>Min: {settings.minSize}</span>
            <span>Max: {settings.maxSize}</span>
          </div>
        </div>

        {/* Follow Cursor Toggle */}
        <div className="rb-control-group toggle-group">
          <div className="rb-control-label-row">
            <label htmlFor="ctrl-follow" className="rb-control-label">Follow Cursor Sphere</label>
          </div>
          <div className="rb-toggle-row">
            <span className="rb-toggle-desc">
              {settings.followCursor
                ? 'Visible glowing sphere attracts and pushes other balls'
                : 'Invisible cursor physics collider pushes balls seamlessly'}
            </span>
            <label className="rb-switch-wrapper" htmlFor="ctrl-follow">
              <input
                id="ctrl-follow"
                type="checkbox"
                checked={settings.followCursor}
                onChange={e => onUpdateSettings({ followCursor: e.target.checked })}
                className="rb-sr-only"
              />
              <div className={`rb-toggle-switch ${settings.followCursor ? 'active' : ''}`}>
                <div className="rb-toggle-thumb" />
              </div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};
