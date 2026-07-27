import "../../styles/CvPreview.css"

function CvPreview({ personalInfo, education, experience }) {
  return (
    <section className="cv-preview">
      <header>
        <h2>{personalInfo.fullName}</h2>

        <div className="contact-info">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
        </div>
      </header>

      <section className="cv-section">
        <h3>Educación</h3>

        {education.map((study) => (
          <article key={study.id}>
            <h4>{study.school || "Nombre de la escuela"}</h4>
            <p>{study.degree || "Estudios o título"}</p>
            <p>
              {study.startDate || "Inicio"} — {study.endDate || "Actualidad"}
            </p>
          </article>
        ))}
      </section>

      <section className="cv-section">
        <h3>Experiencia profesional</h3>

        {experience.map((job) => (
          <article key={job.id}>
            <h4>{job.company || "Nombre de la empresa"}</h4>
            <p>{job.position || "Puesto"}</p>
            <p>
              {job.startDate || "Inicio"} — {job.endDate || "Actualidad"}
            </p>
            {job.description && <p>{job.description}</p>}
          </article>
        ))}
      </section>
    </section>
  );
}

export default CvPreview;
