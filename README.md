# Study Task Tracker

A simple command-line tool for managing study tasks and getting a random study quote.

## Features

- Add study tasks
- List tasks and see which are complete
- Mark a task as complete
- Remove a task
- Fetch a random study quote
- Save tasks locally in a JSON file

## Requirements

- Node.js 18 or later
- npm

## Set up the project

Clone the repository and open its folder:

```bash
git clone https://github.com/umutoni-dinah/week6-cli.git
cd week6-cli
```

Link the command so you can run it as `study`:

```bash
npm link
```

## Usage

Show the help message:

```bash
study --help
```

Add a task:

```bash
study add "Read chapter 3"
```

List your tasks:

```bash
study list
```

Mark a task as complete using its ID:

```bash
study done 1
```

Remove a task using its ID:

```bash
study remove 1
```

Get a random study quote:

```bash
study quote
```

You can also run the tool without linking it by using `node bin/study.js` in place of `study`. For example:

```bash
node bin/study.js list
```

## Task storage

Tasks are saved in `tasks.json` in the project folder. The file is created when you add your first task. It is excluded from Git, so each person keeps their own task list.

## Quote service

The `quote` command fetches a random quote and its author from the [DummyJSON quotes API](https://dummyjson.com/docs/quotes). An internet connection is needed to use this command.

## Built with

- Node.js
- `util.parseArgs` for reading command-line arguments
- JSON files for saving tasks
- DummyJSON quotes API