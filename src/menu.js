const dishes = [
  {
    name: "Tacos de birria",
    description: "Tres tacos dorados, consomé casero, cebolla, cilantro y limón.",
    price: "$165",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=80",
    alt: "Tacos servidos en un plato",
  },
  {
    name: "Pasta cremosa",
    description: "Fettuccine con salsa de parmesano, champiñones y un toque de ajo.",
    price: "$185",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=80",
    alt: "Plato de pasta cremosa",
  },
  {
    name: "Hamburguesa de la casa",
    description: "Carne artesanal, queso manchego, cebolla caramelizada y papas rústicas.",
    price: "$195",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    alt: "Hamburguesa con queso",
  },
  {
    name: "Ensalada de temporada",
    description: "Hojas frescas, fruta de estación, nueces, queso de cabra y vinagreta cítrica.",
    price: "$145",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
    alt: "Ensalada fresca con vegetales",
  },
  {
    name: "Corte al romero",
    description: "Corte de res a la parrilla, puré de papa, verduras y jugo de carne.",
    price: "$285",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
    alt: "Corte de carne a la parrilla",
  },
  {
    name: "Cheesecake de frutos rojos",
    description: "Cremoso cheesecake horneado, compota de frutos rojos y galleta de mantequilla.",
    price: "$110",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=500&q=80",
    alt: "Rebanada de cheesecake con frutos rojos",
  },
];

/**
 * Renderiza el menú de platillos del restaurante.
 */
const renderMenu = () => {
  const content = document.getElementById("content");

  const section = document.createElement("section");
  section.className = "menu-section";

  const heading = document.createElement("h1");
  heading.textContent = "Nuestro menú";

  const intro = document.createElement("p");
  intro.className = "menu-intro";
  intro.textContent = "Platillos preparados al momento con ingredientes frescos.";

  const menuContainer = document.createElement("div");
  menuContainer.className = "menu-container";

  dishes.forEach(({ name, description, price, image, alt }) => {
    const card = document.createElement("article");
    card.className = "menu-card";

    const dishImage = document.createElement("img");
    dishImage.className = "menu-card-image";
    dishImage.src = image;
    dishImage.alt = alt;
    dishImage.width = 500;
    dishImage.height = 500;
    dishImage.loading = "lazy";

    const details = document.createElement("div");
    details.className = "menu-card-details";

    const dishName = document.createElement("h2");
    dishName.textContent = name;

    const dishDescription = document.createElement("p");
    dishDescription.textContent = description;

    const dishPrice = document.createElement("span");
    dishPrice.className = "menu-card-price";
    dishPrice.textContent = price;

    details.append(dishName, dishDescription, dishPrice);
    card.append(dishImage, details);
    menuContainer.appendChild(card);
  });

  section.append(heading, intro, menuContainer);
  content.appendChild(section);
};

export { renderMenu, renderMenu as loadMenu };
