const { loadTasks, saveTasks } = require("./storage");

function addTask(description) {
  const tasks = loadTasks();
  const nextId = tasks.length === 0
    ? 1
    : Math.max(...tasks.map((task) => task.id)) + 1;

  const task = {
    id: nextId,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  saveTasks(tasks);
  return task;
}

function listTasks() {
  return loadTasks();
}

module.exports = { addTask, listTasks };