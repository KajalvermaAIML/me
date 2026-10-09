import React, { useState } from 'react';
import {
  LayoutGrid,
  Type,
  Sparkles,
  MousePointer2,
  Box,
  Image,
  Search
} from 'lucide-react';

interface ComponentItem {
  id: string;
  name: string;
  updated?: boolean;
  active?: boolean;
}

const COMPONENTS: ComponentItem[] = [
  { id: 'dot-grid', name: 'Dot Grid' },
  { id: 'threads', name: 'Threads', updated: true },
  { id: 'hyperspeed', name: 'Hyperspeed', updated: true },
  { id: 'iridescence', name: 'Iridescence', updated: true },
  { id: 'waves', name: 'Waves' },
  { id: 'grid-distortion', name: 'Grid Distortion', updated: true },
  { id: 'ballpit', name: 'Ballpit', active: true },
  { id: 'orb', name: 'Orb' },
  { id: 'letter-glitch', name: 'Letter Glitch' },
  { id: 'grid-motion', name: 'Grid Motion', updated: true },
  { id: 'shape-grid', name: 'Shape Grid' },
  { id: 'liquid-chrome', name: 'Liquid Chrome' },
  { id: 'balatro', name: 'Balatro' }
];

interface SidebarProps {
  activeId: string;
  onSelectComponent: (id: string) => void;
  isOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeId,
  onSelectComponent,
  isOpen = true
}) => {
  const [filterText, setFilterText] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'type' | 'fx' | 'interactive' | '3d' | 'media'>('all');

  const filteredComponents = COMPONENTS.filter(item =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <aside className={`rb-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="rb-sidebar-header">
        <div className="rb-sidebar-title">
          <LayoutGrid size={16} />
          <span>Browse all components</span>
        </div>

        <div className="rb-category-pills">
          <button
            className={`rb-cat-pill ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
            title="All components"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            className={`rb-cat-pill ${activeTab === 'type' ? 'active' : ''}`}
            onClick={() => setActiveTab('type')}
            title="Typography"
          >
            <Type size={15} />
          </button>
          <button
            className={`rb-cat-pill ${activeTab === 'fx' ? 'active' : ''}`}
            onClick={() => setActiveTab('fx')}
            title="Effects"
          >
            <Sparkles size={15} />
          </button>
          <button
            className={`rb-cat-pill ${activeTab === 'interactive' ? 'active' : ''}`}
            onClick={() => setActiveTab('interactive')}
            title="Interactive"
          >
            <MousePointer2 size={15} />
          </button>
          <button
            className={`rb-cat-pill ${activeTab === '3d' ? 'active' : ''}`}
            onClick={() => setActiveTab('3d')}
            title="3D Components"
          >
            <Box size={15} />
          </button>
          <button
            className={`rb-cat-pill ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
            title="Media"
          >
            <Image size={15} />
          </button>
        </div>

        <div className="rb-filter-box">
          <Search size={14} className="rb-filter-icon" />
          <input
            type="text"
            className="rb-filter-input"
            placeholder="Filter 215 components..."
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
        </div>
      </div>

      <nav className="rb-component-list">
        {filteredComponents.map(comp => {
          const isCurrent = comp.id === activeId;
          return (
            <button
              key={comp.id}
              className={`rb-component-item ${isCurrent ? 'active' : ''}`}
              onClick={() => onSelectComponent(comp.id)}
            >
              <span className="rb-comp-name">{comp.name}</span>
              {comp.updated && (
                <span className="rb-badge-updated">Updated</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
