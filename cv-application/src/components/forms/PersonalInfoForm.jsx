import "../../styles/Form.css"

function PersonalInfoForm({ personalInfo, onChange }) {
  return (
    <section className="form-section">
      <h2>Información personal</h2>

      <label htmlFor="fullName">Nombre completo</label>
      <input
        id="fullName"
        name="fullName"
        value={personalInfo.fullName}
        onChange={onChange}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        id="email"
        name="email"
        type="email"
        value={personalInfo.email}
        onChange={onChange}
      />

      <label htmlFor="phone">Teléfono</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        value={personalInfo.phone}
        onChange={onChange}
      />

      <label htmlFor="location">Ubicación</label>
      <input
        id="location"
        name="location"
        value={personalInfo.location}
        onChange={onChange}
      />
    </section>
  );
}

export default PersonalInfoForm;