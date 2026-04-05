import type { PracticeModuleKind } from '../../registry'
import type { FinalsPracticeVariant } from '../../types'
import AppHeader from './AppHeader'
import ModuleNav from '../controls/ModuleNav'
import FinalsVariantToggle from '../controls/FinalsVariantToggle'
import LyricsModeToggle from '../controls/LyricsModeToggle'

interface SidebarProps {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  moduleKind: PracticeModuleKind
  selectedFinal: string
  finalsVariant: FinalsPracticeVariant
  setFinalsVariant: (v: FinalsPracticeVariant) => void
  lyricsRookieMode: boolean
  setLyricsRookieMode: (rookieMode: boolean) => void
}

function Sidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  moduleKind,
  selectedFinal,
  finalsVariant,
  setFinalsVariant,
  lyricsRookieMode,
  setLyricsRookieMode,
}: SidebarProps) {
  const statusLine =
    moduleKind === 'lyrics'
      ? '當前模塊：歌詞跟打'
      : moduleKind === 'politeness'
        ? '當前模塊：禮貌用語'
        : moduleKind === 'comparison'
          ? '當前模塊：普粵對照'
          : `當前模塊：韻母練習（${selectedFinal}）`

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <AppHeader
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <p className="current-final">{statusLine}</p>
      <ModuleNav sidebarCollapsed={sidebarCollapsed} />
      {moduleKind === 'finals' && (
        <FinalsVariantToggle
          variant={finalsVariant}
          setVariant={setFinalsVariant}
          sidebarCollapsed={sidebarCollapsed}
        />
      )}
      {moduleKind === 'lyrics' && (
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
