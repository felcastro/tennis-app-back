# Tennis App

Reimplementation of my undergraduate thesis back-end, using Node.js + PostgreSQL.

## Technologies

#### Framework -> Express.js

#### ORM -> Sequelize

#### Testing -> Jest

## Environment (.env)

The .env file should be either .env.production, .env.development, or .env.test, depending on the desired environment being executed.

PORT=\<App running port\>\
TOKEN_SECRET=\<JWT secret\>\
GCLOUD_PROJECT_ID=\<Google Cloud project ID\>\
GCLOUD_STORAGE_BUCKET=\<Google Cloud Bucket name\>

DB_NAME=\<Database name\>\
DB_HOST=\<Database host\>\
DB_DIALECT=postgres\
DB_USER=\<Database username\>\
DB_PW=\<Database password\>

## Running
1. Install node dependencies
1. Run sequelize migrations
1. Create bucket key file
1. Run the application
   * npm start -> runs with node
   * npm run dev -> runs with nodemon
   * npm test -> runs all automated tests
