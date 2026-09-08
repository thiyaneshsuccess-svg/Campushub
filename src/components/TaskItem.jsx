function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''}`}
    >
      <button
        className="task-checkbox"
        onClick={() => toggleTask(task.id)}
      >
        {task.completed ? '☑' : '□'}
      </button>

      <div>
        <p>{task.title}</p>

        {task.dueDate && (
          <small>Due: {task.dueDate}</small>
        )}
      </div>

      <button
        className="delete-button"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </div>
  )
}

export default TaskItem