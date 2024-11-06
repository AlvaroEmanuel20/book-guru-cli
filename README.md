# Book Guru CLI

An app for book recommendations based on user books preferences. Get recommendation and some book offer.

## Features

- Book recommendation from OpenAI API
- Persist data with simple JSON file
- Get book offers (soon)
- Export recommendations to a CSV file

## Book preferences

- Language: book language
- Genre: book genre
- Book taste: a short text (max: 200 characters) to better customize the book recommendations

## Commands

- `preferences <action>`: view and edit book preferences
  - `view`: view all preferences
  - `edit`: edit preferences
- `generate [options] <limit>`: generate new recommendations
  - `limit`: limit of generations (integer)
  - `-n, --new`: generate without saved preferences
- `list`: list book recommendations
  - `-s, --sort <sortType>`: sort by title or author
  - `-g, --group <groupType>`: group recommendations by genre, author or language
  - `-e, --export`: export recommendations in CSV

## How to use

1 - Clone this repository:

```bash
git clone https://github.com/AlvaroEmanuel20/book-guru-cli
```

2 - Install the dependencies:

```bash
npm install
```

3 - Change `.env.example` to `.env` and fill the following variables:

```js
OPENAI_API_KEY=
OPENAI_MODEL=
DATABASE_FILE_NAME=
```

4 - Build and install cli app:

```bash
npm run build
npm install -g
```

5 - Now, you can run in the same project directory:

```bash
book-guru -v
book-guru preferences
```
