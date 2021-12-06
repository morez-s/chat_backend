# Chat Application Backend
This application serves necessary APIs for signing up in the chat application and starting to chat with other users. <br />

# Technologies
Database: Elasticsearch 7.15.2 <br />
Server: Nodejs 16.13.0 <br />

# Config
* .env <br />
Change environment variables in .env file: <br />
API_PORT: The port by which service will be running <br />
DATABASE_URL: The host and port of the data server <br />
TOKEN_KEY: Token key string for JWT <br />

* config/database.js <br />
Modify this file to manipulate connection of elasticsearch <br />

# APIs Documentation
1) Registration <br />
Signs up a new user in the application <br />
URL: /auth/registration <br />
Method: POST <br />
Authorization: No Auth <br />
Body: <br />
```
{
    "params": {
        "username": "...",
        "password": "...",
        "password_confirmation": "..."
    }
}
```
<br />

2) Login <br />
Logs in a user and returns a jwt token when the process is successful <br />
URL: /auth/login <br />
Method: POST <br />
Authorization: No Auth <br />
Body: <br />
```
{
    "params": {
        "username": "...",
        "password": "..."
    }
}
```
<br />

3) Logout <br />
Logs out a user <br />
URL: /auth/logout <br />
Method: DELETE <br />
Authorization: Bearer Token <br />

4) Get Users List <br />
Returns a list of all signed up users as a contacts list <br />
URL: /chat/users <br />
Method: GET <br />
Authorization: Bearer Token <br />

5) Get User Messages List <br />
Returns a list of all messages transferred between a specific user and the logged in user <br />
URL: /chat/users/:userId/messages <br />
Method: GET <br />
Authorization: Bearer Token <br />

6) Send Message <br />
Sends a new message to a specific user from the logged in user <br />
URL: /chat/users/:userId/messages <br />
Method: POST <br />
Authorization: Bearer Token <br />
Body: <br />
```
{
    "params": {
        "text": "..."
    }
}
```
<br />