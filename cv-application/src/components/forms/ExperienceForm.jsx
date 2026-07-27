import "../../styles/Form.css"

function ExperienceForm({
  experience,
  onChange,
  onAdd,
  onRemove,
}) {
  return (
    <section className="form-section">
      <div className="section-heading">
        <h2>Experiencia profesional</h2>
        <button type="button" onClick={onAdd}>
          Agregar
        </button>
      </div>

      {experience.map((job) => (
        <div className="entry-form" key={job.id}>
          <label htmlFor={`company-${job.id}`}>Empresa</label>
          <input
            id={`company-${job.id}`}
            name="company"
            value={job.company}
            onChange={(event) => onChange(job.id, event)}
          />

          <label htmlFor={`position-${job.id}`}>Puesto</label>
          <input
            id={`position-${job.id}`}
            name="position"
            value={job.position}
            onChange={(event) => onChange(job.id, event)}
          />

          <label htmlFor={`jobStartDate-${job.id}`}>Fecha de inicio</label>
          <input
            id={`jobStartDate-${job.id}`}
            name="startDate"
            type="month"
            value={job.startDate}
            onChange={(event) => onChange(job.id, event)}
          />

          <label htmlFor={`jobEndDate-${job.id}`}>Fecha de finalización</label>
          <input
            id={`jobEndDate-${job.id}`}
            name="endDate"
            type="month"
            value={job.endDate}
            onChange={(event) => onChange(job.id, event)}
          />

          <label htmlFor={`description-${job.id}`}>Descripción</label>
          <textarea
            id={`description-${job.id}`}
            name="description"
            value={job.description}
            onChange={(event) => onChange(job.id, event)}
          />

          <button
            className="delete-button"
            type="button"
            onClick={() => onRemove(job.id)}
          >
            Eliminar experiencia
          </button>
        </div>
      ))}
    </section>
  );
}

export default ExperienceForm;