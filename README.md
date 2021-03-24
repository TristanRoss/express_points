# express_points

To run this project ensure you have the LTS version of [Node.js](https://nodejs.org/en/) installed.

This will also install npm onto your machine.

Clone the repo.

Within the folder, run `npm install` in the command line.

Then run `npm start`.

This will start the server and you can now call the api.

For balances:
```
GET

http://localhost:5000/api/payers
```

For spending:

```
POST

http://localhost:5000/api/payers/spend

Example body (JSON):
{
  "points": 300
}
```

For adding a transaction:
```
POST

http://localhost:5000/api/payers/add

Example body (JSON):
{
  "payer": "DANNON",
  "points": 300,
  "timestamp": "2020-10-31T10:00:00Z"
}
```

🐶 P.S. I love doggos 🐶

![Dog gif](https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif)

