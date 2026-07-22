/**
 * Renderiza la sección de contacto del restaurante.
 */
const renderContact = () => {
  const content = document.getElementById("content");

  const contactContent = document.createElement("section");
  contactContent.className = "contact-content";

  const heading = document.createElement("h1");
  heading.textContent = "Hablemos de tu próxima visita";

  const intro = document.createElement("p");
  intro.textContent = "Reserva una mesa, pide información o comparte tu experiencia con nosotros.";

  contactContent.append(heading, intro);

  const contactDetails = [
    { label: "Teléfono", text: "33 1234 5678", href: "tel:+523312345678" },
    { label: "Correo", text: "hola@elrincondediego.mx", href: "mailto:hola@elrincondediego.mx" },
    { label: "Visítanos", text: "Zapopan, Jalisco, México", href: null },
  ];

  contactDetails.forEach(({ label, text, href }) => {
    const item = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = label;

    const detail = document.createElement("p");

    if (href) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = text;
      detail.appendChild(link);
    } else {
      detail.textContent = text;
    }

    item.append(title, detail);
    contactContent.appendChild(item);
  });

  content.appendChild(contactContent);
};

export { renderContact, renderContact as loadContact };
