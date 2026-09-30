export default function TaskItem({ task, onToggle, onDelete }) {
  const canDelete = task.completed

  return (
    <li className="task-item">
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? 'completed' : ''}>{task.title}</span>
      </label>
      <button
        type="button"
        className="delete-btn"
        onClick={() => canDelete && onDelete(task.id)}
        disabled={!canDelete}
        aria-label={canDelete ? `Delete ${task.title}` : `Delete disabled for ${task.title}`}
      >
        [Xóa]
      </button>
    </li>
  )
}
