import database, { Recommendation } from '../lib/database';
import printRecommendation from '../utils/printRecommendation';
import colors from 'picocolors';
import sortRecommendations from '../utils/sortRecommendations';
import groupRecommendations from '../utils/groupRecommendations';
import exportRecommendations from '../utils/exportRecommendations';
import * as emoji from 'node-emoji';

export type ListCommandOptions = {
  sort?: boolean | 'title' | 'author';
  group?: boolean | 'genre' | 'author';
  export?: boolean;
};

export default async function list(options: ListCommandOptions) {
  let recommendations: Recommendation[] | { [key: string]: Recommendation[] } =
    (await database.read()).recommendations;

  if (options.export) {
    await exportRecommendations(recommendations);

    console.log(
      colors.bold(
        colors.green(
          emoji.get('white_check_mark') +
            ' Exported recommendations to recommendations.csv',
        ),
      ),
    );

    return;
  }

  if (options.sort) {
    recommendations = sortRecommendations(recommendations, {
      sort: options.sort,
    });
  }

  if (options.group) {
    recommendations = groupRecommendations(recommendations, {
      group: options.group,
    });

    for (const key in recommendations) {
      console.log(colors.bold(colors.bgBlue(key)));
      recommendations[key].forEach((value) => {
        printRecommendation(value);
      });
    }
  } else {
    recommendations.forEach((value) => {
      printRecommendation(value);
    });
  }
}
