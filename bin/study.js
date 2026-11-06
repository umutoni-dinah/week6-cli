#!/usr/bin/env node
const { getQuote } = require("../src/quote");
const { parseArgs } = require("node:util");
const {
  addTask,
  listTasks,
  completeTask,
  removeTask,
} = require("../src/tasks");

const HELP = `
Study Task Tracker

Usage:
  study add <description>
  study list
  study done <id>       Mark a task complete
  study remove <id>     Remove a task
  study quote           Show a study quote
  study --help
`;

 async function main() {
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
      console.error(
        'Please provide a task description, e.g. study add "Read chapter 3".',
      );
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

  if (command === "done") {
    const task = completeTask(args[0]);

    if (!task) {
      console.error(`Task not found: ${args[0]}`);
      process.exitCode = 1;
      return;
    }

    console.log(`Completed task #${task.id}: ${task.description}`);
    return;
  }

  if (command === "remove") {
    const removed = removeTask(args[0]);

    if (!removed) {
      console.error(`Task not found: ${args[0]}`);
      process.exitCode = 1;
      return;
    }

    console.log(`Removed task #${args[0]}`);
    return;
  }

  if (command === "quote") {
  try {
    const result = await getQuote();
    console.log(`"${result.quote}" — ${result.author}`);
  } catch (error) {
    console.error(`Could not get a quote: ${error.message}`);
    process.exitCode = 1;
  }
  return;
}
  console.error(`Unknown command: ${command}. Run "study --help" for usage.`);
  process.exitCode = 1;
}

main();
