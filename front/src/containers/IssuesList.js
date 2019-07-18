import React from 'react';
import PropTypes from 'prop-types';
import IssueCard from '../components/IssueCard';

const IssuesList = ({ title, issues, onIssueClick }) => {
   return <div className="issues-list">
      <div className="issues-list-title">
         {title}
      </div>
      {issues.map(
         ({ id, title, status }) => 
            <IssueCard key={id}
               id={id}
               title={title}
               status={status}
               onClick={onIssueClick} />
      )}
   </div>;
};

const { arrayOf, shape, string, func } = PropTypes;
IssuesList.displayName = 'IssuesList';
IssuesList.propTypes = {
   issues: arrayOf(shape({
      id: string,
      title: string,
      status: string
   })),
   onIssueClick: func
};
export default IssuesList;