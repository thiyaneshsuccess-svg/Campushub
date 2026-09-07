import './App.css'
import Navbar from './components/Navbar'
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
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
])
  function toggleTask(id) {
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  )
}

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <section className="welcome">
          <h2>Welcome back 👋</h2>
          <p>Here's what's happening with your college work.</p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <h3>8</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h3>5</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h3>3</h3>
            <p>Completed</p>
          </div>
        </section>

        <section className="recent-tasks">
          <h2>Recent Tasks</h2>

          {tasks.map((task) => (
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
              <p>{task.title}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App