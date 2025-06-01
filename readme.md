# Accounts and Destinations

##### A Node.js Express application using SQLite and Sequelize ORM to manage accounts and webhook destinations, and to forward incoming JSON data based on an app secret token.

##### Please go through the docs folder to get the Sample Payloads and urls

# Instrctions to Start the Server

#### 1. Clone the repository Run the following command in your terminal: git clone (https://github.com/naren-personal/Backend-Assessment-CustomerLabs-.git)

#### 2.Make sure Node.js is installed on your system. You can verify it using: node -v

#### 3. Navigate to the project directory and Install dependencies and start the server

#### 4. Verify the server is running Open your browser and go to: http://localhost:3000

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
