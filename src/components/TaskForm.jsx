export default function TaskForm({ value, onChange, onSubmit }) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Nhập tên công việc..."
        aria-label="Task name"
      />
      <button type="submit">[Thêm]</button>
    </form>
  )
}
