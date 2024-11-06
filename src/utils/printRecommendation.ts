import colors from 'picocolors';
import { Recommendation } from '../lib/database';

export default function printRecommendation(recommendation: Recommendation) {
  console.log(colors.bold(colors.blue(recommendation.title)));
  console.log(`Description: ${recommendation.description}`);
  console.log(`Author: ${recommendation.author}`);
  console.log(`Genre: ${recommendation.genre}`);
  console.log(`Language: ${recommendation.language}`);
  console.log(`Pages: ${recommendation.pages}\n`);
}
