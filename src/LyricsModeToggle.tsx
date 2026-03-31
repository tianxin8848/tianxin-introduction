interface LyricsModeToggleProps {
  lyricsRookieMode: boolean;
  setLyricsRookieMode: (rookieMode: boolean) => void;
  sidebarCollapsed: boolean;
}

function LyricsModeToggle({ lyricsRookieMode, setLyricsRookieMode, sidebarCollapsed }: LyricsModeToggleProps) {
  return (
    <div className="lyrics-mode-toggle">
      <button
        className={`mode-btn ${lyricsRookieMode ? 'active' : ''}`}
        onClick={() => setLyricsRookieMode(true)}
        title="菜鳥模式"
      >
        {sidebarCollapsed ? "菜" : "菜鳥模式"}
      </button>
      <button
        className={`mode-btn ${!lyricsRookieMode ? 'active' : ''}`}
        onClick={() => setLyricsRookieMode(false)}
        title="普通模式"
      >
        {sidebarCollapsed ? "普" : "普通模式"}
      </button>
    </div>
  )
}

export default LyricsModeToggle