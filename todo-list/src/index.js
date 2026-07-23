import "./style.css";
import TodoManager from "./modules/TodoManager.js";
import { renderApp } from "./modules/domController.js";

const todoManager = new TodoManager();

renderApp(todoManager);