import React from 'react';
import PropTypes from 'prop-types';
import { IssuePropType } from '../constants/customPropTypes';
import IssuesList from './IssuesList';
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

const IssuesContainer = ({ issues, onIssueClick }) => {
   const categorizedIssues = categorizeIssues(issues);
   return <div className="issues-container">
      {Object.keys(categorizedIssues).map((category) => {
         return <IssuesList
            key={category}
            title={category}
            issues={categorizedIssues[category]}
            onIssueClick={onIssueClick} />
      })}

   </div>

};
const { shape, objectOf } = PropTypes;
IssuesContainer.propTypes = {
   issues: objectOf(shape(IssuePropType)).isRequired
}

export default IssuesContainer;