const STORAGE_KEY = "todo-list-data";

export function saveData(projects, currentProjectId) {
  const data = {
    projects,
    currentProjectId,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    return null;
  }

  return JSON.parse(savedData);
}