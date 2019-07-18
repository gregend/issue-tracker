const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database');
const IssuesController = require('./controllers/IssuesController');
const issuesController = IssuesController(database);
const { ResourceNotFoundError } = require('./constants/Errors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(issuesController);
function errorHandler (err, req, res, next) {
   if (err instanceof ResourceNotFoundError) {
      res.status(404).send({ error: err.message });
   }
   next(err);
 };
 app.use(errorHandler);

app.listen(3000, () => {
   console.log('Listening on port 3000...');
});