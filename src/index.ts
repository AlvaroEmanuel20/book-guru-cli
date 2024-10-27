import { Command } from 'commander';
import figlet from 'figlet';
import colors from 'picocolors';

const program = new Command();

console.log(colors.bold(colors.blue(figlet.textSync('Book Guru'))));

program
  .name('book-guru')
  .description('An AI book recommendation app')
  .version('1.0.0', '-v, --version', 'current app version');

program.parse();
