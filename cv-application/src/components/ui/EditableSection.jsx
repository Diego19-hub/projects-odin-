import { useState } from "react";
import "../../styles/EditableSection.css"

function EditableSection({ sectionName, children }) {
  const [isEditing, setIsEditing] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    setIsEditing(false);
  }

  if (!isEditing) {
    return (
      <section className="saved-section">
        <p>{sectionName} guardada.</p>

        <button type="button" onClick={() => setIsEditing(true)}>
          Editar
        </button>
      </section>
    );
  }

  return (
    <form className="editable-section" onSubmit={handleSubmit}>
      {children}

      <button className="save-button" type="submit">
        Guardar {sectionName.toLowerCase()}
      </button>
    </form>
  );
}

export default EditableSection;