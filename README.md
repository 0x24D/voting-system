# voting-system
## Technologies used
* Frontend (Vue)
* Middleware (Express)
* Backend (MongoDB)
* Written using ES6 and running on node.js server
* Tested using Mocha and Chai

## API (TBC)
* Create - POST
* Read - GET
* Update - PUT
* Delete - DELETE
```
/api/v1/addresses GET - return list of all addresses (out of scope for group work)
/api/v1/addresses POST - create new address (not needed)
/api/v1/addresses PUT - error
/api/v1/addresses DELETE - delete all addresses (out of scope for group work)

/api/v1/addresses/{id} GET - return specific address (to implement)
/api/v1/addresses/{id} POST - error
/api/v1/addresses/{id} PUT - update address (out of scope for group work)
/api/v1/addresses/{id} DELETE - delete specific address (out of scope for group work)

/api/v1/campaigns GET - return list of all campaigns (use ?constituency={constituency} query param to filter) (to implement)
/api/v1/campaigns POST - create new campaign (out of scope for group work)
/api/v1/campaigns PUT - error
/api/v1/campaigns DELETE - delete all campaigns (out of scope for group work)

/api/v1/campaigns/{id} GET - return specific campaign (to implement)
/api/v1/campaigns/{id} POST - error
/api/v1/campaigns/{id} PUT - update campaign (increment total votes, etc.)
/api/v1/campaigns/{id} DELETE - delete specific campaign (out of scope for group work)

/api/v1/candidates GET - return list of all candidates (implemented)
/api/v1/candidates POST - create new candidate (out of scope for group work)
/api/v1/candidates PUT - error
/api/v1/candidates DELETE - delete all candidates (out of scope for group work)

/api/v1/candidates/{id} GET - return specific candidate (implemented)
/api/v1/candidates/{id} POST - error
/api/v1/candidates/{id} PUT - update candidate (out of scope for group work)
/api/v1/candidates/{id} DELETE - delete candidate (out of scope for group work)

/api/v1/constituencies GET - return list of all constituencies (out of scope for group work)
/api/v1/constituencies POST - create new constituency (out of scope for group work)
/api/v1/constituencies PUT - error
/api/v1/constituencies DELETE - delete all constituencies (out of scope for group work)

/api/v1/constituencies/{id} GET - return specific constituency (to implement)
/api/v1/constituencies/{id} POST - error
/api/v1/constituencies/{id} PUT - update constituency (out of scope for group work)
/api/v1/constituencies/{id} DELETE - delete specific constituency (out of scope for group work)

/api/v1/parties GET - return list of all parties (out of scope for group work)
/api/v1/parties POST - create new party (out of scope for group work)
/api/v1/parties PUT - error
/api/v1/parties DELETE - delete all parties (out of scope for group work)

/api/v1/parties/{id} GET - return specific party (implemented)
/api/v1/parties/{id} POST - error
/api/v1/parties/{id} PUT - update party (out of scope for group work)
/api/v1/parties/{id} DELETE - delete specific party (out of scope for group work)

/api/v1/pollingStations GET - return list of all polling stations (out of scope for group work)
/api/v1/pollingStations POST - create new polling station (out of scope for group work)
/api/v1/pollingStations PUT - error
/api/v1/pollingStations DELETE - delete all polling stations (out of scope for group work)

/api/v1/pollingStations/{id} GET - return specific polling station (out of scope for group work)
/api/v1/pollingStations/{id} POST - error
/api/v1/pollingStations/{id} PUT - update polling station (out of scope for group work)
/api/v1/pollingStations/{id} DELETE - delete specific polling station (out of scope for group work)

/api/v1/systems GET - return list of all systems
/api/v1/systems POST - create new system (out of scope for group work)
/api/v1/systems PUT - error
/api/v1/systems DELETE - delete all systems (out of scope for group work)

/api/v1/systems/{id} GET - return specific system
/api/v1/systems/{id} POST - error
/api/v1/systems/{id} PUT - update system
/api/v1/systems/{id} DELETE - delete specific system (out of scope for group work)

/api/v1/users GET - return list of all users (out of scope for group work)
/api/v1/users POST - create new user (out of scope for group work)
/api/v1/users PUT - error
/api/v1/users DELETE - delete all users (out of scope for group work)

/api/v1/users/{id} GET - return specific user (to implement)
/api/v1/users/{id} POST - error
/api/v1/users/{id} PUT - update user (login attempts, etc.)
/api/v1/users/{id} DELETE - delete specific user (out of scope for group work)
```
