import type { Mode } from '../../types'
import AppHeader from './AppHeader'
import ModeToggle from '../controls/ModeToggle'
import LyricsModeToggle from '../controls/LyricsModeToggle'

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  selectedFinal: string;
  isLyricsMode: boolean;
  mode: Mode;
  switchMode: (nextMode: Mode) => void;
  lyricsRookieMode: boolean;
  setLyricsRookieMode: (rookieMode: boolean) => void;
}

function Sidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  selectedFinal,
  isLyricsMode,
  mode,
  switchMode,
  lyricsRookieMode,
  setLyricsRookieMode
}: SidebarProps) {
  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <AppHeader 
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <p className="current-final">
        {isLyricsMode ? '當前模式：歌詞跟打' : 
         mode === 'politeness' ? '當前模式：禮貌用語' : 
         `當前韻母：${selectedFinal}`}
      </p>
      <ModeToggle 
        mode={mode}
        switchMode={switchMode}
        sidebarCollapsed={sidebarCollapsed}
      />
      {isLyricsMode && (
        <LyricsModeToggle 
          lyricsRookieMode={lyricsRookieMode}
          setLyricsRookieMode={setLyricsRookieMode}
          sidebarCollapsed={sidebarCollapsed}
        />
      )}
    </aside>
  )
}

export default Sidebar
