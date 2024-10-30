import { input, select } from '@inquirer/prompts';
import database from '../lib/database';
import { languages } from '../utils/languages';
import { genres } from '../utils/genres';
import * as emoji from 'node-emoji';
import colors from 'picocolors';

export default async function preferences(actionType: 'view' | 'edit') {
  const noneOfTheseOption = '> NONE OF THESE <';
  const currentValueOption = '> CURRENT VALUE <';

  if (actionType === 'view') {
    const preferences = (await database.read()).preferences;
    console.log(colors.bold(colors.bgBlue('Preferences')));

    console.log(
      `${emoji.get('arrow_right_hook')} Book language: ${colors.blue(preferences.language)}`,
    );

    console.log(
      `${emoji.get('arrow_right_hook')} Book genre: ${colors.blue(preferences.genre)}`,
    );

    return;
  }

  let language = await select<string>({
    message: 'Select your preferred book language:',
    choices: [...languages, noneOfTheseOption, currentValueOption],
    loop: false,
  });

  if (language === noneOfTheseOption) {
    language = await input({ message: 'Write your preferred book language:' });
  }

  let genre = await select<string>({
    message: 'Select your preferred book genre:',
    choices: [...genres, noneOfTheseOption, currentValueOption],
    loop: false,
  });

  if (genre === noneOfTheseOption) {
    genre = await input({ message: 'Write your preferred book genre: ' });
  }

  await database.update(({ preferences }) => {
    preferences.language =
      language === currentValueOption ? preferences.language : language;

    preferences.genre =
      genre === currentValueOption ? preferences.genre : genre;
  });

  console.log(
    colors.green(
      emoji.get('white_check_mark') + ' Preferences successful updated',
    ),
  );
}
