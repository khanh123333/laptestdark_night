import { useMemo, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { initialTasks } from './data/tasks'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

function AppContent() {
  const { darkMode } = useTheme()
  const [tasks, setTasks] = useLocalStorage('mini-task-manager-tasks', initialTasks)
  const [taskName, setTaskName] = useState('')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const visibleTasks = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(keyword)
      const matchesFilter =
        filter === 'all'
          ? true
          : filter === 'active'
            ? !task.completed
            : task.completed

      return matchesSearch && matchesFilter
    })
  }, [filter, search, tasks])

  const completedCount = tasks.filter((task) => task.completed).length
  const activeCount = tasks.length - completedCount

  const handleAddTask = (event) => {
    event.preventDefault()
    const trimmed = taskName.trim()

    if (!trimmed) {
      return
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), title: trimmed, completed: false },
    ])
    setTaskName('')
  }

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className={`app-shell ${darkMode ? 'dark' : 'light'}`}>
      <Header />

      <TaskForm
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        onSubmit={handleAddTask}
      />

      <div className="controls">
        <div className="select-wrap">
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">Tất cả</option>
            <option value="active">Chưa làm</option>
            <option value="completed">Hoàn thành</option>
          </select>
        </div>

        <div className="search-wrap">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm kiếm..."
            aria-label="Search tasks"
          />
        </div>
      </div>

      <div className="stats">
        <span>Tổng: {tasks.length}</span>
        <span>Chưa làm: {activeCount}</span>
        <span>Hoàn thành: {completedCount}</span>
      </div>

      <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
