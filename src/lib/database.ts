import { readFile, writeFile } from 'node:fs/promises';

export type Data = {
  preferences: Preferences;
  recommendations: Recommendation[];
};

export type Preferences = {
  language: string;
  genre: string;
  bookTaste: string;
};

export type Recommendation = {
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

  async create(data: Data) {
    try {
      await writeFile(this.pathName, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  async read() {
    try {
      const data = await readFile('database.json', 'utf8');
      return JSON.parse(data) as Data;
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  async update(fn: (data: Data) => unknown) {
    try {
      const data = await this.read();
      fn(data);
      await writeFile(this.pathName, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

const database = new Database('database.json');

export default database;
