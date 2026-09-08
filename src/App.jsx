import './App.css'
import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'
import TaskItem from './components/TaskItem'
import TaskForm from './components/TaskForm'
import TaskFilters from './components/TaskFilters'

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
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
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
  setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
}

  const pendingTasks = totalTasks - completedTasks

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        dueDate={dueDate}
        setDueDate={setDueDate}
        addTask={addTask}
      />
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
        <TaskFilters
          filter={filter}
          setFilter={setFilter}
        />

        <section className="recent-tasks">
          <h2>Recent Tasks</h2>

          {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
  
            
        </section>
      </main>
    </div>
  )
}

export default App