import './App.css'

import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import TaskItem from './components/TaskItem'
import TaskForm from './components/TaskForm'
import TaskFilters from './components/TaskFilters'
import ResourceForm from './components/ResourceForm'
import ResourceItem from './components/ResourceItem'
import TimetableForm from './components/TimetableForm'
import TimetableItem from './components/TimetableItem'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')

    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            title: 'Complete Python assignment',
            completed: false,
            dueDate: ''
          },
          {
            id: 2,
            title: 'Study Calculus',
            completed: false,
            dueDate: ''
          },
          {
            id: 3,
            title: 'Submit project report',
            completed: true,
            dueDate: ''
          }
        ]
  })

  const [newTask, setNewTask] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [filter, setFilter] = useState('all')

  const [resources, setResources] = useState(() => {
    const savedResources = localStorage.getItem('resources')

    return savedResources
      ? JSON.parse(savedResources)
      : []
  })

  const [newResource, setNewResource] = useState('')
  const [resourceUrl, setResourceUrl] = useState('')
  const [resourceSearch, setResourceSearch] = useState('')

  const [classes, setClasses] = useState(() => {
    const savedClasses = localStorage.getItem('classes')

    return savedClasses
      ? JSON.parse(savedClasses)
      : []
  })

  const [newSubject, setNewSubject] = useState('')
  const [newDay, setNewDay] = useState('')
  const [newStartTime, setNewStartTime] = useState('')
  const [newEndTime, setNewEndTime] = useState('')
  const [newRoom, setNewRoom] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('resources', JSON.stringify(resources))
  }, [resources])

  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes))
  }, [classes])

  function toggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function addTask() {
    if (newTask.trim() === '') {
      return
    }

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
      dueDate: dueDate
    }

    setTasks((prevTasks) => [...prevTasks, task])

    setNewTask('')
    setDueDate('')
  }

  function deleteTask(id) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    )
  }

  function addResource() {
    if (
      newResource.trim() === '' ||
      resourceUrl.trim() === ''
    ) {
      return
    }

    const resource = {
      id: Date.now(),
      title: newResource.trim(),
      url: resourceUrl.trim()
    }

    setResources((prevResources) => [
      ...prevResources,
      resource
    ])

    setNewResource('')
    setResourceUrl('')
  }

  function deleteResource(id) {
    setResources((prevResources) =>
      prevResources.filter(
        (resource) => resource.id !== id
      )
    )
  }

  function addClass() {
    if (
      newSubject.trim() === '' ||
      newDay === '' ||
      newStartTime === '' ||
      newEndTime === '' ||
      newRoom.trim() === ''
    ) {
      return
    }

    if (newEndTime <= newStartTime) {
      return
    }

    const newClass = {
      id: Date.now(),
      subject: newSubject.trim(),
      day: newDay,
      startTime: newStartTime,
      endTime: newEndTime,
      room: newRoom.trim()
    }

    setClasses((prevClasses) => [
      ...prevClasses,
      newClass
    ])

    setNewSubject('')
    setNewDay('')
    setNewStartTime('')
    setNewEndTime('')
    setNewRoom('')
  }

  function deleteClass(id) {
    setClasses((prevClasses) =>
      prevClasses.filter(
        (classItem) => classItem.id !== id
      )
    )
  }

  let filteredTasks = tasks

  if (filter === 'pending') {
    filteredTasks = tasks.filter(
      (task) => !task.completed
    )
  }

  if (filter === 'completed') {
    filteredTasks = tasks.filter(
      (task) => task.completed
    )
  }

  const filteredResources = resources.filter((resource) =>
    resource.title
      .toLowerCase()
      .includes(resourceSearch.toLowerCase())
  )

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  const pendingTasks = totalTasks - completedTasks

  return (
    <div className="app">

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">

        {activePage === 'Dashboard' && (
          <>
            <section className="welcome">
              <h2>Welcome back 👋</h2>

              <p>
                Here's what's happening with your college work.
              </p>
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

            <section className="recent-tasks">
              <h2>Recent Tasks</h2>

              {tasks.length === 0 ? (
                <p className="empty-state">
                  No tasks added yet.
                </p>
              ) : (
                tasks.slice(-5).map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                  />
                ))
              )}
            </section>
          </>
        )}

        {activePage === 'Tasks' && (
          <>
            <section className="page-header">
              <h2>Tasks</h2>
              <p>Manage your college tasks and assignments.</p>
            </section>

            <TaskForm
              newTask={newTask}
              setNewTask={setNewTask}
              dueDate={dueDate}
              setDueDate={setDueDate}
              addTask={addTask}
            />

            <TaskFilters
              filter={filter}
              setFilter={setFilter}
            />

            <section className="recent-tasks">

              {filteredTasks.length === 0 ? (
                <p className="empty-state">
                  No tasks found.
                </p>
              ) : (
                filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                  />
                ))
              )}

            </section>
          </>
        )}

        {activePage === 'Resources' && (
          <>
            <section className="page-header">
              <h2>Resources</h2>
              <p>Save useful learning resources in one place.</p>
            </section>

            <ResourceForm
              newResource={newResource}
              setNewResource={setNewResource}
              resourceUrl={resourceUrl}
              setResourceUrl={setResourceUrl}
              addResource={addResource}
            />

            <section className="resources">

              <input
                type="text"
                placeholder="Search resources..."
                value={resourceSearch}
                onChange={(event) =>
                  setResourceSearch(event.target.value)
                }
              />

              {filteredResources.length === 0 ? (
                <p className="empty-state">
                  No resources found.
                </p>
              ) : (
                filteredResources.map((resource) => (
                  <ResourceItem
                    key={resource.id}
                    resource={resource}
                    deleteResource={deleteResource}
                  />
                ))
              )}

            </section>
          </>
        )}

        {activePage === 'Timetable' && (
          <>
            <section className="page-header">
              <h2>Timetable</h2>
              <p>Keep track of your weekly classes.</p>
            </section>

            <TimetableForm
              newSubject={newSubject}
              setNewSubject={setNewSubject}
              newDay={newDay}
              setNewDay={setNewDay}
              newStartTime={newStartTime}
              setNewStartTime={setNewStartTime}
              newEndTime={newEndTime}
              setNewEndTime={setNewEndTime}
              newRoom={newRoom}
              setNewRoom={setNewRoom}
              addClass={addClass}
            />

            <section className="timetable">

              {classes.length === 0 ? (
                <p className="empty-state">
                  No classes added yet.
                </p>
              ) : (
                classes.map((classItem) => (
                  <TimetableItem
                    key={classItem.id}
                    classItem={classItem}
                    deleteClass={deleteClass}
                  />
                ))
              )}

            </section>
          </>
        )}

      </main>
    </div>
  )
}

export default App