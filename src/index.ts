#!/usr/bin/env node

import { Command } from 'commander';
import { access } from 'node:fs/promises';
import database from './lib/database';
import figlet from 'figlet';
import colors from 'picocolors';
import preferences from './commands/preferences';
import generate from './commands/generate';

const program = new Command();
console.log(colors.bold(colors.blue(figlet.textSync('Book Guru'))));

program
  .name('book-guru')
  .description('An AI book recommendation app')
  .version('1.0.0', '-v, --version', 'current app version');

(async () => {
  try {
    await access('database.json');
  } catch (error) {
    await database.create({
      preferences: { language: '', genre: '' },
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
    .description('Generate recommendations')
    .argument('[limit]', 'limit of generations', 5)
    .option('-n, --new', 'new recommendations, no saved preferences')
    .action(generate);

  await program.parseAsync(process.argv);
})();
