import 'dotenv/config';
import { input } from '@inquirer/prompts';
import database, { Recommendation } from '../lib/database';
import { openai } from '../lib/openai';
import colors from 'picocolors';
import ora from 'ora';
import printRecommendation from '../utils/printRecommendation';

export default async function generate(
  limit: number,
  options: { new?: boolean },
) {
  let preferences = (await database.read()).preferences;
  const spinner = ora('Generating your book recommendations...');

  if (options.new) {
    preferences.language = await input({
      message: "What's your preferred language?",
    });

    preferences.genre = await input({
      message: "What's your preferred genre?",
    });
  }

  spinner.start();

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL as string,
      messages: [
        {
          role: 'system',
          content: 'You are a powerful book recommendation system',
        },
        {
          role: 'user',
          content: `Generate ${limit} recommmendations, the books must be in ${preferences.language} language and in ${preferences.genre} genre`,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'book_recommendations',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              recommendations: {
                type: 'array',
                description: 'An array of book recommendations.',
                items: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      description: 'The title of the book.',
                    },
                    description: {
                      type: 'string',
                      description: 'A brief description of the book.',
                    },
                    pages: {
                      type: 'number',
                      description: 'The number of pages in the book.',
                    },
                    author: {
                      type: 'string',
                      description: 'The author of the book.',
                    },
                    genre: {
                      type: 'string',
                      description: 'The genre of the book.',
                    },
                    language: {
                      type: 'string',
                      description: 'The language of the book.',
                    },
                  },
                  required: [
                    'title',
                    'description',
                    'pages',
                    'author',
                    'genre',
                    'language',
                  ],
                  additionalProperties: false,
                },
              },
            },
            required: ['recommendations'],
            additionalProperties: false,
          },
        },
      },
    });

    const result: { recommendations: Recommendation[] } = JSON.parse(
      response.choices[0].message.content!,
    );

    await database.update(({ recommendations }) =>
      recommendations.push(...result.recommendations),
    );

    spinner.succeed(colors.green('Your new book recommendations:'));
    result.recommendations.forEach((book) => printRecommendation(book));
    
    return;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
