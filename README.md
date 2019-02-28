# voting-system
## Technologies used
* Frontend (Vue)
* Middleware (Express)
* Backend (MongoDB)
* Written using ES6 and running on node.js server
* Tested using Mocha and Chai

## API
* Create - POST
* Read - GET
* Update - PUT
* Delete - DELETE
```
/api/v1/addresses/{id} GET - return specific address (implementing)

/api/v1/campaigns GET - return list of all campaigns (use ?constituency={constituency} query param to filter) (implementing)

/api/v1/campaigns/{id} GET - return specific campaign (implemented)
/api/v1/campaigns/{id} PUT - update campaign (increment total votes, etc.)

/api/v1/candidates GET - return list of all candidates (implemented)

/api/v1/candidates/{id} GET - return specific candidate (implemented)

/api/v1/constituencies/{id} GET - return specific constituency (implementing)

/api/v1/parties/{id} GET - return specific party (implemented)

/api/v1/pollingStations/{id} GET - return specific polling station (to implement)

/api/v1/systems GET - return list of all systems (implementing)

/api/v1/systems/{id} GET - return specific system (to implement)
/api/v1/systems/{id} PUT - update system (to implement)

/api/v1/users/{id} GET - return specific user (to implement)
/api/v1/users/{id} PUT - update user (login attempts, etc.) (to implement)
```
