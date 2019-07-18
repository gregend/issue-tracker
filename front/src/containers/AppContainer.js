import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllIssues, createIssue, updateIssue } from '../api/issues';
import IssuesList from './IssuesList';
import '../../static/styles/components/issuesContainer.scss';

const categorizeIssues = issues => {
   return Object.values(issues).reduce((acc, issue) => {
      const { status } = issue;
      acc[status.toLowerCase()].push(issue);
      return acc;
   }, {
      open: [],
      pending: [],
      closed: []
   });
};

const useOnMount = (setStatus, setIssues) => {
   useEffect(() => {
      (async () => {
         setStatus('PENDING');
         const issues = await getAllIssues();
         setIssues(issues);
         setStatus('SUCCESS');
      })()
   }, []);
};

const AppContainer = ({ }) => {
   const [issues, setIssues] = useState({});
   const [status, setStatus] = useState('NOT_PENDING');

   const onIssueClick = async id => {
      const currentIssue = issues[id];
      const newStatus = currentIssue.status === 'OPEN' ? 'PENDING' : 'CLOSED';
      const { data } = await updateIssue(Object.assign(currentIssue, { status: newStatus }));
      const { title, status } = data;
      const updatedIssue = { id, title, status };
      console.log(updatedIssue);
      setIssues({
         ...issues,
         [id]: updatedIssue
      });
   };
   useOnMount(setStatus, setIssues);
   const categorizedIssues = categorizeIssues(issues);

   return <div className="app-container">
      <Loader status={status} />
      <div className="issues-container">
         {Object.keys(categorizedIssues).map((category) => {
            return <IssuesList
               key={category}
               title={category}
               issues={Object.values(categorizedIssues[category])} 
               onIssueClick={onIssueClick} />
         })}
      </div>
   </div>
};
AppContainer.displayName = 'AppContainer';
export default AppContainer;

const Loader = ({ status }) => {
   switch (status) {
      case 'NOT_PENDING':
         return <div>:)</div>
      case 'PENDING':
         return <div>Loading...</div>
      case 'SUCCESS':
         return <div>Loaded</div>
   }
}