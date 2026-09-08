import './App.css'
import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'

function App() {
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem('tasks')

  return savedTasks
    ? JSON.parse(savedTasks)
    : [
        {
          id: 1,
          title: 'Complete Python assignment',
          completed: false
        },
        {
          id: 2,
          title: 'Study Calculus',
          completed: false
        },
        {
          id: 3,
          title: 'Submit project report',
          completed: true
        }
      ]
})
  const [newTask, setNewTask] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [filter, setFilter] = useState('all')
  useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])
  
   
  function toggleTask(id) {
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  )
} 
  let filteredTasks = tasks

  if (filter === 'pending') {
    filteredTasks = tasks.filter((task) => !task.completed)
}

  if (filter === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed)
}  
  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length
 
  function addTask() {
  if (newTask.trim() === '') {
    return
  }

  const task = {
    id: Date.now(),
    title: newTask,
    completed: false,
    dueDate: dueDate

  }

  setTasks([...tasks, task])
  setNewTask('')
}
  function deleteTask(id) {
  setTasks(
    tasks.filter((task) => task.id !== id)
  )
}

  const pendingTasks = totalTasks - completedTasks

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <section className="add-task">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />

          <button onClick={addTask}>
            Add Task
          </button>
        </section>

        <section className="welcome">
          <h2>Welcome back 👋</h2>
          <p>Here's what's happening with your college work.</p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <h3>{totalTasks}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h3>{pendingTasks}</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h3>{completedTasks}</h3>
            <p>Completed</p>
          </div>
        </section>
        <div className="task-filters">
          <button  className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}>
            All
          </button>

          <button  className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}>
            Pending
          </button>

          <button  className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}>
            Completed
          </button>
        </div>
        <section className="recent-tasks">
          <h2>Recent Tasks</h2>

          {filteredTasks.map((task) => (
            <div
              key={task.id}
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
          ))}
        </section>
      </main>
    </div>
  )
}

export default App