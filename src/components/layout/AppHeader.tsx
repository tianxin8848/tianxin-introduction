interface AppHeaderProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

function AppHeader({ sidebarCollapsed, setSidebarCollapsed }: AppHeaderProps) {
  return (
    <div className="sidebar-header">
      <h1>粵語拼音打字練習</h1>
      <button 
        className="toggle-sidebar-btn"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        title={sidebarCollapsed ? "展開側邊欄" : "收起側邊欄"}
      >
        {sidebarCollapsed ? "→" : "←"}
      </button>
    </div>
  )
}

export default AppHeader
