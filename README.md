# Book Guru CLI

An app for book recommendations based on user books preferences. Get recommendation and some book offer.

## Features

- Book recommendation from OpenAI API
- Persist data with simple JSON file
- Get book offers
- Export recommendations to a sheets file

## Commands

- `preferences <action>`: view and edit book preferences
  - `view`: view all preferences
  - `edit`: edit preferences
- `generate [options] <limit>`: generate new recommendations
  - `limit`: limit of generations (integer)
  - `-n, --no-preferences`: generate without saved preferences
- `list`: list book recommendations
  - `-s, --sort`: sort by title
  - `-g, --group`: group recommendations by genre (soon: author group)
  - `-e, --export <fileType>`: export recommendations in pdf, csv or doc
