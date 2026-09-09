function TimetableForm({
  newSubject,
  setNewSubject,
  newDay,
  setNewDay,
  newStartTime,
  setNewStartTime,
  newEndTime,
  setNewEndTime,
  newRoom,
  setNewRoom,
  addClass
}) {
  return (
    <section className="timetable-form">
      <input
        type="text"
        placeholder="Subject"
        value={newSubject}
        onChange={(event) => setNewSubject(event.target.value)}
      />

      <select
        value={newDay}
        onChange={(event) => setNewDay(event.target.value)}
      >
        <option value="">Select Day</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>

      <input
        type="time"
        value={newStartTime}
        onChange={(event) => setNewStartTime(event.target.value)}
      />

      <input
        type="time"
        value={newEndTime}
        onChange={(event) => setNewEndTime(event.target.value)}
      />

      <input
        type="text"
        placeholder="Room"
        value={newRoom}
        onChange={(event) => setNewRoom(event.target.value)}
      />

      <button onClick={addClass}>
        Add Class
      </button>
    </section>
  )
}

export default TimetableForm