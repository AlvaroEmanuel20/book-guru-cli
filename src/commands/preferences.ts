import { input } from '@inquirer/prompts';
import database from '../lib/database';
import * as emoji from 'node-emoji';
import colors from 'picocolors';

export default async function preferences(actionType: 'view' | 'edit') {
  if (actionType === 'view') {
    const preferences = (await database.read()).preferences;
    console.log(colors.bold(colors.bgBlue('Preferences')));

    console.log(
      `${emoji.get('arrow_right_hook')} Book language: ${colors.blue(preferences.language)}`,
    );

    console.log(
      `${emoji.get('arrow_right_hook')} Book genre: ${colors.blue(preferences.genre)}`,
    );

    console.log(
      `${emoji.get('arrow_right_hook')} Book taste: ${colors.blue(preferences.bookTaste)}`,
    );

    return;
  }

  const language = await input({ message: "What's your preferred language?" });
  const genre = await input({ message: "What's your preferred genre?" });
  
  const bookTaste = await input({
    message: "What's your book taste?",
    validate: (value) =>
      value.length > 200 ? 'Input too big (max: 200 characters)' : true,
  });

  await database.update(({ preferences }) => {
    preferences.language = language;
    preferences.genre = genre;
    preferences.bookTaste = bookTaste;
  });

  console.log(
    colors.green(
      emoji.get('white_check_mark') + ' Preferences successful updated',
    ),
  );
}
