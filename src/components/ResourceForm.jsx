function ResourceForm({
  newResource,
  setNewResource,
  resourceUrl,
  setResourceUrl,
  addResource
}) {
  return (
    <section className="resource-form">
      <input
        type="text"
        placeholder="Resource title..."
        value={newResource}
        onChange={(event) => setNewResource(event.target.value)}
      />

      <input
        type="url"
        placeholder="Resource URL..."
        value={resourceUrl}
        onChange={(event) => setResourceUrl(event.target.value)}
      />

      <button onClick={addResource}>
        Add Resource
      </button>
    </section>
  )
}

export default ResourceForm