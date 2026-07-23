function createProjectButton(project, todoManager, renderApp) {
  const button = document.createElement("button");

  button.classList.add("project-button");
  button.textContent = project.name;
  button.type = "button";
  button.setAttribute("aria-current", project.id === todoManager.currentProjectId ? "page" : "false");

  if (project.id === todoManager.currentProjectId) {
    button.classList.add("active");
  }

  button.addEventListener("click", () => {
    todoManager.selectProject(project.id);
    renderApp(todoManager);
  });

  return button;
}

function createFieldLabel(text, input) {
  const label = document.createElement("label");
  label.classList.add("visually-hidden");
  label.htmlFor = input.id;
  label.textContent = text;
  return label;
}

function formatDueDate(value) {
  if (!value) return "Sin fecha límite";

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function createEditTodoForm(todo, todoManager, renderApp) {
  const form = document.createElement("form");
  form.classList.add("todo-form", "edit-form");

  const titleInput = document.createElement("input");
  titleInput.id = `edit-title-${todo.id}`;
  titleInput.type = "text";
  titleInput.value = todo.title;
  titleInput.placeholder = "Título de la tarea";
  titleInput.required = true;

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = `edit-description-${todo.id}`;
  descriptionInput.value = todo.description;
  descriptionInput.placeholder = "Descripción";

  const dueDateInput = document.createElement("input");
  dueDateInput.id = `edit-date-${todo.id}`;
  dueDateInput.type = "date";
  dueDateInput.value = todo.dueDate;
  dueDateInput.required = true;

  const prioritySelect = document.createElement("select");
  prioritySelect.id = `edit-priority-${todo.id}`;

  ["low", "medium", "high"].forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = priority;
    option.selected = priority === todo.priority;

    prioritySelect.appendChild(option);
  });

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.classList.add("primary-button");
  saveButton.textContent = "Guardar cambios";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.classList.add("secondary-button");
  cancelButton.textContent = "Cancelar";

  cancelButton.addEventListener("click", () => {
    renderApp(todoManager);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!titleInput.value.trim()) return;

    todoManager.updateTodo(
      todo.id,
      titleInput.value.trim(),
      descriptionInput.value.trim(),
      dueDateInput.value,
      prioritySelect.value,
    );

    renderApp(todoManager);
  });

  form.append(
    createFieldLabel("Título", titleInput),
    titleInput,
    createFieldLabel("Descripción", descriptionInput),
    descriptionInput,
    createFieldLabel("Fecha límite", dueDateInput),
    dueDateInput,
    createFieldLabel("Prioridad", prioritySelect),
    prioritySelect,
    saveButton,
    cancelButton,
  );

  return form;
}

function createTodoCard(todo, todoManager, renderApp) {
  const card = document.createElement("article");
  card.classList.add("todo-card", todo.priority);

  if (todo.completed) {
    card.classList.add("completed");
  }

  const topRow = document.createElement("div");
  topRow.classList.add("todo-top-row");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.setAttribute("aria-label", `Completar ${todo.title}`);

  checkbox.addEventListener("change", () => {
    todoManager.toggleTodoCompleted(todo.id);
    renderApp(todoManager);
  });

  const title = document.createElement("h3");
  title.textContent = todo.title;

  topRow.append(checkbox, title);

  const dueDate = document.createElement("p");
  dueDate.classList.add("due-date");
  dueDate.textContent = `Fecha límite: ${formatDueDate(todo.dueDate)}`;

  const priority = document.createElement("span");
  priority.classList.add("priority-label");
  priority.textContent = `Prioridad: ${todo.priority}`;

  const details = document.createElement("div");
  details.classList.add("todo-details");
  details.hidden = true;

  const description = document.createElement("p");
  description.textContent = todo.description || "Sin descripción.";

  details.appendChild(description);

  const actions = document.createElement("div");
  actions.classList.add("todo-actions");

  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.classList.add("secondary-button");
  detailsButton.setAttribute("aria-expanded", "false");
  detailsButton.textContent = "Ver detalles";

  detailsButton.addEventListener("click", () => {
    details.hidden = !details.hidden;
    detailsButton.setAttribute("aria-expanded", String(!details.hidden));

    detailsButton.textContent = details.hidden
      ? "Ver detalles"
      : "Ocultar detalles";
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Eliminar";

  deleteButton.addEventListener("click", () => {
    todoManager.deleteTodoFromCurrentProject(todo.id);
    renderApp(todoManager);
  });

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.classList.add("secondary-button");
  editButton.textContent = "Editar";

  editButton.addEventListener("click", () => {
    card.replaceWith(createEditTodoForm(todo, todoManager, renderApp));
  });

  actions.append(detailsButton, editButton, deleteButton);

  card.append(topRow, dueDate, priority, details, actions);

  return card;
}

function createProjectForm(todoManager, renderApp) {
  const form = document.createElement("form");
  form.classList.add("project-form");

  const input = document.createElement("input");
  input.id = "project-name";
  input.type = "text";
  input.placeholder = "Nuevo proyecto";
  input.required = true;

  const button = document.createElement("button");
  button.type = "submit";
  button.classList.add("primary-button");
  button.textContent = "+ Crear";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = input.value.trim();

    if (name === "") {
      return;
    }

    const project = todoManager.createProject(name);
    todoManager.selectProject(project.id);

    renderApp(todoManager);
  });

  form.append(createFieldLabel("Nombre del proyecto", input), input, button);

  return form;
}

function createTodoForm(todoManager, renderApp) {
  const form = document.createElement("form");
  form.classList.add("todo-form");

  const titleInput = document.createElement("input");
  titleInput.id = "todo-title";
  titleInput.name = "title";
  titleInput.type = "text";
  titleInput.placeholder = "Título de la tarea";
  titleInput.required = true;

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "todo-description";
  descriptionInput.name = "description";
  descriptionInput.placeholder = "Descripción";

  const dueDateInput = document.createElement("input");
  dueDateInput.id = "todo-date";
  dueDateInput.name = "dueDate";
  dueDateInput.type = "date";
  dueDateInput.required = true;

  const prioritySelect = document.createElement("select");
  prioritySelect.id = "todo-priority";
  prioritySelect.name = "priority";

  ["low", "medium", "high"].forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = priority;
    prioritySelect.appendChild(option);
  });

  const button = document.createElement("button");
  button.type = "submit";
  button.classList.add("primary-button");
  button.textContent = "+ Agregar tarea";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!titleInput.value.trim()) return;

    todoManager.createTodo(
      titleInput.value.trim(),
      descriptionInput.value.trim(),
      dueDateInput.value,
      prioritySelect.value,
    );

    renderApp(todoManager);
  });

  form.append(
    createFieldLabel("Título", titleInput),
    titleInput,
    createFieldLabel("Descripción", descriptionInput),
    descriptionInput,
    createFieldLabel("Fecha límite", dueDateInput),
    dueDateInput,
    createFieldLabel("Prioridad", prioritySelect),
    prioritySelect,
    button,
  );

  return form;
}

export function renderApp(todoManager) {
  const app = document.querySelector("#app");
  const currentProject = todoManager.getCurrentProject();

  app.replaceChildren();

  const header = document.createElement("header");
  header.classList.add("header");

  const appTitle = document.createElement("h1");
  appTitle.textContent = "Mis tareas";

  const appSubtitle = document.createElement("p");
  appSubtitle.textContent = "Organiza lo importante, sin distracciones.";

  header.append(appTitle, appSubtitle);

  const layout = document.createElement("div");
  layout.classList.add("layout");

  const sidebar = document.createElement("aside");
  sidebar.classList.add("sidebar");

  const projectsTitle = document.createElement("h2");
  projectsTitle.textContent = "Proyectos";

  const projectsList = document.createElement("div");
  projectsList.classList.add("projects-list");

  todoManager.projects.forEach((project) => {
    projectsList.appendChild(
      createProjectButton(project, todoManager, renderApp),
    );
  });

  sidebar.append(
    projectsTitle,
    projectsList,
    createProjectForm(todoManager, renderApp),
  );

  const main = document.createElement("main");
  main.classList.add("main-content");

  const currentTitle = document.createElement("h2");
  currentTitle.textContent = currentProject.name;

  const todosContainer = document.createElement("div");
  todosContainer.classList.add("todos-container");

  currentProject.todos.forEach((todo) => {
    todosContainer.appendChild(
      createTodoCard(todo, todoManager, renderApp),
    );
  });

  if (currentProject.todos.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "Este proyecto todavía no tiene tareas.";
    todosContainer.appendChild(emptyMessage);
  }

  main.append(
    currentTitle,
    createTodoForm(todoManager, renderApp),
    todosContainer,
  );

  layout.append(sidebar, main);
  app.append(header, layout);
}
