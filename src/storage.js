const fs = require("node:fs");
const path = require("node:path");

const dataFile = path.join(__dirname, "..", "tasks.json");

function loadTasks() {
  if (!fs.existsSync(dataFile)) {
    return [];
  }

  const fileContents = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(fileContents);
}

function saveTasks(tasks) {
  fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
}

module.exports = { loadTasks, saveTasks };