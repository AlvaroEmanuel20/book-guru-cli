import { ListCommandOptions } from '../commands/list';
import { Recommendation } from '../lib/database';

export default function sortRecommendations(
  recommendations: Recommendation[],
  { sort }: Pick<ListCommandOptions, 'sort'>,
) {
  if (sort === 'author') {
    return recommendations.sort((a, b) => {
      const aLower = a.author.toLowerCase();
      const bLower = b.author.toLowerCase();

      if (aLower < bLower) return -1;
      if (aLower > bLower) return 1;

      return 0;
    });
  }

  return recommendations.sort((a, b) => {
    const aLower = a.title.toLowerCase();
    const bLower = b.title.toLowerCase();

    if (aLower < bLower) return -1;
    if (aLower > bLower) return 1;

    return 0;
  });
}
