import { renderHome } from "./home.js";
import { renderMenu } from "./menu.js";
import { renderContact } from "./contact.js";

const pages = {
  home: {
    title: "Inicio",
    render: renderHome,
  },
  menu: {
    title: "Menú",
    render: renderMenu,
  },
  contact: {
    title: "Contacto",
    render: renderContact,
  },
};

/**
 * Inicia la navegación y el contenido dinámico del restaurante.
 */
const initRestaurant = () => {
  const content = document.getElementById("content");
  const navigationButtons = document.querySelectorAll("[data-page]");
  const year = document.getElementById("current-year");

  if (!content) return;

  const pageFromHash = () => window.location.hash.slice(1) || "home";

  const renderPage = (pageName) => {
    const page = pages[pageName] || pages.home;
    const currentPageName = pages[pageName] ? pageName : "home";

    content.replaceChildren();
    page.render();

    navigationButtons.forEach((button) => {
      const isCurrentPage = button.dataset.page === currentPageName;
      button.classList.toggle("is-active", isCurrentPage);

      if (isCurrentPage) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    document.title = `${page.title} | El Rincón de Diego`;
  };

  navigationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const { page } = button.dataset;

      if (window.location.hash.slice(1) === page) {
        renderPage(page);
      } else {
        window.location.hash = page;
      }
    });
  });

  window.addEventListener("hashchange", () => renderPage(pageFromHash()));

  if (year) year.textContent = new Date().getFullYear();
  renderPage(pageFromHash());
};

export { initRestaurant };
