function TaskForm({
  newTask,
  setNewTask,
  dueDate,
  setDueDate,
  addTask
}) {
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addTask()
    }
  }

  return (
    <section className="add-task">

      <input
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(event) =>
          setNewTask(event.target.value)
        }
        onKeyDown={handleKeyDown}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(event) =>
          setDueDate(event.target.value)
        }
      />

      <button onClick={addTask}>
        Add Task
      </button>

    </section>
  )
}

export default TaskForm