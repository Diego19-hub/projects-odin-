import { useState } from "react";
import PersonalInfoForm from "./components/forms/PersonalInfoForm";
import EducationForm from "./components/forms/EducationForm";
import ExperienceForm from "./components/forms/ExperienceForm";
import CvPreview from "./components/sections/CvPreview";
import "./styles/App.css"
import EditableSection from "./components/ui/EditableSection";

function App() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Diego Ortega",
    email: "diego@email.com",
    phone: "33 0000 0000",
    location: "Zapopan, Jalisco",
  });

  const [education, setEducation] = useState([
    {
      id: "education-1",
      school: "Preparatoria 9 UDG",
      degree: "Bachillerato General por Competencias",
      startDate: "2023-08",
      endDate: "",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      id: "experience-1",
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  function handlePersonalInfoChange(event) {
    const { name, value } = event.target;

    setPersonalInfo((currentInfo) => ({
      ...currentInfo,
      [name]: value,
    }));
  }

  function handleEducationChange(id, event) {
    const { name, value } = event.target;

    setEducation((currentEducation) =>
      currentEducation.map((study) =>
        study.id === id ? { ...study, [name]: value } : study,
      ),
    );
  }

  function addEducation() {
    setEducation((currentEducation) => [
      ...currentEducation,
      {
        id: crypto.randomUUID(),
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
      },
    ]);
  }

  function removeEducation(id) {
    setEducation((currentEducation) =>
      currentEducation.filter((study) => study.id !== id),
    );
  }

  function handleExperienceChange(id, event) {
    const { name, value } = event.target;

    setExperience((currentExperience) =>
      currentExperience.map((job) =>
        job.id === id ? { ...job, [name]: value } : job,
      ),
    );
  }

  function addExperience() {
    setExperience((currentExperience) => [
      ...currentExperience,
      {
        id: crypto.randomUUID(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  }

  function removeExperience(id) {
    setExperience((currentExperience) =>
      currentExperience.filter((job) => job.id !== id),
    );
  }

  return (
    <main className="app">
      <section className="editor">
        <h1>Solicitud de CV</h1>

        <EditableSection sectionName="Información personal">
          <PersonalInfoForm
            personalInfo={personalInfo}
            onChange={handlePersonalInfoChange}
          />
        </EditableSection>

        <EditableSection sectionName="Educación">
          <EducationForm
            education={education}
            onChange={handleEducationChange}
            onAdd={addEducation}
            onRemove={removeEducation}
          />
        </EditableSection>

        <EditableSection sectionName="Experiencia profesional">
          <ExperienceForm
            experience={experience}
            onChange={handleExperienceChange}
            onAdd={addExperience}
            onRemove={removeExperience}
          />
        </EditableSection>
      </section>

      <CvPreview
        personalInfo={personalInfo}
        education={education}
        experience={experience}
      />
    </main>
  );
}

export default App;