import Project from "./Project.js";
import Todo from "./Todo.js";
import { loadData, saveData } from "./storage.js";

export default class TodoManager {
  constructor() {
    this.projects = [];
    this.currentProjectId = null;

    const savedData = loadData();

    if (savedData) {
      this.loadSavedData(savedData);
    } else {
      this.createProject("General");
    }
  }

  save() {
    saveData(this.projects, this.currentProjectId);
  }

  loadSavedData(savedData) {
    this.projects = savedData.projects.map((project) =>
      Project.fromData(project),
    );

    this.currentProjectId = savedData.currentProjectId;

    if (this.projects.length === 0) {
      this.createProject("General");
    }
  }

  createProject(name) {
    const project = new Project(name);

    this.projects.push(project);

    if (this.currentProjectId === null) {
      this.currentProjectId = project.id;
    }

    this.save();

    return project;
  }

  getCurrentProject() {
    return this.projects.find(
      (project) => project.id === this.currentProjectId,
    );
  }

  selectProject(projectId) {
    this.currentProjectId = projectId;
    this.save();
  }

  deleteProject(projectId) {
    if (this.projects.length === 1) {
      return;
    }

    this.projects = this.projects.filter(
      (project) => project.id !== projectId,
    );

    if (this.currentProjectId === projectId) {
      this.currentProjectId = this.projects[0].id;
    }

    this.save();
  }

  addTodoToCurrentProject(todo) {
    const currentProject = this.getCurrentProject();

    currentProject.addTodo(todo);
    this.save();
  }

  createTodo(title, description, dueDate, priority) {
    const todo = new Todo(title, description, dueDate, priority);

    this.addTodoToCurrentProject(todo);

    return todo;
  }

  toggleTodoCompleted(todoId) {
    const currentProject = this.getCurrentProject();

    const todo = currentProject.todos.find(
      (currentTodo) => currentTodo.id === todoId,
    );

    if (todo) {
      todo.toggleCompleted();
      this.save();
    }
  }

  deleteTodoFromCurrentProject(todoId) {
    const currentProject = this.getCurrentProject();

    currentProject.removeTodo(todoId);
    this.save();
  }

  updateTodo(todoId, title, description, dueDate, priority) {
    const currentProject = this.getCurrentProject();

    const todo = currentProject.todos.find(
      (currentTodo) => currentTodo.id === todoId,
    );

    if (!todo) {
      return;
    }

    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;

    this.save();
  }
}