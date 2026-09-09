function Navbar({ activePage, setActivePage }) {

  function handleNavigation(event, page) {
    event.preventDefault()
    setActivePage(page)
  }

  return (
    <header className="navbar">

      <h1>CampusHub</h1>

      <nav>

        <a
          href="#"
          className={activePage === 'Dashboard' ? 'active' : ''}
          onClick={(event) =>
            handleNavigation(event, 'Dashboard')
          }
        >
          Dashboard
        </a>

        <a
          href="#"
          className={activePage === 'Tasks' ? 'active' : ''}
          onClick={(event) =>
            handleNavigation(event, 'Tasks')
          }
        >
          Tasks
        </a>

        <a
          href="#"
          className={activePage === 'Resources' ? 'active' : ''}
          onClick={(event) =>
            handleNavigation(event, 'Resources')
          }
        >
          Resources
        </a>

        <a
          href="#"
          className={activePage === 'Timetable' ? 'active' : ''}
          onClick={(event) =>
            handleNavigation(event, 'Timetable')
          }
        >
          Timetable
        </a>

      </nav>

    </header>
  )
}

export default Navbar