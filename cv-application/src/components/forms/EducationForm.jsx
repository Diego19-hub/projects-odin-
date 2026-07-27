import "../../styles/Form.css"
function EducationForm({
  education,
  onChange,
  onAdd,
  onRemove,
}) {
  return (
    <section className="form-section">
      <div className="section-heading">
        <h2>Educación</h2>
        <button type="button" onClick={onAdd}>
          Agregar
        </button>
      </div>

      {education.map((study) => (
        <div className="entry-form" key={study.id}>
          <label htmlFor={`school-${study.id}`}>Escuela</label>
          <input
            id={`school-${study.id}`}
            name="school"
            value={study.school}
            onChange={(event) => onChange(study.id, event)}
          />

          <label htmlFor={`degree-${study.id}`}>Estudios o título</label>
          <input
            id={`degree-${study.id}`}
            name="degree"
            value={study.degree}
            onChange={(event) => onChange(study.id, event)}
          />

          <label htmlFor={`startDate-${study.id}`}>Fecha de inicio</label>
          <input
            id={`startDate-${study.id}`}
            name="startDate"
            type="month"
            value={study.startDate}
            onChange={(event) => onChange(study.id, event)}
          />

          <label htmlFor={`endDate-${study.id}`}>Fecha de finalización</label>
          <input
            id={`endDate-${study.id}`}
            name="endDate"
            type="month"
            value={study.endDate}
            onChange={(event) => onChange(study.id, event)}
          />

          <button
            className="delete-button"
            type="button"
            onClick={() => onRemove(study.id)}
          >
            Eliminar educación
          </button>
        </div>
      ))}
    </section>
  );
}

export default EducationForm;