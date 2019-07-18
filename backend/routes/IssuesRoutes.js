const IssuesRoutes = model => {
   const { createIssue, deleteIssue, updateIssue, getIssue, getAllIssues } = model;
   const issueRoutesConfiguration = {
      createIssue: {
         route: '/issues',
         method: 'post',
         handler: (req, res) => {
            const { title, description } = req.body;
            res.json(createIssue(title, description));
         }
      },
      deleteIssue: {
         route: '/issues/:id',
         method: 'delete',
         handler: (req, res) => {
            const { id } = req.params;
            res.json(deleteIssue(id));
         }
      },
      updateIssue: {
         route: '/issues/:id',
         method: 'post',
         handler: (req, res) => {
            const { id } = req.params;
            const { title, description, status } = req.body;
            res.json(updateIssue(id, { title, description, status }));
         }
      },
      getIssue: {
         route: '/issues/:id',
         method: 'get',
         handler: (req, res) => {
            const { id } = req.params;
            res.json(getIssue(id));
         }
      },
      getAllIssues: {
         route: '/issues',
         method: 'get',
         handler: (req, res) => {
            res.json(getAllIssues());
         }
      }
   }
   return issueRoutesConfiguration;
};

module.exports = IssuesRoutes;