import { readFileSync, writeFileSync } from 'node:fs';

export type Data = {
  preferences: {
    language: string;
    genre: string;
  };
  recommendations: Recommendation[];
};

export type Recommendation = {
  photoUrl: string;
  title: string;
  description: string;
  pages: number;
  author: string;
  genre: string;
  language: string;
};

export class Database {
  private readonly pathName: string;

  constructor(pathName: string) {
    this.pathName = pathName;
  }

  create(data: Data) {
    try {
      writeFileSync(this.pathName, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
    }
  }

  read(): Data | undefined {
    try {
      const data = readFileSync('database.json', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  }
}

const database = new Database('database.json');

export default database;
