# Accounts and Destinations

##### A Node.js Express application using SQLite and Sequelize ORM to manage accounts and webhook destinations, and to forward incoming JSON data based on an app secret token.

##### Please go through the docs folder to get the Sample Payloads and urls

# Instrctions to Start the Server

#### 1. Clone the repo

#### 2. Make you Using the Nodejs

#### 3. go the Project and run "npm run server"

#### 4. Run the http://localhost:3000 to see the server is running

## API Endpoints

BaseUrl: http://localhost:3000

Response
{
"message": "Server running"
}

## Accounts

### Create

##### URL - http://localhost:3000/accounts/create

##### Method : POST

### Update

##### URL - http://localhost:3000/accounts/update

##### Method : PUT

### Delete

##### URL - http://localhost:3000/accounts/delete

##### Method : DELETE

### GET

##### URL - http://localhost:3000/accounts/get

##### Method : GET

## Destinations

### Create

##### URL - http://localhost:3000/destinations/create

##### Method : POST

### Update

##### URL - http://localhost:3000/destinations/update

##### Method : PUT

### Delete

##### URL - http://localhost:3000/destinations/delete

##### Method : DELETE

### GET

##### URL - http://localhost:3000/destinations/get

##### Method : GET

### ByAccount

##### URL - http://localhost:3000/destinations/byaccount

##### Method : GET

## Push Server Data

##### URL - http://localhost:3000/server/incoming_data

##### Method : POST
