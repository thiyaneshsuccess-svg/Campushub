function TimetableItem({ classItem, deleteClass }) {
  return (
    <div className="timetable-item">
      <div>
        <h3>{classItem.subject}</h3>
        <p>
          {classItem.day} | {classItem.startTime} - {classItem.endTime}
        </p>
        <small>Room: {classItem.room}</small>
      </div>

      <button onClick={() => deleteClass(classItem.id)}>
        Delete
      </button>
    </div>
  )
}

export default TimetableItem