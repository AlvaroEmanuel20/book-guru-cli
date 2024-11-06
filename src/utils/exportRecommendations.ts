import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import Parser from 'papaparse';
import { Recommendation } from '../lib/database';

export default async function exportRecommendations(
  recommendations: Recommendation[],
) {
  const csv = Parser.unparse(recommendations);

  try {
    await writeFile(
      path.join(__dirname, '..', '..', 'recommendations.csv'),
      csv,
      { encoding: 'utf8' },
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
