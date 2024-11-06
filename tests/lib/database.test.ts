import { Database, Data } from '../../src/lib/database';
import { promisify } from 'util';
import { exec } from 'child_process';

const execPromise = promisify(exec);
const database = new Database('database.json');
const defaultData: Data = {
  preferences: { language: '', genre: '' },
  recommendations: [],
};

describe('JSON Database File', () => {
  test('Create a database.json with default data and read', async () => {
    await database.create(defaultData);
    expect(await database.read()).toStrictEqual(defaultData);
  });

  test('Create a database.json, update data and read', async () => {
    await database.create(defaultData);

    await database.update(({ preferences }) => {
      preferences.language = 'Portuguese';
      preferences.genre = 'Romance';
    });

    expect(await database.read()).toStrictEqual({
      preferences: {
        language: 'Portuguese',
        genre: 'Romance',
      },
      recommendations: [],
    });
  });

  test('Create a database.json, add some recommendations and read', async () => {
    await database.create(defaultData);

    await database.update(({ recommendations }) => {
      recommendations.push(
        {
          photoUrl: 'https://example.com/book1.jpg',
          title: 'O Hobbit',
          description: 'Uma jornada fantástica através da Terra Média.',
          pages: 310,
          author: 'J.R.R. Tolkien',
          genre: 'Fantasia',
          language: 'Português',
        },
        {
          photoUrl: 'https://example.com/book2.jpg',
          title: '1984',
          description: 'Um romance distópico sobre vigilância e totalitarismo.',
          pages: 328,
          author: 'George Orwell',
          genre: 'Ficção Científica',
          language: 'Inglês',
        },
      );
    });

    expect(await database.read()).toStrictEqual({
      preferences: {
        language: '',
        genre: '',
      },
      recommendations: [
        {
          photoUrl: 'https://example.com/book1.jpg',
          title: 'O Hobbit',
          description: 'Uma jornada fantástica através da Terra Média.',
          pages: 310,
          author: 'J.R.R. Tolkien',
          genre: 'Fantasia',
          language: 'Português',
        },
        {
          photoUrl: 'https://example.com/book2.jpg',
          title: '1984',
          description: 'Um romance distópico sobre vigilância e totalitarismo.',
          pages: 328,
          author: 'George Orwell',
          genre: 'Ficção Científica',
          language: 'Inglês',
        },
      ],
    });
  });

  afterEach(async () => {
    try {
      await execPromise('rm -f database.json');
    } catch (error) {
      console.error(error);
    }
  });
});
