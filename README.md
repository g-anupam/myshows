The Web App source code has been divided into two parts: Frontend and Backend.
The Frontend contains the React App needed to run the project. 
The Backend Contains the Server.

In order to run the app there needs to be a .env file in the backend folder which contains the connection string for the mongo DB database.


#### To run Backend
```sh
cd backend/
npm i
node server.js
```

#### To run the Stripe test API
```sh
npm install stripe  (for backend)
npm install @stripe/react-stripe-js @stripe/stripe-js  (for frontend)
```
Use the standard public and private keys offered by the test API(refer to [docs](https://docs.stripe.com/testing))

#### To Run Frontend
Pull the latest version from github

```sh
cd frontend/
npm i
npm run dev
```
## Developer Tools
Few scripts have been added in the devtools directory inside backend for testing and debugging.
Here are a few of them : 
- Show all users : node DisplayAllUsers.js
- Add a new showtime to the DB (Edit the contents to suits your needs for the repsective movie): node add.js







