import type { Mode } from '../../types'

interface ModeToggleProps {
  mode: Mode;
  switchMode: (nextMode: Mode) => void;
  sidebarCollapsed: boolean;
}

function ModeToggle({ mode, switchMode, sidebarCollapsed }: ModeToggleProps) {
  return (
    <div className="mode-toggle">
      <button 
        className={`mode-btn ${mode === 'reference' ? 'active' : ''}`}
        onClick={() => switchMode('reference')}
        title="參考模式"
      >
        {sidebarCollapsed ? "參" : "參考模式"}
      </button>
      <button 
        className={`mode-btn ${mode === 'advanced' ? 'active' : ''}`}
        onClick={() => switchMode('advanced')}
        title="進階模式"
      >
        {sidebarCollapsed ? "進" : "進階模式"}
      </button>
      <button
        className={`mode-btn ${mode === 'lyrics' ? 'active' : ''}`}
        onClick={() => switchMode('lyrics')}
        title="歌詞模式"
      >
        {sidebarCollapsed ? "歌" : "歌詞模式"}
      </button>
      <button
        className={`mode-btn ${mode === 'politeness' ? 'active' : ''}`}
        onClick={() => switchMode('politeness')}
        title="禮貌用語"
      >
        {sidebarCollapsed ? "禮" : "禮貌用語"}
      </button>
    </div>
  )
}

export default ModeToggle
