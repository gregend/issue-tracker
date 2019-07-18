const router  = require('express').Router();
const IssuesRoutes = require('../routes/IssuesRoutes');
const IssuesModel = require('../models/IssuesModel');

const IssuesController = database => {
   const issuesModel = IssuesModel(database);
   issuesModel.generateXIssues(5);
   const issuesRoutes = IssuesRoutes(issuesModel);
   Object.values(issuesRoutes).forEach(routeConfig=> {
      const { route, method, handler } = routeConfig;
      router[method](route, handler);
   });
   return router;
}


module.exports = IssuesController;