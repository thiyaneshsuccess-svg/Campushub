function ResourceItem({ resource, deleteResource }) {
  return (
    <div className="resource-item">

      <div>
        <h3>{resource.title}</h3>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Resource
        </a>
      </div>

      <button
        onClick={() => deleteResource(resource.id)}
      >
        Delete
      </button>

    </div>
  )
}

export default ResourceItem