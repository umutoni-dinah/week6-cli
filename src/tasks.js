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

function completeTask(id) {
  const tasks = loadTasks();
  const task = tasks.find((item) => item.id === Number(id));

  if (!task) return null;

  task.completed = true;
  saveTasks(tasks);
  return task;
}

function removeTask(id) {
  const tasks = loadTasks();
  const remainingTasks = tasks.filter((item) => item.id !== Number(id));

  if (remainingTasks.length === tasks.length) return false;

  saveTasks(remainingTasks);
  return true;
}

module.exports = { addTask, listTasks, completeTask, removeTask };