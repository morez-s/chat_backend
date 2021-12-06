# Chat Application Backend
This application serves necessary APIs for signing up in the chat application and starting to chat with other users.

# Technologies
Database: Elasticsearch 7.15.2
Server: Nodejs 16.13.0

# Config
* .env
Change environment variables in .env file:
API_PORT: The port by which service will be running
DATABASE_URL: The host and port of the data server
TOKEN_KEY: Token key string for JWT

* config/database.js
Modify this file to manipulate connection of elasticsearch

# APIs Documentation
1) Registration
Signs up a new user in the application
URL: /auth/registration
Method: POST
Authorization: No Auth
Body:
{
    "params": {
        "username": "...",
        "password": "...",
        "password_confirmation": "..."
    }
}

2) Login
Logs in a user and returns a jwt token when the process is successful
URL: /auth/login
Method: POST
Authorization: No Auth
Body:
{
    "params": {
        "username": "...",
        "password": "..."
    }
}

3) Logout
Logs out a user
URL: /auth/logout
Method: DELETE
Authorization: Bearer Token

4) Get Users List
Returns a list of all signed up users as a contacts list
URL: /chat/users
Method: GET
Authorization: Bearer Token

5) Get User Messages List
Returns a list of all messages transferred between a specific user and the logged in user
URL: /chat/users/:userId/messages
Method: GET
Authorization: Bearer Token

6) Send Message
Sends a new message to a specific user from the logged in user
URL: /chat/users/:userId/messages
Method: POST
Authorization: Bearer Token
Body:
{
    "params": {
        "text": "..."
    }
}
