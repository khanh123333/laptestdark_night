import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <header className="app-header">
      <h1>Mini Task Manager</h1>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
      >
        <span>{darkMode ? '☀️' : '🌙'}</span>
        <span className="theme-name">{darkMode ? 'Light' : 'Dark'}</span>
      </button>
    </header>
  )
}
