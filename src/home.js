/**
 * Renderiza la bienvenida del restaurante.
 */
const renderHome = () => {
  const content = document.getElementById("content");

  const homeContainer = document.createElement("section");
  homeContainer.className = "home-container";

  const eyebrow = document.createElement("p");
  eyebrow.className = "home-eyebrow";
  eyebrow.textContent = "Cocina mexicana contemporánea";

  const title = document.createElement("h1");
  title.className = "home-title";
  title.textContent = "El sabor se disfruta mejor en buena compañía.";

  const image = document.createElement("img");
  image.className = "home-milkshake-image";
  image.src = "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85";
  image.alt = "Platillos servidos sobre una mesa de restaurante";
  image.width = 1200;
  image.height = 800;
  image.loading = "eager";

  const text = document.createElement("p");
  text.className = "home-text";
  text.textContent = "En El Rincón de Diego cocinamos al momento con ingredientes frescos, recetas cercanas y mucho cariño. Ven a disfrutar una comida que se siente como casa.";

  const hours = document.createElement("p");
  hours.className = "home-hours";
  hours.textContent = "Abierto todos los días · 1:00 p. m. – 10:00 p. m.";

  homeContainer.append(eyebrow, title, image, text, hours);
  content.appendChild(homeContainer);
};

export { renderHome, renderHome as loadHome };
