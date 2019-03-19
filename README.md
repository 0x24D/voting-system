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
/api/v1/addresses GET - return all addresses (implemented)
/api/v1/addresses GET - return list of all addresses (implemented)
/api/v1/addresses/{id} GET - return specific address (implemented)
/api/v1/addresses POST - add new address (implemented)

/api/v1/admins POST - add new admin (implemented)
/api/v1/admins/{username} GET - return specific admin (implemented)

/api/v1/auditors POST - add new auditor (implemented)
/api/v1/auditors/{id} GET - return specific auditor (implemented)

/api/v1/campaigns GET - return list of all campaigns (use ?constituency={constituency} query param to filter) (implemented)
/api/v1/campaigns POST - add new campaign (implemented)
/api/v1/campaigns/{id} GET - return specific campaign (implemented)
/api/v1/campaigns/{id} PUT - update campaign (increment total votes, etc.) (implemented)

/api/v1/candidates GET - return list of all candidates (implemented)
/api/v1/candidates POST - add new candidate (implemented)
/api/v1/candidates/{id} GET - return specific candidate (implemented)

/api/v1/constituencies GET - return list of all constituencies (implemented)
/api/v1/constituencies/{id} GET - return specific constituency (implemented)
/api/v1/constituencies POST - add new constituency (to implement)

/api/v1/parties POST - add new party (to implement for party profiles, setting up a campaign)
/api/v1/parties/{id} GET - return specific party (implemented)

/api/v1/pollingStations GET - return list of all polling stations (implemented)
/api/v1/pollingStations/{id} GET - return specific polling station (implemented)

/api/v1/systems GET - return list of all systems (implemented)
/api/v1/systems/{id} GET - return specific system (implemented)
/api/v1/systems/{id} PUT - update system (implemented)

/api/v1/users/{username} GET - return specific user (implemented)
/api/v1/users/{id} PUT - update user (login attempts, etc.) (implemented)

/api/v1/voters GET - return list of all voters (implemented)
/api/v1/voters POST - add new voter (implemented)
/api/v1/voters/{id} GET - return specific voter (implemented)
/api/v1/voters/{id} PUT - update voter (implemented)
```

## Extensions:
* User registration (voter, admin, and auditor) - A (merged into develop)
* Adding/displaying candidate/party profiles - JS
* Setting up a campaign (with candidates) - D (TODO: required fields messages and JavaDoc)
* List of voters for auditor - L (merged into develop)
* Graphical results interface (for each campaign) - JW (in progress)

## Notes:
* When actually sending email, change _config.js to correct details.
