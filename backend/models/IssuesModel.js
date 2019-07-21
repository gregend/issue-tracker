const uuid = require('uuid/v4');
const IssueStatuses = require('../constants/IssueStatuses');
const { ResourceNotFoundError } = require('../constants/Errors');

const IssuesModel = database => {
   const generateXIssues = (x) => Array(x)
      .fill(null)
      .forEach((item, index) => createIssue(`title${index}`,`title${index}`,))
   const createIssue = (title, description) => {
      const id = uuid();
      const crtDate = new Date().toISOString();
      const data = {
         id,
         title,
         crtDate,
         modDate: crtDate,
         description,
         status: IssueStatuses.OPEN
      };
      database.issues[id] = data;
      return {
         status: 'INSERT',
         id,
         data
      };
   };
   const deleteIssue = (id) => {
      const issueData = database.issues[id];
      if (issueData) {
         delete database.issues[id];
         return {
            status: 'DELETE',
            id
         };
      }
      throw new ResourceNotFoundError(id);
   };

   const updateIssue = (id, { title, description, status }) => {
      const issueData = database.issues[id];
      if (issueData) {
         const modDate = new Date().toISOString();
         const issueObject = Object.assign(issueData, { title, description, status });
         const newIssueData = {
            ...issueObject,
            modDate
         };
         database.issues[id] = newIssueData;
         return {
            status: 'UPDATE',
            id,
            data: newIssueData
         };
      }
      throw new ResourceNotFoundError(id);
   };

   const getIssue = (id) => {
      const issueData = database.issues[id];
      if (issueData) {
         return issueData;
      }
      throw new ResourceNotFoundError(id);
   };

   const getAllIssues = () => {
      const issues = database.issues;
      return Object.keys(issues).reduce((acc, id) => {
         const { title, status, description } = issues[id];
         return { ...acc, [id]: { id, title, status, description } };
      }, {})
   };

   return { createIssue, deleteIssue, updateIssue, getIssue, getAllIssues, generateXIssues };
}

module.exports = IssuesModel;