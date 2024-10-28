#!/usr/bin/env node

import { existsSync } from 'node:fs';
import './lib/database';
import { Command } from 'commander';
import figlet from 'figlet';
import colors from 'picocolors';
import database from './lib/database';

const program = new Command();

if (!existsSync('database.json')) {
  database.create({
    preferences: { language: '', genre: '' },
    recommendations: [],
  });
}

console.log(colors.bold(colors.blue(figlet.textSync('Book Guru'))));

program
  .name('book-guru')
  .description('An AI book recommendation app')
  .version('1.0.0', '-v, --version', 'current app version');

program
  .command('preferences')
  .description('view and edit book preferences')
  .argument('<action>', 'view or edit');

program.parse();
