# Book Guru CLI

An app for book recommendations based on user books preferences. Get recommendation and some book offer.

## Features

- Book recommendation from OpenAI API
- Persist data with simple JSON file
- Get book offers
- Export recommendations to a CSV file

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
