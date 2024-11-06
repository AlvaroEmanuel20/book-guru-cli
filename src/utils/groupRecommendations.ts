import { ListCommandOptions } from '../commands/list';
import { Recommendation } from '../lib/database';

export default function groupRecommendations(
  recommendations: Recommendation[],
  { group }: Pick<ListCommandOptions, 'group'>,
) {
  const groupedRecommendations: { [key: string]: Recommendation[] } = {};

  if (group === 'author') {
    recommendations.forEach((value) => {
      if (!groupedRecommendations[value.author]) {
        groupedRecommendations[value.author] = [value];
      } else {
        groupedRecommendations[value.author].push(value);
      }
    });

    return groupedRecommendations;
  }

  recommendations.forEach((value) => {
    if (!groupedRecommendations[value.genre]) {
      groupedRecommendations[value.genre] = [value];
    } else {
      groupedRecommendations[value.genre].push(value);
    }
  });

  return groupedRecommendations;
}
