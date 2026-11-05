#!/usr/bin/env node

const { parseArgs } = require("node:util");
const { addTask, listTasks } = require("../src/tasks");

const HELP = `
Study Task Tracker

Usage:
  study add <description>
  study list
  study --help
`;

function main() {
  const { values, positionals } = parseArgs({
    options: {
      help: { type: "boolean", short: "h" },
    },
    allowPositionals: true,
  });

  if (values.help || positionals.length === 0) {
    console.log(HELP);
    return;
  }

  const [command, ...args] = positionals;

  if (command === "add") {
    const description = args.join(" ").trim();

    if (!description) {
      console.error('Please provide a task description, e.g. study add "Read chapter 3".');
      process.exitCode = 1;
      return;
    }

    const task = addTask(description);
    console.log(`Added task #${task.id}: ${task.description}`);
    return;
  }

  if (command === "list") {
    const tasks = listTasks();

    if (tasks.length === 0) {
      console.log("No study tasks yet. Add one with: study add <description>");
      return;
    }

    for (const task of tasks) {
      const status = task.completed ? "✓" : " ";
      console.log(`${task.id}. [${status}] ${task.description}`);
    }
    return;
  }

  console.error(`Unknown command: ${command}. Run "study --help" for usage.`);
  process.exitCode = 1;
}

main();