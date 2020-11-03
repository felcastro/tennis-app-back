# Tennis App

Reimplementation of my undergraduate thesis back-end, using Node.js + PostgreSQL.

## Technologies

#### Framework -> Express.js

#### ORM -> Sequelize

#### Testing -> Jest

## Environment (.env)

PORT=\<App running port\>\
TOKEN_SECRET=\<JWT secret\>\
GCLOUD_PROJECT_ID=\<Google Cloud project ID\>\
GCLOUD_STORAGE_BUCKET=\<Google Cloud Bucket name\>

DB_NAME=\<Main database name\>\
DB_HOST=\<Main database host\>\
DB_DIALECT=postgres\
DB_USER=\<Main database username\>\
DB_PW=\<Main database password\>

DB_TEST_NAME=\<Testing database name\>\
DB_TEST_HOST=\<Testing database host\>\
DB_TEST_DIALECT=postgres\
DB_TEST_USER=\<Testing database username\>\
DB_TEST_PW=\<Testing database password\>

## Running
1. Install node dependencies
1. Run sequelize migrations
1. Create bucket key file
1. Run the application
   * npm start -> runs with node
   * npm run dev -> runs with nodemon
   * npm test -> runs all automated tests
