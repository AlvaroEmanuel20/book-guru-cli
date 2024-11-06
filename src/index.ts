#!/usr/bin/env node

import 'dotenv/config';
import { Command } from 'commander';
import { access } from 'node:fs/promises';
import path from 'node:path';
import database from './lib/database';
import figlet from 'figlet';
import colors from 'picocolors';
import preferences from './commands/preferences';
import generate from './commands/generate';
import list from './commands/list';

const program = new Command();
console.log(colors.bold(colors.blue(figlet.textSync('Book Guru'))));

program
  .name('book-guru')
  .description('An AI book recommendation app')
  .version('1.0.0', '-v, --version', 'current app version');

(async () => {
  try {
    const databaseName = process.env.DATABASE_FILE_NAME || 'database.json';
    await access(path.join(__dirname, '..', databaseName));
  } catch (error) {
    await database.create({
      preferences: { language: '', genre: '', bookTaste: '' },
      recommendations: [],
    });
  }

  program
    .command('preferences')
    .description('view and edit book preferences')
    .argument('[actionType]', 'view or edit', 'view')
    .action(preferences);

  program
    .command('generate')
    .description('generate recommendations')
    .argument('[limit]', 'limit of generations', 5)
    .option('-n, --new', 'new recommendations, no saved preferences')
    .action(generate);

  program
    .command('list')
    .description('list your recommendations')
    .option('-s, --sort [sortType]', 'sort by title (default) or author')
    .option(
      '-g, --group [groupType]',
      'group recommendations by genre (default) or author',
    )
    .option('-e, --export', 'export recommendations in CSV')
    .action(list);

  await program.parseAsync(process.argv);
})();
